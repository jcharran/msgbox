import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import React, { Component } from 'react'
import MapGL,{Marker} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import Pin from './pin';
const token = 'pk.eyJ1IjoiamNoYXJyYW4iLCJhIjoiY2szMTJ1c2t2MDFpYTNocXRsbnVjbG90ayJ9.ZSLDlvN44L8vnkQg9BQKZA';



class SearchableMap extends Component {
  state = { 
    locMarkerLat:0,
    locMarkerLong:0,
    viewport: {
        width: "100vw",
        height: "100vh",
        latitude: 42.430472,
        longitude: -123.334102,
        zoom: 16
      },
     userLocation: {},
    searchResultLayer: null,
    
  }

  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => 
  {
    console.log( event.result.geometry.coordinates[0],event.result.geometry.coordinates[1]);
    this.setState({
        locMarkerLat:event.result.geometry.coordinates[1],
        locMarkerLong:event.result.geometry.coordinates[0], 
        searchResultLayer: new GeoJsonLayer({
            id: "search-result",
            data: event.result.geometry,
            getFillColor: [255, 0, 0, 128],
            getRadius: 1000,
            pointRadiusMinPixels: 10,
            pointRadiusMaxPixels: 10
        }),
       
    })    
    
    }

    render(){
      const { viewport, searchResultLayer} = this.state
      return (
        <div style={{ height: '100vh'}}>
          <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Use the search bar to find a location or click <a href="/">here</a> to find your location</h1>
          <MapGL 
            ref={this.mapRef}
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            width="100%"
            height="90%"
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={token}
            >
                {this.state.locMarkerLat !== 0 ? (
                <Marker
                    latitude={this.state.locMarkerLat}
                    longitude={this.state.locMarkerLong}
                >
                    <Pin size={20} />
                </Marker>
                ) : ( 
                <div>Empty</div>
                )}
               
                <Geocoder 
                mapRef={this.mapRef}
                onResult={this.handleOnResult}
                onViewportChange={this.handleGeocoderViewportChange}
                mapboxApiAccessToken={token}
                position='top-left'
            />












            </MapGL>
            <DeckGL {...viewport} layers={[searchResultLayer]} />
        </div>
      )
    }
}

export default SearchableMap;