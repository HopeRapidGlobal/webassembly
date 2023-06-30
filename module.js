export const fibonacciJs = (n) => {
  if (n < 0) {
    return 0;
  }
  if (n <= 2) {
    return 1;
  }
  return fibonacciJs(n - 1) + fibonacciJs(n - 2);
}