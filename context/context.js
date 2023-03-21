import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import config from '../firebaseConfig';

export const FirebaseRealtimeDB = createContext(null);

const DBContext = ({ children }) => {
  initializeApp(config);
  const db = getDatabase();
  const [edibles, setEdibles] = useState({});
  const [orders, setOrders] = useState({});

  useEffect(() => {
    onValue(ref(
      db, 'collections/thepseudoengineers/freeData/edibleItems'
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
      db, 'collections/thepseudoengineers/freeData/activeOrders'
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
      orders
    }}>
      {children}
    </FirebaseRealtimeDB.Provider>
  );
}

export default DBContext;