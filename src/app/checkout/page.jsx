"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Roboto, Oswald } from "next/font/google";
import { CreditCard, Smartphone, Banknote } from "lucide-react";
import { useGetCartQuery } from "@/redux/features/cartApi";
import { useCreateOrderMutation } from "@/redux/features/orderApi";
import { toast } from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Home Page/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cartData } = useGetCartQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const cart = cartData?.data;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
    paymentMethod: "cash_on_delivery",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { notes, paymentMethod, ...shippingAddress } = formData;

      const orderData = {
        shippingAddress,
        paymentMethod,
        notes: notes || undefined,
      };

      const response = await createOrder(orderData).unwrap();

      toast.success("Order placed successfully!");
      router.push(`/orders/${response?.data._id}`);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to place order");
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <h2 className={`${oswald.className} text-3xl text-gray-700 mb-2`}>
              Your cart is empty
            </h2>
            <p className={`${roboto.className} text-gray-500 mb-6`}>
              Add items to cart before checkout
            </p>
            <button
              onClick={() => router.push("/menu")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className={`${oswald.className} text-4xl text-[#642F21] mb-8`}>
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping & Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2
                    className={`${oswald.className} text-2xl text-[#642F21] mb-4`}
                  >
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData?.fullName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors?.fullName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors?.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors?.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData?.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="+880 123 456 7890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData?.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Street address, apartment, suite, etc."
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData?.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Dhaka"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData?.postalCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          errors.postalCode
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="1000"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2
                    className={`${oswald.className} text-2xl text-[#642F21] mb-4`}
                  >
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    {[
                      {
                        value: "cash_on_delivery",
                        label: "Cash on Delivery",
                        icon: Banknote,
                      },
                      {
                        value: "mobile_banking",
                        label: "Mobile Banking (bKash/Nagad)",
                        icon: Smartphone,
                      },
                      {
                        value: "card",
                        label: "Credit/Debit Card",
                        icon: CreditCard,
                      },
                    ].map(({ value, label, icon: Icon }) => (
                      <label
                        key={value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                          formData?.paymentMethod === value
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={value}
                          checked={formData?.paymentMethod === value}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <Icon className="mr-3 text-gray-600" size={24} />
                        <span className="font-semibold">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Order Notes */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2
                    className={`${oswald.className} text-2xl text-[#642F21] mb-4`}
                  >
                    Order Notes (Optional)
                  </h2>
                  <textarea
                    name="notes"
                    value={formData?.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Any special instructions for your order?"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2
                    className={`${oswald.className} text-2xl text-[#642F21] mb-4`}
                  >
                    Order Summary
                  </h2>

                  <div className={`${roboto.className} space-y-3 mb-4`}>
                    {cart.items.map((item) => (
                      <div
                        key={item?._id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item?.foodItem?.foodName} x{item?.quantity}
                        </span>
                        <span className="font-semibold">
                          ${(item?.price * item?.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${cart?.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Delivery</span>
                      <span>
                        {cart?.deliveryFee === 0 ? (
                          <span className="text-green-600 font-semibold">
                            FREE
                          </span>
                        ) : (
                          `$${cart?.deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${cart?.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg mt-6 transition"
                  >
                    {isLoading ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
