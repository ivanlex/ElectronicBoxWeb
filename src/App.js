import React, {createContext} from 'react';

import './App.css';
import Login from "./components/Login/Login";
import useToken from './useToken';
import ClippedDrawer from "./components/ClippedDrawer/ClippedDrawer";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const appService = {
    socketConnection : "",
    stompClient : {},
    token : "",
    deviceLocations : [],
    firstRecord : "",
}

export const appContext =  createContext(appService);

function App() {


    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    let sock = new SockJS('/notifications');
    appService.stompClient = Stomp.over(sock);
    let sessionId = "";

    sock.onopen = function() {
        console.log('open');
    }
    appService.stompClient.connect({}, function (frame) {
        let url = appService.stompClient.ws._transport.url;
        url = url.replace(
            "ws://127.0.0.1:8000/notifications/",  "");
        url = url.replace("/websocket", "");
        url = url.replace(/^[0-9]+\//, "");
        console.log("Your current session is: " + url);
        appService.socketConnection = url;
        appService.stompClient.subscribe('/topic/heartbeat'+'-user'+appService.socketConnection, function (greeting) {
            console.log(greeting);
            //you can execute any function here
            appService.stompClient.send("/app/heartbeat", {}, JSON.stringify({'clientId': token}));
        });
        appService.stompClient.send("/app/heartbeat", {}, JSON.stringify({'clientId': token}));
    });

    return (
        <appContext.Provider value={appService}>
            <div className="wrapper">
                <ClippedDrawer setToken={setToken} />
            </div>
        </appContext.Provider>
    );
}

export default App;