import queryString from 'query-string';

/**
 *
 * @param obj
 * @param path
 * @returns
 */
export function getNestedValue<T>(obj: T, path: string): any {
  return path?.split('.')?.reduce((acc: any, part: string) => {
    // Convert numeric keys if necessary (e.g., "0" becomes 0)
    const key = isNaN(Number(part)) ? part : Number(part);
    return acc != null ? acc[key] : undefined;
  }, obj);
}

/**
 * Takes get request query params as a json and stringifies it
 * @param params
 * @returns
 */
export const queryParams = (params: object) =>
  queryString.stringify(params, {
    arrayFormat: 'bracket',
    skipEmptyString: true,
    skipNull: true,
  });
