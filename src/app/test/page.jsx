"use client";

import { useEffect } from "react";

export default function RazorpayButton() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    const res = await fetch("/api/create-order", { method: "POST" });
    const data = await res.json();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Test Transaction",
      description: "Test payment ₹500",
      order_id: data.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Pay ₹500
    </button>
  );
}
