function fibonacci(n = 10) {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

module.exports = (n: number) => {
  return fibonacci(n);
};
