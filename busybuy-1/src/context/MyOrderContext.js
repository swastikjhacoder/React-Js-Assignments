//importing from react--------------------------------------------------------------------------------------------
import { createContext, useContext, useState } from 'react';
// Import Firestore database--------------------------------------------------------------------------------------
import {db} from '../firebase/FirebaseInit';
import { doc, setDoc } from "firebase/firestore";
//creating the context--------------------------------------------------------------------------------------------
const MyOrderContext = createContext();
//implementing the custom hook by the context---------------------------------------------------------------------
function useMyOrderContext() {
    const value = useContext(MyOrderContext);
    return value;
}
//the context provider--------------------------------------------------------------------------------------------
function MyOrderContextProvider({children}) {
    const [order, setOrder] = useState([]);
    const [orderLoaded, setOrderLoaded] = useState(false);

    // implementing handlePurchae method---------------------------------------------------------------------------
    const handlePurchase = async(date,colDate,collectionName,total,cart) => {
        const docData = {
            orderOn: date,
            totalPrice: total,
            orders: cart
        };
        await setDoc(doc(db,collectionName,colDate), docData);
    }

    return(
        <MyOrderContext.Provider
            value={{order,setOrder,orderLoaded,setOrderLoaded,handlePurchase}}>
            {children}
        </MyOrderContext.Provider>
    );
}
//exporting the context-------------------------------------------------------------------------------------------
export {useMyOrderContext};
export default MyOrderContextProvider;