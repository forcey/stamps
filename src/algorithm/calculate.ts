import { Stamp } from './stamp';

export interface Solution {
    count: number;
    paths: Stamp[][];
}

export function calculate(stamps: Stamp[], target: number): Solution | null {
    const sortedStamps = [...stamps].sort((a, b) => a.value - b.value);

    const solutions = new Map<number, Solution>();
    const makeSolution = (prev: number, stamp: Stamp): Solution | null => {
        if (prev === 0) {
            return {
                count: 1,
                paths: [[stamp]],
            };
        }
        const prevSolution = solutions.get(prev);
        if (prevSolution !== undefined) {
            const newSolution: Solution = {
                count: prevSolution.count + 1,
                paths: [],
            };
            for (var path of prevSolution.paths) {
                if (path[0].value >= stamp.value) {
                    newSolution.paths.push([stamp].concat(path));
                }
            }
            return newSolution.paths.length > 0 ? newSolution : null;
        }
        return null;
    }

    const updateSolution = (x: number, newSolution: Solution | null): void => {
        if (!newSolution) {
            return;
        }
        const oldSolution = solutions.get(x);
        if (!oldSolution || newSolution.count < oldSolution.count) {
            solutions.set(x, newSolution);
        }
        else if (oldSolution && newSolution.count === oldSolution.count) {
            solutions.set(x, {
                count: newSolution.count,
                paths: oldSolution.paths.concat(newSolution.paths),
            });
        }
    }

    for (let i = 1; i <= target; i++) {
        for (const stamp of sortedStamps) {
            if (stamp.value > i) {
                break;
            }
            const newSolution = makeSolution(i - stamp.value, stamp);
            updateSolution(i, newSolution);
        }
    }
    return solutions.get(target) ?? null;
}

export default calculate;
