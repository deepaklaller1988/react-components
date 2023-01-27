import React, {useState, useEffect} from "react";
import {
  PaymentElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() { 
    const stripe = useStripe();
 const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [clientSecret, setClientSecret] = useState(""); 

  useEffect(()=>{
    if (stripe) {
        fetch("./api/create-payment-intent")
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret)});

        const supportedPaymentMethods = [
            {
              supportedMethods: 'basic-card',
            }
          ];

        const pr = {
          country: 'US',
          currency: 'usd',
          total: {
            label: 'Demo total',
            amount: 1099,
          },
          requestPayerName: true,
          requestPayerEmail: true,
        };

      
      

        const appearance = {
            theme: 'stripe',
          };

        const options = {clientSecret,
          appearance};

        const request = new PaymentRequest(
         supportedPaymentMethods,
         pr,
         options
        );
        request.show();

        pr.canMakePayment().then(result => {
            if (result) {
            //   prButton.mount('#payment-request-button');
              setPaymentRequest(pr);
            }
          });

       
    
          if (!clientSecret) {
              console.log("aa")
            return;
          }

        

        pr.on('paymentmethod', async (ev) => {
            const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
              xid,
              {payment_method: ev.paymentMethod.id},
              {handleActions: false}
            );
          
            if (confirmError) {
    
              ev.complete('fail');
            } else {
              ev.complete('success');
    
              if (paymentIntent.status === "requires_action") {
    
                if (error) {
                  // The payment failed -- ask your customer for a new payment method.
                } else {
                  // The payment has succeeded.
                }
              } else {
                // The payment has succeeded.
              }
            }
          }
          
        );
    }
    

  },[stripe]);

  return (
      <div>
          <form id="payment-form" >
      {/* {console.log(paymentRequest)} */}
      {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
      
      <div id="payment-request-button">
        {/* <!-- A Stripe Element will be inserted here if the browser supports this type of payment method. --> */}
      </div>
      <PaymentElement id="payment-element" /> 
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>

      </div>
  )


}
