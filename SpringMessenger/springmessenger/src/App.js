import './App.css';
import React from "react";
import ConfigurePane from "./components/ConfigurePane";
import Header from './components/Header';
import Footer from './components/Footer';

// Pass these in as state vars
let baseURL = 'http://localhost:8081'
let testApi = '/'
let signInRoot = '/signIn/'
let usernameLookupRoot = '/findByUsername/'
let sendMessageRoot = '/sendMessage/'

export default function App() {

 
 
     return(
         <div>

            <Header />

        {/* TO DO: Extract the logic from ConfigurePane and put in here?
        And pass it the relevant values?             */}
            <ConfigurePane />

            <Footer />
 
         </div>
     )
}