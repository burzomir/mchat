export class Maybe<V> {

  private constructor (private value?: V | null) { }

  static of<U> (value?: U | null) {
    return new Maybe(value)
  }

  map<R> (f: (value: V) => R) {
    const { value } = this
    if (value === null || value === undefined) {
      return Maybe.of<R>()
    } else {
      return Maybe.of(f(value))
    }
  }

  orElse<T> (defaultValue?: T | null) {
    const { value } = this
    if (value === null || value === undefined) {
      return Maybe.of(defaultValue)
    } else {
      return Maybe.of(this.value)
    }
  }

}
