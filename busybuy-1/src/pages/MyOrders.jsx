//Import React hooks----------------------------------------------------------------------------------------------
import { useState, useEffect } from 'react';
//import styles---------------------------------------------------------------------------------------------------
import styles from '../styles/MyOrders.module.css';
//importing from the context--------------------------------------------------------------------------------------
import { useMyOrderContext } from '../context/MyOrderContext';
import { useAuthenticate } from "../context/AuthContext";
//Import react-snippers for the loading effects-------------------------------------------------------------------
import GridLoader from "react-spinners/GridLoader";
// Import Firestore database--------------------------------------------------------------------------------------
import { db } from '../firebase/FirebaseInit';
import { onSnapshot,collection } from "firebase/firestore"; 
//importing from react-firebase-hooks/firestore------------------------------------------------------------------
import { useCollectionData } from "react-firebase-hooks/firestore";
//implementing the MyOrders component----------------------------------------------------------------------------
function MyOrders(){
    const [loading, setLoading] = useState(false);
    const {order,setOrder,orderLoaded,setOrderLoaded} = useMyOrderContext();
    const {userID} = useAuthenticate();
    const collectionName = "order" + userID;
    const query = collection(db, collectionName);
    const [docs] = useCollectionData(query);
    //set timers for the loading effect onpage load---------------------------------------------------------------
    useEffect(()=> {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    },[]);
    //get all the orders from the fireStore---------------------------------------------------------------------
    useEffect(() => {
        onSnapshot(collection(db, collectionName), (snapShot) =>{
            const orders = snapShot.docs.map((doc) => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            setOrder(orders);
            console.log(order);
            if(order.length === 0){
                setOrderLoaded(false);
            }else {
                setOrderLoaded(true);
            }                   
        })
    },[collectionName,order,setOrder,setOrderLoaded]);
    //implementing the UI------------------------------------------------------------------------------------------
    return(
        <>
        <div className={styles.Orders_Container}>
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
                <div>
                    <h1>Your Orders</h1>
                    {orderLoaded?
                        docs?.map((doc)=> (
                            <div key={Math.random()}>
                                <div className={styles.divTable} key={Math.random()}>
                                    <h2>Ordered On:- {doc.orderOn}</h2>
                                    <table className={styles.Order_Table} key={Math.random()}>
                                        <thead>
                                            <tr key={Math.random()}>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {doc.orders.map(item => 
                                                <tr key={Math.random()}>{item.name}
                                                    <td>₹ {item.price}</td>
                                                    <td>{item.qty}</td>
                                                    <td>₹ {item.price * item.qty}</td>
                                                </tr>)}
                                        </tbody>
                                        <tr key={Math.random()}  className={styles.OrderTable_totalPrice}>
                                            <td>₹ {doc.totalPrice}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        ))
                        :
                        <div><h1>No orders found!</h1></div>
                    }
                </div>
                </>
            }
        </div>
        </>
    );
}

export default MyOrders;