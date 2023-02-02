'use client';

import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import styles from './Cookiebanner.module.scss';

export default function CookieBanner() {
  const [areCookiesTermsAccepted, setAreCookiesTermsAccepted] = useState(false);

  useEffect(() => {
    const localStorageValue = getLocalStorage('areCookiesTermsAccepted');
    const initialState =
      localStorageValue === undefined ? false : localStorageValue;

    setAreCookiesTermsAccepted(initialState);
  }, []);

  return (
    !areCookiesTermsAccepted && (
      <div className={styles.cookiebannerContainer}>
        <div>This is the cookie Police. Please accept terms and conditions</div>
        <button
          onClick={() => {
            setAreCookiesTermsAccepted(true);
            setLocalStorage('areCookiesTermsAccepted', true);
          }}
        >
          Accept
        </button>
      </div>
    )
  );
}
