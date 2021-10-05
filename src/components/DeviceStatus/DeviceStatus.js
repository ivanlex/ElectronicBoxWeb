import React from "react";
import {Axios} from "axios";
import {DeviceDataTable} from "../DeviceDataTable/DeviceDataTable";


export class DeviceStatus extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            deviceStatus:[],
            refreshUtility:""
        };

    }

    render() {
        return (
            <div>
                <div>
                    <DeviceDataTable rows={this.state.deviceStatus} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        const self =this;

        self.setState({refreshUtility : setInterval(function (){
            console.log("refresh running");

            fetch('mCUOpInfo',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/text'
                    },
                    // body: JSON.stringify(credentials)
                })
                .then(
                    data=>{

                        data.json().then(function(result) {
                            // here you can use the result of promiseB
                            console.log(result);
                            self.setState({
                                 deviceStatus : result
                            })
                        })



                    }
                )
                .catch(data => console.log("failed"));
        },3000)})
    }

    componentWillUnmount()
    {
        clearInterval(this.state.refreshUtility);
    }


}