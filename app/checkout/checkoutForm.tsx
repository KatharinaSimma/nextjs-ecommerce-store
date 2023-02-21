'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCookie } from '../../utils/cookies';

export default function CheckoutForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [creditCardExpirationDate, setCreditCardExpirationDate] = useState('');
  const [creditCardSecurityCode, setCreditCardSecurityCode] = useState('');

  return (
    <div>
      <h2>Form</h2>
      <h3>Invoice and delivery data</h3>
      <form action="/thankyou" method="post">
        <label htmlFor="firstName">First Name</label>
        <input
          data-test-id="checkout-first-name"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
          required
        />
        <br />

        <label htmlFor="lastName">Last Name</label>
        <input
          data-test-id="checkout-last-name"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
          required
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          data-test-id="checkout-email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
        />
        <br />

        <label htmlFor="address">Address</label>
        <input
          data-test-id="checkout-address"
          id="address"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.currentTarget.value)}
          required
        />
        <br />

        <label htmlFor="city">City</label>
        <input
          data-test-id="checkout-city"
          id="city"
          name="city"
          value={city}
          onChange={(event) => setCity(event.currentTarget.value)}
          required
        />
        <br />

        <label htmlFor="postalCode">Postal Code</label>
        <input
          data-test-id="checkout-postal-code"
          id="postalCode"
          name="postalCode"
          value={postalCode}
          onChange={(event) => setPostalCode(event.currentTarget.value)}
          required
        />
        <br />

        <label htmlFor="country">Country</label>
        <input
          data-test-id="checkout-country"
          id="country"
          name="country"
          value={country}
          onChange={(event) => setCountry(event.currentTarget.value)}
          required
        />
        <br />
        <br />

        <h3>Invoice and delivery data</h3>
        <label htmlFor="creditCard">Credit Card Number</label>
        <input
          data-test-id="checkout-credit-card"
          id="creditCard"
          name="creditCard"
          value={creditCard}
          onChange={(event) => setCreditCard(event.currentTarget.value)}
          required
        />
        <br />

        <label htmlFor="creditCardExpirationDate">Expiration Date</label>
        <input
          data-test-id="checkout-expiration-date"
          id="creditCardExpirationDate"
          name="creditCardExpirationDate"
          value={creditCardExpirationDate}
          onChange={(event) =>
            setCreditCardExpirationDate(event.currentTarget.value)
          }
          required
        />
        <br />

        <label htmlFor="creditCardSecurityCode">Security Code</label>
        <input
          data-test-id="checkout-security-code"
          id="creditCardSecurityCode"
          name="creditCardSecurityCode"
          value={creditCardSecurityCode}
          onChange={(event) =>
            setCreditCardSecurityCode(event.currentTarget.value)
          }
          required
        />
        <br />

        <button
          data-test-id="checkout-confirm-order"
          onClick={() => {
            router.refresh();
            deleteCookie('cart');
          }}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
