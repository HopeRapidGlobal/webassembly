// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function fibonacciWasm(n: i32): i64 {
  if (n < 0) {
    return 0;
  }
  if (n <= 2) {
    return 1;
  }
  return fibonacciWasm(n - 1) + fibonacciWasm(n - 2);
}
