// source: https://stackoverflow.com/a/25490531
export const getCookieValue = (name: string) =>
  RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`).exec(document.cookie)?.pop() || '';
