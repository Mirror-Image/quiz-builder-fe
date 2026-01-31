export type ExtractParams<T extends string> = 
T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? Param | ExtractParams<`/${Rest}`>
  : T extends `${infer _Start}:${infer Param}`
    ? Param
    : never;
