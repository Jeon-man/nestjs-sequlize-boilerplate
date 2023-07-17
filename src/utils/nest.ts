export type ParamDecoratorReturnType<
  T extends object,
  Key extends keyof T | undefined,
> = Key extends keyof T ? T[Key] : T;
