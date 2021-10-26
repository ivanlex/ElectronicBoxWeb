import React from "react";
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';

export class MyMap extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            currentPos : {lng:121.607271,lat:31.214652},
        }

        this.handleMapClick = this.handleMapClick.bind(this);
    }

    handleMapClick(event){
        if(!this.props.enableEdit)
        {
            return;
        }

        this.props.handleUpdatelatlng(event.latlng);
    }

    render() {
        return (
            <Map center={this.props.centerPos}  zoom="16" onClick={this.handleMapClick} >
                <Marker position={this.props.centerPos} />
                <InfoWindow position={this.props.centerPos} text={this.props.desc} title={this.props.mcuId}/>
            </Map>
        );
    }
}