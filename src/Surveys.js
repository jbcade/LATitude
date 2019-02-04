import React, { Component } from 'react';
import { Button, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table} from 'reactstrap';
import { FilePicker } from 'react-file-picker';
import Select from 'react-select';
import {RadioGroup, Radio} from 'react-radio-group';
import classnames from 'classnames';

class Surveys extends Component {

  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
	this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      activeTab: '1',
	    modal: false,
		  exportFormat: 'json'
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
	return (
		<React.Fragment>
			<Row>
				<Col className="overflow-auto" xs="9">
					<Nav pills id="survey-list">
						{this.props.surveys.map(function(survey, index){
							//console.log(survey);
							return <NavItem key={index} >
									<NavLink className={classnames({ active: this.state.activeTab === ((index + 1).toString()) })} key={index} suppressContentEditableWarning={true} contentEditable onClick={() => { this.toggleTab((index+1).toString()); }} onBlur={(evt) => {this.props.renameParticipant(evt, index)}}>{survey.name}</NavLink>
								   </NavItem>
						}, this)}
					</Nav>
				</Col>
				<Col className="overflow-auto" xs="3">
					<Nav pills>
						<NavItem id="survey-controls">
							<NavLink id="new-survey" className="btn-secondary" href="#" onClick={this.props.generateSurvey}>New</NavLink>
						</NavItem>
						<NavItem id="import-surveys">
						  <FilePicker extensions={['json']} onChange={(fileObject) => {this.props.surveyImport(fileObject);}}><NavLink id="import-survey-file" className="btn-secondary" href="#" onClick={this.props.generateSurvey}>Import</NavLink></FilePicker>
						</NavItem>
						<NavItem>
							<NavLink id="export-surveys" className="btn-secondary" href="#" onClick={this.toggleModal}>Export</NavLink>
						</NavItem>
					</Nav>
				</Col>
			</Row>
			<TabContent activeTab={this.state.activeTab}>
				{this.props.surveys.map(function(item, index){
					//console.log(item);
					var firstTableRow = true;
					var targetSurvey = index;
					return <TabPane tabId={(index+1).toString()} key={index+1} >
						<Table id={'surveyTable-' + (index + 1)} className="table assessment-table">
							<tbody>
								{item.questionnaire.map(function(category, index){
									var categoryName = Object.keys(category)[0];
									var categoryIndex = index;
									var rowContent = [];
									for (var i = 0; i < category[categoryName].length; i++) {
										rowContent.push(<Question key={i} id={i} first={firstTableRow} rowLength={category[categoryName].length} survey={targetSurvey} categoryIndex={categoryIndex} categoryName={categoryName} question={category[categoryName][i]["question"]} value={category[categoryName][i]["value"]} handleInput={this.props.handleInput} />);
										firstTableRow = false;
									}
									return rowContent;
								}, this)}
							</tbody>
						</Table>
					</TabPane>
				}, this)}
			</TabContent>
			<Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
				<ModalHeader toggle={this.toggleModal}>Export Surveys</ModalHeader>
				<ModalBody>
					<Label for="format">Format</Label>
					<Select
						name="format"
						id="format-select"
						clearable={false}
						value={"json"}
						onChange={this.handleFormatChange}
						options={[
							{ value: 'json', label: 'LATitude Survey File'},
							{ value: 'csv', label: 'CSV', disabled:true },
							{ value: 'csv', label: 'CSV' },
						]}
					/>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={() => { this.props.surveyExport(this.state.exportFormat); }}>Download</Button>{' '}
					<Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
  };
};

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value !== nextProps.value) {
      return true;
    }
    return false;
  }

  render() {
	return (
		<tr>{(this.props.id === 0)?<th className={(this.props.first) ? 'first-row' : ''} rowSpan={this.props.rowLength}>{this.props.categoryName}</th>:null}<td className="survey-question">{this.props.question}</td><td className={"survey-input" +  ((this.props.first) ? ' first-row':'')}>
			<RadioGroup className="radio-caption" onChange={(value) => this.props.handleInput(value, this.props.survey, this.props.categoryIndex, this.props.categoryName, this.props.id)} selectedValue={this.props.value?this.props.value:false} name={this.props.survey + " " + this.props.categoryName + ' ' + (this.props.id + 1)}>
			  <Radio className="radio-input" value="-2" />Strongly Disagree
			  <Radio className="radio-input" value="-1" />Disagree
			  <Radio className="radio-input" value="0" />Neutral
			  <Radio className="radio-input" value="1" />Agree
			  <Radio className="radio-input" value="2" />Strongly Agree
			</RadioGroup>
		</td></tr>
	);
  };
};

export default Surveys;
