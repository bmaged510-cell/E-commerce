import { CategoryType, ProductType } from "../types/routemisr.type";
import { jwtDecode } from "jwt-decode";

// getAllProducts
export async function getAllProducts(): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

// getSingleProduct
    export async function getSingleProduct(id: string): Promise<ProductType | undefined> {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      );
      const data = await res.json();
      return data.data;
    } catch (error) {
      return undefined;
    }
  }



// getAllCategories
    export async function getAllCategories(): Promise<CategoryType[] | undefined> {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
      const data = await res.json();
      return data.data;
    } catch(error) {
      return undefined;
    }
  }




// getAllBrands
  export async function getAllBrands() {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("getAllBrands error:", error);
    return [];
  }
}


//  Forgot Password 
export async function forgotPassword(email: string): Promise<{ message: string } | undefined> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}

//  Verify Reset Code 
export async function verifyResetCode(resetCode: string): Promise<{ status: string } | undefined> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}

//  Reset Password 
export async function resetPassword(email: string, newPassword: string): Promise<{ token: string } | undefined> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}



//  Create Cash Order 
export async function createCashOrder(
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string }
): Promise<{ status: string; data: any } | undefined> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}




//  Get All Orders =====
export async function getAllOrders(): Promise<any[] | undefined> {
  try {
    const token = localStorage.getItem("token");
    if (!token) return undefined;

    const decoded: { id: string } = jwtDecode(token);
    const userId = decoded.id;

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      {
        headers: { token },
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}

// createReview
export async function createReview(
  productId: string,
  review: { rating: number; comment: string }
): Promise<any> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify({ rating: review.rating, review: review.comment }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}



//  Get Reviews 
export async function getProductReviews(productId: string): Promise<any[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return undefined;
  }
}

//  Get All Reviews =====
export async function getAllReviews(): Promise<any[] | undefined> {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/reviews",
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return undefined;
  }
}

// getSubCategories
export async function getSubCategories(categoryId: string): Promise<any[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return undefined;
  }
}

// getSubCategory
export async function getSubCategory(subId: string): Promise<any | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${subId}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return undefined;
  }
}



// getSpecificBrand
export async function getSpecificBrand(id: string): Promise<any | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return undefined;
  }
}



//  Update Review =====
export async function updateReview(
  reviewId: string,
  review: { rating: number; comment: string }
): Promise<any> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify(review),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}



//  Delete Review 
export async function deleteReview(reviewId: string): Promise<any> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          token: token || "",
        },
      }
    );
    if (res.status === 204) return { status: "success" };
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}



//  Get Review By Id 
export async function getReviewById(reviewId: string): Promise<any | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    return undefined;
  }
}



//  Create Cash Order v2 =====
export async function createCashOrderV2(
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string }
): Promise<any> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}


//  Create Online Order (Stripe) =====
export async function createOnlineOrder(
  cartId: string,
  shippingAddress: { details: string; phone: string; city: string }
): Promise<any> {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}