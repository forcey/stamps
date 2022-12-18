function calculate(stamps, target) {
    stamps.sort();

    const solutions = new Map;
    const makeSolution = function (prev, stamp) {
        if (prev === 0) {
            return {
                count: 1,
                paths: [[stamp]],
            };
        }
        const prevSolution = solutions.get(prev);
        if (prevSolution !== undefined) {
            const newSolution = {
                count: prevSolution.count + 1,
                paths: [],
            };
            for (var path of prevSolution.paths) {
                if (path[0] >= stamp) {
                    newSolution.paths.push([stamp].concat(path));
                }
            }
            return newSolution.paths.length > 0 ? newSolution : null;
        }
        return null;
    }

    const updateSolution = function (x, newSolution) {
        if (!newSolution) {
            return;
        }
        const oldSolution = solutions.get(x);
        if (!oldSolution || newSolution.count < oldSolution.count) {
            solutions.set(x, newSolution);
        }
        if (oldSolution && newSolution.count === oldSolution.count) {
            solutions.set(x, {
                count: newSolution.count,
                paths: oldSolution.paths.concat(newSolution.paths),
            });
        }
    }

    for (var i = 1; i <= target; i++) {
        for (var stamp of stamps) {
            if (stamp > i) {
                break;
            }
            const newSolution = makeSolution(i - stamp, stamp);
            updateSolution(i, newSolution);
        }
    }
    return solutions.get(target);
}

export default calculate;
