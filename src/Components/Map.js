import React from 'react'
import mapboxgl from 'mapbox-gl'
import {geolocated} from 'react-geolocated';

mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyYW4iLCJhIjoiY2szMTJ1c2t2MDFpYTNocXRsbnVjbG90ayJ9.ZSLDlvN44L8vnkQg9BQKZA';
class Map extends React.Component 
{
    MAP;
    constructor(props: Props) 
    {
        super(props);
        this.state = 
        {
            lng: -81.2737,
            lat: 43.0096,
            zoom: 10,
        };
        
    }
    
    

    getUserLocation=event=> 
    {
        
        this.MAP.flyTo({
            center: [
                this.props.coords.longitude ,
                this.props.coords.latitude ]
        });

       
    }
    
    componentDidMount() 
    {
       // this.tooltipContainer = document.createElement('div');
       const { lng, lat, zoom } = this.state;

       const map = new mapboxgl.Map({
           container: 'mapContainer',
           style: 'mapbox://styles/mapbox/streets-v11',
           center: [lng, lat],
           zoom:12,
       });      
       
       // Add geolocate control to the map.
       map.addControl(new mapboxgl.NavigationControl());
       map.on('move', () => {
           const { lng, lat } = map.getCenter();

           this.setState({
           lng: lng.toFixed(4),
           lat: lat.toFixed(4),
           zoom: map.getZoom().toFixed(2)
           });
       });                
       this.MAP = map;
        
    }
    

    render() 
    {
        const { lng, lat, zoom } = this.state;

        return (
            <div><br />
                <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div id='mapContainer'></div>
            </div>
        );
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Map)