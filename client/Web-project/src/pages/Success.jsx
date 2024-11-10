import React,{useEffect} from 'react'
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Success Component
const Success = () => {
    useEffect(() => {
      localStorage.removeItem('cart');
    }, []);
    const navigate = useNavigate()
  
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-500 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  };

export default Success