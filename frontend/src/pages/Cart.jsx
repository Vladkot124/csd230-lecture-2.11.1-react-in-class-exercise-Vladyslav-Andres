import { useCart } from '../provider/cartProvider'

function Cart() {
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalPrice
    } = useCart()

    return (
        <div>
            <h1>Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div
                            key={item.key}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '16px',
                                marginBottom: '12px'
                            }}
                        >
                            <h3>{item.name}</h3>
                            <p>Type: {item.type}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>

                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <button onClick={() => increaseQuantity(item.key)}>+</button>
                                <button onClick={() => decreaseQuantity(item.key)}>-</button>
                                <button onClick={() => removeFromCart(item.key)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    <button onClick={clearCart}>Clear Cart</button>
                </>
            )}
        </div>
    )
}

export default Cart