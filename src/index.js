import React, {createContext} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import firebase from "firebase";
import {applyMiddleware, createStore} from "redux";
import {logger} from "redux-logger/src";
import {MainReducer} from "./redux/MainReducer";
import {Provider} from "react-redux";
import {initReactI18next} from "react-i18next";
import {en} from "./i18n/en";
import i18n from "i18next";
import {tr} from "./i18n/tr";
import thunk from "redux-thunk";
import {ReactValidatableFormProvider} from "react-validatable-form";
import {createTheme, ThemeProvider} from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyDR86QDBqgl-z7_IrkzlbgyugHyu2Kc-Mo",
  authDomain: "e-commerce-8e746.firebaseapp.com",
  projectId: "e-commerce-8e746",
  storageBucket: "e-commerce-8e746.appspot.com",
  messagingSenderId: "160701831622",
  appId: "1:160701831622:web:473fcfa56ffd152f65fac7"
};

export const app = firebase.initializeApp(firebaseConfig);
const store = createStore(MainReducer, applyMiddleware(thunk, logger));

i18n.use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      tr,
    },
    lng: i18n.options.lng, // if you're using a language detector, do not define the lng option
    fallbackLng: "tr",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactValidatableFormProvider>
        <App/>

      </ReactValidatableFormProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
