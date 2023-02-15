'use client';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '../../utils/cookies';

export default function CheckoutForm() {
  const router = useRouter();
  return (
    <div>
      <h2>Form</h2>
      <h3>Invoice and delivery data</h3>
      <form action="/thankyou">
        <label htmlFor="firstName">First Name</label>
        <input
          data-test-id="checkout-first-name"
          id="firstName"
          name="firstName"
          required
        />
        <br />

        <label htmlFor="lastName">Last Name</label>
        <input
          data-test-id="checkout-last-name"
          id="lastName"
          name="lastName"
          required
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          data-test-id="checkout-email"
          id="email"
          name="email"
          type="email"
          required
        />
        <br />

        <label htmlFor="address">Address</label>
        <input
          data-test-id="checkout-address"
          id="address"
          name="address"
          required
        />
        <br />

        <label htmlFor="city">City</label>
        <input data-test-id="checkout-city" id="city" name="city" required />
        <br />

        <label htmlFor="postalCode">Postal Code</label>
        <input
          data-test-id="checkout-postal-code"
          id="postalCode"
          name="postalCode"
          required
        />
        <br />

        <label htmlFor="country">Country</label>
        <input
          data-test-id="checkout-postal-code"
          id="country"
          name="country"
          required
        />
        <br />
        <br />

        <h3>Invoice and delivery data</h3>
        <label htmlFor="country">Credit Card Number</label>
        <input
          data-test-id="checkout-credit-card"
          id="country"
          name="country"
          required
        />
        <br />

        <label htmlFor="creditCardExpirationDate">Expiration Date</label>
        <input
          data-test-id="checkout-expiration-date"
          id="creditCardExpirationDate"
          name="creditCardExpirationDate"
          required
        />
        <br />

        <label htmlFor="creditCardSecurityCode">Security Code</label>
        <input
          data-test-id="checkout-security-code"
          id="creditCardSecurityCode"
          name="creditCardSecurityCode"
          required
        />
        <br />

        <button
          data-test-id="checkout-confirm-order"
          onClick={(event) => {
            event.preventDefault();
            deleteCookie('cart');
            router.refresh();
            return router.push('/thankyou');
          }}
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
