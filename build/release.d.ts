/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/add
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function add(a: number, b: number): number;
/**
 * assembly/index/fibonacciWasm
 * @param n `i32`
 * @returns `i64`
 */
export declare function fibonacciWasm(n: number): bigint;
