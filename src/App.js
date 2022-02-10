import logo from "./logo.svg";
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {MainAppBar} from "./view/MainAppBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ItemListPage} from "./page/ItemListPage";
import {colors, createTheme, CssBaseline, ThemeProvider, Toolbar} from "@mui/material";
import {CartPage} from "./page/CartPage";
import {LoginPage} from "./page/LoginPage";
import {RegisterPage} from "./page/RegisterPage";
import {app} from "./index";
import {DetailItemPage} from "./page/DetailItemPage";
import {PaymentPage} from "./page/PaymentPage";
import {useTranslation} from "react-i18next";

export const UserContext = createContext(null)

export const ColorModeContext = createContext({
  toggleColorMode: () => {
  }
});

function App() {

  const [user, setUser] = useState(null);
  const [loading ,setLoading] = useState(true)

  const [mode, setMode] = useState(localStorage.getItem("theme") ? "dark" : 'light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              primary: {
                main: "#ffffff"
              },
            }
            : {
            }),
        },
      }),
    [mode],
  );

  useEffect(() =>{
    app.auth().onAuthStateChanged((user)=>{
      setUser(user)
      setLoading(false)
    });
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            {
              loading ?
                <div /> :
                <BrowserRouter>
                  <MainAppBar />
                  <Routes>
                    <Route path={"/"} element={<ItemListPage />} />
                    <Route path={"/cart"} element={<CartPage />} />
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/register"} element={<RegisterPage />} />
                    <Route path={"/item/:id"} element={<DetailItemPage />} />
                    <Route path={"/payment"} element={<PaymentPage />} />
                  </Routes>
                </BrowserRouter>
            }
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
