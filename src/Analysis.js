import React, { Component } from 'react';
import { Card, CardText, CardSubtitle, CardTitle, Col, Row } from 'reactstrap'; /*Table*/
import {Radar, Doughnut, Polar} from 'react-chartjs-2'; /*Pie, defaults*/
import pattern from 'patternomaly';

class Analysis extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  shouldComponentUpdate(nextProps, nextState) {
	console.log(nextProps.visible);
    if (nextProps.visible) {
      return true;
    }
	console.log("rejected Analysis update");
    return false;
  }

  render() {
	console.log(this.props.data);
	return (
		<Row>
		  <Col sm="auto" className="analysis-col-left">
			<SurveySentiment surveys={this.props.surveys} />
			<Glance data={this.props.data} />
		  </Col>
		  <Col sm="auto" className="analysis-col-center">
			<HateCrimeMotivation data={this.props.data.getIn([14, "Crime", "Hate Crime by Motivation", "dataset"])} />
			<HateCrimeIncidentType data={this.props.data.getIn([14, "Crime", "Hate Crime by Incident Type", "dataset"])} />
			<Nativity data={this.props.data.getIn([0, "Demographics", "Nativity", "dataset"])} />
		  </Col>
		  <Col sm="auto" className="analysis-col-right">
			<Card body className="gumby">
			  <CardTitle>Poverty Status</CardTitle>
			  <CardSubtitle>Households with children present</CardSubtitle>
			  <ChildPublicAssistance data={this.props.data.getIn([1, "Household", "Households (with children under 18) receiving public assistance", "dataset"])}></ChildPublicAssistance>
			  <ChildPoverty data={this.props.data.getIn([0, "Demographics", "Poverty Status (by age)", "dataset"])} ></ChildPoverty>
			</Card>
			<Card body className="gumby" style={{borderColor:"red"}}>
			  <CardTitle>Vulnerability Concerns</CardTitle>
			</Card>
		  </Col>
		</Row>
	);
  };
};

class SurveySentiment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
	var sentiment = [];
	if(this.props.surveys) {
		var surveys = this.props.surveys;
		sentiment = [[],[],[],[],[]];
		// eslint-disable-next-line
		for(let [surveyId, content] of surveys.entries()) {
			//console.log(surveyId);
			var index = 0;
			for(let questionnaire of content["questionnaire"]) {
				//console.log(questionnaire.aggregate);
				sentiment[index] = sentiment[index].concat(questionnaire.aggregate);
				index++;
			}
			//console.log(sentiment);
		}
		for(var svi = 0; svi < sentiment.length; svi++) {
			//console.log(sentiment[svi]);
			sentiment[svi] = (sentiment[svi].reduce((a, b) => a + b, 0)/sentiment[svi].length);
			//console.log(sentiment[svi]);
		}
	} else {
		sentiment = [];
	}
	//console.log(sentiment);
	var sentimentData = {
		labels: ["Connection and Caring","Resources","Transformative Potential","Disaster Mgmt.","Information and Comm."],
		datasets:[
			{label:
				"Survey Assessment Results",
				"data":sentiment,
				"fill":true,
				"backgroundColor":"rgba(54, 162, 235, 0.2)",
				"borderColor":"rgb(54, 162, 235)",
				"pointBackgroundColor":"rgb(54, 162, 235)",
				"pointBorderColor":"#fff",
				"pointHoverBackgroundColor":"#fff",
				"pointHoverBorderColor":"rgb(54, 162, 235)"
			}
		]
	};

	return (
		<Card body className="gumby">
		  <CardTitle>Survey Sentiment</CardTitle>
		  <Radar data={sentimentData} options={{
			"maintainAspectRatio": true,
			"elements":{
			"line":
				{"tension":0,"borderWidth":3}
			},
			"scale": {
				"ticks": {
					"stepSize": 2,
					"suggestedMin": -5,
					"suggestedMax": 5
				}
			}
		  }} />
		</Card>
	);
  }
}

class Glance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    if ((this.props.name !== nextProps.name) || !this.props.datapoints.equals(nextProps.datapoints)) {
      return true;
    }
    return false;
  }*/

  checkForPlaceholder = function(size, firstRow) {
	if (size === 1 && firstRow === '') {
		return 0;
	} else {
		return size;
	}
  };

  render() {
	var healthy = {color:"forestgreen", fontSize:"1.5rem"}
	var communityCenters = this.checkForPlaceholder(this.props.data.getIn([7, "Recreational Opportunities", "Community Centers", "dataset"]).size, this.props.data.getIn([7, "Recreational Opportunities", "Community Centers", "dataset", 0, "name"]));
	var recreationCenters = this.checkForPlaceholder(this.props.data.getIn([7, "Recreational Opportunities", "Recreation Centers", "dataset"]).size, this.props.data.getIn([7, "Recreational Opportunities", "Recreation Centers", "dataset", 0, "name"]));

	return (
		<Card body className="gumby">
		  <CardTitle>Community at a Glance</CardTitle>
		  <Row>
			  <Col sm="6">
				  <CardText><span style={recreationCenters > 0 ? healthy : {}}>{recreationCenters > 0 ? communityCenters : '--'}</span> recreation centers</CardText>
				  <CardText><span style={communityCenters > 0 ? healthy : {}}>{communityCenters > 0 ? communityCenters : '--'}</span> community centers</CardText>
				  <CardText><span style={{}}>--</span> parks</CardText>
				  <CardText><span style={{}}>--</span> disconnected youth</CardText>
			  </Col>
			  <Col sm="6">
				  <CardText><span style={{}}>--</span> crisis intervention programs</CardText>
				  <CardText><span style={{}}>--</span> voter turnout</CardText>
				  <CardText><span style={{}}>--</span> mental health providers</CardText>
			  </Col>
		  </Row>
		</Card>
	);
  }
}

class HateCrimeMotivation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    if ((this.props.name !== nextProps.name) || !this.props.datapoints.equals(nextProps.datapoints)) {
      return true;
    }
    return false;
  }*/

  render() {
	var visible = false;
	var datapoints = this.props.data;
	console.log(datapoints);
	var valueArray = [parseFloat(datapoints.getIn([0, "datapoints", "0"])),parseFloat(datapoints.getIn([10, "datapoints", "0"])),parseFloat(datapoints.getIn([18, "datapoints", "0"])),parseFloat(datapoints.getIn([25, "datapoints", "0"])),parseFloat(datapoints.getIn([28, "datapoints", "0"])),parseFloat(datapoints.getIn([31, "datapoints", "0"]))];
	console.log(valueArray);
	for (let el of valueArray) {
		if(!isNaN(el)) {
			visible = true;
			break;
		}
	}
	/*for (let el of this.props.data) {
		var datapoint = parseFloat(el.getIn(["datapoints", "0"]));
		console.log(datapoint);
		if(!isNaN(datapoint)) {
			visible = true;
			break;
		}
	}*/

	const hateCrimeByMotivation = (canvas) => {
		var datapoints = this.props.data;
		console.log(datapoints.getIn([0, "name"]));
		var labelArray = [datapoints.getIn([0, "name"]),datapoints.getIn([10, "name"]),datapoints.getIn([18, "name"]),datapoints.getIn([25, "name"]),datapoints.getIn([28, "name"]),datapoints.getIn([31, "name"])];
		var valueArray = [parseFloat(datapoints.getIn([0, "datapoints", "0"])),parseFloat(datapoints.getIn([10, "datapoints", "0"])),parseFloat(datapoints.getIn([18, "datapoints", "0"])),parseFloat(datapoints.getIn([25, "datapoints", "0"])),parseFloat(datapoints.getIn([28, "datapoints", "0"])),parseFloat(datapoints.getIn([31, "datapoints", "0"]))];
		return {
			labels: labelArray,
			datasets:[
				{label:
					"Survey Assessment Results",
					"data": valueArray,
					"fill":true,
					"backgroundColor": pattern.generate(["#1abc9c","#7f8c8d","#3498db","#9b59b6","#34495e","#16a085"])
					//"backgroundColor":["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#f39c12","#d35400","#c0392b","#ecf0f1","#bdc3c7","#95a5a6","#7f8c8d"]
				}
			]
		};
	};

	if(visible) {
		return (
				<Card body className="gumby">
				  <CardTitle>Hate Crime by Motivation</CardTitle>
				  <Doughnut data={hateCrimeByMotivation} options={{
							cutoutPercentage: 20,
							legend: {position: "right"}
						}
					}
				  />
				</Card>
		);
	} else {
		return(null);
	}
  }
}

class HateCrimeIncidentType extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    if ((this.props.name !== nextProps.name) || !this.props.datapoints.equals(nextProps.datapoints)) {
      return true;
    }
    return false;
  }*/

  render() {
	var visible = false;
	for (let el of this.props.data) {
		var datapoint = parseFloat(el.getIn(["datapoints", "0"]));
		console.log(datapoint);
		if(!isNaN(datapoint)) {
			visible = true;
			break;
		}
	}
	const hateCrimeByIncidentType = (canvas) => {
		var labelArray = [];
		var valueArray = [];
		for (let el of this.props.data) {
			var datapoint = parseFloat(el.getIn(["datapoints", "0"]));
			if(!isNaN(datapoint)) {
				labelArray.push(el.get("name"));
				valueArray.push(datapoint);
			}
		}

		return {
			labels: labelArray,
			datasets:[
				{label:
					"Survey Assessment Results",
					"data":valueArray,
					"fill":true,
					"backgroundColor": ["#95a5a6","#f1c40f","purple","#d35400", "green"]
					//"backgroundColor":["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#f39c12","#d35400","#c0392b","#ecf0f1","#bdc3c7","#95a5a6","#7f8c8d"]
				}
			]
		};
	};

	if(visible) {
		return (
			<Card body className="gumby">
			  <CardTitle>Hate Crime by Incident Type</CardTitle>
			  <Polar data={hateCrimeByIncidentType} options={{cutoutPercentage: 20, legend: {position: "right"}}}/>
			</Card>
		);
	} else {
		return(null);
	}
  }
}

class Nativity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    if ((this.props.name !== nextProps.name) || !this.props.datapoints.equals(nextProps.datapoints)) {
      return true;
    }
    return false;
  }*/

  render() {
	var visible = false;
	for (let el of this.props.data) {
		var datapoint = parseFloat(el.getIn(["datapoints", "0"]));
		console.log(datapoint);
		if(!isNaN(datapoint)) {
			visible = true;
			break;
		}
	}
	const NATIVITY = (canvas) => {
		var labelArray = [];
		var valueArray = [];
		for (let el of this.props.data) {
			var datapoint = parseFloat(el.getIn(["datapoints", "0"]));
			if(!isNaN(datapoint)) {
				labelArray.push(el.get("name"));
				valueArray.push(datapoint);
			}
		}

		return {
			labels: labelArray,
			datasets:[
				{label:
					"Survey Assessment Results",
					"data":valueArray,
					"fill":true,
					"backgroundColor": pattern.generate(["#95a5a6","#f1c40f","purple","#d35400", "green"]),
					//"backgroundColor":["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#f39c12","#d35400","#c0392b","#ecf0f1","#bdc3c7","#95a5a6","#7f8c8d"]
				}
			]
		};
	};

	if(visible) {
		return (
			<Card body className="gumby">
			  <CardTitle>Nativity</CardTitle>
			  <Doughnut data={NATIVITY} options={{
						cutoutPercentage: 20,
						legend: null
					}
				}
			  />
			</Card>
		);
	} else {
		return(null);
	}
  }
}

class ChildPublicAssistance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    if ((this.props.name !== nextProps.name) || !this.props.datapoints.equals(nextProps.datapoints)) {
      return true;
    }
    return false;
  }*/

  render() {
	//console.log(this.props.data.getIn([ 0, "datapoints", "1"]));
	//console.log(parseFloat(this.props.data.getIn([ 0, "datapoints", "1"])));
	const childPublicAssistanceStatus = (canvas) => {
		return {
			labels: ["Children living in households receiving public assistance"],
			datasets:[
				{label:
					"Survey Assessment Results",
					"data":[parseFloat(this.props.data.getIn([0, "datapoints", "1"])),parseFloat(this.props.data.getIn([ 6, "datapoints", "1"]))],
					"fill":true,
					"backgroundColor": pattern.generate(["darkred","blue"])
					//"backgroundColor":["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#f39c12","#d35400","#c0392b","#ecf0f1","#bdc3c7","#95a5a6","#7f8c8d"]
				}
			]
		};
	};

	return (
		<Doughnut data={childPublicAssistanceStatus} options={{cutoutPercentage: 0, legend: {position: "bottom"}}}/>
	);
  }
}

class ChildPoverty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    if ((this.props.name !== nextProps.name) || !this.props.datapoints.equals(nextProps.datapoints)) {
      return true;
    }
    return false;
  }*/

  render() {
	const childPovertyStatus = (canvas) => {
		console.log((parseFloat(this.props.data.getIn([1, "datapoints", "0"])) + parseFloat(this.props.data.getIn([2, "datapoints", "0"])) + parseFloat(this.props.data.getIn([3, "datapoints", "0"]))));
		return {
			labels: ["Children living in households below poverty level", "Children living in households above poverty level"],
			datasets:[
				{label:
					"Survey Assessment Results",
					"data":[(parseFloat(this.props.data.getIn([1, "datapoints", "0"])) + parseFloat(this.props.data.getIn([2, "datapoints", "0"])) + parseFloat(this.props.data.getIn([3, "datapoints", "0"]))),(parseFloat(this.props.data.getIn([9, "datapoints", "0"])) + parseFloat(this.props.data.getIn([10, "datapoints", "0"])) + parseFloat(this.props.data.getIn([11, "datapoints", "0"])))],
					"fill":true,
					"backgroundColor": pattern.generate(["darkred","blue"])
					//"backgroundColor":["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f1c40f","#e67e22","#e74c3c","#f39c12","#d35400","#c0392b","#ecf0f1","#bdc3c7","#95a5a6","#7f8c8d"]
				}
			]
		};
	};

	return (
		<Doughnut data={childPovertyStatus} options={{cutoutPercentage: 0, legend: {position: "bottom"}}} />
	);
  }
}

export default Analysis;
