import React from "react";

// Order Summary Component
const OrderSummary = ({ items, total }) => (
  <div className="mt-6 border-t pt-4">
    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
    <div className="space-y-2">
      {items.map((item, key) => (
        <div key={key} className="flex justify-between text-sm">
          <span>
            {item.product_name} x {item.quantity}
          </span>
          <span>฿{(item.price * item.quantity).toLocaleString()}</span>
        </div>
      ))}
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between">
          <span>Sub total</span>
          <span>฿{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-bold mt-2 text-lg">
          <span>Total</span>
          <span>฿{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  </div>
);

export default OrderSummary;
