import React, {useContext} from "react";
import {appContext} from "../../App";

export default function UserMaintain(){

    let appService = useContext(appContext);

    appService.stompClient.subscribe('/topic/heartbeat'+'-user'+appService.socketConnection, function (greeting) {
        console.log(greeting);
        //you can execute any function here
        appService.stompClient.send("/app/heartbeat", {}, JSON.stringify({'clientId': '010'}));
    });

    return(<div>
        User Maintain Page
    </div>)
}