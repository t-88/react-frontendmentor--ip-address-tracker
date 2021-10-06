import { TileLayer , Marker  , useMap } from "react-leaflet";
import L from 'leaflet';

import iconLoc from "../assets/icon-location.svg"
function LeafletMap({pos}) {
    const map = useMap()
    map.setView(pos,13)
    let Icon = L.icon({iconUrl: iconLoc})
    return (
        <>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={map.getCenter()} icon={Icon} />
        </>
    )
}
export default LeafletMap;