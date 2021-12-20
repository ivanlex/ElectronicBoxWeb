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
            <Map center={this.props.poses != null ? this.props.poses[0] : this.props.centerPos} style={{height:"100%",width:"100%"}}  zoom="16" onClick={this.handleMapClick} >

                {this.props.poses === null ? (
                    <Marker position={this.props.centerPos} />) :
                    this.props.poses.map((pos)=>(
                                <Marker position={pos} />)
                    )}
                {this.props.hideInfoWindow === true ? (
                    ""
                ) : (
                    <InfoWindow position={this.props.centerPos} text={this.props.desc} title={this.props.mcuId}/>
                )}

            </Map>
        );
    }
}