import {
  deleteCookie,
  getParsedCookie,
  setCartItem,
  setStringifiedCookie,
  stringifyCookieValue,
} from '../cookies';

// testing a single, small function that doesn't depend on a library
test('stringify a cookie value', () => {
  expect(stringifyCookieValue([{ id: 1, amount: 2 }])).toBe(
    '[{"id":1,"amount":2}]',
  );
});

// test general cookie actions
test('set, get and delete a cookie', () => {
  const cookie = {
    key: 'cart',
    value: [{ id: 1, amount: 2 }],
  };

  // in the beginning this should return undefined
  expect(getParsedCookie(cookie.key)).toBe(undefined);

  // then set a cookie
  expect(() => setStringifiedCookie(cookie.key, cookie.value)).not.toThrow();

  // .toStrictEqual to test that objects have the same type as well as structure
  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);

  // Best practice: clear state after test to bring the system back to the initial state
  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});

// Unit: Test functions for adding and setting quantities in the cookie
test('add or set quantity in a cookie', () => {
  const newItem1 = { id: 1, amount: 2 };
  const newItem2 = { id: 1, amount: -2 };

  const cookie = {
    key: 'cart',
    value: [{ id: newItem1.id, amount: newItem1.amount }],
  };

  // confirm there is no cookie
  expect(getParsedCookie(cookie.key)).toBe(undefined);

  // case one there is no cookie and we set/add a positive number
  expect(() => setCartItem(newItem1.id, newItem1.amount, 'set')).not.toThrow();
  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);
  expect(() => deleteCookie(cookie.key)).not.toThrow();
  expect(deleteCookie(cookie.key)).toBe(undefined);

  // case two there is no cookie and we set/add a negativ number
  expect(() => setCartItem(newItem2.id, newItem2.amount, 'set')).not.toThrow();
  expect(getParsedCookie(cookie.key)).toStrictEqual([
    { id: newItem2.id, amount: 0 },
  ]);

  const newItem3 = { id: 2, amount: 7 };
  const newItem4 = { id: 2, amount: -7 };
  const newItem5 = { id: 2, amount: -14 };
  const cookie2 = {
    key: 'cart',
    value: [
      { id: newItem1.id, amount: 0 },
      { id: newItem3.id, amount: 0 },
    ],
  };
  // case three there is a cookie and we ADD a new item to the cookie
  expect(() => setCartItem(newItem3.id, newItem3.amount, 'add')).not.toThrow(); // pos
  expect(getParsedCookie(cookie2.key)).toStrictEqual([
    { id: newItem1.id, amount: 0 },
    { id: newItem3.id, amount: newItem3.amount },
  ]);

  expect(() => setCartItem(newItem4.id, newItem4.amount, 'add')).not.toThrow();
  expect(getParsedCookie(cookie2.key)).toStrictEqual(cookie2.value);

  // case: there is a cookie and we UPDATE an item in the cookie
  expect(() => setCartItem(newItem3.id, newItem3.amount, 'add')).not.toThrow();
  expect(getParsedCookie(cookie2.key)).toStrictEqual([
    { id: newItem1.id, amount: 0 },
    { id: newItem3.id, amount: newItem3.amount },
  ]);
  expect(() => setCartItem(newItem3.id, newItem3.amount, 'add')).not.toThrow();
  expect(getParsedCookie(cookie2.key)).toStrictEqual([
    { id: newItem1.id, amount: 0 },
    { id: newItem3.id, amount: 14 },
  ]);

  expect(() => setCartItem(newItem3.id, newItem4.amount, 'add')).not.toThrow();
  expect(getParsedCookie(cookie2.key)).toStrictEqual([
    { id: newItem1.id, amount: 0 },
    { id: newItem3.id, amount: 7 },
  ]);

  // do not allow to add a negative number to result in lower than zero
  expect(() => setCartItem(newItem3.id, newItem5.amount, 'add')).not.toThrow();
  expect(getParsedCookie(cookie2.key)).toStrictEqual([
    { id: newItem1.id, amount: 0 },
    { id: newItem3.id, amount: 0 },
  ]);

  const cookie3 = {
    key: 'cart',
    value: [
      { id: newItem1.id, amount: 0 },
      { id: newItem3.id, amount: 0 },
    ],
  };

  // case: SET a POSITIV value --> new item
  const newItem6 = { id: 3, amount: 42 };
  expect(() => setCartItem(newItem6.id, newItem6.amount, 'set')).not.toThrow();
  expect(getParsedCookie(cookie3.key)).toStrictEqual([
    { id: newItem1.id, amount: 0 },
    { id: newItem3.id, amount: 0 },
    { id: newItem6.id, amount: newItem6.amount },
  ]);

  // case: SET a NEGATIV value --> new item
  const newItem7 = { id: 4, amount: -42 };
  expect(() => setCartItem(newItem7.id, newItem7.amount, 'set')).not.toThrow();
  expect(getParsedCookie(cookie3.key)).toStrictEqual([
    { id: newItem1.id, amount: 0 },
    { id: newItem3.id, amount: 0 },
    { id: newItem6.id, amount: newItem6.amount },
    { id: newItem7.id, amount: 0 },
  ]);

  // case: SET a POSITIVE value --> item exists
  expect(() => setCartItem(newItem1.id, newItem1.amount, 'set')).not.toThrow();
  expect(getParsedCookie(cookie3.key)).toStrictEqual([
    { id: newItem1.id, amount: newItem1.amount },
    { id: newItem3.id, amount: 0 },
    { id: newItem6.id, amount: newItem6.amount },
    { id: newItem7.id, amount: 0 },
  ]);

  // case: SET a NEGATIV value --> item exists, cannot set neg --> returns 0
  expect(() => setCartItem(newItem6.id, -21, 'set')).not.toThrow();
  expect(getParsedCookie(cookie3.key)).toStrictEqual([
    { id: newItem1.id, amount: newItem1.amount },
    { id: newItem3.id, amount: 0 },
    { id: newItem6.id, amount: 0 },
    { id: newItem7.id, amount: 0 },
  ]);

  // Best practice: clear state after test to bring the system back to the initial state
  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});

// Unit: Test cart sum function
