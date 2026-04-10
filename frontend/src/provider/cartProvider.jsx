import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existing = prev.find((p) => p.key === item.key)
            if (existing) {
                return prev.map((p) =>
                    p.key === item.key ? { ...p, quantity: p.quantity + 1 } : p
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const increaseQuantity = (key) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.key === key ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }

    const decreaseQuantity = (key) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.key === key ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    const removeFromCart = (key) => {
        setCartItems((prev) => prev.filter((item) => item.key !== key))
    }

    const clearCart = () => setCartItems([])

    const totalItems = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    )

    const totalPrice = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cartItems]
    )

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used inside CartProvider')
    }
    return context
}