import React from "react";
import OrderSummary from "./OrderSummary";
import { QrCode,ArrowLeft,CreditCard } from "lucide-react";
const PaymentSelection = ({ onSelectMethod, total, items }) => {
  return (
    <div className="min-h-screen bg-zinc-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Select Payment Method
        </h1>

        <div className="space-y-4">
          <div className="mb-6 p-4 bg-zinc-50 rounded-lg">
            <p className="text-center font-semibold text-lg">Total Amount</p>
            <p className="text-center text-2xl text-green-600 font-bold">
              ฿{total.toLocaleString()}
            </p>
          </div>

          <OrderSummary items={items} total={total} />

          <button
            onClick={() => onSelectMethod("promptpay")}
            className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex items-center space-x-3">
              <QrCode className="w-6 h-6 text-blue-500" />
              <span className="font-medium">PromptPay QR</span>
            </div>
            <ArrowLeft className="w-5 h-5 transform rotate-180" />
          </button>

          
        </div>
      </div>
    </div>
  );
};

export default PaymentSelection;
