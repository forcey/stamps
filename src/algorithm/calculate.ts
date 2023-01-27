import { Stamp } from "./stamp";

export type Solution = {
    count: number;
    paths: Array<Array<Stamp>>;
}

function calculate(stamps: Stamp[], target: number): Solution | null {
    stamps.sort((a, b) => a.value - b.value);

    const solutions = new Map<number, Solution>();
    const makeSolution = function (prev: number, stamp: Stamp): Solution | null {
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

    const updateSolution = function (x: number, newSolution: Solution | null) {
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

    for (var i = 1; i <= target; i++) {
        for (var stamp of stamps) {
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
