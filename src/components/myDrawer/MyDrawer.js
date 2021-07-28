import React, {Component} from "react";
import "./MyDrawer.css";

export class MyDrawer extends Component{

    constructor(props) {
        super(props);
        this.state = {isToggle:false,drawWidth:0};
        this.toggleNav = this.toggleNav.bind(this);
    }

    render() {
        return <div>
            <div className="sideNav" style={{width:this.state.drawWidth}}>
                <a href="javascript:void(0)" className="closeBtn" onClick={ this.toggleNav}>&times;</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
            <span onClick={ this.toggleNav}>open</span>
        </div>;
    }

    toggleNav(){
        this.state.isToggle ? this.setState({drawWidth:0}) : this.setState({drawWidth:250});
        this.state.isToggle ? this.setState({isToggle:false}) : this.setState({isToggle:true});
    }

    componentDidMount() {
    }


}