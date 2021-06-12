import {v5 as uuidv5} from 'uuid';

export function chainUuidV5(namespace: string, ...rest: string[]): string {
  if (!rest.length) {
    return namespace;
  } else {
    return uuidv5(namespace, chainUuidV5(rest[0], ...rest.slice(1)));
  }
}
