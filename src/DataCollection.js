import React, { Component } from 'react';
import { Table } from 'reactstrap'; /*Card, CardText, CardSubtitle, CardTitle, Col, Row */
//var Cursor = require('immutable-cursor');
import { List } from 'immutable';
import ContentEditable from 'react-contenteditable';

class Data extends Component {
	
  constructor(props) {
    super(props);
    this.state = {};
  };
 
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.data.equals(nextProps.data)) {
      return true;
    }
	console.log("rejected Data update");
    return false;
  }
 
  render() {
	return (
		<React.Fragment>{this.props.data.map((outerSection, root) => {
			var sectionContent = [];
			var headerKey = 0;
			var tableKey = 0;
			var innerSection = outerSection.entries();
			for(let section of innerSection) {
				var header = section[0];
				sectionContent.push(<div key={'H' + headerKey} ><h3>{header}</h3></div>);
				for(let table of section[1]) {
					//console.log(table[1].get("dataset").size);
					sectionContent.push(<IndicatorTable key={tableKey} root={root} section={header} data={this.props.data} name={table[0]} indicators={table[1]} handleChange={this.props.handleChange} addRow={this.props.addRow} deleteRow={this.props.deleteRow}></IndicatorTable>);
					tableKey++;
				}
				headerKey++;
			}
			return sectionContent;
		})}</React.Fragment>
	);
  }
};

class IndicatorTable extends Component {
  constructor(props) {
    super(props);
	this.toggleHelp = this.toggleHelp.bind(this);
    this.state = {
		helpActive: false
	};
  };

  toggleHelp() {
    this.setState({
      helpActive: !this.state.helpActive
    });
  }  
  
/*  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.indicators.equals(nextProps.indicators) || this.state.helpActive !== nextState.helpActive) {
      return true;
    }
	console.log("rejected table update");
    return false;
  }*/
  
  render() {
	  return (
  <Table striped className="table table-striped"><thead><tr><th>{this.props.name}</th><th><i className="material-icons ask-help" onClick={this.toggleHelp}>help</i></th>{this.props.indicators.get("variables").map((name, i) => {return <th key={i}>{name}</th>;})}</tr><tr><th colSpan={this.props.indicators.get("variables").size + 2}><div className={"alert alert-info helpbox" + (this.state.helpActive ? "" : " collapsed")} dangerouslySetInnerHTML={{__html: this.props.indicators.get("description")}}></div></th></tr></thead>
		<tbody>{this.props.indicators.get("dataset").map((indicator, i) => {
			var datapoints = [];
			//var types = [];
			//console.log(indicator);
			for(let innerIndicator of indicator.get("datapoints")) {
				//console.log(innerIndicator);
				datapoints.push(innerIndicator);
				//console.log(this.props.indicators.get("types").get(i));
				//types.push(this.props.indicators.get("types")[i]);
			}
			if(datapoints.length === 0) {
				for(var vi = 0; vi < this.props.indicators.get("variables").size; vi++) {
					datapoints.push(null);
				}
			}
			return(<IndicatorElement name={indicator.get("name")} subcategory={indicator.get("subcategory")} key={i} id={i} data={this.props.data} dataset={this.props.indicators.get("dataset")} datapoints={List(datapoints)} references={[this.props.root, this.props.section, this.props.name, "dataset", i]} handleChange={this.props.handleChange} addRow={this.props.addRow} deleteRow={this.props.deleteRow}></IndicatorElement>);
		})}</tbody></Table>
	);
  }
}

class IndicatorElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.props.name !== nextProps.name) || !this.props.datapoints.equals(nextProps.datapoints)) {
      return true;
    }
    return false;
  }
  
  render() {
	  return (
		<tr><ContentEditable className={"indent" + (this.props.subcategory ? this.props.subcategory : "0")} tagName="th" html={this.props.name} onBlur={(evt)=>this.props.handleChange(evt, this.props.data, "name", this.props.references.concat(["name"]))} ></ContentEditable><th><i onClick={(evt)=>this.props.addRow(evt, this.props.data, this.props.references, this.props.id, this.props.dataset, this.props.subcategory, this.props.datapoints.size)} className="material-icons add-row">add_circle</i><i onClick={(evt)=>this.props.deleteRow(evt, this.props.data, this.props.references)} className="material-icons remove-row">remove_circle</i></th>{this.props.datapoints.map((datapoint, dpIndex, datapoints) => { if(datapoint === null) {datapoint = '';} return <ContentEditable key={dpIndex} tagName="td" html={(Number.isFinite(datapoint) ? datapoint.toString() : datapoint)} onBlur={(evt)=>this.props.handleChange(evt, this.props.data, "datapoint", this.props.references.concat(["datapoints", dpIndex.toString()]), datapoints, dpIndex )} ></ContentEditable>})}</tr>
	  );
  }
}

export default Data;
