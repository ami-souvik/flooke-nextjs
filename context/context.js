import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import config from '../firebaseConfig';
import { getDatestamp } from "../utils/helperUtils";

export const FirebaseRealtimeDB = createContext(null);

const getTimestamp = () => {
  // 2023|04|02::21:52:25
  var today = new Date
  return `${getDatestamp()}::${today.toLocaleTimeString()}`
}

const DBContext = ({ children }) => {
  initializeApp(config);
  const db = getDatabase();
  const [edibles, setEdibles] = useState(null);
  const [orders, setOrders] = useState(null);
  const [pastOrders, setPastOrders] = useState({});

  useEffect(() => {
    onValue(ref(
      db, 'collections/sandbox1/freeData/edibleItems'
    ), (snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.val();
        setEdibles(data);
      }
      else {
        console.log('error occurred retrieving edibles');
      }
    });
  
    onValue(ref(
      db, 'collections/sandbox1/freeData/activeOrders'
    ), (snapshot) => {
      // if(snapshot.exists()) {
        const data = snapshot.val();
        setOrders(data);
      // }
      // else {
      //   console.log('error occurred retrieving active orders');
      // }
    });

    onValue(ref(
      db, 'collections/sandbox1/onlyContent/processedOrders'
    ), (snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.val();
        setPastOrders(data);
      }
      else {
        console.log('error occurred retrieving processedOrders');
      }
    });
  }, []);
  
  return (
    <FirebaseRealtimeDB.Provider value={{
      edibles,
      orders,
      pastOrders,
      addToPastOrder: (table) => {
        const ordersClone = JSON.parse( JSON.stringify(orders[table]) )
        ordersClone.orderedDate = getDatestamp()
        ordersClone.orderedDateString = getTimestamp()
        set(ref(getDatabase(), '/collections/sandbox1/onlyContent/processedOrders/' + getTimestamp()), ordersClone);
      },
      deleteTable: (table) => {
        confirm("Are you sure you want to delete the order?")
          && set(ref(db, '/collections/sandbox1/freeData/activeOrders/' + table), null);
      }
    }}>
      {children}
    </FirebaseRealtimeDB.Provider>
  );
}

export default DBContext;