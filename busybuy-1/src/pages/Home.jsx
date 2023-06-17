//Import React hooks----------------------------------------------------------------------------------------------
import { useState, useEffect } from 'react';
//import styles---------------------------------------------------------------------------------------------------
import styles from '../styles/HomePage.module.css';
//importing from react-router-dom---------------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
//Import react-snippers for the loading effects-------------------------------------------------------------------
import GridLoader from "react-spinners/GridLoader";
//importing from the context--------------------------------------------------------------------------------------
import { useProductContext } from '../context/ProductContext';
import { useAuthenticate } from "../context/AuthContext";
import { useCartContext } from '../context/CartContext';
//import from react-toastify--------------------------------------------------------------------------------------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import Firestore database--------------------------------------------------------------------------------------
import {db} from '../firebase/FirebaseInit';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
//Creating the Home components------------------------------------------------------------------------------------
function Home(){
    const [loading, setLoading] = useState(false);
    const {products,setProducts,searchProducts,scrollPrice,setScrollPrice,
            filterData,setFilterData,gentsFashion,setGentsFashion,ladisFashion,setLadisFashion,jewelery,setJewelery,
            electronics,setElectronics} = useProductContext();
    const {cart,setCart,total,setTotal} = useCartContext();
    const {userID,userAuthentication} = useAuthenticate();
    const navigate = useNavigate();
    const collectionName = "cart" + userID;
  //set timers for the loading effect onpage load------------------------------------------------------------------
    useEffect(()=> {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500);
    },[]);
    //changing the price on slider move-----------------------------------------------------------------------------
    const changePrice = (e) => {
        if(e.target.value > 0){
            setProducts(searchProducts);
        }
        const resProd = searchProducts.filter(item=> item.price<e.target.value)
        setProducts(resProd);
        setScrollPrice(e.target.value);
    };
    //search products using input box--------------------------------------------------------------------------------
    const handleSearch = (e) => {
        if(e.target.value === '') {
            setProducts(searchProducts);
        }else {
            const filteredResult = searchProducts.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setProducts(filteredResult);
        }
        setFilterData(e.target.value)
    };
    //Search By Category----------------------------------------------------------------------------------------------
    const handleSearchByCategory = (e) => {
        if(e === "gentsFashion") {
            document.getElementById('ladisFashion').checked = false;
            document.getElementById('jewelery').checked = false;
            document.getElementById('electronics').checked = false;
            setProducts(searchProducts);
            if(gentsFashion === true) {
                const filteredResult = searchProducts.filter(item => item.category.toLowerCase().includes(e.toLowerCase()));
                setProducts(filteredResult);
            }
            setGentsFashion(!gentsFashion);
        } 
        if(e === "ladisFashion") {
            document.getElementById('gentsFashion').checked = false;
            document.getElementById('jewelery').checked = false;
            document.getElementById('electronics').checked = false;
            setProducts(searchProducts);
            if(ladisFashion === true) {
                const filteredResult = searchProducts.filter(item => item.category.toLowerCase().includes(e.toLowerCase()));
                setProducts(filteredResult);
            }
            setLadisFashion(!ladisFashion);
        } 
        if(e === "jewelery") {
            document.getElementById('gentsFashion').checked = false;
            document.getElementById('ladisFashion').checked = false;
            document.getElementById('electronics').checked = false;
            setProducts(searchProducts);
            if(jewelery === true) {
                const filteredResult = searchProducts.filter(item => item.category.toLowerCase().includes(e.toLowerCase()));
                setProducts(filteredResult);
            }
            setJewelery(!jewelery);
        } 
        if(e === "electronics") {
            document.getElementById('gentsFashion').checked = false;
            document.getElementById('ladisFashion').checked = false;
            document.getElementById('jewelery').checked = false;
            setProducts(searchProducts);
            if(electronics === true) {
                const filteredResult = searchProducts.filter(item => item.category.toLowerCase().includes(e.toLowerCase()));
                setProducts(filteredResult);
            }
            setElectronics(!electronics);
        }
    }
    //Add to cart functionality--------------------------------------------------------------------------------------
    const handleCart = async(id,category,name,price,image) => {
        if(!userAuthentication){
            navigate("/signin");
        }else {
            handleAddToCart({id,category,name,price,image});
        }
    }
    //add to cart component functionality----------------------------------------------------------------------------
    const handleAddToCart = async(prod) => {

        const index = cart.findIndex((item) => item.id === prod.id);

        if (index === -1) {
            setCart([...cart, { ...prod, qty: 1 }]);
            setTotal(parseInt(total) + parseInt(prod.price));

            await setDoc(doc(db, collectionName, userID + prod.id), {
                id: prod.id,
                category: prod.category,
                name: prod.name,
                price: prod.price,
                image: prod.image,
                qty: 1,
                addedOn: new Date()
              });
              toast.success('Product Added Successfully!');

        } else {
            cart[index].qty++;
            setCart(cart);
            setTotal(parseInt(total) + parseInt(cart[index].price));

            const updateDocRef = doc(db, collectionName, userID + prod.id)
            updateDoc(updateDocRef, {
                qty: cart[index].qty
            }).then(()=> {
                console.log("seccessfully updated");
            })
            toast.success('Increase product count!');
        }
    }
    //implementing the UI--------------------------------------------------------------------------------------------
    return (
        <>
        <div className={styles.homePage_Container}>
        {
            loading?//checking if loader is loading------------------------------------------------------------------
            <div style={{marginTop:"300px"}}>
                <GridLoader
                    color={'#7064e5'}
                    loading={loading}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            ://after the page loader the page will be displayed------------------------------------------------------
            <>
            {/* --------------------creating the side fixed panel for the category------------------------------- */}
            <aside className={styles.Sidebar_Container}>
                <h2>Filter</h2>
                <form>
                    <label htmlFor="price">Price: {`${scrollPrice}`}</label>
                    <input type="range" 
                        className={styles.priceRange} 
                        id="price" 
                        name="price" 
                        min="1" 
                        max="100000" 
                        step="10" 
                        defaultValue="75000"
                        onChange={changePrice}/>
                    <h2>Category</h2>
                    <div >
                        <div className={styles.checkBox_Container}>
                            <input className={styles.larger} 
                                value="gentsFashion" 
                                onChange={()=> handleSearchByCategory("gentsFashion")}
                                type="checkbox" 
                                id="gentsFashion" 
                                name="gentsFashion"/>&nbsp;
                            <label htmlFor="gentsFashion">Men's Clothing</label>
                        </div>
                        <div className={styles.checkBox_Container}>
                            <input className={styles.larger} 
                                value="ladisFashion" 
                                onChange={()=> handleSearchByCategory("ladisFashion")}
                                type="checkbox" 
                                id="ladisFashion" 
                                name="ladisFashion"/>&nbsp;
                            <label htmlFor="ladisFashion">Women's Clothing</label>
                        </div>
                        <div className={styles.checkBox_Container}>
                            <input className={styles.larger} 
                                value="jewelery" 
                                onChange={()=> handleSearchByCategory("jewelery")}
                                type="checkbox" 
                                id="jewelery" 
                                name="jewelery"/>&nbsp;
                            <label htmlFor="jewelery">Jewelery</label>
                        </div>
                        <div className={styles.checkBox_Container}>
                            <input className={styles.larger} 
                                value="electronics" 
                                onChange={()=> handleSearchByCategory("electronics")}
                                type="checkbox" 
                                id="electronics" 
                                name="electronics"/>&nbsp;
                            <label htmlFor="electronics">Electronics</label>
                        </div>
                    </div>
                </form>
            </aside>
            {/* ---------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------the search box-------------------------------------------- */}
            <div className={styles.Search_form}>
                <input type="search" 
                placeholder="Search By Name" 
                className={styles.searchInput} 
                defaultValue={filterData} 
                onChange={(e)=> handleSearch(e)}/>
            </div>
            {/* ---------------------------------------------------------------------------------------------- */}
            {/* ------------------loading the product details from the Products Components-------------------- */}
            <div className={styles.Product_Grid}>
                {products.map((prod,i) => (
                    <div className={styles.Product_Container} key={i}>
                    <div className={styles.ProductImage_Container}>
                        <img src={prod.image}
                            alt="Product" 
                            width="100%" 
                            height="100%"/>
                    </div>
                    <div className={styles.Product_Details}>
                        <div className={styles.Product_Name}>
                            <p>{prod.name}</p>
                        </div>
                        <div className={styles.Product_Options}>
                            <p>₹ {prod.price}</p>
                        </div>
                        <button className={styles.ProductAdd_Button} 
                            title="Add to Cart"
                            onClick={()=> handleCart
                            (prod.id,prod.category,prod.name,prod.price,prod.image)}>
                                Add To Cart
                        </button>
                    </div>
                </div>
                ))}
            </div>            
            {/* ---------------------------------------------------------------------------------------------- */}
            </>
        }
        </div>
        <ToastContainer/>
        </>
    );
}

export default Home;