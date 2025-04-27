import { create } from "zustand";

type CartProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type CartStore = {
  cart: CartProduct[];
  setCart: (products: CartProduct[]) => void;
  productInCart: (id: number) => CartProduct | undefined;
  addToCart: (product: CartProduct) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalQuantity: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  setCart: (products: CartProduct[]) => {
    set({ cart: products });
  },
  productInCart: (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any = useCartStore
      .getState()
      .cart.find((i: CartProduct) => i.id === id);

    return item;
  },
  addToCart: (product: CartProduct) => {
    set((state) => {
      const item = state.cart.find((i: CartProduct) => i.id === product.id);
      if (!item) {
        const updatedCart = [...state.cart, { ...product }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }
      return { cart: state.cart };
    });
  },
  incrementQuantity: (id: number) => {
    set((state) => {
      const item = state.cart.find((i: CartProduct) => i.id === id);
      if (item) {
        const updatedCart = state.cart.map((i: CartProduct) => {
          if (i.id === id) {
            if (i.quantity < 20) {
              return { ...i, quantity: i.quantity + 1 };
            }
          }
          return i;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }
      return { cart: state.cart };
    });
  },
  decrementQuantity: (id: number) => {
    set((state) => {
      const item = state.cart.find((i: CartProduct) => i.id === id);
      if (item) {
        const updatedCart = state.cart.map((i: CartProduct) => {
          if (i.id === id) {
            if (i.quantity > 1) {
              return { ...i, quantity: i.quantity - 1 };
            }
          }
          return i;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }
      return { cart: state.cart };
    });
  },
  removeFromCart: (id: number) => {
    set((state) => {
      const updatedCart = state.cart.filter((i: CartProduct) => i.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
  getTotalQuantity: () => {
    const state = useCartStore.getState();
    const totalQuantity: number = state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return totalQuantity;
  },
  clearCart: () => {
    set(() => {
      localStorage.setItem("cart", JSON.stringify([]));
      return { cart: [] };
    });
  },
}));
