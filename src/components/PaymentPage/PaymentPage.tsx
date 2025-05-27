"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePaymentInputs } from "react-payment-inputs";
import { IOrderPost } from "@/interfaces";
import { postByProducts } from "@/api";
import { ordersPage } from "@/constans";

interface PaymentPageProps {
  orderData: IOrderPost;
}

export default function PaymentPage({ orderData }: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create the order
      const response = await postByProducts(orderData);

      if (response) {
        router.push(ordersPage);
      } else {
        setError("Failed to create order");
      }
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Card Number</label>
          <input
            {...getCardNumberProps()}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              {...getExpiryDateProps()}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">CVC</label>
            <input
              {...getCVCProps()}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-greenT text-white py-2 px-4 rounded-md hover:bg-opacity-90 disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
