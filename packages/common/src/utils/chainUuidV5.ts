import {v5 as uuidv5} from 'uuid';

export function chainUuidV5(namespaceUuid: string, ...values: [string, ...string[]]): string {
  let result = namespaceUuid;
  for (const value of values) {
    result = uuidv5(value, result);
  }
  return result;
}
