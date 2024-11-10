import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Initial/Navbar";
import Announcement from "../components/Initial/Announcement";
import Footer from "../components/Initial/Footer";

//component page
import PaymentSelection from "../components/Initial/PaymentSelection";

import PromptPayQR from "../components/Initial/PromptPayQR";
import CreditCardForm from "../components/Initial/CreditCardForm";
// Total Calculator Custom Hook
import useCartTotal from "../hooks/useCartTotal";

const Checkout = () => {
  const [step, setStep] = useState("select");
  const { total, items } = useCartTotal();
  const navigate = useNavigate();

  //function to handle payment kub
  const handlePaymentSubmit = (success) => {
    if (success) {
      navigate("/success");
    } else {
      navigate("/failed");
    }
  };

  const renderStep = () => {
    switch (step) {
      case "select":
        return (
          <PaymentSelection
            onSelectMethod={(method) => setStep(method)}
            total={total}
            items={items}
          />
        );
      case "promptpay":
        return (
          <PromptPayQR
            onBack={() => setStep("select")}
            total={total}
            items={items}
          />
        );
      case "credit":
        return (
          <CreditCardForm
            onBack={() => setStep("select")}
            onSubmit={handlePaymentSubmit}
            total={total}
            items={items}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Announcement />
      <Navbar />
      {renderStep()}
      <Footer />
    </>
  );
};

export default Checkout;
