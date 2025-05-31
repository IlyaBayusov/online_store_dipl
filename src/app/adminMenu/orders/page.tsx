"use client";

import { getOrdersAdmin } from "@/api";
import Loader from "@/components/Loader/Loader";
import { SORT_OPTIONS_ADMIN, sizePage } from "@/constans";
import { IOrderItems } from "@/interfaces";
import { getPaymentMethod } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface IOrdersResponse {
  currentItems: number;
  totalItems: number;
  data: IOrderItems[];
  totalPages: number;
  currentPage: number;
}

interface OrderDetailsModalProps {
  order: IOrderItems;
  onClose: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoClose className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Заказ #{order.orders[0].orderId}
        </h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Статус заказа</p>
              <p>{order.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Способ оплаты</p>
              <p>{getPaymentMethod(order.paymentMethod)}</p>
            </div>
            <div>
              <p className="text-gray-500">Дата заказа</p>
              <p>{formatDate(order.buysIn)}</p>
            </div>
            <div>
              <p className="text-gray-500">Общая сумма</p>
              <p className="font-semibold">{order.totalPrice} р</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Товары в заказе</h3>
            <div className="space-y-4">
              {order.orders.map((item) => (
                <div
                  key={`${item.orderId}-${item.productId}`}
                  className="flex gap-4 p-2 border rounded-lg"
                >
                  <div className="relative h-[100px] w-[80px] bg-[#F0F0F0] flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={item.image}
                      alt={item.productName}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {item.price} р × {item.quantity} шт.
                    </p>
                    <p className="text-sm mt-1">
                      Итого: {item.price * item.quantity} р
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<IOrderItems[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>(
    SORT_OPTIONS_ADMIN[0].value
  );
  const [selectedOrder, setSelectedOrder] = useState<IOrderItems | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      try {
        const response = await getOrdersAdmin({
          page: currentPage,
          size: sizePage,
          sort: sortOption,
        });

        if (response) {
          const ordersData: IOrdersResponse = response;
          setOrders(ordersData.data);
          setTotalPages(ordersData.totalPages);
          setTotalItems(ordersData.totalItems);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    getOrders();
  }, [currentPage, sortOption]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(0);
  };

  const showElems = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (orders.length) {
      return (
        <table className="w-full text-black text-xs text-center mt-3">
          <thead>
            <tr className="text-greenT text-[10px] uppercase">
              <th>ID</th>
              <th>Общая сумма</th>
              <th>Статус</th>
              <th>Способ оплаты</th>
              <th>Дата заказа</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orders[0].orderId}
                onClick={() => setSelectedOrder(order)}
                className="border-b border-slate-300 text-xs hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-2">{order.orders[0].orderId}</td>
                <td className="py-2">{order.totalPrice} р</td>
                <td className="py-2">{order.status}</td>
                <td className="py-2">
                  {getPaymentMethod(order.paymentMethod)}
                </td>
                <td className="py-2">{formatDate(order.buysIn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <p className="mt-3 text-sm text-center text-[#B3B3B3] font-semibold mb-3">
        Список пуст
      </p>
    );
  };

  return (
    <div className="flex flex-col w-full bg-white">
      <div className="w-full flex gap-3 items-center py-1 bg-white border-b px-3">
        <div className="flex-1 flex items-center gap-2">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-300 text-slate-400 text-sm py-1 px-2 rounded-md"
          >
            {SORT_OPTIONS_ADMIN.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 mb-4 py-1 px-3">
        <button
          className="px-2 py-1 border rounded-md"
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
        >
          <MdOutlineKeyboardDoubleArrowLeft
            className={
              "h-5 w-5 p-px" + (currentPage ? " text-greenT" : " text-gray-400")
            }
          />
        </button>
        <button
          className="px-2 py-1 border rounded-md"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <MdOutlineKeyboardArrowLeft
            className={
              "h-5 w-5 p-px" + (currentPage ? " text-greenT" : " text-gray-400")
            }
          />
        </button>

        <p className="text-greenT text-sm">
          {`${currentPage * sizePage + 1}-${Math.min(
            (currentPage + 1) * sizePage,
            totalItems
          )} из ${totalItems}`}
        </p>

        <button
          className="px-2 py-1 border rounded-md"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <MdOutlineKeyboardArrowRight
            className={
              "h-5 w-5 p-px" +
              (currentPage >= totalPages - 1
                ? " text-gray-400"
                : " text-greenT")
            }
          />
        </button>
        <button
          className="px-2 py-1 border rounded-md"
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <MdOutlineKeyboardDoubleArrowRight
            className={
              "h-5 w-5 p-px" +
              (currentPage >= totalPages - 1
                ? " text-gray-400"
                : " text-greenT")
            }
          />
        </button>
      </div>

      <div className="">{showElems()}</div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
