import React from "react";
import EmployerSignupForm from "./EmployerSignupForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IeCmuDRBBDh9LMwUd3U4sM5whgWF9kpX9oCLXkgsAsh0CwND3y3unXpIcxwa6qIrnwgcpscPpfUMKUGid8j7fFe00Cj9cTOna"
);

const EmployerSignup = () => {
  return (
    <Elements stripe={stripePromise}>
      <EmployerSignupForm />
    </Elements>



  );
};

export default EmployerSignup;
