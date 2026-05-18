"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
}

interface CartItem {
  _id: string;
  product: CartProduct;
  count: number;
  price: number;
}

interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
}

interface CartContextType {
  cart: CartData | null;
  loading: boolean;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, count: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  refetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  loading: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  totalItems: 0,
  refetchCart: async () => {},
});

const BASE = "https://ecommerce.routemisr.com/api/v1/cart";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const { data } = await axios.get(BASE, { headers: { token } });
      setCart(data.data);
    } catch {
      setCart(null);
    }
  };

  useEffect(() => {
    if (mounted) fetchCart();
  }, [mounted]);

  const addToCart = async (productId: string) => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        BASE,
        { productId },
        { headers: { token } }
      );
      setCart(data.data);
    } catch (error: any) {
      console.error("addToCart error:", error?.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.delete(`${BASE}/${itemId}`, { headers: { token } });
      setCart(data.data);
    } catch (error: any) {
      console.error("removeFromCart error:", error?.response?.data || error?.message);
      await fetchCart(); // ✅ fallback
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, count: number) => {
    const token = getToken();
    if (!token) return;
    if (count <= 0) {
      await removeFromCart(itemId);
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${BASE}/${itemId}`,
        { count },
        { headers: { token } }
      );
      if (data?.data) {
        setCart(data.data); // ✅ لو الـ API رجّع data صح
      } else {
        await fetchCart(); // ✅ fallback لو data.data مش موجود
      }
    } catch (error: any) {
      console.error(
        "updateQuantity error:",
        error?.response?.status,
        error?.response?.data || error?.message
      );
      await fetchCart(); // ✅ fallback في حالة error
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      await axios.delete(BASE, { headers: { token } });
      setCart(null);
    } catch (error: any) {
      console.error("clearCart error:", error?.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cart?.products?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        refetchCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);