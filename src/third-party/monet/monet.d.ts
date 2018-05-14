import 'monet'

declare module 'monet' {
  interface IMaybeStatic {
    fromNull<V>(val: V | null): Maybe<V>;
  }
}