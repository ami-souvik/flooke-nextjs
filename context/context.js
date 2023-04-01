import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import config from '../firebaseConfig';

export const FirebaseRealtimeDB = createContext(null);

const DBContext = ({ children }) => {
  initializeApp(config);
  const db = getDatabase();
  const [edibles, setEdibles] = useState(null);
  const [orders, setOrders] = useState(null);

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
      if(snapshot.exists()) {
        const data = snapshot.val();
        setOrders(data);
      }
      else {
        console.log('error occurred retrieving active orders');
      }
    });
  }, []);
  
  return (
    <FirebaseRealtimeDB.Provider value={{
      edibles,
      orders,
      addToPastOrder: (table) => {
        set(ref(db, '/collections/sandbox1/onlyContent/processedOrders/' + new Date().toISOString()), orders[table]);
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