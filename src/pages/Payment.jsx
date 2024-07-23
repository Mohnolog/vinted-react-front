import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const stripePromise = loadStripe(
    `${import.meta.env.VITE_REACT_APP_BASE_PAYMENT}`
  );

  const options = {
    mode: "payment",
    amount: 2000,
    currency: "usd",
  };
  return (
    <main>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </main>
  );
};

export default Payment;
