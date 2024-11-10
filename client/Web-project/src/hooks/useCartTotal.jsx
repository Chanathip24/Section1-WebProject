import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const useCartTotal = () => {
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedCart = localStorage.getItem('cart');
      if (!storedCart) {
        navigate('/cart');
        return;
      }
  
      try {
        const cartItems = JSON.parse(storedCart);
        setItems(cartItems);
        const calculatedTotal = cartItems.reduce(
          (sum, item) => sum + (item.price * item.quantity),
          0
        );
        setTotal(calculatedTotal);
      } catch (error) {
        console.error('Error parsing cart:', error);
        navigate('/cart');
      }
    }, [navigate]);
  
    return { total, items };
  };
export default useCartTotal;