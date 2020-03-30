import Moment from "moment";
import React, { Component } from "react";

class header extends Component {
    render(){
        let indonesia = require("moment/locale/id");
        Moment.updateLocale("id, indonesia");
        return(
            <div>
                <h3>Aplikasi Aktivitas Harian</h3>
                <p>{Moment().format('dddd')} {Moment().format('LLL')}</p>
            </div>
        )
    }
}
export default header;