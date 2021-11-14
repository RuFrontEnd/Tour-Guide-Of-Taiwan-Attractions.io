const _reduce =
  (f, g) =>
  (...args) =>
    g(f(...args));

export const pipe = (...fns) => fns.reduce(_reduce);
