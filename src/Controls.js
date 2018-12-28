import React, { Component } from 'react';
import logo from './logo.png';
import {Button, Col, Jumbotron, Label, Row } from 'reactstrap'; //{Button,ButtonGroup,Row,Col,Form,FormGroup,Label,Input,FormText,Jumbotron,Container} from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FilePicker } from 'react-file-picker';
const BACKEND = 'https://us-central1-exemplary-rex-97621.cloudfunctions.net/Community-Resilience-Assessment/';
const STATES = require('./data/states');
const COUNTIES = require('./data/counties');

class Controls extends Component {
  constructor(props) {
    super(props);
	this.state = {
		state: '',
		county: '',
		place: '',
		placeList: [],
		overlays: '',
		countyToggle: true,
		placeToggle: true,
		generateToggle: false
	}
  }	
	
  render() {
 	const { state } = this.state;
  	const targetState = state && state.value;
 	const { county } = this.state;
  	const targetCounty = county && county.value;
 	const { place } = this.state;
  	const targetPlace = place && place.value;
	const { placeList } = this.state;
 	const { overlays } = this.state;
  	const targetOverlays = overlays; //&& overlay.value;
    return (
		<Jumbotron>
			<Row className="title">
			<h3 className="display-6 col-6">
				<i className="material-icons branding-logo">location_searching</i><span className="branding-acronym">LAT</span><span className="branding-flourish">itude</span>
				<div className="brand-breakout"><span className="weighted">L</span>ocality <span className="weighted">A</span>ssessment <span className="weighted">T</span>ool</div>
			</h3>
			<div className="sponsor-block col-6">
				<a href="http://www.mdchhs.com/" target="_blank" rel="noopener noreferrer"><img id="chhs-logo" src={logo} className="img-responsive" alt="CHHS Logo"></img></a>
				<p className="lead">University of Maryland Center for Health and Homeland Security</p>
			</div>
			</Row>
			<Row>
				<Col xs="3">
					<Label for="state">State or Territory</Label>
					<Select
						name="state"
						id="state-select"
	    					clearable={false}
						value={targetState}
						onChange={this.handleStateChange}
						options={STATES}
					/>	
				</Col>
				<Col xs="3">
					<Label for="county">County</Label>
					<Select
						name="county"
						id="county-select"
						clearable={false}
						disabled={this.state.countyToggle}
						value={targetCounty}
						onChange={this.handleCountyChange}
						options={COUNTIES[state.value]}
					/>
				</Col>
				<Col xs="3">
					<Label for="place">Place</Label>
					<Select
						name="place"
						id="place-select"
						value={targetPlace}
						disabled={this.state.placeToggle}
						onChange={this.handlePlaceChange}
						options={placeList}
					/>
				</Col>
				<Col xs="3">
					<Label for="overlay-select">Overlays</Label>
					<Select
						multi={true}
						name="overlay"
						id="overlay-select"
	    					simpleValue
						value={targetOverlays}
						onChange={this.handleOverlayChange}
						options={[
							{value:"radicalization",label:"Radicalization"},
							{value:"flooding",label:"Flooding", disabled:false},
							{value:"hurricane",label:"Hurricane", disabled:false},
							{value:"epidemic",label:"Epidemic", disabled:false},
						]}
					/>						
				</Col>
			</Row>
			<Row>
				<Button className={this.state.generateToggle ? "" : "disabled" } color="success" id="generate" onClick={()=>this.props.handleGeneration(this.state.state.value, this.state.state.fips, this.state.state.label, this.state.county.value, this.state.county.label, this.state.place.value, this.state.place.type, this.state.place.label, this.state.overlays.split(','))}>Generate</Button>
				<Button disabled={this.props.isLoadable ? false : true } color="primary" id="load" onClick={this.props.handleLoad}>Load</Button>
	    			<FilePicker style={{display:'inline'}} extensions={['json']} onChange={(fileObject) => {this.props.handleLoadFromFile(fileObject);}}><Button color="primary" id="loadFile">Load From File</Button></FilePicker>
				<Button disabled={this.props.isActive ? false : true } color="info" id="save" onClick={this.props.handleSave}>Save</Button>
				<Button disabled={this.props.isActive ? false : true } color="info" id="saveFile" onClick={this.props.handleSaveToFile}>Save as...</Button>
			</Row>
		</Jumbotron>
    );
  }

  handleStateChange = (state) => {
    this.setState({ state: state, county: '', placeList: [], placeToggle: true, generateToggle: false });
	if(this.state.countyToggle && state) {this.setState({countyToggle: false})};
  }
  
  handleCountyChange = (county) => {
    this.setState({ county });
    console.log(`County selected: ${county.label}`);
	var placesURL = encodeURI(BACKEND + 'places?state=' + this.state.state.value + '&county=' + county.label);
	///*demo mode*/var placesURL = encodeURI(BACKEND + "places?state=MD&county=Prince George's County");
	fetch(placesURL).then(function(response) {
		if(response.ok) {
			return response.json();
		}
		throw new Error('Network response was not ok.');
	}).then(function(placeList) { 
		console.log(placeList);
		this.setState({ placeList });
		if(this.state.placeToggle && county) {this.setState({placeToggle: false, generateToggle: true})};
	}.bind(this)).catch(function(error) {
		console.log('There has been a problem with your fetch operation: ' + error.message);
	});
  }

  handlePlaceChange = (place) => {
    this.setState({ place });
    console.log(`Selected: ${place}`);
  }
  
  handleOverlayChange = (overlays) => {
    this.setState({ overlays });
    console.log({overlays});
  }
}

export default Controls;
