import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import PaymentModal from "./PaymentModal";
import { assets } from "@/assets/assets";
import Image from "next/image";


const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [onlinePaymentType, setOnlinePaymentType] = useState(null);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {

      const token = await getToken()
      const { data } = await axios.get("/api/user/get-address",
        {headers:
        {Authorization: `Bearer ${token}`}
      })

      if (data.success) {
        setUserAddresses(data.addresses)
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0])
        }
        
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address")
      }

      if (paymentMethod === 'online') {
        setShowPaymentModal(true);
        return;
      }

      let cartItemsArray = Object.keys(cartItems).map(
        (key) => ({ product: key, quantity: cartItems[key] }))
      cartItemsArray = cartItemsArray.filter(item => item.quantity > 0)
      
      if (cartItemsArray.length === 0) {
        return toast.error("Cart is empty")
      }
      const token = await getToken()

      const { data } = await axios.post("/api/order/create",
        {
          address: selectedAddress._id,
          items: cartItemsArray,
          paymentMethod
        }, {
          headers:{ Authorization: `Bearer ${token}`}
        }
      )

      if (data.success) {
        toast.success(data.message)
        setCartItems({})
        router.push('/order-placed')
      } else {
        toast.error(data.message)
      }
      
    }catch (error) {
      toast.error(error.message)
    }
  }

  const handleOnlinePaymentSelection = async (type) => {
    setOnlinePaymentType(type);
    setShowPaymentModal(false);
    // Now you can proceed with the order creation with the selected online payment type
    // For now, let's just log it
    console.log("Selected online payment type:", type);
    // In a real application, you would trigger the payment gateway here
    // For demonstration, I'll call createOrder again with the onlinePaymentType set
    // Note: This is a simplified approach. A real implementation would be more robust.
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address")
      }

      let cartItemsArray = Object.keys(cartItems).map(
        (key) => ({ product: key, quantity: cartItems[key] }))
      cartItemsArray = cartItemsArray.filter(item => item.quantity > 0)
      
      if (cartItemsArray.length === 0) {
        return toast.error("Cart is empty")
      }
      const token = await getToken()

      const { data } = await axios.post("/api/order/create",
        {
          address: selectedAddress._id,
          items: cartItemsArray,
          paymentMethod: "online", // Ensure paymentMethod is online
          onlinePaymentType: type // Pass the selected online payment type
        }, {
          headers:{ Authorization: `Bearer ${token}`}
        }
      )

      if (data.success) {
        toast.success(data.message)
        setCartItems({})
        router.push('/order-placed')
      } else {
        toast.error(data.message)
      }
      
    }catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
     fetchUserAddresses(); 
    }
    
  }, [user])

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-red-600 text-white px-9 py-2 rounded-full hover:bg-red-700">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (0.5%)</p>
            <p className="font-medium text-gray-800">{currency}{Math.floor(getCartAmount() * 0.005)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.005)}</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
  <label className="text-base font-semibold uppercase text-gray-700 block mb-3">
    Payment Method
  </label>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Cash on Delivery Option */}
    <div
      onClick={() => setPaymentMethod("cod")}
      className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all duration-300 ${
        paymentMethod === "cod"
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        id="cod"
        value="cod"
        checked={paymentMethod === "cod"}
        onChange={() => setPaymentMethod("cod")}
        className="hidden"
      />
      <div className="w-10 h-10 flex items-center justify-center rounded-full  text-blue-600">
        💵
      </div>
      <label htmlFor="cod" className="cursor-pointer font-medium text-gray-700">
        Cash on Delivery
      </label>
    </div>

    {/* Lipa Na Mpesa Option */}
    <div
      onClick={() => setPaymentMethod("lipa na mpesa")}
      className={`cursor-pointer border rounded-xl p-4 flex flex-col gap-3 transition-all duration-300 ${
        paymentMethod === "lipa na mpesa"
          ? "border-green-500 bg-green-50 shadow-md"
          : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="paymentMethod"
          id="lipa na mpesa"
          value="lipa na mpesa"
          checked={paymentMethod === "lipa na mpesa"}
          onChange={() => setPaymentMethod("lipa na mpesa")}
          className="hidden"
        />
        <Image src={assets.lipanampesa} alt="Lipa Na Mpesa" className="w-10 h-10 object-scale-up" />
        <label htmlFor="lipa na mpesa" className="cursor-pointer font-medium text-gray-700">
          Lipa Na Mpesa
        </label>
      </div>
      {paymentMethod === "lipa na mpesa" && (
        <div className="flex flex-col gap-2">
          <p
            type="text"
            placeholder="Paybill Number"
            className="w-full outline-none p-2.5 text-gray-800 border font-medium"
          >PAYBILL NUMBER: 247247</p>
          <p
            type="text"
            placeholder="Account Number"
            className="w-full outline-none p-2.5 text-gray-800 border font-medium"
          >ACCOUNT NUMBER: 1440182861684</p>
        </div>
      )}
    </div>
  </div>
</div>


      <button onClick={createOrder} className="rounded-full w-full bg-red-600 text-white py-3 mt-5 hover:bg-red-700">
        Place Order
      </button>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSelectPaymentType={handleOnlinePaymentSelection}
      />
    </div>
  );
};

export default OrderSummary;