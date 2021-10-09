import React from "react";

export default function Quit(){
    return ()=>{
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        location.reload();
    }
}