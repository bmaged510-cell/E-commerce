"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  category: { name: string };
}

interface WishlistContextType {
  wishlist: WishlistProduct[];
  loading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  loading: false,
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  isInWishlist: () => false,
  totalWishlistItems: 0,
});

const BASE = "https://ecommerce.routemisr.com/api/v1/wishlist";

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
  }, []);

  const fetchWishlist = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const { data } = await axios.get(BASE, { headers: { token } });
      setWishlist(data.data || []);
    } catch {
      setWishlist([]);
    }
  };

  useEffect(() => {
    if (mounted) fetchWishlist(); 
  }, [mounted]);

  const addToWishlist = async (productId: string) => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.post(BASE, { productId }, { headers: { token } });
      setWishlist(data.data || []);
    } catch (error: any) {
      console.error("addToWishlist error:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.delete(`${BASE}/${productId}`, { headers: { token } });
      setWishlist(data.data || []);
    } catch (error: any) {
      console.error("removeFromWishlist error:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId: string) =>
    wishlist.some((item) => item._id === productId);

  const totalWishlistItems = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist, totalWishlistItems }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);