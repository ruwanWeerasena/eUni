import React from "react";
import { useContext } from "react";
import { Button } from "@mui/material";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const { forwardRef, useRef, useImperativeHandle } = React;

const CardPaymentForm = forwardRef((props, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

    const createOrder = async (payment) => {
        console.log('create order', payment)
  }
  
  useImperativeHandle(ref, () => ({

    async createCardPayment() {
      

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,

      confirmParams: {
        return_url: "http://localhost:3000/ordersuccess",
      },

      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {


        return result;
      } else if (result.paymentIntent.status === "canceled") {
      } else {
      }
      console.log(result);
      return 'return 10'
    }
    }

  }));
    


  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,

      confirmParams: {
        return_url: "http://localhost:3000/ordersuccess",
      },

      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        //create order
        
        console.log(1, result)
        //await createOder(result.paymentIntent); api call
        navigate('/ordersuccess');
      } else if (result.paymentIntent.status === "canceled") {
      } else {
      }
      console.log(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {/* <Button type="submit" disabled={!stripe}>Create Order</Button> */}
    </form>
  );
});

export default CardPaymentForm;
