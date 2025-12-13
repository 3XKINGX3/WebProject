import React, { useState, useEffect } from "react";
import "./ProductsCatalog.css";
import { products } from "./productsData";

const ProductsCatalog = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("gameStoreCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("gameStoreCart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { id: productId, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const getCartItemCount = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const product = products.find(p => p.id === item.id);
            return total + (product.price * item.quantity);
        }, 0);
    };

    const clearCart = () => {
        if (window.confirm("Очистить всю корзину?")) {
            setCart([]);
        }
    };

    // Получение иконки в виде текстового символа (временно)
    const getIcon = (iconType) => {
        switch(iconType) {
            case "crown": return "👑";
            case "gem": return "💎";
            default: return "📦";
        }
    };

    return (
        <div className="store-container">
            {/* Каталог товаров */}
            <div className="catalog-section">
                <h1 className="catalog-title">Игровая валюта</h1>
                <p className="catalog-subtitle">Выберите товары для покупки</p>
                
                <div className="products-grid">
                    {products.map(product => {
                        const cartCount = getCartItemCount(product.id);
                        return (
                            <div key={product.id} className={`product-card ${product.bestValue ? "best-value" : ""}`}>
                                <div className={`product-icon ${product.iconClass}`}>
                                    {getIcon(product.icon)}
                                </div>
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="product-price">
                                    <div>
                                        {product.oldPrice && (
                                            <span className="old-price">{product.oldPrice} {product.currency}</span>
                                        )}
                                        <span className="price-amount">{product.price} {product.currency}</span>
                                        {product.pricePerItem && (
                                            <div className="price-per-item">~{product.pricePerItem.toFixed(2)} ₽/шт</div>
                                        )}
                                    </div>
                                    <button
                                        className={`add-to-cart-btn ${cartCount > 0 ? "added" : ""}`}
                                        onClick={() => addToCart(product.id)}
                                    >
                                        {cartCount > 0 ? `✓ В корзине (${cartCount})` : "Добавить в корзину"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Корзина */}
            <div className="cart-section">
                <div className="cart-header">
                    <h2>🛒 Корзина</h2>
                    {cart.length > 0 && (
                        <button className="clear-cart-btn" onClick={clearCart}>
                            Очистить всё
                        </button>
                    )}
                </div>
                
                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart-message">
                            <div className="empty-icon">🛍️</div>
                            <h3>Корзина пуста</h3>
                            <p>Добавьте товары из каталога выше</p>
                        </div>
                    ) : (
                        cart.map(item => {
                            const product = products.find(p => p.id === item.id);
                            const itemTotal = product.price * item.quantity;
                            return (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-info">
                                        <h4>{product.title}</h4>
                                        <p>{product.price} ₽ × {item.quantity}</p>
                                    </div>
                                    <div className="cart-item-controls">
                                        <button 
                                            className="quantity-btn minus"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="item-quantity">{item.quantity}</span>
                                        <button 
                                            className="quantity-btn plus"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <span className="item-price">{itemTotal} ₽</span>
                                        <button 
                                            className="remove-item"
                                            onClick={() => removeFromCart(item.id)}
                                            title="Удалить"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                
                {cart.length > 0 && (
                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Товаров:</span>
                            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                        </div>
                        <div className="summary-row total">
                            <span>Итого:</span>
                            <span className="total-amount">{calculateTotal()} ₽</span>
                        </div>
                        <button className="buy-btn">
                            Перейти к оплате
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsCatalog;