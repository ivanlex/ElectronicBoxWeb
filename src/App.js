import React from 'react';

import './App.css';
import Login from "./components/Login/Login";
import useToken from './useToken';
import ClippedDrawer from "./components/ClippedDrawer/ClippedDrawer";

function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <ClippedDrawer />
        </div>
    );
}

export default App;