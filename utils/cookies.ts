import Cookies from 'js-cookie';

export type CookieValue = {
  id: number;
  amount: number;
}[];

export function getParsedCookie(key: string): CookieValue | undefined {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue);
  } catch (error) {
    return undefined;
  }
}

export function setStringifiedCookie(key: string, value: CookieValue) {
  Cookies.set(key, JSON.stringify(value), { expires: 365 });
}
