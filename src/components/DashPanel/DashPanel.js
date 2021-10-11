import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import "./DashPanelTable.css"

export class DashPanel extends React.Component{
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <table className="DashPanelTable">
                    <tr>
                        {[...new Array(5)].map((item,index)=>(
                            <th>
                                <p>智能SPD防雷器模块</p>
                                <img width="200px" src="/img/SPD.jpg" />
                            </th>)
                        )}
                    </tr>
                    <tr>
                        {this.props.dashItems.map((item,index)=>(
                                <td>
                                    <p>设备识别码 {item.mcuId}</p>
                                    <p>工作状态 <CircleIcon color={item.isOnline == 1 ? "success" : "error"} /></p>
                                    <p>空开状态 <CircleIcon color={item.openStatus == 1 && item.isOnline == 1 ? "success" : "error"} /></p>
                                    <p>裂化状态 <CircleIcon color={item.crackStatus == 0 && item.isOnline == 1 ? "success" : "error"} /></p>
                                    <p>雷击状态 <CircleIcon color={item.lightningStatus == 0 && item.isOnline == 1 ? "success" : "error"} /></p>
                                    <p>接地状态 <CircleIcon color={item.groundedStatus == 0 && item.isOnline == 1 ? "success" : "error"} /></p>
                                    <p>雷击次数 {item.lightningCount}</p>
                                </td>
                            )
                        )}
                    </tr>
                </table>
            </div>
        );
    }
}