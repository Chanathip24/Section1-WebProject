import React from 'react'
import { ArrowLeft,QrCode } from 'lucide-react';
import OrderSummary from './OrderSummary';
const PromptPayQR = ({ onBack, total, items }) => {
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
          
          <h2 className="text-2xl font-bold text-center mb-6">PromptPay QR</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg flex justify-center mb-6">
            <QrCode className="w-48 h-48" />
          </div>
          
          <div className="text-center space-y-2">
            <p className="font-medium">Scan with your banking app</p>
            <p className="text-green-600 font-bold text-xl">฿{total.toLocaleString()}</p>
            <p className="text-sm text-gray-400">QR Code expires in 15:00</p>
            <OrderSummary items={items} total={total} />
            <button 
              onClick={() => window.location.href = '/success'} 
              className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    );
  };

export default PromptPayQR