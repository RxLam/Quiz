import React from "react";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Provider } from 'react-redux';
import { store } from './redux/store';


function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
            <NavBar/>
            <AppRouter/>
        </Provider>
      </BrowserRouter>
  );
}

export default App;