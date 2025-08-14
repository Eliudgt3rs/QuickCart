import React, { useState } from 'react';
import { toast } from "react-hot-toast";

const PaymentModal = ({ isOpen, onClose, onSelectPaymentType }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  if (!isOpen) return null;

  const handleCardPayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      toast.error("Please fill all card details.");
      return;
    }
    // Simulate card payment
    toast.success("Card payment simulated successfully!");
    onSelectPaymentType('card');
    onClose();
  };

  const handleMpesaPayment = () => {
    toast.success("M-Pesa payment selected!");
    onSelectPaymentType('mpesa');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Payment Method</h2>

        {!selectedOption ? (
          <div className="space-y-4">
            <button
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 transition duration-200 shadow-sm"
              onClick={() => setSelectedOption('card')}
            >
              <img src="/path/to/card-icon.png" alt="Card" className="w-7 h-7 mr-3" />
              Pay with Card
            </button>
            <button
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 transition duration-200 shadow-sm"
              onClick={() => setSelectedOption('mpesa')}
            >
              <img src="/path/to/mpesa-icon.png" alt="M-Pesa" className="w-7 h-7 mr-3" />
              Pay with M-Pesa
            </button>
          </div>
        ) : selectedOption === 'card' ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Card Details</h3>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
              onClick={handleCardPayment}
            >
              Pay Now
            </button>
            <button
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition duration-200 shadow-sm"
              onClick={() => setSelectedOption(null)}
            >
              Back to Options
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">M-Pesa Payment</h3>
            <p className="text-gray-600">Instructions for M-Pesa payment will go here.</p>
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md"
              onClick={handleMpesaPayment}
            >
              Confirm M-Pesa
            </button>
            <button
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition duration-200 shadow-sm"
              onClick={() => setSelectedOption(null)}
            >
              Back to Options
            </button>
          </div>
        )}

        <button
          className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-200 shadow-md"
          onClick={onClose}
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;