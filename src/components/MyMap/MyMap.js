import React from "react";
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';

export class MyMap extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            currentPos : {lng:121.607271,lat:31.214652},
            enableEdit : this.props.enableEdit,
        }

        this.handleMapClick = this.handleMapClick.bind(this);
    }

    handleMapClick(event){
        if(!this.state.enableEdit)
        {
            return;
        }

        this.setState(
            {
                currentPos : event.latlng
            }
        );

        this.props.handleUpdatelatlng(this.state.currentPos);
    }

    render() {
        return (
            <Map center={this.state.currentPos}  zoom="11" onClick={this.handleMapClick} >
                <Marker position={this.state.currentPos} />
                <InfoWindow position={this.state.currentPos} text={this.props.desc} title={this.props.mcuId}/>
            </Map>
        );
    }
}