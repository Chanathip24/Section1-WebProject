import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, QrCode } from "lucide-react";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";
import toast,{Toaster} from 'react-hot-toast'
const PromptPayQR = ({ id, onBack, total, items }) => {
  const navigate = useNavigate();
  //data to create QR
  const [data, setData] = useState({
    id: import.meta.env.VITE_PROMPTPAY_ID,
    amount: total,
  });
  //base64 qrcode
  const [qrCode, setQR] = useState(null);

  //sent Data
  const [sentData, setSent] = useState({
    user_id: id,
    total_amount: total,
    product: items,
  });

  const createOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/order/addorder`,
        sentData
      );
      toast.success(res.data.msg)
      setTimeout(()=>{
        navigate('/success')
      },1500)
    } catch (error) {
      console.log(error);
      toast.error("Something wrong.")
    }
  };

  //generate qrcode promptpay
  useEffect(() => {
    const generateQR = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_ROUTE}/qrcode/`,
          data
        );
        setQR(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    generateQR();
  }, []);
  return (
    <>
    
      <div className="min-h-screen bg-zinc-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">PromptPay QR </h2>

          <div className="bg-gray-100 p-4 rounded-lg flex justify-center mb-6">
            <img src={qrCode} className="w-48 h-48" alt="" />
          </div>

          <div className="text-center space-y-2">
            <p className="font-medium">Scan with your banking app</p>
            <p className="text-green-600 font-bold text-xl">
              ฿{total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">QR Code expires in 15:00</p>
            <OrderSummary items={items} total={total} />
            <button
              onClick={createOrder}
              className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptPayQR;
