//importing from react--------------------------------------------------------------------------------------------
import { createContext, useContext, useState, useEffect } from 'react';
// Import Firestore database--------------------------------------------------------------------------------------
import { db } from '../firebase/FirebaseInit';
import { collection, onSnapshot } from "firebase/firestore";
//creating the context--------------------------------------------------------------------------------------------
const ProductContext = createContext();
//implementing the custom hook by the context---------------------------------------------------------------------
function useProductContext() {
    const value = useContext(ProductContext);
    return value;
}
//the context provider--------------------------------------------------------------------------------------------
function ProductContextProvider({children}) {
    const [products, setProducts] =  useState([]);
    const [searchProducts, setSearchProducts] =  useState([]);
    const [scrollPrice, setScrollPrice] = useState(75000);
    const [filterData, setFilterData] = useState('');
    const [gentsFashion,setGentsFashion] = useState(true);
    const [ladisFashion,setLadisFashion] = useState(true);
    const [jewelery, setJewelery] = useState(true);
    const [electronics, setElectronics] = useState(true);
    //get all the products from the fireStore-----------------------------------------------------------------------
    useEffect(() => {
        onSnapshot(collection(db, "products"), (snapShot) =>{
            const products = snapShot.docs.map((doc) => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            setProducts(products);
            setSearchProducts(products);
        })
    },[]);
    
    return(
        <ProductContext.Provider
            value={{products,setProducts,searchProducts,setSearchProducts,scrollPrice,setScrollPrice,
                    filterData,setFilterData,gentsFashion,setGentsFashion,ladisFashion,setLadisFashion,jewelery,setJewelery,
                    electronics,setElectronics}}>
            {children}
        </ProductContext.Provider>
    );
}
//exporting the context-------------------------------------------------------------------------------------------
export {useProductContext};
export default ProductContextProvider;