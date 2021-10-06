import { useRef } from "react";

import Card from "./ui/Card";

import bg_img from "../assets/pattern-bg.png"
import loading_img from "../assets/refresh.png"
function IpAddrTracker({data,getIpData,requestState}) {
    const ref = useRef(null)
    const checkIP = (value) => {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)){
          return (true)
        }
    }
    const onClick = () => {
        if(requestState !== "done") { return; }
        if(checkIP(ref.current.value)) {
            getIpData(ref.current.value)
            ref.current.value = ""
        } else {
            alert("wrong ip addr")
        }
    }
    return (
        
        <div className="IpAddrTracker">
            <img className="IpAddrTracker__img" src={bg_img} alt="img" />
            <div className="IpAddrTracker__text">
                <h1>IP Address Tracker</h1>
                <div className="IpAddrTracker__text__input">
                    <input ref={ref} type="text" placeholder="Search for any IP address or domain"/>
                    <div onClick={onClick} className={`IpAddrTracker__text__input__img ${requestState !== "done" ? "IpAddrTracker__text__input__img--loading": ""}`}>
                        <svg className="img--ready" xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
                        <img className="img--loading" src={loading_img} alt="img" />
                    </div>
                </div>
            </div>
            <div className="IpAddrTracker__data">
                {data.map( (info,index) => 
                    <Card key={index} {...info}/>
                )}
            </div>
        </div>
    )
}
export default IpAddrTracker;