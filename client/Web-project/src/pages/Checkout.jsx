import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Initial/Navbar";
import Announcement from "../components/Initial/Announcement";
import Footer from "../components/Initial/Footer";
import useFetchData from "../hooks/useFetchData";
//component page
import PaymentSelection from "../components/Initial/PaymentSelection";

import PromptPayQR from "../components/Initial/PromptPayQR";
// Total Calculator Custom Hook
import useCartTotal from "../hooks/useCartTotal";

const Checkout = () => {
  //user data
  const { data: realUser } = useFetchData(
    `${import.meta.env.VITE_API_ROUTE}/user/checklogin`
  );
  const [step, setStep] = useState("select");
  const navigate = useNavigate();
  //total item is state
  const { total, items } = useCartTotal();

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
            id={realUser.id}
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
