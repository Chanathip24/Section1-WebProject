import React from 'react'
import { XCircle } from 'lucide-react';
// Failed Component
const Failed = () => {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-500 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">Something went wrong with your payment. Please try again.</p>
          <button 
            onClick={() => window.location.href = '/cart'}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  };

export default Failed