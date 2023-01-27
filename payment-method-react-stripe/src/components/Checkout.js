import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";


// import ProductImage from "";

import "../App.css";

let stripePromise;
const publishableKey = '--API KEY ---';

const getStripe = () => {
  if (!stripePromise) {
    
    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

const Checkout = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1M0MKcSCxpWDpBx5FwkQSVEF",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <h1>Stripe Checkout</h1>
      <p className="checkout-title">React Payment Implementation</p>
      <p className="checkout-description">
        Payment Method Implementation using React
      </p>
      <h1 className="checkout-price">₹122,900.00</h1>
      <img
        className="checkout-product-image"
        src="nature-3082832__480.jpg"
        alt="Product"
      />
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    </div>
  );
};

export default Checkout;
