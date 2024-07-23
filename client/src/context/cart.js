import {useState,  useContext, createContext, useEffect} from 'react';

const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const cart = window.localStorage.getItem('cart');
        if(cart){
            setCart(JSON.parse(cart));
        }
    }, [])

    return(
        <CartContext.Provider value={[cart, setCart]} >
            {children}
        </CartContext.Provider>
    )
};

//custom hook

const useCart = () => useContext(CartContext);
export {useCart, CartProvider};

