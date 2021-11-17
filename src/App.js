import React from 'react';

import './App.css';
import Login from "./components/Login/Login";
import useToken from './useToken';
import ClippedDrawer from "./components/ClippedDrawer/ClippedDrawer";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {

    const { token, setToken } = useToken();

    if(token) {
        return <Login setToken={setToken} />
    }

    var sock = new SockJS('/notifications');
    let stompClient = Stomp.over(sock);
    sock.onopen = function() {
        console.log('open');
    }
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/heartbeat', function (greeting) {
            console.log(greeting);
            //you can execute any function here
            stompClient.send("/app/heartbeat", {}, JSON.stringify({'clientId': '007'}));
        });
        stompClient.send("/app/heartbeat", {}, JSON.stringify({'clientId': '007'}));
    });

    return (
        <div className="wrapper">
            <ClippedDrawer setToken={setToken} />
        </div>
    );
}

export default App;