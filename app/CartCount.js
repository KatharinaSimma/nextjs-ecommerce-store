'use client';

// import { useEffect, useState } from 'react';

export default function CartCount(props) {
  // const [cartCountTotal, setCartCountTotal] = useState(0);

  // useEffect(() => {
  //   const cartCount = props.cartCount;
  //   setCartCountTotal(cartCount);
  // }, [props.cartCount]);

  return <span>{props.cartCount}</span>;
}
