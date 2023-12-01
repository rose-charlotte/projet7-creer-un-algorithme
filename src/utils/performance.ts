export function executeAndLogTiming<T>(name: string, action: () => T): T {
    const start = performance.now();

    const result = action();

    const stop = performance.now();

    console.log(`${name} took ${stop - start} milliseconds to execute`);

    return result;
}
