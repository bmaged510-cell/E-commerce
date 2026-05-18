"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllOrders } from "@/api/services/routemisr.service";
import { FaBoxOpen, FaShippingFast, FaCheckCircle } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

interface OrderItem {
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
  count: number;
  price: number;
}

interface Order {
  _id: string;
  cartItems: OrderItem[];
  totalOrderPrice: number;
  paymentMethodType: string;
  isDelivered: boolean;
  isPaid: boolean;
  createdAt: string;
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
}

const statusConfig = {
  delivered: {
    icon: <FaCheckCircle className="text-green-500 text-xl" />,
    label: "Delivered",
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
  },
  shipped: {
    icon: <FaShippingFast className="text-blue-500 text-xl" />,
    label: "On The Way",
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  pending: {
    icon: <FaBoxOpen className="text-yellow-500 text-xl" />,
    label: "Pending",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    border: "border-yellow-200",
  },
};

function getOrderStatus(order: Order) {
  if (order.isDelivered) return statusConfig.delivered;
  if (order.isPaid) return statusConfig.shipped;
  return statusConfig.pending;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data || []);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-10 w-10 text-[#16A34A]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="text-gray-400 text-sm">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <FaBoxOpen className="text-gray-300 text-7xl" />
        <h2 className="text-xl font-bold text-gray-500">No Orders Yet</h2>
        <p className="text-gray-400 text-sm">You haven&apos;t placed any orders yet.</p>
        <a
          href="/Shop"
          className="mt-2 px-6 py-2.5 bg-[#16A34A] text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <MdDeliveryDining className="text-[#16A34A] text-3xl" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-400 text-sm">{orders.length} order{orders.length > 1 ? "s" : ""} found</p>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const status = getOrderStatus(order);
            return (
              <div key={order._id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400">Order ID</p>
                    <p className="text-sm font-semibold text-gray-700 truncate max-w-50">#{order._id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Payment</p>
                    <p className="text-sm font-medium text-gray-700 capitalize">{order.paymentMethodType}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.bg} ${status.border}`}>
                    {status.icon}
                    <span className={`text-xs font-semibold ${status.text}`}>{status.label}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4 space-y-4">
                  {order.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.product.title}</p>
                        <p className="text-xs text-gray-400">Qty: {item.count}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#16A34A] whitespace-nowrap">
                        {(item.price * item.count).toLocaleString()} EGP
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">📍 </span>
                    {order.shippingAddress?.city} — {order.shippingAddress?.details}
                  </div>
                  <div className="text-base font-bold text-[#16A34A]">
                    Total: {order.totalOrderPrice?.toLocaleString()} EGP
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}