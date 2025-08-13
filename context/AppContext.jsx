'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const { user } = useUser()
    const { getToken } = useAuth();

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 30; // Constant for products per page

    // Calculate paginated products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const fetchProductData = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message || "Failed to fetch products");
            }
        } catch (error) {
            toast.error(error.message);
            console.error("Error fetching products:", error);
        }
    }

    const fetchUserData = async () => {
        try {
            if (user.publicMetadata.role === "seller") {
                setIsSeller(true)
            }

            const token = await getToken();
            const { data } = await axios.get('/api/user/data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems || {});
            }
            else {
                toast.error(data.message || "Failed to fetch user data");
            }

        }
        catch (error) {
            toast.error(error.message)
            console.error("Error fetching user data:", error);
        }
    }

    const addToCart = async (itemId, warnIfExists = false) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        if (warnIfExists) {
            toast.error("Item already in cart");
            return;
        }
        // In cart page or quantity increase scenario → increment
        cartData[itemId] += 1;
    } else {
        cartData[itemId] = 1;
    }

    setCartItems(cartData);

    if (user) {
        try {
            const token = await getToken();
            await axios.post('/api/cart/update', { cartData }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Item added to cart");
        } catch (error) {
            console.error("Error updating cart:", error);
            toast.error("Failed to update cart");
        }
    }
};

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
         if (user) {
            try{
                const token = await getToken();
                const { data } = await axios.post('/api/cart/update', { cartData }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                toast.success("Cart updated successfully");
            } catch (error) {
                console.error("Error updating cart:", error);
                toast.error("Failed to update cart");
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if (user) {
            fetchUserData()
        }
        
    }, [user])

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        paginatedProducts, productsPerPage, currentPage, setCurrentPage // Export new pagination values
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}