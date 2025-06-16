"use client";

import React, { useState } from "react";
import { IOrderPost } from "@/interfaces";
import { usePaymentInputs } from "react-payment-inputs";

interface ValidationErrors {
  cardNumber?: string;
  expiryDate?: string;
  cvc?: string;
}

interface PaymentPageProps {
  orderData: IOrderPost;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentPage({
  orderData,
  onSuccess,
  onError,
}: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [formValues, setFormValues] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const { getCardNumberProps } = usePaymentInputs();

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(" ").substr(0, 19);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (field: string) => {
    validateField(field);
  };

  const validateField = (field: string) => {
    let error = "";

    switch (field) {
      case "cardNumber":
        if (!formValues.cardNumber) {
          error = "Введите номер карты";
        } else if (formValues.cardNumber.replace(/\s/g, "").length !== 16) {
          error = "Номер карты должен содержать 16 цифр";
        }
        break;
      case "expiryDate":
        if (!formValues.expiryDate) {
          error = "Введите срок действия карты";
        } else {
          const [month, year] = formValues.expiryDate.split("/");
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear() % 100;
          const currentMonth = currentDate.getMonth() + 1;

          if (!month || !year) {
            error = "Неверный формат даты";
          } else {
            const monthNum = parseInt(month);
            const yearNum = parseInt(year);

            if (
              monthNum < 1 ||
              monthNum > 12 ||
              yearNum < currentYear ||
              (yearNum === currentYear && monthNum < currentMonth)
            ) {
              error = "Неверная дата";
            }
          }
        }
        break;
      case "cvc":
        if (!formValues.cvc) {
          error = "Введите CVC код";
        } else if (formValues.cvc.length !== 3) {
          error = "CVC код должен содержать 3 цифры";
        }
        break;
    }

    setValidationErrors((prev: ValidationErrors) => ({
      ...prev,
      [field]: error,
    }));

    return !error;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + " / " + value.slice(2, 4);
    }
    handleInputChange("expiryDate", value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      // Проверяем все поля перед отправкой
      const isCardNumberValid = validateField("cardNumber");
      const isExpiryDateValid = validateField("expiryDate");
      const isCvcValid = validateField("cvc");

      if (!isCardNumberValid || !isExpiryDateValid || !isCvcValid) {
        throw new Error("Пожалуйста, исправьте ошибки в форме");
      }

      // Здесь будет логика обработки платежа
      // В случае успеха:
      onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Произошла ошибка при обработке платежа";
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Оплата заказа</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Номер карты
          </label>
          <div className="relative">
            <input
              {...getCardNumberProps({
                onChange: (e) => {
                  const formatted = formatCardNumber(e.target.value);
                  handleInputChange("cardNumber", formatted);
                },
                onBlur: () => handleBlur("cardNumber"),
                value: formValues.cardNumber,
              })}
              className={`w-full px-4 py-3 border ${
                validationErrors.cardNumber
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-greenT`}
              placeholder="0000 0000 0000 0000"
            />
            {validationErrors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors.cardNumber}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Срок действия
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={7}
                placeholder="ММ / ГГ"
                value={formValues.expiryDate}
                onChange={handleExpiryChange}
                onBlur={() => handleBlur("expiryDate")}
                className={`w-full px-4 py-3 border ${
                  validationErrors.expiryDate
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-greenT`}
              />
              {validationErrors.expiryDate && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.expiryDate}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={3}
                placeholder="123"
                value={formValues.cvc}
                onChange={(e) => handleInputChange("cvc", e.target.value)}
                onBlur={() => handleBlur("cvc")}
                className={`w-full px-4 py-3 border ${
                  validationErrors.cvc ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-greenT`}
              />
              {validationErrors.cvc && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.cvc}
                </p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-greenT hover:bg-green-600"
          } transition-colors`}
        >
          {isProcessing ? "Обработка..." : "Оплатить"}
        </button>
      </form>
    </div>
  );
}
