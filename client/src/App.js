import React from 'react'
import "./App.css";

import { useState } from 'react';
// components
import {BrowserRouter , Routes , Route, Navigate, Outlet} from 'react-router-dom'
import Login from "./components/account/Login";// navigation
import DataProvider from './context/DataProvider';
import Home from './components/home/Home'
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import DetailView  from './components/details/DetailView';
import Update from './components/create/Update'
import About from './components/about/About';
import Contact from './components/contact/Contact';
const PrivateRoute = ( {isAuthenticated , ...props }) =>{

  return isAuthenticated ? 
    <>
     <Header />
      <Outlet />
    </>
    : <Navigate replace to = '/login' />

}
const App = () =>{
   const [isAuthenticated , isUserAuthenticated] = useState(false);

    return(
        <DataProvider>
          <BrowserRouter>
           
             <div style={ {marginTop : 60}}>
               <Routes>
                  <Route path = '/login' element = {<Login  isUserAuthenticated = {isUserAuthenticated}/>} />

                  <Route path='/' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />} >
                     <Route path = '/' element = {<Home/>} />
                  </Route>

                  <Route path='/create' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />} >
                     <Route path = '/create' element = {<CreatePost/>} />
                  </Route>

                     {/*to uniquely identify we need id from posts file */}
                  <Route path='/details/:id' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />} >
                     <Route path = '/details/:id' element = {<DetailView/>} />
                  </Route>

                   {/*to uniquely update the post */}
                  <Route path='/Update/:id' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />} >
                     <Route path = '/Update/:id' element = {<Update/>} />
                  </Route>

                  <Route path='/about' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />} >
                     <Route path = '/about' element = {<About/>} />
                  </Route>

                  <Route path='/contact' element = {<PrivateRoute isAuthenticated = {isAuthenticated} />} >
                     <Route path = '/contact' element = {<Contact/>} />
                  </Route>
              
              
               </Routes>

            </div>
          </BrowserRouter>
        </DataProvider>
       
    );
};

export default App;
//