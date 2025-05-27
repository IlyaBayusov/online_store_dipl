"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePaymentInputs } from "react-payment-inputs";
import { IOrderPost } from "@/interfaces";
import { postByProducts } from "@/api";
import { ordersPage } from "@/constans";
import { useCartStore } from "@/stores/useCartStore";

interface PaymentPageProps {
  orderData: IOrderPost;
}

interface ValidationErrors {
  cardNumber?: string;
  expiryDate?: string;
  cvc?: string;
}

interface FormValues {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

export default function PaymentPage({ orderData }: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [formValues, setFormValues] = useState<FormValues>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const router = useRouter();
  const { cart, updatedDataInCart } = useCartStore();

  // Проверяем способ оплаты при монтировании компонента
  useEffect(() => {
    if (orderData.orderDetailsRequest.paymentMethod !== "CARD") {
      router.push("/cart");
    }
  }, [orderData.orderDetailsRequest.paymentMethod, router]);

  const { getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(" ").substr(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Убираем все нецифровые символы
    const numbers = value.replace(/\D/g, "");

    // Ограничиваем до 4 цифр
    const month = numbers.substring(0, 2);
    const year = numbers.substring(2, 4);

    // Если есть только месяц, добавляем слэш
    if (month && !year) {
      return month + " / ";
    }
    // Если есть и месяц и год
    if (month && year) {
      return month + " / " + year;
    }
    // Если ничего нет, возвращаем как есть
    return month;
  };

  const validateExpiryDate = (expiryDate: string): string | undefined => {
    if (!expiryDate) {
      return "Введите срок действия карты";
    }

    // Убираем все пробелы из строки
    const cleanExpiryDate = expiryDate.replace(/\s/g, "");

    // Проверяем базовый формат ММ/ГГ
    if (!/^\d{2}\/\d{2}$/.test(cleanExpiryDate)) {
      return "Используйте формат ММ/ГГ";
    }

    const [monthStr, yearStr] = cleanExpiryDate.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Получаем последние 2 цифры текущего года
    const currentMonth = currentDate.getMonth() + 1; // Месяцы в JS начинаются с 0

    // Проверка месяца
    if (month < 1 || month > 12) {
      return "Неверный месяц (от 01 до 12)";
    }

    // Проверка года
    if (year < currentYear) {
      return "Карта просрочена";
    }

    // Если год текущий, проверяем месяц
    if (year === currentYear && month < currentMonth) {
      return "Карта просрочена";
    }

    // Проверяем, что срок действия не более 10 лет
    if (year > currentYear + 10) {
      return "Неверный год";
    }

    return undefined;
  };

  const validateField = (name: keyof FormValues, value: string) => {
    const errors: ValidationErrors = { ...validationErrors };

    switch (name) {
      case "cardNumber":
        if (!value || value.replace(/\s/g, "").length !== 16) {
          errors.cardNumber = "Введите корректный номер карты (16 цифр)";
        } else {
          delete errors.cardNumber;
        }
        break;

      case "expiryDate":
        const expiryError = validateExpiryDate(value);
        if (expiryError) {
          errors.expiryDate = expiryError;
        } else {
          delete errors.expiryDate;
        }
        break;

      case "cvc":
        if (!value || !/^\d{3}$/.test(value)) {
          errors.cvc = "Введите корректный CVC код (3 цифры)";
        } else {
          delete errors.cvc;
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleInputChange = (name: keyof FormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpiryChange = (e: { target: { value: string } }) => {
    const formatted = formatExpiryDate(e.target.value);
    handleInputChange("expiryDate", formatted);
  };

  const handleBlur = (name: keyof FormValues) => {
    validateField(name, formValues[name]);
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (
      !formValues.cardNumber ||
      formValues.cardNumber.replace(/\s/g, "").length !== 16
    ) {
      errors.cardNumber = "Введите корректный номер карты (16 цифр)";
    }

    const expiryError = validateExpiryDate(formValues.expiryDate);
    if (expiryError) {
      errors.expiryDate = expiryError;
    }

    if (!formValues.cvc || !/^\d{3}$/.test(formValues.cvc)) {
      errors.cvc = "Введите корректный CVC код (3 цифры)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // Обновляем данные заказа с актуальным количеством товаров из корзины
      const updatedOrderData = {
        ...orderData,
        orderItemRequest: cart,
      };

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await postByProducts(updatedOrderData);

      if (response) {
        router.push(ordersPage);
        // Очищаем корзину после успешного создания заказа
        updatedDataInCart([], {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          pageSize: 10, // Добавляем стандартный размер страницы
        });
      } else {
        setError("Не удалось создать заказ");
      }
    } catch {
      setError("Ошибка при оплате. Пожалуйста, попробуйте снова.");
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
              } rounded-lg focus:ring-2 focus:ring-greenT focus:border-transparent transition-colors`}
              placeholder="0000 0000 0000 0000"
              autoComplete="cc-number"
            />
            {validationErrors.cardNumber && (
              <p className="mt-1 text-xs text-red-500">
                {validationErrors.cardNumber}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Срок действия
            </label>
            <div className="relative">
              <input
                {...getExpiryDateProps({
                  onChange: handleExpiryChange,
                  onBlur: () => handleBlur("expiryDate"),
                  value: formValues.expiryDate,
                })}
                className={`w-full px-4 py-3 border ${
                  validationErrors.expiryDate
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-greenT focus:border-transparent transition-colors`}
                placeholder="ММ / ГГ"
                autoComplete="cc-exp"
                maxLength={7}
              />
              {validationErrors.expiryDate && (
                <p className="mt-1 text-xs text-red-500">
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
                {...getCVCProps({
                  onChange: (e) => handleInputChange("cvc", e.target.value),
                  onBlur: () => handleBlur("cvc"),
                  value: formValues.cvc,
                })}
                className={`w-full px-4 py-3 border ${
                  validationErrors.cvc ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-greenT focus:border-transparent transition-colors`}
                placeholder="123"
                autoComplete="cc-csc"
                maxLength={3}
              />
              {validationErrors.cvc && (
                <p className="mt-1 text-xs text-red-500">
                  {validationErrors.cvc}
                </p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-greenT text-white py-3 px-4 rounded-lg hover:bg-opacity-90 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                   transform hover:scale-[1.02] active:scale-[0.98] font-medium text-base"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Обработка платежа...</span>
            </div>
          ) : (
            "Оплатить"
          )}
        </button>
      </form>
    </div>
  );
}
