const assert = x => {
  if (!x) throw new Error();
};
class Nothing {
  mbind(f) {
    return new Nothing();
  }
}
class Just {
  constructor(x) {
    this.x = x;
  }
  mbind(f) {
    return f(this.x);
  }
}
const bind = (monad, binder) => monad.mbind(binder);
const plus3 = n => join((a = n), (b = new Just(3)), new Just(a + b))(bind);
assert(plus3(new Nothing()) instanceof Nothing);
assert(plus3(new Just(4)) instanceof Just);
assert(plus3(new Just(5)).x === 8);
