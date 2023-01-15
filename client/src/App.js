import React from 'react'
import "./App.css";

// components
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from "./components/account/Login";// navigation
import DataProvider from './context/DataProvider';
import Home from './components/home/Home'
const App = () =>{
    return(
        <DataProvider>
          <BrowserRouter>
             <div style={ {marginTop : 60}}>
               <Routes>
                  <Route path = '/login' element = {<Login/>} />
                  <Route path = '/' element = {<Home/>} />
               </Routes>
            </div>
          </BrowserRouter>
        </DataProvider>
       
    );
};

export default App;
//