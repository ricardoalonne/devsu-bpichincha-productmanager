export const camelToSnakeCase = <T>(obj: T): unknown => {
  if (typeof obj != 'object' || obj === null) return obj;

  if (Array.isArray(obj))
    return (obj as []).map((element: any) => camelToSnakeCase(element) as T);

  const objSnakeCase: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      let value: any = obj[key];

      if (typeof value === 'object' && !(value instanceof Date))
        value = camelToSnakeCase(value);

      objSnakeCase[snakeKey] = value;
    }
  }

  return objSnakeCase;
};

export const snakeToCamelCase = <T>(obj: any): T | T[] => {
  if (typeof obj != 'object' || obj === null) return obj;

  if (Array.isArray(obj))
    return (obj as []).map((element: any) => snakeToCamelCase(element) as T);

  const objCamelCase: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );

      let value = obj[key];

      if (typeof value === 'object' && !(value instanceof Date))
        value = snakeToCamelCase(value);

      objCamelCase[camelKey] = value;
    }
  }

  return objCamelCase as T;
};

export const copyValuesToObject = <T extends Record<string, any>>(
  source: any,
  target: any
): T => {
  if (source !== null && source !== undefined) {
    for (const key in source) {
      if (source[key] !== null && source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }

  return target as T;
};

export const objectContainsValue = (obj: any, input: string): boolean => {
  for (const key in obj) {
    if (
      obj[key].toString().trim() === input ||
      obj[key].toString().trim().includes(input)
    )
      return true;
  }

  return false;
};
