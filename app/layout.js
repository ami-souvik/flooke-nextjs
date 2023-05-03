"use client";
import { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, Button } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store/index";
import DBContext from "../context/context";
import '../styles/globals.css'
import '../styles/font-faces.css'
import { AlertUI } from "../components/ui-components/flookeAlert";
import { openFullscreen, closeFullscreen } from "../utils/helperUtils";
import theme from "../styles/theme";

export default function RootLayout({ children }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }   
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <DBContext>
              <ThemeProvider theme={theme}>
                <Button onClick={openFullscreen}>
                  Full Screen
                </Button>
                <Button onClick={closeFullscreen}>
                  Exit Full
                </Button>
                <AlertUI />
                {children}
              </ThemeProvider>
            </DBContext>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
