import { useState, useEffect } from 'react';
import StampButtons from './components/StampButtons';
import Postage from './components/Postage';
import EditStamps from './components/EditStamps';
import { calculate, Solution } from './algorithm/calculate';
import { Stamp } from './algorithm/stamp';
import { getCookie, setCookie } from './cookie';

import './App.css';

const App: React.FC = () => {
  const DEFAULT_VALUES = [1, 3, 5, 10, 29, 32, 33, 65, 86];

  type CookieState = {
    values: number[];
    selected: string[];
  };

  const cookieData: CookieState | null = (() => {
    const c = getCookie('stamp-state');
    if (!c) return null;
    try {
      return JSON.parse(c);
    } catch {
      return null;
    }
  })();

  const [stampValues, setStampValues] = useState<number[]>(
    cookieData?.values || DEFAULT_VALUES,
  );

  const makeStamps = (values: number[]) =>
    values
      .map((v) => Stamp.fixed(v))
      .concat([Stamp.forever(), Stamp.globalForever()])
      .sort((a, b) => a.value - b.value);

  const [stamps, setStamps] = useState<Stamp[]>(makeStamps(stampValues));

  const makeInitialSelected = (stampList: Stamp[]) => {
    const sel = new Map<string, Stamp>();
    stampList.forEach((stamp) => {
      if (cookieData?.selected) {
        if (cookieData.selected.includes(stamp.id)) {
          sel.set(stamp.id, stamp);
        }
      } else {
        sel.set(stamp.id, stamp);
      }
    });
    return sel;
  };

  const [selected, setSelected] = useState<Map<string, Stamp>>(
    makeInitialSelected(stamps),
  );
  const [solution, setSolution] = useState<Solution | null>(null);

  useEffect(() => {
    setStamps(makeStamps(stampValues));
  }, [stampValues]);

  useEffect(() => {
    setSelected((prev) => {
      const newMap = new Map<string, Stamp>();
      stamps.forEach((s) => {
        if (prev.has(s.id) || !cookieData) {
          newMap.set(s.id, s);
        }
      });
      return newMap;
    });
  }, [stamps]);

  useEffect(() => {
    const data: CookieState = {
      values: stampValues,
      selected: Array.from(selected.keys()),
    };
    setCookie('stamp-state', JSON.stringify(data));
  }, [stampValues, selected]);

  const getSolutions = (postage: number): void => {
    const result = calculate(Array.from(selected.values()), postage);
    setSolution(result);
  };

  const solutionRow = solution
    ? solution.paths.map((path, i) => (
        <div key={`solution_${i}`}>{path.map((x) => x.name).join(', ')}</div>
      ))
    : <div>No solution</div>;

  return (
    <div className="App">
      <EditStamps stampValues={stampValues} onUpdate={setStampValues} />
      <div>
        <StampButtons
          stamps={stamps}
          onSelectionChanged={setSelected}
          initialSelection={selected}
        />
      </div>
      <div>
        <Postage onSetPostage={(p: number) => getSolutions(p)} />
      </div>
      {solutionRow}
    </div>
  );
}

export default App
