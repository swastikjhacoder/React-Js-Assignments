//importing from react--------------------------------------------------------------------------------------------
import { createContext, useContext, useState } from 'react';
//creating the context--------------------------------------------------------------------------------------------
const CartContext = createContext();
//implementing the custom hook by the context---------------------------------------------------------------------
function useCartContext() {
    const value = useContext(CartContext);
    return value;
}
//the context provider--------------------------------------------------------------------------------------------
function CartContextProvider({children}) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartLoaded,setCartLoaded] = useState(false);

    return(
        <CartContext.Provider
            value={{cart,setCart,total,setTotal,cartLoaded,setCartLoaded}}>
            {children}
        </CartContext.Provider>
    );
}
//exporting the context-------------------------------------------------------------------------------------------
export {useCartContext};
export default CartContextProvider;