// import {MapLayer, withLeaflet} from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet-routing-machine';
//
// class RoutingMachine extends MapLayer {
//     componentDidMount() {
//         super.componentDidMount();
//         this.leafletElement.addTo(this.props.map);
//     }
//
//     render() {
//         return null;
//     }
//
//     createLeafletElement (props) {
//         const {from, to} = this.props;
//         console.log(this.props)
//         var leafletElement = L.Routing.control({
//             waypoints: [
//                 L.latLng(from[0], from[1]),
//                 L.latLng(to[0], to[1]),
//             ],
//         });
//         return leafletElement;
//     }
// }
//
// export default withLeaflet(RoutingMachine);

import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const {from, to} = this.props;
    const { map } = this.props;
    console.log(this.props)
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1]) //we can add another waypoint here
      ],
      // router: new L.Routing.Google(),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: true,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
