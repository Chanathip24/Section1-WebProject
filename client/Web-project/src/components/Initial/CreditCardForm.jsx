import React from 'react'
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import OrderSummary from './OrderSummary';
const CreditCardForm = ({ onBack, onSubmit, total, items }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    
    //จะเทสด้วยการ ถ้าใส่เลข คี่ failed คู่ success
    const handleSubmit = (e) => {
      e.preventDefault();
      // For testing: if card number ends with odd number, payment fails
      const isSuccess = parseInt(cardNumber.slice(-1)) % 2 === 0;
      onSubmit(isSuccess);
    };
  
    return (
      <div className="min-h-screen bg-zinc-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <h2 className="text-2xl font-bold text-center mb-6">Credit Card Payment</h2>
          
          <div className="mb-6 p-4 bg-zinc-50 rounded-lg">
            <p className="text-center font-semibold">Amount to Pay</p>
            <p className="text-center text-2xl text-green-600 font-bold">฿{total.toLocaleString()}</p>
          </div>
  
          <OrderSummary items={items} total={total} />
  
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="4242 4242 4242 4242"
                maxLength="16"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Pay ฿{total.toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    );
  };

export default CreditCardForm