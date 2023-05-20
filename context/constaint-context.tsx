import { createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import config from '../firebase.config';
import { DATABASE } from "../utils/constantUtils";

export const ConstraintContext = createContext(null);

const ConstraintProvider = ({ children }) => {
  initializeApp(config);
  const db = getDatabase();
  const [orders, setOrders] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    onValue(ref(
      db, `collections/${DATABASE}/active-orders`
    ), (snapshot) => {
      const data = snapshot.val();
      setOrders(data);
    });
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    });
    return window.removeEventListener('resize', () => {});
  }, [])
  return (
    <ConstraintContext.Provider value={{
      windowHeight,
      windowWidth
    }}>
      {children}
    </ConstraintContext.Provider>
  );
}

export default ConstraintProvider;