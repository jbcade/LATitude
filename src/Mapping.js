import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

class Mapping extends Component {
	
  constructor(props) {
    super(props);
    this.state = {};
  };	
  
/*  shouldComponentUpdate(nextProps, nextState) {
	console.log(nextProps.visible);
    if (nextProps.visible) {
      return true;
    }
	console.log("rejected Mapping update");
    return false;
  }*/

  render() {
	if(this.props.bounds) {
		var {center, zoom} = fitBounds(this.props.bounds, {width: 800, height: 800});
	} else {
		center = {lat: 50.01038826014866,lng: -118.6525866875,};
		zoom = 14;
	}
	console.log(center);
	console.log(zoom);
    return (
      // Important! Always set the container height explicitly
      <div style={{height: '85vh', width: '95vw', margin: '0', padding: '0'}}>
        <GoogleMapReact
		  resetBoundsOnResize
          bootstrapURLKeys={{ key: 'AIzaSyAUYI0IaoQuGHzXM1mNEIiL3BlJG---UdE' }}
          defaultCenter={center}
          defaultZoom={zoom}
        ></GoogleMapReact>
      </div>
    );
  }
}
export default Mapping;