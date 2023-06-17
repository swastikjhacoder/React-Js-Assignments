//Import React hooks----------------------------------------------------------------------------------------------
import { useState, useEffect } from 'react';
//import styles---------------------------------------------------------------------------------------------------
import styles from '../styles/Cart.module.css';
//Import react-snippers for the loading effects-------------------------------------------------------------------
import GridLoader from "react-spinners/GridLoader";
// Import Firestore database--------------------------------------------------------------------------------------
import { db } from '../firebase/FirebaseInit';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore"; 
//importing from the context--------------------------------------------------------------------------------------
import { useAuthenticate } from "../context/AuthContext";
import { useCartContext } from '../context/CartContext';
import { useMyOrderContext } from '../context/MyOrderContext';
//import from react-toastify--------------------------------------------------------------------------------------
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import from react-router-dom------------------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
//Creating the cart components------------------------------------------------------------------------------------
function Cart() {
    const [loading, setLoading] = useState(false);
    const {userID} = useAuthenticate();
    const {cart,setCart,total,setTotal,cartLoaded,setCartLoaded} = useCartContext();
    const {handlePurchase} =useMyOrderContext();
    const collectionName = "order" + userID;
    const navigate = useNavigate();
    //set timers for the loading effect onpage load---------------------------------------------------------------
    useEffect(()=> {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    },[]);
    //get all the products from the fireStore---------------------------------------------------------------------
    useEffect(() => {
        onSnapshot(collection(db, "cart"+userID), (snapShot) =>{
            const products = snapShot.docs.map((doc) => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            setCart(products);
            if(products.length === 0) {
                setCartLoaded(false);
            }else {
                setCartLoaded(true);
            }
        })
    },[setCart, setCartLoaded, userID]);

    useEffect(()=> {
        let sum=0;
        cartLoaded?
            cart.forEach((item)=> {
                let qnt = item.qty;
                let prc = item.price;
                let tot = qnt*prc;
                sum+=tot;
            })
            :
            console.log("Oopss");
        setTotal(sum);
    })
    //implementing function handleAddPurchase------------------------------------------------------------------------
    const handleAddPurchase = () => {
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        const colDate = `${current.getFullYear()}${current.getMonth()+1}${current.getDate()}${current.getHours()}${current.getMinutes()}${current.getSeconds()}${current.getMilliseconds()}`;
        handlePurchase(date,colDate,collectionName,total,cart);
        handleDeleteCart();
    }
    //deleting cart collection from the firebase---------------------------------------------------------------------
    const handleDeleteCart = () => {
        cart.map(async(products) => {
            const docRef = doc(db, "cart"+userID, userID+products.id);
            await deleteDoc(docRef);
        })
        navigate("/myorders");
    }
    //implementing handleIncreaseQnty function-----------------------------------------------------------------------
    const handleIncreaseQnty = (id,qty) => {
        const updateDocRef = doc(db, "cart"+userID, userID + id)
            updateDoc(updateDocRef, {
                qty: qty+1
            }).then(()=> {
                console.log("seccessfully updated");
            })
    }
    //implementing handleDecreaseQnty function-----------------------------------------------------------------------
    const handleDecreaseQnty = async(id,qty) => {
        if(qty === 1) {
            const docRef = doc(db, "cart"+userID, userID+id);
            await deleteDoc(docRef);
        }else {
            const updateDocRef = doc(db, "cart"+userID, userID + id)
            updateDoc(updateDocRef, {
                qty: qty-1
            }).then(()=> {
                console.log("seccessfully updated");
            })
        }
    }
    //implementing function handleRemoveFromCart---------------------------------------------------------------------
    const handleRemoveFromCart = async(id) => {
        const docRef = doc(db, "cart"+userID, id);
        await deleteDoc(docRef);
        toast.success('Product Removed Successfully!');
    }
    //implementing the UI--------------------------------------------------------------------------------------------
    return(
        <>
        <div className={styles.cartPage_Container}>
            {
                loading?
                <div style={{marginTop:"300px"}}>
                    <GridLoader
                        color={'#7064e5'}
                        loading={loading}
                        size={25}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                :
                <>
                    {cartLoaded?
                        <div>
                            <aside className={styles.CartPage_totalPrice}>
                                <p >TotalPrice:- ₹{total}/-</p>
                                <button className={styles.purchase_Button} onClick={()=> handleAddPurchase()}>Purchase</button>
                            </aside>
                            <div className={styles.Product_Grid}>
                                {cart.map((products,i) => (
                                    <div className={styles.Product_Container} key={i}>
                                        <div className={styles.ProductImage_Container}>
                                            <img src={products.image}
                                                alt="Product" 
                                                width="100%" 
                                                height="100%"/>
                                        </div>
                                        <div className={styles.Product_Details}>
                                            <div className={styles.Product_Name}>
                                                <p>{products.name}</p>
                                            </div>
                                            <div className={styles.Product_Options}>
                                                <p>₹ {products.price}</p>
                                                <div className={styles.quantity_Container}>
                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2WT2rCQBTGf5dwUWuK55D2AIVWeg012rN016J00aX7/rmJEU9h4s6IZeAJocTJm0mmZOEH3yaQ/Hhf3rw3cFELdQNMgR8gAXbiRJ7FQNQk8Bp4A3LgWOEDsAT6daFPQKYA/nUKDH2hz1KBK7RY/cyn0kMNaBGurrznGa8t9q4G/N4g9OS55shoutfVuSR5VrMA0JMnNvB3QPCnDbwJCE5s4LTkhQHuuj3T3U5g8xFX3bmC1wGjXrWyueKA4JENHAUaIPuqAWK0CAB+Rbn4y7rb11vgCqXuG4rcrMVHLbQ4t+teBMwdzUtDz9hNvA/UVAd4kc7UVPnh8k816slq+5IplIlXMhzGmiNzEf+tX262pRCJmsimAAAAAElFTkSuQmCC" alt='-' onClick={()=> handleDecreaseQnty(products.id, products.qty)}/>
                                                        {products.qty}
                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO2WQWrCQBSGv0t0oVXxHFIPIKj0GlWrZ3HXonTRpXutNzHFUxjdNZISeEIIY/Je0iku/OFtwpCP988/bwbuukG1gFdgCwTASSqQbxOg+ZfAR+AdiIC4oM7ACmhXhT4DRwUwWyEwLAudSQdWaLr7aZlOzxWgabi684bS3g7wpLS9rgF/KLu5SLN2oTkykQdwJE5e1dSwfxZwDIzzwF8ewes88N4jOMgDh1fSa5Ur7aEVnPzEqq4V/O3R6t1NhmviEfySB256GiA/RQMk0dID+A3lxe9KtyvtrvRm6wDUUKpnsLzoWhxooem5XfUhkLzRSmmotN1lb5+KegDmkkxNl5+WPdWoIVfbRqbQUWonw2GkOTJ38d/6BZ8CjheXznrAAAAAAElFTkSuQmCC" alt='+'  onClick={()=> handleIncreaseQnty(products.id, products.qty)}/>
                                                </div>
                                            </div>
                                            <button className={styles.ProductRemove_Button} 
                                                title="Remove From Cart"
                                                onClick={()=> handleRemoveFromCart(userID+products.id)}>
                                                    Remove From Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div> 
                        </div>
                        :
                        <div style={{textAlign:"left", alignItems:"start"}}><h1>Cart is empty!</h1> </div>   
                    }  
                </>
            }            
        </div>
        <ToastContainer/>
        </>
    );
}

export default Cart;