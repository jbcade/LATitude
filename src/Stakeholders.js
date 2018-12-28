import React, { Component } from 'react';
import Graph from "react-graph-vis";
import 'vis/dist/vis-network.min.css';
import { Card, Col, Row, Table } from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import Select from 'react-select';

class Stakeholders extends Component {
	
  constructor(props) {
    super(props);
	this.toggleHelp = this.toggleHelp.bind(this);
    this.state = {
		network: null,
		helpActive: false
	};
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.visible) {
      return true;
    }
	console.log("rejected Stakeholder update");
    return false;
  }
  
  firstRun = true;
  componentDidUpdate(prevProps) {
	if (this.firstRun && this.props.visible && this.state.network !== null) {
		this.state.network.fit();
		this.firstRun = false;
	} else {
		//this.state.network.setData(this.props.graph);
		return;
	}
  }

  toggleHelp() {
    this.setState({
      helpActive: !this.state.helpActive
    });
  } 
  
  options = {
	height: '98%',
	width: '100%',
	interaction:{hover:true},
	manipulation: {
		enabled: true,
		addNode: false,
		addEdge: true,
		editEdge: true,
		deleteNode: false,
		deleteEdge: true
	},
	edges: {
		chosen: false,
		arrows: {
			to:{enabled: true},
			from:{enabled: true}
		},
		color: {
			color:"grey"
		},
		dashes: true,
		width: 1
	},
	nodes: {
		shape: 'circle',
		shadow: true,
		color: {
			background: "#f0f8ff"	
		},
		font: {
			multi: 'html'
		}
	},
	physics: {
		enabled: false,
		barnesHut: {
			"avoidOverlap": 1
		}
	}
  }; 
  
  render() {
	return (
		<React.Fragment>
			<Row>
				<Col sm="12">
					<Card body className="ecomap">
						<Graph graph={this.props.graph} options={this.options} events={this.props.events} getNetwork={network => this.setState({network }) } getEdges={this.props.setEdges} getNodes={this.props.setNodes} />
					</Card>
				</Col>
			</Row>
			<Row>
				<Col sm="12">
					<Table striped className="table table-striped stakeholder-table">
						<thead>
							<tr>
								<th>Stakeholder</th>
								<th><i className="material-icons ask-help" onClick={this.toggleHelp}>help</i></th>
								<th>Title</th>
								<th>Organization</th>
								<th>Type</th>
								<th>Contact</th>
								<th>Remarks</th>
							</tr>
							<tr>
								<th colSpan="7">
									<div className={"alert alert-info helpbox" + (this.state.helpActive ? "" : " collapsed")}><b>Test</b></div>
								</th>
							</tr>
						</thead>
						<tbody>
							{this.props.stakeholders.map((stakeholder, i) => {
								
								return(
									<Stakeholder key={i} id={i} stakeholderId={stakeholder.id} name={stakeholder.name} title={stakeholder.title} organization={stakeholder.organization} type={stakeholder.type} contact={stakeholder.contact} remarks={stakeholder.remarks} addStakeholder={this.props.addStakeholder} deleteStakeholder={this.props.deleteStakeholder} mapStakeholder={this.props.mapStakeholder}/>
								);
							})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</React.Fragment>
	);
  };
};

class Stakeholder extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
		type: this.props.type
	};
  };

  handleStateChange = (type) => {
    this.setState({ "type": type });
  }
  
  render() {
	return (
		<tr data-node={this.props.stakeholderId} onBlur={(evt)=>this.props.mapStakeholder(evt, this.props.stakeholderId)}>
			<ContentEditable className="stakeholder-name" tagName="th" html={this.props.name} scope="row"></ContentEditable>
			<th><i className="material-icons add-row" onClick={(evt)=>this.props.addStakeholder(evt, this.props.id)}>add_circle</i><i className="material-icons remove-row" onClick={(evt)=>this.props.deleteStakeholder(evt, this.props.id)}>remove_circle</i></th>
			<ContentEditable className="stakeholder-title" html={this.props.title} tagName="td"></ContentEditable>
			<ContentEditable className="stakeholder-org" html={this.props.organization} tagName="td"></ContentEditable>
			<td className="stakeholder-type">
				<Select
					name="type"
					clearable={false}
					value={this.state.type}
					onChange={this.handleStateChange}
					options={[
						{value:"Government",label:"Government",className:"government"},
						{value:"Business",label:"Business"},
						{value:"NGO",label:"NGO"},
						{value:"Faith-based",label:"Faith-based"},
						{value:"Community",label:"Community"},
					]}
				/>
			</td>
			<ContentEditable className="stakeholder-contact" html={this.props.contact} tagName="td"></ContentEditable>
			<ContentEditable className="stakeholder-remarks" html={this.props.remarks} tagName="td"></ContentEditable>
		</tr>
	);
  };
};
export default Stakeholders;