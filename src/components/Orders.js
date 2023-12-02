import "./Orders.css";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import { useEffect, useState } from "react";
import Order from "./Order";
import { NumericFormat } from "react-number-format"; 


function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Create a reference to the user's orders
      const ordersRef = collection(db, "users", user?.uid, "orders"); // Access the user's orders collection in the database (if it doesn't exist, it will be created) and create a reference to it (if it doesn't exist, it will be created) - the user's orders collection is a subcollection of the users collection
      // Create a query against the collection, ordering by 'created'
      const ordersQuery = query(ordersRef, orderBy("created", "desc")); // Create a query against the orders collection, ordering by 'created' in descending order (newest orders first) - the orders collection is a subcollection of the user's orders collection

      // Listen to the query
      onSnapshot(ordersQuery, (snapshot) => {
        // Listen to the orders query and get a snapshot of the query's results every time the query results change (i.e. when a new order is added) - the snapshot is an object that contains the results of the query
        setOrders(
          // Set the orders to the orders in the snapshot (i.e. the orders in the query results) - the snapshot contains the orders in the query results as an array of objects (each object contains the order's id and data)
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]); // Set the orders to an empty array
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
