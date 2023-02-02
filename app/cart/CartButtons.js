'use client';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export function DecreaseButton(props) {
  return (
    <button
      onClick={() => {
        const cartItemsCookie = getParsedCookie('cartItemCookie');

        if (!cartItemsCookie) {
          return;
        }
        const foundItem = cartItemsCookie.find((itemInCart) => {
          return itemInCart.id === props.id;
        });

        if (foundItem) {
          foundItem.amount--;
          if (foundItem.amount < 0) {
            foundItem.amount = 0;
          }
        }
        setStringifiedCookie('cartItemCookie', cartItemsCookie);
      }}
    >
      {' '}
      -1{' '}
    </button>
  );
}
