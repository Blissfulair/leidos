
//import './App.css';

import {  useState } from "react";
import Header from "./components/Header";

import Receiving from "./components/Receiving";
import Sending from "./components/Sending";

function Leidos() {
    const [page,setPage]=useState(false)
  return (
    <>
    <Header setPage={setPage} />
    {
        !page?
        (
            <Sending/>
        )
        :
        (
           <Receiving/>
        )
    }

   
   </>
  );
}

export default Leidos;
