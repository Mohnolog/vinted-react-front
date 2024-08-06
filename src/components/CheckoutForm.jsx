import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate();

  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState(null);
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // On commence à charger
    setIsLoading(true);
    if (elements == null) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Affiche l'erreur en question
      setErrorMessage(submitError.message);
      return;
    }

    // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/payment`
    );

    const clientSecret = response.data.client_secret;

    // Requête à Stripe pour valider le paiement
    const stripeResponse = await stripe.confirmPayment({
      // elements contient les infos et la configuration du paiement
      elements,
      clientSecret,
      // Éventuelle redirection
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      // Bloque la redirections
      redirect: "if_required",
    });

    // Si une erreur a lieu pendant la confirmation
    if (stripeResponse.error) {
      // On la montre au client
      setErrorMessage(stripeResponse.error.message);
    }

    // Si on reçois un status succeeded on fais passer completed à true
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    // On a fini de charger
    setIsLoading(false);
  };
  return completed ? (
    <p>Paiement effectué</p>
  ) : (
    <div
      className="signup-container"
      onClick={() => {
        navigate("/");
      }}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="signup-form"
      >
        <PaymentElement />
        <button type="submit" disabled={!stripe || !elements || isLoading}>
          Pay
        </button>
        {/* Éventuel message d'erreur */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
