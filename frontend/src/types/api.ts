export type ApiResult<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string; fieldErrors?: Record<string, string> };