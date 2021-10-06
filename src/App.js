import { useRef , useEffect , useState } from 'react';
import axios from 'axios';

import IpAddrTracker from './components/IpAddrTracker';
import LeafletMap from './components/LeafletMap';
import { MapContainer  } from "react-leaflet";


import './style/style.css';
function App() {
  const mapRef = useRef(null)
  const [ipAddr,setIpAddr] = useState(null)
  const [pos,setPos] = useState([51.505, -0.09])
  const [requestState,setRequestState] = useState("loading")
  const [data,setData] = useState([
    {title: "IP Address", data: "192.212.174.101"},
    {title: "Location", data: "Brooklyn, NY 10001"},
    {title: "Timezone", data: "UTC-05:00"},
    {title: "ISP", data: "SpaceX Starlink"},
  ]) 

  const getIpData = (ipAddr) => {
    setRequestState("loading")
    axios.get(`/track/${ipAddr}`)
    .then( res => { 
        setRequestState("done")

        setData([
          {title: "IP Address", data: res.data.ip},
          {title: "Location", data: `${res.data.location.city || "unknown"}, ${res.data.location.country || "unknown"} ${res.data.as === undefined ? "unknown" : res.data.as.asn || "unknown"}`},
          {title: "Timezone", data: `UTC${res.data.location.timezone || "-unknown"}`},
          {title: "ISP", data: `${res.data.isp || "unknown"}`},          
        ])

        setPos([res.data.location.lat, res.data.location.lng])
    })
    .catch( err => { 
      setRequestState("done")
      console.log(err)
    })
  }
  const clientIpAddr = () => {
      axios.get("/localApi")
      .then( res => { setIpAddr(res.data.ip) })
      .catch ( err => { console.log(err) })
  }
  useEffect(() => {
    const clacHeight = () => {
      const ipAddrTracker_height = document.querySelector(".IpAddrTracker").offsetHeight
      mapRef.current.style.height = `${window.innerHeight - ipAddrTracker_height}px`
    }
    clacHeight()
    window.addEventListener("resize" , () => { clacHeight() })
    clientIpAddr()
  },[])
  useEffect(() => { if(ipAddr) { getIpData(ipAddr) }  },[ipAddr])

  return (
    <>
      <IpAddrTracker data={data}  getIpData={getIpData} requestState={requestState}/>
      <div ref={mapRef} className="MapContainer">
          <MapContainer center={pos} zoom={13}>
            <LeafletMap pos={pos}/>
          </MapContainer >
      </div>
    </>
  );
}

export default App;
