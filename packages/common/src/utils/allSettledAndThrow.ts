export async function allSettledAndThrow<T1>(
  promises: [Promise<T1>],
): Promise<[T1]>;
export async function allSettledAndThrow<T1, T2>(
  promises: [Promise<T1>, Promise<T2>],
): Promise<[T1, T2]>;
export async function allSettledAndThrow<T1, T2, T3>(
  promises: [Promise<T1>, Promise<T2>, Promise<T3>],
): Promise<[T1, T2, T3]>;
export async function allSettledAndThrow<T1, T2, T3, T4>(
  promises: [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>],
): Promise<[T1, T2, T3, T4]>;
export async function allSettledAndThrow<T1, T2, T3, T4, T5>(
  promises: [Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4>, Promise<T5>],
): Promise<[T1, T2, T3, T4, T5]>;

export async function allSettledAndThrow<T>(
  promises: Promise<T>[],
): Promise<T[]> {
  const results = await Promise.allSettled(promises);

  for (const result of results) {
    if (isPromiseRejection(result)) {
      throw new Error(result.reason);
    }
  }

  return results.map((r) => (r as PromiseFulfilledResult<T>).value);
}

function isPromiseRejection<T>(
  promiseResult: PromiseSettledResult<T>,
): promiseResult is PromiseRejectedResult {
  return promiseResult.status === 'rejected';
}
