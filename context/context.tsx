import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import config from '../firebase.config';
import { DATABASE } from "../utils/constantUtils";

export const FirebaseRealtimeDB = createContext(null);

const DBContext = ({ children }) => {
  initializeApp(config);
  const db = getDatabase();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    onValue(ref(
      db, `collections/${DATABASE}/active-orders`
    ), (snapshot) => {
      const data = snapshot.val();
      setOrders(data);
    });
  }, []);
  
  return (
    <FirebaseRealtimeDB.Provider value={{
      orders
    }}>
      {children}
    </FirebaseRealtimeDB.Provider>
  );
}

export default DBContext;