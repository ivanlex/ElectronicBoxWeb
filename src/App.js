import React from 'react';

import './App.css';
import Login from "./components/Login/Login";
import useToken from './useToken';
import ClippedDrawer from "./components/ClippedDrawer/ClippedDrawer";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    let sock = new SockJS('/notifications');
    let stompClient = Stomp.over(sock);
    let sessionId = "";

    sock.onopen = function() {
        console.log('open');
    }
    stompClient.connect({}, function (frame) {
        let url = stompClient.ws._transport.url;
        url = url.replace(
            "ws://127.0.0.1:8000/notifications/",  "");
        url = url.replace("/websocket", "");
        url = url.replace(/^[0-9]+\//, "");
        console.log("Your current session is: " + url);
        sessionId = url;
        stompClient.subscribe('/topic/heartbeat'+'-user'+sessionId, function (greeting) {
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