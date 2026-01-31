import { ExtractParams } from './types'

export function generatePath<T extends string>(
  path: T,
  params: { [K in ExtractParams<T>]: string | number }
): string {
  return path.replace(/:(\w+)/g, (_, key) => {
    return String(params[key as keyof typeof params] || "");
  });
}
