import React, { Component } from 'react';
//import logo from './logo.png';
import './Assessment.css';
import update from 'immutability-helper';
import Controls from './Controls';
//import Frame from './Frame';
import Surveys from './Surveys';
import DataCollection from './DataCollection';
import Mapping from './Mapping';
import Stakeholders from './Stakeholders';
import Swot from './Swot';
import Analysis from './Analysis';
import {Button, Card, CardTitle, CardText, Col, Fade, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';//{Table,TabContent,TabPane, Nav, NavItem,NavLink,Card,CardTitle,CardSubTitle,CardBody,CardText,Button,ButtonGroup,Alert,Row,Col,Collapse,Fade,Form,FormGroup,Label,Input,FormText,Jumbotron,Container,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import classnames from 'classnames';
import { fromJS, List, Map } from 'immutable';
var Cursor = require('immutable-cursor');
var geocoder;
const BACKEND = 'https://us-central1-exemplary-rex-97621.cloudfunctions.net/Community-Resilience-Assessment/';

class Assessment extends Component {

  constructor(props) {
    super(props);
	this.state = {
		frame: {
			activeTab: '8',
			active: false
		},
		surveys: [
			{
				name: 'Participant 1',
				questionnaire: [
					{"Connection and Caring": [
						{question: "People in my community feel like they belong to the community.", type: "likert"},
						{question: "People in my community are committed to the well-being of the community.", type: "likert"},
						{question: "People in my community have hope about the future.", type: "likert"},
						{question: "People in my community help each other.", type: "likert"},
						{question: "My community treats people fairly no matter what their background is.", type: "likert"}
					],"aggregate":[null, null, null, null, null]},
					{"Resources": [
						{question: "My community supports programs for children and families.", type: "likert"},
						{question: "My community has resources it needs to take care of community problems (resources include, for example, money, information, technology, tools, raw materials, and services).", type: "likert"},
						{question: "My community has effective leaders.", type: "likert"},
						{question: "People in my community are able to get the services they need.", type: "likert"},
						{question: "People in my community know where to go to get things done.", type: "likert"}
					],"aggregate":[null, null, null, null, null]},
					{"Transformative Potential": [
						{question: "My community works with organizations and agencies outside the community to get things done.", type: "likert"},
						{question: "People in my community communicate with leaders who can help improve the community.", type: "likert"},
						{question: "People in my community work together to improve the community.", type: "likert"},
						{question: "My community looks at its successes and failures so it can learn from the past.", type: "likert"},
						{question: "My community develops skills and finds resources to solve its problems and reach its goals.", type: "likert"},
						{question: "My community has priorities and sets goals for the future.", type: "likert"}
					],"aggregate":[null, null, null, null, null, null]},
					{"Disaster Mgmt.": [
						{question: "My community tries to prevent disasters.", type: "likert"},
						{question: "My community actively prepares for future disasters.", type: "likert"},
						{question: "My community can provide emergency services during a disaster.", type: "likert"},
						{question: "My community has services and programs to help people after a disaster.", type: "likert"}
					],"aggregate":[null, null, null, null]},
					{"Information and Comm.": [
						{question: "My community keeps people informed (for example, via television, radio, newspaper, Internet, phone, neighbors) about issues that are relevant to them.", type: "likert"},
						{question: "If a disaster occurs, my community provides information about what to do.", type: "likert"},
						{question: "I get information/communication through my community to help with my home and work life.", type: "likert"},
						{question: "People in my community trust public officials.", type: "likert"}
					],"aggregate":[null, null, null, null]}
				]
			},
			{
				name: 'Participant 2',
				questionnaire: [
					{"Connection and Caring": [
						{question: "People in my community feel like they belong to the community.", type: "likert"},
						{question: "People in my community are committed to the well-being of the community.", type: "likert"},
						{question: "People in my community have hope about the future.", type: "likert"},
						{question: "People in my community help each other.", type: "likert"},
						{question: "My community treats people fairly no matter what their background is.", type: "likert"}
					], aggregate: [null, null, null, null, null]},
					{"Resources": [
						{question: "My community supports programs for children and families.", type: "likert"},
						{question: "My community has resources it needs to take care of community problems (resources include, for example, money, information, technology, tools, raw materials, and services).", type: "likert"},
						{question: "My community has effective leaders.", type: "likert"},
						{question: "People in my community are able to get the services they need.", type: "likert"},
						{question: "People in my community know where to go to get things done.", type: "likert"}
					], aggregate: [null, null, null, null, null]},
					{"Transformative Potential": [
						{question: "My community works with organizations and agencies outside the community to get things done.", type: "likert"},
						{question: "People in my community communicate with leaders who can help improve the community.", type: "likert"},
						{question: "People in my community work together to improve the community.", type: "likert"},
						{question: "My community looks at its successes and failures so it can learn from the past.", type: "likert"},
						{question: "My community develops skills and finds resources to solve its problems and reach its goals.", type: "likert"},
						{question: "My community has priorities and sets goals for the future.", type: "likert"}
					], aggregate: [null, null, null, null, null, null]},
					{"Disaster Mgmt.": [
						{question: "My community tries to prevent disasters.", type: "likert"},
						{question: "My community actively prepares for future disasters.", type: "likert"},
						{question: "My community can provide emergency services during a disaster.", type: "likert"},
						{question: "My community has services and programs to help people after a disaster.", type: "likert"}
					], aggregate: [null, null, null, null]},
					{"Information and Comm.": [
						{question: "My community keeps people informed (for example, via television, radio, newspaper, Internet, phone, neighbors) about issues that are relevant to them.", type: "likert"},
						{question: "If a disaster occurs, my community provides information about what to do.", type: "likert"},
						{question: "I get information/communication through my community to help with my home and work life.", type: "likert"},
						{question: "People in my community trust public officials.", type: "likert"}
					], aggregate: [null, null, null, null]}
				]
			},
		],
		swot: {
			strengths: '',
			weaknesses: '',
			opportunities: '',
			threats: ''
		},
		/*stakeholderGraph: {
			nodes: [
				{id: 1, label: '<b>Placeholder</b>\nAdd stakeholders below'}
			],
			edges: []
		},*/
		nodes: [{id: 1, label: '<b>Placeholder</b>\nAdd stakeholders below'}],
		edges: [],
		edgesObject: null,
		nodesObject: null,
		stakeholders: [
			{name:"", id:1, title:"", organization:"", type:"Government", contact:"", Remarks:""}
		],
		"nextStakeholder":2,
		"jurisdiction":null,
		"location": null,
		"overlays":null,
		"population":null,
		"data": fromJS([
			{"Demographics":
				{"Age":
					{"variables":["Percent","% of Male Population","% of Female Population"],
					 "types":["percent","percent","percent"],
					 "dataset":[
						{"name":"Under 5 years","datapoints":["2.7%","2.73%","2.57%"]},
						{"name":"5 to 9 years","datapoints":["2.2%","1.81%","2.60%"]},
						{"name":"10 to 14 years","datapoints":["2.1%","1.86%","2.39%"]},
						{"name":"15 to 17 years","datapoints":["2.0%","1.74%","2.19%"]},
						{"name":"18 and 19 years","datapoints":["24.0%","23.32%","24.84%"]},
						{"name":"20 years","datapoints":["10.5%","10.36%","10.70%"]},
						{"name":"21 years","datapoints":["8.6%","9.00%","8.19%"]},
						{"name":"22 to 24 years","datapoints":["10.0%","11.05%","8.75%"]},
						{"name":"25 to 29 years","datapoints":["8.6%","10.07%","6.85%"]},
						{"name":"30 to 34 years","datapoints":["3.7%","3.35%","4.11%"]},
						{"name":"35 to 39 years","datapoints":["3.5%","3.84%","3.13%"]},
						{"name":"40 to 44 years","datapoints":["3.5%","3.27%","3.66%"]},
						{"name":"45 to 49 years","datapoints":["2.4%","2.24%","2.64%"]},
						{"name":"50 to 54 years","datapoints":["3.7%","3.66%","3.75%"]},
						{"name":"55 to 59 years","datapoints":["4.2%","4.18%","4.14%"]},
						{"name":"60 and 61 years","datapoints":["1.7%","1.78%","1.61%"]},
						{"name":"62 to 64 years","datapoints":["1.1%","0.88%","1.35%"]},
						{"name":"65 and 66 years","datapoints":["1.0%","0.87%","1.09%"]},
						{"name":"67 to 69 years","datapoints":["1.2%","1.40%","0.92%"]},
						{"name":"70 to 74 years","datapoints":["1.2%","1.03%","1.42%"]},
						{"name":"75 to 79 years","datapoints":["0.8%","0.49%","1.19%"]},
						{"name":"80 to 84 years","datapoints":["0.8%","0.36%","1.33%"]},
						{"name":"85 years and over","datapoints":["0.6%","0.70%","0.58%"]}
					],
					"description":"<b>Test</b>",
					"males":17115,
					"females":14827,
					"sexRatio":115.43130774937613
			},
			"Language (population Age 5 and older)":
				{"variables":["Estimate","Percent","Speak English \"very well\"","Percent","Speak English less than \"very well\"","Percent"],
				 "types":["number","percent","percent","percent","percent","percent"],
				 "dataset":[{"name":"","datapoints":["","","","","",""]}],
				 "description":"<b>Test</b>"
				},
			"Disabilities":
				{"variables":["Estimate","Percent"],
				  "types":["number","percent"],
				  "dataset":[
					{"name":"With a hearing difficulty","datapoints":[]},
					{"name":"With a vision difficulty","datapoints":[]},
					{"name":"With a cognitive difficulty","datapoints":[]},
					{"name":"With an ambulatory difficulty","datapoints":[]},
					{"name":"With a self-care difficulty","datapoints":[]}
				  ],
				  "description":"<b>Test</b>"
				},
			"Marital Status":
				{ "variables":["Estimate","Never Married","Now Married","Divorced","Separated","Widowed"],
				  "types":["number","percent","percent","percent","percent","percent"],
				  "dataset":[
					{"name":"Male population 15 years and over","datapoints":[16020,"76.55%","19.71%","2.90%","0.67%","0.84%"]},
					{"name":"Female population 15 years and over","datapoints":[13706,"70.49%","22.21%","3.95%","0.85%","3.35%"]}
				  ],
				  "marriageableAge":null,
				  "description":"<b>Test</b>"
				},
			"Race and Ethnicity":
				{ "variables":["Estimate","Percent"],
				  "types":["number","percent"],
				  "dataset":[{"name":"White","datapoints":[17766,"55.62%"]},{"name":"Black or African American","datapoints":[5851,"18.32%"]},{"name":"American Indian and Alaska Native","datapoints":[9,"0.03%"]},{"name":"Apache","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Arapaho","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Blackfeet","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Canadian and French American Indian","subcategory":1,"datapoints":[23,"0.07%"]},{"name":"Central American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cherokee","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cheyenne","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Chickasaw","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Chippewa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Choctaw","subcategory":1,"datapoints":[23,"0.07%"]},{"name":"Colville","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Comanche","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cree","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Creek","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Crow","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Delaware","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Hopi","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Houma","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Iroquois","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Kiowa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Lumbee","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Menominee","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Mexican American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Navajo","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Osage","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Ottawa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Paiute","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pima","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Potawatomi","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pueblo","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Puget Sound Salish","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Seminole","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Shoshone","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Sioux","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"South American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Spanish American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tohono O'Odham","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Ute","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yakama","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yaqui","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yuman","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"All Other Tribes","subcategory":1,"datapoints":[30,"0.09%"]},{"name":"Alaskan Athabascan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Aleut","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Inupiat","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tlingit-Haida","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tsimshian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yup'ik","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Not Specified","subcategory":1,"datapoints":[347,"1.09%"]},{"name":"Asian","datapoints":[4737,"14.83%"]},{"name":"Indian","subcategory":1,"datapoints":[1566,"4.90%"]},{"name":"Bangladeshi","subcategory":1,"datapoints":[55,"0.17%"]},{"name":"Bhutanese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Burmese","subcategory":1,"datapoints":[36,"0.11%"]},{"name":"Cambodian","subcategory":1,"datapoints":[87,"0.27%"]},{"name":"Chinese (except Taiwanese)","subcategory":1,"datapoints":[1816,"5.69%"]},{"name":"Filipino","subcategory":1,"datapoints":[309,"0.97%"]},{"name":"Hmong","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Indonesian","subcategory":1,"datapoints":[107,"0.33%"]},{"name":"Japanese","subcategory":1,"datapoints":[121,"0.38%"]},{"name":"Korean","subcategory":1,"datapoints":[776,"2.43%"]},{"name":"Laotian","subcategory":1,"datapoints":[34,"0.11%"]},{"name":"Malaysian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Mongolian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Nepalese","subcategory":1,"datapoints":[41,"0.13%"]},{"name":"Okinawan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pakistani","subcategory":1,"datapoints":[69,"0.22%"]},{"name":"Sri Lankan","subcategory":1,"datapoints":[5,"0.02%"]},{"name":"Taiwanese","subcategory":1,"datapoints":[103,"0.32%"]},{"name":"Thai","subcategory":1,"datapoints":[13,"0.04%"]},{"name":"Vietnamese","subcategory":1,"datapoints":[78,"0.24%"]},{"name":"Other Asian, Specified","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Asian, Not Specified","subcategory":1,"datapoints":[142,"0.44%"]},{"name":"Native Hawaiian and Other Pacific Islander","datapoints":[57,"0.18%"]},{"name":"Native Hawaiian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Samoan","subcategory":1,"datapoints":[30,"0.09%"]},{"name":"Tongan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Polynesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Guamanian or Chamorro","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Marshallese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Micronesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Fijian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Melanesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Pacific Islander, Not Specified","subcategory":1,"datapoints":[143,"0.45%"]},{"name":"Hispanic or Latino","datapoints":[3780,"11.83%"]},{"name":"Mexican","subcategory":1,"datapoints":[342,"1.07%"]},{"name":"Puerto Rican","subcategory":1,"datapoints":[200,"0.63%"]},{"name":"Cuban","subcategory":1,"datapoints":[76,"0.24%"]},{"name":"Dominican","subcategory":1,"datapoints":[163,"0.51%"]},{"name":"Central American","subcategory":1,"datapoints":[2591,"8.11%"]},{"name":"Costa Rican","subcategory":2,"datapoints":[12,"0.04%"]},{"name":"Guatemalan","subcategory":2,"datapoints":[672,"2.10%"]},{"name":"Honduran","subcategory":2,"datapoints":[224,"0.70%"]},{"name":"Nicaraguan","subcategory":2,"datapoints":[49,"0.15%"]},{"name":"Panamanian","subcategory":2,"datapoints":[25,"0.08%"]},{"name":"Salvadoran","subcategory":2,"datapoints":[1600,"5.01%"]},{"name":"Other Central American","subcategory":2,"datapoints":[9,"0.03%"]},{"name":"South American","subcategory":1,"datapoints":[285,"0.89%"]},{"name":"Argentinean","subcategory":2,"datapoints":[77,"0.24%"]},{"name":"Bolivian","subcategory":2,"datapoints":[10,"0.03%"]},{"name":"Chilean","subcategory":2,"datapoints":[14,"0.04%"]},{"name":"Colombian","subcategory":2,"datapoints":[48,"0.15%"]},{"name":"Ecuadorian","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Paraguayan","subcategory":2,"datapoints":[18,"0.06%"]},{"name":"Peruvian","subcategory":2,"datapoints":[47,"0.15%"]},{"name":"Uruguayan","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Venezuelan","subcategory":2,"datapoints":[50,"0.16%"]},{"name":"Other South American","subcategory":2,"datapoints":[21,"0.07%"]},{"name":"Other Hispanic or Latino","subcategory":1,"datapoints":[123,"0.39%"]},{"name":"Spaniard","subcategory":2,"datapoints":[24,"0.08%"]},{"name":"Spanish","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Spanish American","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"All other Hispanic or Latino","subcategory":2,"datapoints":[99,"0.31%"]},{"name":"Other race","datapoints":[1990,"6.23%"]},{"name":"Two or more races","datapoints":[1532,"4.80%"]}],
				  "description":"<b>Test</b>"
				},
			"Employment Status (by age)":
				{  "variables":["Estimate","Labor Force Participation","Employment/Pop. Ratio","Unemployment Rate"],
				   "types":["number","percent","percent","percent"],
				   "dataset":[{"name":"","datapoints":["","","",""]}],
				   "description":"<b>Test</b>"
				},
			"Educational Attainment":
				{  "variables":["Estimate","Labor Force Participation","Employment/Pop. Ratio","Unemployment Rate"],
				   "types":["number","percent","percent","percent"],
				   "dataset":[{"name":"","datapoints":["","","",""]}],
				   "description":"<b>Test</b>"
				},
			"Nativity":
				{  "variables":["Estimate","Percent"],
				   "types":["number","percent"],
				   "dataset":[{"name":"U.S. citizen, born in the United States","datapoints":[24214,"75.81%"]},{"name":"U.S. citizen, born in Puerto Rico or U.S. Island Areas","datapoints":[15,"0.05%"]},{"name":"U.S. citizen, born abroad of American parent(s)","datapoints":[349,"1.09%"]},{"name":"U.S. citizen by naturalization","datapoints":[2529,"7.92%"]},{"name":"Not a U.S. citizen","datapoints":[4835,"15.14%"]}],
				   "description":"<b>Test</b>"
				},
			"Poverty Status (by age)":
				{  "variables":["Estimate","Percent"],
				   "types":["number","percent"],
				   "dataset":[{"name":"At or below poverty level","datapoints":[5653,"27.33%"]},{"name":"Under 6 years","subcategory":1,"datapoints":[118,"0.57%"]},{"name":"6 to 11 years","subcategory":1,"datapoints":[164,"0.79%"]},{"name":"12 to 17 years","subcategory":1,"datapoints":[117,"0.57%"]},{"name":"18 to 59 years","subcategory":1,"datapoints":[4970,"24.03%"]},{"name":"60 to 74 years","subcategory":1,"datapoints":[108,"0.52%"]},{"name":"75 to 84 years","subcategory":1,"datapoints":[153,"0.74%"]},{"name":"85 years and over","subcategory":1,"datapoints":[23,"0.11%"]},{"name":"At or above poverty level","datapoints":[15030,"72.67%"]},{"name":"Under 6 years","subcategory":1,"datapoints":[860,"4.16%"]},{"name":"6 to 11 years","subcategory":1,"datapoints":[667,"3.22%"]},{"name":"12 to 17 years","subcategory":1,"datapoints":[645,"3.12%"]},{"name":"18 to 59 years","subcategory":1,"datapoints":[10449,"50.52%"]},{"name":"60 to 74 years","subcategory":1,"datapoints":[1860,"8.99%"]},{"name":"75 to 84 years","subcategory":1,"datapoints":[366,"1.77%"]},{"name":"85 years and over","subcategory":1,"datapoints":[183,"0.88%"]}],
				   "description":"<b>Test</b>"
				}
			},
			"Household":{
				"Household Type":
				{  "variables":["Estimate","Percent"],
				   "types":["number","percent"],
				   "dataset":[{"name":"Family households","datapoints":[3402,"47.94%"]},{"name":"Married-couple family","subcategory":1,"datapoints":[2598,"36.61%"]},{"name":"Other family","subcategory":1,"datapoints":[804,"11.33%"]},{"name":"Male householder, no wife present","subcategory":2,"datapoints":[249,"3.51%"]},{"name":"Female householder, no husband present","subcategory":2,"datapoints":[555,"7.82%"]},{"name":"Nonfamily households","datapoints":[3694,"52.06%"]},{"name":"Householder living alone","subcategory":1,"datapoints":[2168,"30.55%"]},{"name":"Householder not living alone","subcategory":1,"datapoints":[1526,"21.51%"]}],
				   "description":"<b>Test</b>"
				},
				"Households (with children under 18) receiving public assistance":
				{  "variables":["Estimate","Percent"],
				   "types":["number","percent"],
				   "dataset":[{"name":"Total receiving public assistance in the past 12 months","datapoints":[508,"19.76%"]},{"name":"Living in family households","subcategory":1,"datapoints":[508,"19.76%"]},{"name":"Married-couple family","subcategory":2,"datapoints":[393,"15.29%"]},{"name":"Male householder, no wife present, family","subcategory":2,"datapoints":[29,"1.13%"]},{"name":"Female householder, no husband present, family","subcategory":2,"datapoints":[86,"3.35%"]},{"name":"Living in nonfamily households","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Total not receiving public assistance in the past 12 months","datapoints":[2063,"80.24%"]},{"name":"Living in family households","subcategory":1,"datapoints":[2053,"79.85%"]},{"name":"Married-couple family","subcategory":2,"datapoints":[1635,"63.59%"]},{"name":"Male householder, no wife present, family","subcategory":2,"datapoints":[119,"4.63%"]},{"name":"Female householder, no husband present, family","subcategory":2,"datapoints":[299,"11.63%"]},{"name":"Living in nonfamily households","subcategory":1,"datapoints":[10,"0.39%"]}],
				   "description":"<b>Test</b>"
				}

			},
			"Housing":{
				"Transitional Housing":{
					"variables":["Contact","Address","Eligibility Notes","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				}
			},
			"Education":{
				"Colleges and Universities":{
					"variables":["Type","Enrollment","Address"],
					"types":["text","integer","address"],
					"dataset":[{"name":"","datapoints":["","",""]}],
					"description":"<b>Test</b>"
				}
			},
			"Business, Occupational, and Economic":{

			},
			"Transportation":{
				"Transportation Assistance Programs":{
					"variables":["Contact","Address","Eligibility Notes","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				}
			},
			"Health and Human Services":{
				"Hospitals":{
					"variables":["Beds","Operated By","Address"],
					"types":["integer","text","address"],
					"dataset":[{"name":"","datapoints":["","",""]}],
					"description":"<b>Test</b>"
				},
				"Food Banks":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Clothing Banks":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Shelters":{
					"variables":["Type","Contact","Address","Eligibility Notes","Services Provided"],
					"types":["text","telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","","",""]}],
					"description":"<b>Test</b>"
				},
				"Clinics":{
					"variables":["Operated By","Address","Remarks"],
					"types":["text","address","text"],
					"dataset":[{"name":"","datapoints":["","",""]}],
					"description":"<b>Test</b>"
				},
				"Nursing Homes":{
					"variables":["Operated By","Address","Remarks"],
					"types":["text","address","text"],
					"dataset":[{"name":"","datapoints":["","",""]}],
					"description":"<b>Test</b>"
				},
				"Assisted Living Facilities":{
					"variables":["Type","Contact","Address","Eligibility Notes","Services Provided"],
					"types":["text","telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","","",""]}],
					"description":"<b>Test</b>"
				},
				"Crisis Intervention Programs":{
					"variables":["Contact","Address","Eligibility Notes","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Advocacy Groups":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Community Mental Health Centers/Counseling":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Foreign Born Services":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"GED Programs":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Hotlines":{
					"variables":["Hotline Number","Remarks"],
					"types":["telephone","text"],
					"dataset":[{"name":"","datapoints":["",""]}],
					"description":"<b>Test</b>"
				},
				"Housing Difficulty Assistance":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Legal Assistance":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Learning and Other Disabilities Assistance":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"LGBT Programs and Support":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Parent/Family Support Services":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"School Programs":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"},
				"Youth Services":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Abuse and Assault Programs":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				},
				"Drug and Alcohol Programs":{
					"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],
					"types":["telephone","address","text","text"],
					"dataset":[{"name":"","datapoints":["","","",""]}],
					"description":"<b>Test</b>"
				}
			},
			"Recreational Opportunities":{
				"Community Centers":{
					"variables":["Contact","Address","Programs and Facilities"],
					"types":["telephone","address","text"],
					"dataset":[{"name":"","datapoints":["","",""]}],
					"description":"<b>Test</b>"
				},
				"Recreation Centers":{
					"variables":["Contact","Address","Programs and Facilities"],
					"types":["telephone","address","text"],
					"dataset":[{"name":"","datapoints":["","",""]}],
					"description":"<b>Test</b>"
				},
				"Parks":{
					"variables":["Address","Programs and Facilities"],
					"types":["address","text"],
					"dataset":[{"name":"","datapoints":["",""]}],
					"description":"<b>Test</b>"
				}
			},
			"Crime":{
				"Hate Crime by Incident Type":{
					"variables":["Number","Percent"],
					"types":["number","percent"],
					"dataset":[
						{"name":"Assault","datapoints":["",""]},
						{"name":"Vandalism","datapoints":["",""]},
						{"name":"Verbal Intimidation","datapoints":["",""]},
						{"name":"Written Intimidation","datapoints":["",""]},
						{"name":"Other","datapoints":["",""]},
					],
					"description":"<b>Test</b>"
				},
				"Hate Crime by Motivation":{
					"variables":["Number","Percent"],
					"types":["number","percent"],
					"dataset":[
						{"name":"Race/Ethnicity/Alien","datapoints":["",""]},
						{"name":"Anti-American Indian/Alaskan Native","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Arab","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Asian","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Black","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Hispanic or Latino","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Native Hawaiian or Other Pacific Islander","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-White","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Other Race/Ethnicity/Ancestry","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Multiple Races, Group","subcategory":1,"datapoints":["",""]},
						{"name":"Religion","datapoints":["",""]},
						{"name":"Anti-Jewish","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Catholic","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Protestant","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Islamic","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Other Religion","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Multiple Religions, Group","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Atheism/Agnosticism","subcategory":1,"datapoints":["",""]},
						{"name":"Sexual Orientation","datapoints":["",""]},
						{"name":"Anti-Male Gay","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Lesbian","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Heterosexual","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Physical Disability","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Bisexual","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-LGBT (Mixed Group)","subcategory":1,"datapoints":["",""]},
						{"name":"Disability","datapoints":["",""]},
						{"name":"Anti-Physical Disability","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Mental Disability","subcategory":1,"datapoints":["",""]},
						{"name":"Gender","datapoints":["",""]},
						{"name":"Anti-Female","subcategory":1,"datapoints":["",""]},
						{"name":"Anti-Male","subcategory":1,"datapoints":["",""]},
						{"name":"Homelessness","datapoints":["",""]}
					],
					"description":"<b>Test</b>"
				}
			}
			}])
	}
  }
  //*{"Media":{"Newspapers":{"variables":[{"name":"Circulation","type":"text"},{"name":"Parent Organization","type":"text"},{"name":"Remarks","type":"text"}],"dataset":[],"description":"<b>Test</b>"},"Radio Stations":{"variables":[{"name":"Frequency","type":"text"},{"name":"City of License","type":"text"},{"name":"Licensee","type":"text"},{"name":"Format","type":"text"}],"dataset":[],"description":"<b>Test</b>"},"Public, Educational, and Governmental Access Channels":{"variables":[{"name":"Channels","type":"text"},{"name":"Address","type":"text"},{"name":"Contact Information","type":"text"}],"dataset":[],"description":"<b>Test</b>"}}},{"Internet Penetration":{}},{"Public Meetings":{}},{"Voting":{}},{"Organized Volunteerism":{}},{"Philanthropy":{}},{"Crime":{"Hate Groups (active statewide)":{"variables":[{"name":"Ideology","type":"URL"},{"name":"City","type":"text"},{"name":"Coordinates","type":"coordinates"}],"dataset":[{"name":"Nation of Islam","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore",[-76.682834,39.326912]]},{"name":"Barnes Review/Foundation for Economic Liberty, Inc.","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/holocaust-denial\">Holocaust Denial</a>","Upper Marlboro",[-76.74,38.81]]},{"name":"Heritage and Destiny","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/white-nationalist\">White Nationalist</a>","Silver Spring",[-77.03,39]]},{"name":"Maryland State Skinheads","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","Baltimore",[-76.61,39.29]]},{"name":"Council of Conservative Citizens","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/white-nationalist\">White Nationalist</a>","Silver Spring",[-77.039175,39.00415]]},{"name":"National Socialist Movement","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-nazi\">Neo-Nazi</a>","",[-76.64,39.04]]},{"name":"Israelite School of Universal Practical Knowledge","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore",[-76.61,39.29]]},{"name":"Israelite Church of God in Jesus Christ, The","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore",[-76.768277,39.336349]]},{"name":"League of the South","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-confederate\">Neo-Confederate</a>","Clements",[-76.727526,38.326544]]},{"name":"Jamaat al-Muslimeen","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/general-hate\">General Hate</a>","Baltimore",[-76.635495,39.305668]]},{"name":"Label 56","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/hate-music\">Hate Music</a>","Nottingham",[-76.488118,39.38775]]},{"name":"Confederate White Knights of the Ku Klux Klan","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/ku-klux-klan\">Ku Klux Klan</a>","Rosedale",[-76.51,39.32]]},{"name":"Southern National Congress","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-confederate\">Neo-Confederate</a>","",[-76.83,39.2]]},{"name":"East Coast Knights Of The True Invisible Empire","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/ku-klux-klan\">Ku Klux Klan</a>","Annapolis",[-76.49,38.97]]},{"name":"Refugee Resettlement Watch","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/anti-muslim\">Anti-Muslim</a>","Fairplay",[-77.74,39.53]]},{"name":"Crew 38","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","",[-76.64,39.04]]},{"name":"Be Active Front USA","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","",[-76.64,39.04]]},{"name":"The Daily Stormer","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-nazi\">Neo-Nazi</a>","Baltimore",[-76.61,39.29]]}],"description":"<b>Test</b>"},"Hate Crimes by Motivation":{"variables":[{"name":"Number","type":"number"},{"name":"Percent","type":"percent"}],"dataset":[{"name":"Race/Ethnicity/Alien","datapoints":[]},{"name":"Anti-White","subcategory":1,"datapoints":[]},{"name":"Anti-Black","subcategory":1,"datapoints":[]},{"name":"Anti-American Indian/Alaskan Native","subcategory":1,"datapoints":[]},{"name":"Anti-Asian","subcategory":1,"datapoints":[]},{"name":"Anti-Multiple Races, Group","subcategory":1,"datapoints":[]},{"name":"Anti-Native Hawaiian or Other Pacific Islander","subcategory":1,"datapoints":[]},{"name":"Anti-Arab","subcategory":1,"datapoints":[]},{"name":"Anti-Hispanic or Latino","subcategory":1,"datapoints":[]},{"name":"Anti-Other Race/Ethnicity/Ancestry","subcategory":1,"datapoints":[]},{"name":"Religion","datapoints":[]},{"name":"Anti-Jewish","subcategory":1,"datapoints":[]},{"name":"Anti-Catholic","subcategory":1,"datapoints":[]},{"name":"Anti-Protestant","subcategory":1,"datapoints":[]},{"name":"Anti-Islamic","subcategory":1,"datapoints":[]},{"name":"Anti-Other Religion","subcategory":1,"datapoints":[]},{"name":"Anti-Multiple Religions, Group","subcategory":1,"datapoints":[]},{"name":"Anti-Atheism/Agnosticism","subcategory":1,"datapoints":[]},{"name":"Sexual Orientation","datapoints":[]},{"name":"Anti-Male Gay","subcategory":1,"datapoints":[]},{"name":"Anti-Lesbian","subcategory":1,"datapoints":[]},{"name":"Anti-LGBT (Mixed Group)","subcategory":1,"datapoints":[]},{"name":"Anti-Heterosexual","subcategory":1,"datapoints":[]},{"name":"Anti-Bisexual","subcategory":1,"datapoints":[]},{"name":"Disability","datapoints":[]},{"name":"Anti-Physical Disability","subcategory":1,"datapoints":[]},{"name":"Anti-Mental Disability","subcategory":1,"datapoints":[]},{"name":"Gender","datapoints":[]},{"name":"Anti-Male","subcategory":1,"datapoints":[]},{"name":"Anti-Female","subcategory":1,"datapoints":[]},{"name":"Homelessness","datapoints":[]}],"description":"<b>Test</b>"},"Hate Crimes by Incident Type":{"variables":[{"name":"Number","type":"number"},{"name":"Percent","type":"percent"}],"dataset":[{"name":"Assault","datapoints":[]},{"name":"Vandalism","datapoints":[]},{"name":"Verbal Intimidation","datapoints":[]},{"name":"Written Intimidation","datapoints":[]},{"name":"Other","datapoints":[]}],"description":"<b>Test</b>"}}}])*/
  participantId = 3;
  surveyTemplate = 	{
	name: '',
	questionnaire: [
		{"Connection and Caring": [
			{question: "People in my community feel like they belong to the community.", type: "likert"},
			{question: "People in my community are committed to the well-being of the community.", type: "likert"},
			{question: "People in my community have hope about the future.", type: "likert"},
			{question: "People in my community help each other.", type: "likert"},
			{question: "My community treats people fairly no matter what their background is.", type: "likert"}
		],"aggregate":[null, null, null, null, null]},
		{"Resources": [
			{question: "My community supports programs for children and families.", type: "likert"},
			{question: "My community has resources it needs to take care of community problems (resources include, for example, money, information, technology, tools, raw materials, and services).", type: "likert"},
			{question: "My community has effective leaders.", type: "likert"},
			{question: "People in my community are able to get the services they need.", type: "likert"},
			{question: "People in my community know where to go to get things done.", type: "likert"}
		],"aggregate":[null, null, null, null, null]},
		{"Transformative Potential": [
			{question: "My community works with organizations and agencies outside the community to get things done.", type: "likert"},
			{question: "People in my community communicate with leaders who can help improve the community.", type: "likert"},
			{question: "People in my community work together to improve the community.", type: "likert"},
			{question: "My community looks at its successes and failures so it can learn from the past.", type: "likert"},
			{question: "My community develops skills and finds resources to solve its problems and reach its goals.", type: "likert"},
			{question: "My community has priorities and sets goals for the future.", type: "likert"}
		],"aggregate":[null, null, null, null, null, null]},
		{"Disaster Mgmt.": [
			{question: "My community tries to prevent disasters.", type: "likert"},
			{question: "My community actively prepares for future disasters.", type: "likert"},
			{question: "My community can provide emergency services during a disaster.", type: "likert"},
			{question: "My community has services and programs to help people after a disaster.", type: "likert"}
		],"aggregate":[null, null, null, null]},
		{"Information and Comm.": [
			{question: "My community keeps people informed (for example, via television, radio, newspaper, Internet, phone, neighbors) about issues that are relevant to them.", type: "likert"},
			{question: "If a disaster occurs, my community provides information about what to do.", type: "likert"},
			{question: "I get information/communication through my community to help with my home and work life.", type: "likert"},
			{question: "People in my community trust public officials.", type: "likert"}
		],"aggregate":[null, null, null, null]}
	]
  };

  handleGeneration = (stateAbbr, stateFips, stateName, countyFips, countyName, placeFips, placeType, placeName, overlays) => {

	var assessURL = encodeURI(BACKEND + 'assess?state-abbr=' + stateAbbr + '&state-fips=' + stateFips + '&state-name=' + stateName + '&county-fips=' + countyFips + '&county-name=' + countyName + '&place-fips=' + placeFips + '&place-type=' +  placeType + '&place-name=' + placeName + '&overlays=' + JSON.stringify(overlays));
	fetch(assessURL).then(function(response) {
		if(response.ok) {
			return response.json();
		}
		throw new Error('Network response was not ok.');
	}).then(function(profile) {
		console.log(profile);
		this.setState({jurisdiction: profile.jurisdiction, overlays: profile.overlays, population: profile.population, data: fromJS(profile.data)});
	}.bind(this)).catch(function(error) {
		this.setState({jurisdiction: {"state":{"name":"Maryland","abbreviation":"MD","code":"24"},"county":{"name":"Prince George's County","code":"033"},"place":{"name":"Langley Park","type":"Census Designated Place","code":"45525"}}, overlays: ["radicalization"], population: 19517, data: fromJS([{"Demographics":{"Age":{"variables":["Percent","% of Male Population","% of Female Population"],"types":["percent","percent","percent"],"dataset":[{"name":"Under 5 years","datapoints":["9.8%","8.08%","12.31%"]},{"name":"5 to 9 years","datapoints":["7.7%","7.53%","7.90%"]},{"name":"10 to 14 years","datapoints":["5.1%","4.00%","6.74%"]},{"name":"15 to 17 years","datapoints":["1.9%","1.28%","2.79%"]},{"name":"18 and 19 years","datapoints":["1.7%","1.52%","1.84%"]},{"name":"20 years","datapoints":["1.5%","1.68%","1.33%"]},{"name":"21 years","datapoints":["0.8%","0.94%","0.63%"]},{"name":"22 to 24 years","datapoints":["5.4%","6.53%","3.80%"]},{"name":"25 to 29 years","datapoints":["13.0%","13.50%","12.21%"]},{"name":"30 to 34 years","datapoints":["12.9%","14.81%","10.25%"]},{"name":"35 to 39 years","datapoints":["11.0%","11.70%","10.07%"]},{"name":"40 to 44 years","datapoints":["8.0%","8.46%","7.30%"]},{"name":"45 to 49 years","datapoints":["6.5%","6.50%","6.43%"]},{"name":"50 to 54 years","datapoints":["4.5%","4.71%","4.12%"]},{"name":"55 to 59 years","datapoints":["3.3%","3.17%","3.56%"]},{"name":"60 and 61 years","datapoints":["1.3%","1.19%","1.51%"]},{"name":"62 to 64 years","datapoints":["1.2%","0.91%","1.71%"]},{"name":"65 and 66 years","datapoints":["1.0%","0.77%","1.34%"]},{"name":"67 to 69 years","datapoints":["0.9%","0.82%","0.99%"]},{"name":"70 to 74 years","datapoints":["1.1%","0.89%","1.44%"]},{"name":"75 to 79 years","datapoints":["0.4%","0.36%","0.55%"]},{"name":"80 to 84 years","datapoints":["0.8%","0.59%","0.99%"]},{"name":"85 years and over","datapoints":["0.1%","0.06%","0.21%"]}],"description":"<b>Test</b>","males":11367,"females":8150,"sexRatio":139.4723926380368},"Language (population Age 5 and older)":{"variables":["Estimate","Percent","Speak English \"very well\"","Percent","Speak English less than \"very well\"","Percent"],"types":["number","percent","percent","percent","percent","percent"],"dataset":[{"name":"","datapoints":["","","","","",""]}],"description":"<b>Test</b>"},"Disabilities":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"With a hearing difficulty","datapoints":[]},{"name":"With a vision difficulty","datapoints":[]},{"name":"With a cognitive difficulty","datapoints":[]},{"name":"With an ambulatory difficulty","datapoints":[]},{"name":"With a self-care difficulty","datapoints":[]}],"description":"<b>Test</b>"},"Marital Status":{"variables":["Estimate","Never Married","Now Married","Divorced","Separated","Widowed"],"types":["number","percent","percent","percent","percent","percent"],"dataset":[{"name":"Male population 15 years and over","datapoints":[9137,"69.97%","27.57%","2.18%","2.89%","0.28%"]},{"name":"Female population 15 years and over","datapoints":[5954,"54.06%","34.82%","7.15%","3.95%","3.96%"]}],"marriageableAge":null,"description":"<b>Test</b>"},"Race and Ethnicity":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"White","datapoints":[2998,"15.36%"]},{"name":"Black or African American","datapoints":[2374,"12.16%"]},{"name":"American Indian and Alaska Native","datapoints":[175,"0.90%"]},{"name":"Apache","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Arapaho","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Blackfeet","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Canadian and French American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Central American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cherokee","subcategory":1,"datapoints":[57,"0.29%"]},{"name":"Cheyenne","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Chickasaw","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Chippewa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Choctaw","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Colville","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Comanche","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cree","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Creek","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Crow","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Delaware","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Hopi","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Houma","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Iroquois","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Kiowa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Lumbee","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Menominee","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Mexican American Indian","subcategory":1,"datapoints":[101,"0.52%"]},{"name":"Navajo","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Osage","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Ottawa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Paiute","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pima","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Potawatomi","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pueblo","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Puget Sound Salish","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Seminole","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Shoshone","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Sioux","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"South American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Spanish American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tohono O'Odham","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Ute","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yakama","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yaqui","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yuman","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"All Other Tribes","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Alaskan Athabascan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Aleut","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Inupiat","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tlingit-Haida","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tsimshian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yup'ik","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Not Specified","subcategory":1,"datapoints":[75,"0.38%"]},{"name":"Asian","datapoints":[369,"1.89%"]},{"name":"Indian","subcategory":1,"datapoints":[111,"0.57%"]},{"name":"Bangladeshi","subcategory":1,"datapoints":[27,"0.14%"]},{"name":"Bhutanese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Burmese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cambodian","subcategory":1,"datapoints":[29,"0.15%"]},{"name":"Chinese (except Taiwanese)","subcategory":1,"datapoints":[26,"0.13%"]},{"name":"Filipino","subcategory":1,"datapoints":[8,"0.04%"]},{"name":"Hmong","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Indonesian","subcategory":1,"datapoints":[101,"0.52%"]},{"name":"Japanese","subcategory":1,"datapoints":[20,"0.10%"]},{"name":"Korean","subcategory":1,"datapoints":[17,"0.09%"]},{"name":"Laotian","subcategory":1,"datapoints":[119,"0.61%"]},{"name":"Malaysian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Mongolian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Nepalese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Okinawan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pakistani","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Sri Lankan","subcategory":1,"datapoints":[11,"0.06%"]},{"name":"Taiwanese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Thai","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Vietnamese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Asian, Specified","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Asian, Not Specified","subcategory":1,"datapoints":[61,"0.31%"]},{"name":"Native Hawaiian and Other Pacific Islander","datapoints":[0,"0.00%"]},{"name":"Native Hawaiian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Samoan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tongan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Polynesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Guamanian or Chamorro","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Marshallese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Micronesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Fijian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Melanesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Pacific Islander, Not Specified","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Hispanic or Latino","datapoints":[16031,"82.14%"]},{"name":"Mexican","subcategory":1,"datapoints":[852,"4.37%"]},{"name":"Puerto Rican","subcategory":1,"datapoints":[104,"0.53%"]},{"name":"Cuban","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Dominican","subcategory":1,"datapoints":[163,"0.84%"]},{"name":"Central American","subcategory":1,"datapoints":[14567,"74.64%"]},{"name":"Costa Rican","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Guatemalan","subcategory":2,"datapoints":[7818,"40.06%"]},{"name":"Honduran","subcategory":2,"datapoints":[1020,"5.23%"]},{"name":"Nicaraguan","subcategory":2,"datapoints":[152,"0.78%"]},{"name":"Panamanian","subcategory":2,"datapoints":[9,"0.05%"]},{"name":"Salvadoran","subcategory":2,"datapoints":[5568,"28.53%"]},{"name":"Other Central American","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"South American","subcategory":1,"datapoints":[269,"1.38%"]},{"name":"Argentinean","subcategory":2,"datapoints":[21,"0.11%"]},{"name":"Bolivian","subcategory":2,"datapoints":[93,"0.48%"]},{"name":"Chilean","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Colombian","subcategory":2,"datapoints":[5,"0.03%"]},{"name":"Ecuadorian","subcategory":2,"datapoints":[22,"0.11%"]},{"name":"Paraguayan","subcategory":2,"datapoints":[9,"0.05%"]},{"name":"Peruvian","subcategory":2,"datapoints":[119,"0.61%"]},{"name":"Uruguayan","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Venezuelan","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Other South American","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Other Hispanic or Latino","subcategory":1,"datapoints":[76,"0.39%"]},{"name":"Spaniard","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Spanish","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Spanish American","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"All other Hispanic or Latino","subcategory":2,"datapoints":[76,"0.39%"]},{"name":"Other race","datapoints":[13255,"67.92%"]},{"name":"Two or more races","datapoints":[346,"1.77%"]}],"description":"<b>Test</b>"},"Employment Status (by age)":{"variables":["Estimate","Labor Force Participation","Employment/Pop. Ratio","Unemployment Rate"],"types":["number","percent","percent","percent"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Educational Attainment":{"variables":["Estimate","Labor Force Participation","Employment/Pop. Ratio","Unemployment Rate"],"types":["number","percent","percent","percent"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Nativity":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"U.S. citizen, born in the United States","datapoints":[6767,"34.67%"]},{"name":"U.S. citizen, born in Puerto Rico or U.S. Island Areas","datapoints":[56,"0.29%"]},{"name":"U.S. citizen, born abroad of American parent(s)","datapoints":[136,"0.70%"]},{"name":"U.S. citizen by naturalization","datapoints":[1227,"6.29%"]},{"name":"Not a U.S. citizen","datapoints":[11331,"58.06%"]}],"description":"<b>Test</b>"},"Poverty Status (by age)":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"At or below poverty level","datapoints":[3491,"17.93%"]},{"name":"Under 6 years","subcategory":1,"datapoints":[561,"2.88%"]},{"name":"6 to 11 years","subcategory":1,"datapoints":[539,"2.77%"]},{"name":"12 to 17 years","subcategory":1,"datapoints":[175,"0.90%"]},{"name":"18 to 59 years","subcategory":1,"datapoints":[2101,"10.79%"]},{"name":"60 to 74 years","subcategory":1,"datapoints":[115,"0.59%"]},{"name":"75 to 84 years","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"85 years and over","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"At or above poverty level","datapoints":[15978,"82.07%"]},{"name":"Under 6 years","subcategory":1,"datapoints":[1621,"8.33%"]},{"name":"6 to 11 years","subcategory":1,"datapoints":[1230,"6.32%"]},{"name":"12 to 17 years","subcategory":1,"datapoints":[625,"3.21%"]},{"name":"18 to 59 years","subcategory":1,"datapoints":[11270,"57.89%"]},{"name":"60 to 74 years","subcategory":1,"datapoints":[974,"5.00%"]},{"name":"75 to 84 years","subcategory":1,"datapoints":[234,"1.20%"]},{"name":"85 years and over","subcategory":1,"datapoints":[24,"0.12%"]}],"description":"<b>Test</b>"}}},{"Household":{"Household Type":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"Family households","datapoints":[3571,"71.23%"]},{"name":"Married-couple family","subcategory":1,"datapoints":[1423,"28.39%"]},{"name":"Other family","subcategory":1,"datapoints":[2148,"42.85%"]},{"name":"Male householder, no wife present","subcategory":2,"datapoints":[1310,"26.13%"]},{"name":"Female householder, no husband present","subcategory":2,"datapoints":[838,"16.72%"]},{"name":"Nonfamily households","datapoints":[1442,"28.77%"]},{"name":"Householder living alone","subcategory":1,"datapoints":[788,"15.72%"]},{"name":"Householder not living alone","subcategory":1,"datapoints":[654,"13.05%"]}],"description":"<b>Test</b>"},"Households (with children under 18) receiving public assistance":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"Total receiving public assistance in the past 12 months","datapoints":[1780,"37.09%"]},{"name":"Living in family households","subcategory":1,"datapoints":[1780,"37.09%"]},{"name":"Married-couple family","subcategory":2,"datapoints":[564,"11.75%"]},{"name":"Male householder, no wife present, family","subcategory":2,"datapoints":[428,"8.92%"]},{"name":"Female householder, no husband present, family","subcategory":2,"datapoints":[788,"16.42%"]},{"name":"Living in nonfamily households","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Total not receiving public assistance in the past 12 months","datapoints":[3019,"62.91%"]},{"name":"Living in family households","subcategory":1,"datapoints":[3019,"62.91%"]},{"name":"Married-couple family","subcategory":2,"datapoints":[1265,"26.36%"]},{"name":"Male householder, no wife present, family","subcategory":2,"datapoints":[1040,"21.67%"]},{"name":"Female householder, no husband present, family","subcategory":2,"datapoints":[714,"14.88%"]},{"name":"Living in nonfamily households","subcategory":1,"datapoints":[0,"0.00%"]}],"description":"<b>Test</b>"}}},{"Housing":{"Transitional Housing":{"variables":["Contact","Address","Eligibility Notes","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"}}},{"Education":{"Colleges and Universities":{"variables":["Type","Enrollment","Address"],"types":["text","integer","address"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"}}},{"Business, Occupational, and Economic":{}},{"Transportation":{"Transportation Assistance Programs":{"variables":["Contact","Address","Eligibility Notes","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"}}},{"Health and Human Services":{"Hospitals":{"variables":["Beds","Operated By","Address"],"types":["integer","text","address"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Food Banks":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Clothing Banks":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Shelters":{"variables":["Type","Contact","Address","Eligibility Notes","Services Provided"],"types":["text","telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","","",""]}],"description":"<b>Test</b>"},"Clinics":{"variables":["Operated By","Address","Remarks"],"types":["text","address","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Nursing Homes":{"variables":["Operated By","Address","Remarks"],"types":["text","address","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Assisted Living Facilities":{"variables":["Type","Contact","Address","Eligibility Notes","Services Provided"],"types":["text","telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","","",""]}],"description":"<b>Test</b>"},"Crisis Intervention Programs":{"variables":["Contact","Address","Eligibility Notes","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Advocacy Groups":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Community Mental Health Centers/Counseling":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Foreign Born Services":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"GED Programs":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Hotlines":{"variables":["Hotline Number","Remarks"],"types":["telephone","text"],"dataset":[{"name":"","datapoints":["",""]}],"description":"<b>Test</b>"},"Housing Difficulty Assistance":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Legal Assistance":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Learning and Other Disabilities Assistance":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"LGBT Programs and Support":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Parent/Family Support Services":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"School Programs":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Youth Services":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Abuse and Assault Programs":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Drug and Alcohol Programs":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"}}},{"Recreational Opportunities":{"Community Centers":{"variables":["Contact","Address","Programs and Facilities"],"types":["telephone","address","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Recreation Centers":{"variables":["Contact","Address","Programs and Facilities"],"types":["telephone","address","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Parks":{"variables":["Address","Programs and Facilities"],"types":["address","text"],"dataset":[{"name":"","datapoints":["",""]}],"description":"<b>Test</b>"}}},{"Media":{"Newspapers":{"variables":["Circulation","Parent Organization","Remarks"],"types":["text","text","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Radio Stations":{"variables":["Frequency","City of License","Licensee","Format"],"types":["text","text","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Public, Educational, and Governmental Access Channels":{"variables":["Channels","Address","Contact Information"],"types":["text","text","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"}}},{"Internet Penetration":{}},{"Public Meetings":{}},{"Voting":{}},{"Organized Volunteerism":{}},{"Philanthropy":{}},{"Crime":{"Hate Groups (active statewide)":{"variables":["Ideology","City","Coordinates"],"types":["URL","text","coordinates"],"dataset":[{"name":"Nation of Islam","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore","-76.682834,39.326912"]},{"name":"Barnes Review/Foundation for Economic Liberty, Inc.","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/holocaust-denial\">Holocaust Denial</a>","Upper Marlboro","-76.74,38.81"]},{"name":"Heritage and Destiny","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/white-nationalist\">White Nationalist</a>","Silver Spring","-77.03,39"]},{"name":"Maryland State Skinheads","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","Baltimore","-76.61,39.29"]},{"name":"Council of Conservative Citizens","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/white-nationalist\">White Nationalist</a>","Silver Spring","-77.039175,39.00415"]},{"name":"National Socialist Movement","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-nazi\">Neo-Nazi</a>","","-76.64,39.04"]},{"name":"Israelite School of Universal Practical Knowledge","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore","-76.61,39.29"]},{"name":"Israelite Church of God in Jesus Christ, The","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore","-76.768277,39.336349"]},{"name":"League of the South","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-confederate\">Neo-Confederate</a>","Clements","-76.727526,38.326544"]},{"name":"Jamaat al-Muslimeen","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/general-hate\">General Hate</a>","Baltimore","-76.635495,39.305668"]},{"name":"Label 56","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/hate-music\">Hate Music</a>","Nottingham","-76.488118,39.38775"]},{"name":"Confederate White Knights of the Ku Klux Klan","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/ku-klux-klan\">Ku Klux Klan</a>","Rosedale","-76.51,39.32"]},{"name":"Southern National Congress","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-confederate\">Neo-Confederate</a>","","-76.83,39.2"]},{"name":"East Coast Knights Of The True Invisible Empire","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/ku-klux-klan\">Ku Klux Klan</a>","Annapolis","-76.49,38.97"]},{"name":"Refugee Resettlement Watch","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/anti-muslim\">Anti-Muslim</a>","Fairplay","-77.74,39.53"]},{"name":"Crew 38","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","","-76.64,39.04"]},{"name":"Be Active Front USA","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","","-76.64,39.04"]},{"name":"The Daily Stormer","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-nazi\">Neo-Nazi</a>","Baltimore","-76.61,39.29"]}],"description":"<b>Test</b>"},"Hate Crime by Motivation":{"variables":["Number","Percent"],"types":["number","percent"],"dataset":[{"name":"Race/Ethnicity/Alien","datapoints":["",""]},{"name":"Anti-American Indian/Alaskan Native","subcategory":1,"datapoints":["",""]},{"name":"Anti-Arab","subcategory":1,"datapoints":["",""]},{"name":"Anti-Asian","subcategory":1,"datapoints":["",""]},{"name":"Anti-Black","subcategory":1,"datapoints":["",""]},{"name":"Anti-Hispanic or Latino","subcategory":1,"datapoints":["",""]},{"name":"Anti-Native Hawaiian or Other Pacific Islander","subcategory":1,"datapoints":["",""]},{"name":"Anti-White","subcategory":1,"datapoints":["",""]},{"name":"Anti-Other Race/Ethnicity/Ancestry","subcategory":1,"datapoints":["",""]},{"name":"Anti-Multiple Races, Group","subcategory":1,"datapoints":["",""]},{"name":"Religion","datapoints":["",""]},{"name":"Anti-Jewish","subcategory":1,"datapoints":["",""]},{"name":"Anti-Catholic","subcategory":1,"datapoints":["",""]},{"name":"Anti-Protestant","subcategory":1,"datapoints":["",""]},{"name":"Anti-Islamic","subcategory":1,"datapoints":["",""]},{"name":"Anti-Other Religion","subcategory":1,"datapoints":["",""]},{"name":"Anti-Multiple Religions, Group","subcategory":1,"datapoints":["",""]},{"name":"Anti-Atheism/Agnosticism","subcategory":1,"datapoints":["",""]},{"name":"Sexual Orientation","datapoints":["",""]},{"name":"Anti-Male Gay","subcategory":1,"datapoints":["",""]},{"name":"Anti-Lesbian","subcategory":1,"datapoints":["",""]},{"name":"Anti-Heterosexual","subcategory":1,"datapoints":["",""]},{"name":"Anti-Physical Disability","subcategory":1,"datapoints":["",""]},{"name":"Anti-Bisexual","subcategory":1,"datapoints":["",""]},{"name":"Anti-LGBT (Mixed Group)","subcategory":1,"datapoints":["",""]},{"name":"Disability","datapoints":["",""]},{"name":"Anti-Physical Disability","subcategory":1,"datapoints":["",""]},{"name":"Anti-Mental Disability","subcategory":1,"datapoints":["",""]},{"name":"Gender","datapoints":["",""]},{"name":"Anti-Female","subcategory":1,"datapoints":["",""]},{"name":"Anti-Male","subcategory":1,"datapoints":["",""]},{"name":"Homelessness","datapoints":["",""]}],"description":"<b>Test</b>"},"Hate Crime by Incident Type":{"variables":["Number","Percent"],"types":["number","percent"],"dataset":[{"name":"Assault","datapoints":["",""]},{"name":"Vandalism","datapoints":["",""]},{"name":"Verbal Intimidation","datapoints":["",""]},{"name":"Written Intimidation","datapoints":["",""]},{"name":"Other","datapoints":["",""]}],"description":"<b>Test</b>"}}}])});
		console.log('There has been a problem with your fetch operation: ' + error.message);
	}.bind(this));
	/*this.setState({frame:{activeTab: '8', active:true},jurisdiction: {"state":{"name":"Maryland","abbreviation":"MD","code":"24"},"county":{"name":"Prince George's County","code":"033"},"place":{"name":"Langley Park","type":"Census Designated Place","code":"45525"}}, overlays: ["radicalization"], population: 19517, data: fromJS([{"Demographics":{"Age":{"variables":["Percent","% of Male Population","% of Female Population"],"types":["percent","percent","percent"],"dataset":[{"name":"Under 5 years","datapoints":["9.8%","8.08%","12.31%"]},{"name":"5 to 9 years","datapoints":["7.7%","7.53%","7.90%"]},{"name":"10 to 14 years","datapoints":["5.1%","4.00%","6.74%"]},{"name":"15 to 17 years","datapoints":["1.9%","1.28%","2.79%"]},{"name":"18 and 19 years","datapoints":["1.7%","1.52%","1.84%"]},{"name":"20 years","datapoints":["1.5%","1.68%","1.33%"]},{"name":"21 years","datapoints":["0.8%","0.94%","0.63%"]},{"name":"22 to 24 years","datapoints":["5.4%","6.53%","3.80%"]},{"name":"25 to 29 years","datapoints":["13.0%","13.50%","12.21%"]},{"name":"30 to 34 years","datapoints":["12.9%","14.81%","10.25%"]},{"name":"35 to 39 years","datapoints":["11.0%","11.70%","10.07%"]},{"name":"40 to 44 years","datapoints":["8.0%","8.46%","7.30%"]},{"name":"45 to 49 years","datapoints":["6.5%","6.50%","6.43%"]},{"name":"50 to 54 years","datapoints":["4.5%","4.71%","4.12%"]},{"name":"55 to 59 years","datapoints":["3.3%","3.17%","3.56%"]},{"name":"60 and 61 years","datapoints":["1.3%","1.19%","1.51%"]},{"name":"62 to 64 years","datapoints":["1.2%","0.91%","1.71%"]},{"name":"65 and 66 years","datapoints":["1.0%","0.77%","1.34%"]},{"name":"67 to 69 years","datapoints":["0.9%","0.82%","0.99%"]},{"name":"70 to 74 years","datapoints":["1.1%","0.89%","1.44%"]},{"name":"75 to 79 years","datapoints":["0.4%","0.36%","0.55%"]},{"name":"80 to 84 years","datapoints":["0.8%","0.59%","0.99%"]},{"name":"85 years and over","datapoints":["0.1%","0.06%","0.21%"]}],"description":"<b>Test</b>","males":11367,"females":8150,"sexRatio":139.4723926380368},"Language (population Age 5 and older)":{"variables":["Estimate","Percent","Speak English \"very well\"","Percent","Speak English less than \"very well\"","Percent"],"types":["number","percent","percent","percent","percent","percent"],"dataset":[{"name":"","datapoints":["","","","","",""]}],"description":"<b>Test</b>"},"Disabilities":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"With a hearing difficulty","datapoints":[]},{"name":"With a vision difficulty","datapoints":[]},{"name":"With a cognitive difficulty","datapoints":[]},{"name":"With an ambulatory difficulty","datapoints":[]},{"name":"With a self-care difficulty","datapoints":[]}],"description":"<b>Test</b>"},"Marital Status":{"variables":["Estimate","Never Married","Now Married","Divorced","Separated","Widowed"],"types":["number","percent","percent","percent","percent","percent"],"dataset":[{"name":"Male population 15 years and over","datapoints":[9137,"69.97%","27.57%","2.18%","2.89%","0.28%"]},{"name":"Female population 15 years and over","datapoints":[5954,"54.06%","34.82%","7.15%","3.95%","3.96%"]}],"marriageableAge":null,"description":"<b>Test</b>"},"Race and Ethnicity":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"White","datapoints":[2998,"15.36%"]},{"name":"Black or African American","datapoints":[2374,"12.16%"]},{"name":"American Indian and Alaska Native","datapoints":[175,"0.90%"]},{"name":"Apache","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Arapaho","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Blackfeet","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Canadian and French American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Central American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cherokee","subcategory":1,"datapoints":[57,"0.29%"]},{"name":"Cheyenne","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Chickasaw","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Chippewa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Choctaw","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Colville","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Comanche","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cree","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Creek","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Crow","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Delaware","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Hopi","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Houma","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Iroquois","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Kiowa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Lumbee","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Menominee","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Mexican American Indian","subcategory":1,"datapoints":[101,"0.52%"]},{"name":"Navajo","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Osage","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Ottawa","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Paiute","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pima","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Potawatomi","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pueblo","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Puget Sound Salish","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Seminole","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Shoshone","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Sioux","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"South American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Spanish American Indian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tohono O'Odham","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Ute","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yakama","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yaqui","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yuman","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"All Other Tribes","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Alaskan Athabascan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Aleut","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Inupiat","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tlingit-Haida","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tsimshian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Yup'ik","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Not Specified","subcategory":1,"datapoints":[75,"0.38%"]},{"name":"Asian","datapoints":[369,"1.89%"]},{"name":"Indian","subcategory":1,"datapoints":[111,"0.57%"]},{"name":"Bangladeshi","subcategory":1,"datapoints":[27,"0.14%"]},{"name":"Bhutanese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Burmese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Cambodian","subcategory":1,"datapoints":[29,"0.15%"]},{"name":"Chinese (except Taiwanese)","subcategory":1,"datapoints":[26,"0.13%"]},{"name":"Filipino","subcategory":1,"datapoints":[8,"0.04%"]},{"name":"Hmong","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Indonesian","subcategory":1,"datapoints":[101,"0.52%"]},{"name":"Japanese","subcategory":1,"datapoints":[20,"0.10%"]},{"name":"Korean","subcategory":1,"datapoints":[17,"0.09%"]},{"name":"Laotian","subcategory":1,"datapoints":[119,"0.61%"]},{"name":"Malaysian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Mongolian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Nepalese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Okinawan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Pakistani","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Sri Lankan","subcategory":1,"datapoints":[11,"0.06%"]},{"name":"Taiwanese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Thai","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Vietnamese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Asian, Specified","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Asian, Not Specified","subcategory":1,"datapoints":[61,"0.31%"]},{"name":"Native Hawaiian and Other Pacific Islander","datapoints":[0,"0.00%"]},{"name":"Native Hawaiian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Samoan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Tongan","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Polynesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Guamanian or Chamorro","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Marshallese","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Micronesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Fijian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Melanesian","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Other Pacific Islander, Not Specified","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Hispanic or Latino","datapoints":[16031,"82.14%"]},{"name":"Mexican","subcategory":1,"datapoints":[852,"4.37%"]},{"name":"Puerto Rican","subcategory":1,"datapoints":[104,"0.53%"]},{"name":"Cuban","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Dominican","subcategory":1,"datapoints":[163,"0.84%"]},{"name":"Central American","subcategory":1,"datapoints":[14567,"74.64%"]},{"name":"Costa Rican","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Guatemalan","subcategory":2,"datapoints":[7818,"40.06%"]},{"name":"Honduran","subcategory":2,"datapoints":[1020,"5.23%"]},{"name":"Nicaraguan","subcategory":2,"datapoints":[152,"0.78%"]},{"name":"Panamanian","subcategory":2,"datapoints":[9,"0.05%"]},{"name":"Salvadoran","subcategory":2,"datapoints":[5568,"28.53%"]},{"name":"Other Central American","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"South American","subcategory":1,"datapoints":[269,"1.38%"]},{"name":"Argentinean","subcategory":2,"datapoints":[21,"0.11%"]},{"name":"Bolivian","subcategory":2,"datapoints":[93,"0.48%"]},{"name":"Chilean","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Colombian","subcategory":2,"datapoints":[5,"0.03%"]},{"name":"Ecuadorian","subcategory":2,"datapoints":[22,"0.11%"]},{"name":"Paraguayan","subcategory":2,"datapoints":[9,"0.05%"]},{"name":"Peruvian","subcategory":2,"datapoints":[119,"0.61%"]},{"name":"Uruguayan","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Venezuelan","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Other South American","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Other Hispanic or Latino","subcategory":1,"datapoints":[76,"0.39%"]},{"name":"Spaniard","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Spanish","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"Spanish American","subcategory":2,"datapoints":[0,"0.00%"]},{"name":"All other Hispanic or Latino","subcategory":2,"datapoints":[76,"0.39%"]},{"name":"Other race","datapoints":[13255,"67.92%"]},{"name":"Two or more races","datapoints":[346,"1.77%"]}],"description":"<b>Test</b>"},"Employment Status (by age)":{"variables":["Estimate","Labor Force Participation","Employment/Pop. Ratio","Unemployment Rate"],"types":["number","percent","percent","percent"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Educational Attainment":{"variables":["Estimate","Labor Force Participation","Employment/Pop. Ratio","Unemployment Rate"],"types":["number","percent","percent","percent"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Nativity":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"U.S. citizen, born in the United States","datapoints":[6767,"34.67%"]},{"name":"U.S. citizen, born in Puerto Rico or U.S. Island Areas","datapoints":[56,"0.29%"]},{"name":"U.S. citizen, born abroad of American parent(s)","datapoints":[136,"0.70%"]},{"name":"U.S. citizen by naturalization","datapoints":[1227,"6.29%"]},{"name":"Not a U.S. citizen","datapoints":[11331,"58.06%"]}],"description":"<b>Test</b>"},"Poverty Status (by age)":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"At or below poverty level","datapoints":[3491,"17.93%"]},{"name":"Under 6 years","subcategory":1,"datapoints":[561,"2.88%"]},{"name":"6 to 11 years","subcategory":1,"datapoints":[539,"2.77%"]},{"name":"12 to 17 years","subcategory":1,"datapoints":[175,"0.90%"]},{"name":"18 to 59 years","subcategory":1,"datapoints":[2101,"10.79%"]},{"name":"60 to 74 years","subcategory":1,"datapoints":[115,"0.59%"]},{"name":"75 to 84 years","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"85 years and over","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"At or above poverty level","datapoints":[15978,"82.07%"]},{"name":"Under 6 years","subcategory":1,"datapoints":[1621,"8.33%"]},{"name":"6 to 11 years","subcategory":1,"datapoints":[1230,"6.32%"]},{"name":"12 to 17 years","subcategory":1,"datapoints":[625,"3.21%"]},{"name":"18 to 59 years","subcategory":1,"datapoints":[11270,"57.89%"]},{"name":"60 to 74 years","subcategory":1,"datapoints":[974,"5.00%"]},{"name":"75 to 84 years","subcategory":1,"datapoints":[234,"1.20%"]},{"name":"85 years and over","subcategory":1,"datapoints":[24,"0.12%"]}],"description":"<b>Test</b>"}}},{"Household":{"Household Type":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"Family households","datapoints":[3571,"71.23%"]},{"name":"Married-couple family","subcategory":1,"datapoints":[1423,"28.39%"]},{"name":"Other family","subcategory":1,"datapoints":[2148,"42.85%"]},{"name":"Male householder, no wife present","subcategory":2,"datapoints":[1310,"26.13%"]},{"name":"Female householder, no husband present","subcategory":2,"datapoints":[838,"16.72%"]},{"name":"Nonfamily households","datapoints":[1442,"28.77%"]},{"name":"Householder living alone","subcategory":1,"datapoints":[788,"15.72%"]},{"name":"Householder not living alone","subcategory":1,"datapoints":[654,"13.05%"]}],"description":"<b>Test</b>"},"Households (with children under 18) receiving public assistance":{"variables":["Estimate","Percent"],"types":["number","percent"],"dataset":[{"name":"Total receiving public assistance in the past 12 months","datapoints":[1780,"37.09%"]},{"name":"Living in family households","subcategory":1,"datapoints":[1780,"37.09%"]},{"name":"Married-couple family","subcategory":2,"datapoints":[564,"11.75%"]},{"name":"Male householder, no wife present, family","subcategory":2,"datapoints":[428,"8.92%"]},{"name":"Female householder, no husband present, family","subcategory":2,"datapoints":[788,"16.42%"]},{"name":"Living in nonfamily households","subcategory":1,"datapoints":[0,"0.00%"]},{"name":"Total not receiving public assistance in the past 12 months","datapoints":[3019,"62.91%"]},{"name":"Living in family households","subcategory":1,"datapoints":[3019,"62.91%"]},{"name":"Married-couple family","subcategory":2,"datapoints":[1265,"26.36%"]},{"name":"Male householder, no wife present, family","subcategory":2,"datapoints":[1040,"21.67%"]},{"name":"Female householder, no husband present, family","subcategory":2,"datapoints":[714,"14.88%"]},{"name":"Living in nonfamily households","subcategory":1,"datapoints":[0,"0.00%"]}],"description":"<b>Test</b>"}}},{"Housing":{"Transitional Housing":{"variables":["Contact","Address","Eligibility Notes","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"}}},{"Education":{"Colleges and Universities":{"variables":["Type","Enrollment","Address"],"types":["text","integer","address"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"}}},{"Business, Occupational, and Economic":{}},{"Transportation":{"Transportation Assistance Programs":{"variables":["Contact","Address","Eligibility Notes","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"}}},{"Health and Human Services":{"Hospitals":{"variables":["Beds","Operated By","Address"],"types":["integer","text","address"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Food Banks":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Clothing Banks":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Shelters":{"variables":["Type","Contact","Address","Eligibility Notes","Services Provided"],"types":["text","telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","","",""]}],"description":"<b>Test</b>"},"Clinics":{"variables":["Operated By","Address","Remarks"],"types":["text","address","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Nursing Homes":{"variables":["Operated By","Address","Remarks"],"types":["text","address","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Assisted Living Facilities":{"variables":["Type","Contact","Address","Eligibility Notes","Services Provided"],"types":["text","telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","","",""]}],"description":"<b>Test</b>"},"Crisis Intervention Programs":{"variables":["Contact","Address","Eligibility Notes","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Advocacy Groups":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Community Mental Health Centers/Counseling":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Foreign Born Services":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"GED Programs":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Hotlines":{"variables":["Hotline Number","Remarks"],"types":["telephone","text"],"dataset":[{"name":"","datapoints":["",""]}],"description":"<b>Test</b>"},"Housing Difficulty Assistance":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Legal Assistance":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Learning and Other Disabilities Assistance":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"LGBT Programs and Support":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Parent/Family Support Services":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"School Programs":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Youth Services":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Abuse and Assault Programs":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Drug and Alcohol Programs":{"variables":["Contact","Address","Eligibility/Target Population","Services Provided"],"types":["telephone","address","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"}}},
		{"Recreational Opportunities":{
			"Community Centers":{
				"variables":["Contact","Address","Programs and Facilities"],
				"types":["telephone","address","text"],
				"dataset":[{"name":"","datapoints":["","",""]}],
				"description":"<b>Test</b>"}
			,"Recreation Centers":{
				"variables":["Contact","Address","Programs and Facilities"],
				"types":["telephone","address","text"],
				"dataset":[{"name":"","datapoints":["","",""]}],
				"description":"<b>Test</b>"}
			,"Parks":{
				"variables":["Address","Programs and Facilities"],
				"types":["address","text"],
				"dataset":[{"name":"","datapoints":["",""]}],
				"description":"<b>Test</b>"}}}
			,{"Media":{"Newspapers":{"variables":["Circulation","Parent Organization","Remarks"],"types":["text","text","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"},"Radio Stations":{"variables":["Frequency","City of License","Licensee","Format"],"types":["text","text","text","text"],"dataset":[{"name":"","datapoints":["","","",""]}],"description":"<b>Test</b>"},"Public, Educational, and Governmental Access Channels":{"variables":["Channels","Address","Contact Information"],"types":["text","text","text"],"dataset":[{"name":"","datapoints":["","",""]}],"description":"<b>Test</b>"}}},{"Internet Penetration":{}},{"Public Meetings":{}},{"Voting":{}},{"Organized Volunteerism":{}},{"Philanthropy":{}},{"Crime":{"Hate Groups (active statewide)":{"variables":["Ideology","City","Coordinates"],"types":["URL","text","coordinates"],"dataset":[{"name":"Nation of Islam","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore","-76.682834,39.326912"]},{"name":"Barnes Review/Foundation for Economic Liberty, Inc.","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/holocaust-denial\">Holocaust Denial</a>","Upper Marlboro","-76.74,38.81"]},{"name":"Heritage and Destiny","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/white-nationalist\">White Nationalist</a>","Silver Spring","-77.03,39"]},{"name":"Maryland State Skinheads","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","Baltimore","-76.61,39.29"]},{"name":"Council of Conservative Citizens","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/white-nationalist\">White Nationalist</a>","Silver Spring","-77.039175,39.00415"]},{"name":"National Socialist Movement","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-nazi\">Neo-Nazi</a>","","-76.64,39.04"]},{"name":"Israelite School of Universal Practical Knowledge","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore","-76.61,39.29"]},{"name":"Israelite Church of God in Jesus Christ, The","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/black-separatist\">Black Separatist</a>","Baltimore","-76.768277,39.336349"]},{"name":"League of the South","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-confederate\">Neo-Confederate</a>","Clements","-76.727526,38.326544"]},{"name":"Jamaat al-Muslimeen","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/general-hate\">General Hate</a>","Baltimore","-76.635495,39.305668"]},{"name":"Label 56","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/hate-music\">Hate Music</a>","Nottingham","-76.488118,39.38775"]},{"name":"Confederate White Knights of the Ku Klux Klan","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/ku-klux-klan\">Ku Klux Klan</a>","Rosedale","-76.51,39.32"]},{"name":"Southern National Congress","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-confederate\">Neo-Confederate</a>","","-76.83,39.2"]},{"name":"East Coast Knights Of The True Invisible Empire","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/ku-klux-klan\">Ku Klux Klan</a>","Annapolis","-76.49,38.97"]},{"name":"Refugee Resettlement Watch","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/anti-muslim\">Anti-Muslim</a>","Fairplay","-77.74,39.53"]},{"name":"Crew 38","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","","-76.64,39.04"]},{"name":"Be Active Front USA","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/racist-skinhead\">Racist Skinhead</a>","","-76.64,39.04"]},{"name":"The Daily Stormer","datapoints":["<a href=\"https://edit.splcenter.org/fighting-hate/extremist-files/ideology/neo-nazi\">Neo-Nazi</a>","Baltimore","-76.61,39.29"]}],"description":"<b>Test</b>"},"Hate Crime by Motivation":{"variables":["Number","Percent"],"types":["number","percent"],"dataset":[{"name":"Race/Ethnicity/Alien","datapoints":["",""]},{"name":"Anti-American Indian/Alaskan Native","subcategory":1,"datapoints":["",""]},{"name":"Anti-Arab","subcategory":1,"datapoints":["",""]},{"name":"Anti-Asian","subcategory":1,"datapoints":["",""]},{"name":"Anti-Black","subcategory":1,"datapoints":["",""]},{"name":"Anti-Hispanic or Latino","subcategory":1,"datapoints":["",""]},{"name":"Anti-Native Hawaiian or Other Pacific Islander","subcategory":1,"datapoints":["",""]},{"name":"Anti-White","subcategory":1,"datapoints":["",""]},{"name":"Anti-Other Race/Ethnicity/Ancestry","subcategory":1,"datapoints":["",""]},{"name":"Anti-Multiple Races, Group","subcategory":1,"datapoints":["",""]},{"name":"Religion","datapoints":["",""]},{"name":"Anti-Jewish","subcategory":1,"datapoints":["",""]},{"name":"Anti-Catholic","subcategory":1,"datapoints":["",""]},{"name":"Anti-Protestant","subcategory":1,"datapoints":["",""]},{"name":"Anti-Islamic","subcategory":1,"datapoints":["",""]},{"name":"Anti-Other Religion","subcategory":1,"datapoints":["",""]},{"name":"Anti-Multiple Religions, Group","subcategory":1,"datapoints":["",""]},{"name":"Anti-Atheism/Agnosticism","subcategory":1,"datapoints":["",""]},{"name":"Sexual Orientation","datapoints":["",""]},{"name":"Anti-Male Gay","subcategory":1,"datapoints":["",""]},{"name":"Anti-Lesbian","subcategory":1,"datapoints":["",""]},{"name":"Anti-Heterosexual","subcategory":1,"datapoints":["",""]},{"name":"Anti-Physical Disability","subcategory":1,"datapoints":["",""]},{"name":"Anti-Bisexual","subcategory":1,"datapoints":["",""]},{"name":"Anti-LGBT (Mixed Group)","subcategory":1,"datapoints":["",""]},{"name":"Disability","datapoints":["",""]},{"name":"Anti-Physical Disability","subcategory":1,"datapoints":["",""]},{"name":"Anti-Mental Disability","subcategory":1,"datapoints":["",""]},{"name":"Gender","datapoints":["",""]},{"name":"Anti-Female","subcategory":1,"datapoints":["",""]},{"name":"Anti-Male","subcategory":1,"datapoints":["",""]},{"name":"Homelessness","datapoints":["",""]}],"description":"<b>Test</b>"},"Hate Crime by Incident Type":{"variables":["Number","Percent"],"types":["number","percent"],"dataset":[{"name":"Assault","datapoints":["",""]},{"name":"Vandalism","datapoints":["",""]},{"name":"Verbal Intimidation","datapoints":["",""]},{"name":"Written Intimidation","datapoints":["",""]},{"name":"Other","datapoints":["",""]}],"description":"<b>Test</b>"}}}])});
	*/
	this.initializeMap(stateAbbr,countyName,placeName);
  }

  handleLoad = () => {
	var importedProfile = JSON.parse(localStorage.getItem("profile"))
	importedProfile.data = fromJS(importedProfile.data);
	console.log(importedProfile);
	this.setState(importedProfile);
	return true;
  }

  handleLoadFromFile = (input) => {
	var reader = new FileReader();
	reader.onload = (e) => {
		try {
			var importedProfile = JSON.parse(e.target.result);
			importedProfile.data = fromJS(importedProfile.data);
			this.setState(importedProfile);
			return true;
		} catch (e) {
			return false;
		}
	};
	reader.readAsText(input);
	return true;
  }

  handleSave = () => {
	localStorage.setItem("profile", JSON.stringify(this.state));
	return true;
  }

  handleSaveToFile = () => {
	var stringifiedState = JSON.stringify(this.state);
	var dataURL = "data:application/json,";
	dataURL = dataURL + stringifiedState;
	var exportLink = document.createElement("a");
	exportLink.style.display = "none";
	exportLink.href = encodeURI(dataURL);
	var date = new Date();
	date = date.toISOString().slice(0, 10);
	var fileName = '-' + date;
	if(this.state.jurisdiction) {
		fileName = this.state.jurisdiction.place.name + fileName;
	}
	exportLink.download = fileName;
	document.body.appendChild(exportLink);
	exportLink.click();
	exportLink.remove();
	return true;
  }

  initializeMap = (state, county, place) => {
	geocoder = new window.google.maps.Geocoder();
	//var jurisdictionBounds;
	var address = "";
	if(place !== 'None') {
		address = place + ", " + state + " USA";
	} else {
		address = county + ", " + state + " USA";
	}
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status === 'OK') {
			//console.log(JSON.stringify(results[0]));
			//jurisdictionBounds = new window.google.maps.LatLngBounds();
			//jurisdictionBounds = results[0].geometry.viewport;
			//console.log(jurisdictionBounds);
			//console.log(JSON.stringify(results[0].geometry.location));
			/*var jurisdictionBounds = new window.google.maps.LatLngBounds(
				results[0].geometry.viewport.getSouthWest(),
				results[0].geometry.viewport.getNorthEast()
			);*/
			var bounds = {
				ne: {
				  lat: results[0].geometry.viewport.getNorthEast().lat(),
				  lng: results[0].geometry.viewport.getNorthEast().lng(),
				 },
				 sw: {
				  lat: results[0].geometry.viewport.getSouthWest().lat(),
				  lng: results[0].geometry.viewport.getSouthWest().lng(),
				 }
			};
			this.setState({location: bounds});
			return;
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
			/*infrastructureMap = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 39.5, lng: -98.35},
				zoom: 5
  			});*/
		}
		return;
	}.bind(this));
  }

  newSurvey = () => {
	var stagedSurvey = Object.assign({}, this.surveyTemplate);
	console.log(stagedSurvey);
	stagedSurvey.name = "Participant " + this.participantId;
	this.participantId++;
	this.setState(update(this.state, { surveys: {$push: [stagedSurvey] }}));
	//console.log(this.state.surveys);
	return true;
  }

  renameParticipant = (evt, participantNumber) => {
	this.setState(update(this.state, { surveys: {[participantNumber]: { name: {$set: evt.currentTarget.textContent} }}}));
	console.log(this.state.surveys);
	return true;
  }

  handleSurveyInput = (value, survey, categoryIndex, category, item) => {
	this.setState(update(this.state, {surveys: {[survey]: {questionnaire: {[categoryIndex]: {[category]: {[item]: {value: {$set: value} } }, aggregate: {$splice: [[item, 1, parseInt(value, 10)]] } } } } } }));
	return true;
  }

  surveyExport = (format) => {
    console.log(format);
    var dataURL;
    if (format === 'json') {
      var stringifiedSurveys = JSON.stringify(this.state.surveys);
      dataURL = "data:application/json,";
      dataURL = dataURL + stringifiedSurveys;
    } else {
      dataURL = "data:text/tab-separated-values,";
    	var header = [""];
    	var template = this.surveyTemplate.questionnaire;
    	console.log(template);
    	for (var i = 0, len = template.length; i < len; i++) {
    		var innerQuestions = template[i];
    		var categoryName = Object.keys(innerQuestions)[0];
    		console.log(categoryName);
    		for (var iq = 0, innerLen = innerQuestions[categoryName].length; iq < innerLen; iq++) {
    			console.log(innerQuestions[categoryName][iq]);
    			var questionName = innerQuestions[categoryName][iq]['question'];
    			header.push(questionName);
    		}
    	}
    	var headerString = header.join('\t') + '\n';
    	dataURL = dataURL + headerString;
    }
  	console.log(encodeURI(dataURL));
  	var exportLink = document.createElement("a");
  	exportLink.style.display = "none";
  	exportLink.href = encodeURI(dataURL);
    var date = new Date();
    date = date.toISOString().slice(0, 10);
    var fileName = '-' + date + '.' + format;
    if(this.state.jurisdiction) {
      fileName = this.state.jurisdiction.place.name + fileName;
    }
    exportLink.download = 'surveys-' + fileName;
  	document.body.appendChild(exportLink);
  	exportLink.click();
  	exportLink.remove();
  	return true;
    }

  /*surveyExport = () => {
	console.log("finalize");
	var dataURL = "data:text/tab-separated-values,";
	var header = [""];
	var template = this.surveyTemplate.questionnaire;
	console.log(template);
	for (var i = 0, len = template.length; i < len; i++) {
		var innerQuestions = template[i];
		var categoryName = Object.keys(innerQuestions)[0];
		console.log(categoryName);
		for (var iq = 0, innerLen = innerQuestions[categoryName].length; iq < innerLen; iq++) {
			console.log(innerQuestions[categoryName][iq]);
			var questionName = innerQuestions[categoryName][iq]['question'];
			header.push(questionName);
		}
	}
	var headerString = header.join('\t') + '\n';
	dataURL = dataURL + headerString;
	console.log(encodeURI(dataURL));
	var exportLink = document.createElement("a");
	exportLink.style.display = "none";
	exportLink.href = encodeURI(dataURL);
	exportLink.download = "Community Resilience Surveys.tsv";
	document.body.appendChild(exportLink);
	exportLink.click();
	exportLink.remove();
	return true;
}*/

  surveyImport(input) {
    var reader = new FileReader();
  	reader.onload = (e) => {
      console.log(this);
  		try {
  			var importedSurveys = JSON.parse(e.target.result);
        this.setState(update(this.state, { surveys: {$push: importedSurveys }}));
  			return true;
  		} catch (e) {
  			return false;
  		}
  	};
  	reader.readAsText(input);
  	return true;
  }

  buildSurveyExport(format, surveyTracker) {
	//console.log(format);
	var dataURL = "data:text/tab-separated-values,";
	//TODO: var exportArray = surveyTracker.questions;
	var header = [""];
	var assessments = document.getElementsByClassName('assessment-table');
	for (var i = 0, len = assessments.length; i < len; i++) {
		header.push(document.querySelector('#survey-list > li:nth-child(' + (i+1) + ') > a').textContent);
		var responseTd = assessments[i].getElementsByClassName('survey-input');
		for (var ii = 0, lenInner = responseTd.length; ii < lenInner; ii++) {
			var questionResponse = responseTd[ii].querySelector('input:checked');
			if(questionResponse === null) {
				surveyTracker.questions[ii].push("");
			} else {
				surveyTracker.questions[ii].push(questionResponse.value);
			}
		}
	}
	var headerString = header.join('\t') + '\n';
	var bodyString = "";
	surveyTracker.questions.forEach(function(line) {
		bodyString += line.join('\t') + '\n';
	});
	console.log(dataURL + headerString + bodyString);
	return dataURL + headerString + bodyString;
  }

  //exportSurveyButton = document.getElementById('export-surveys');
  /*exportSurveyButton.addEventListener('click', function() {
		var format = document.getElementById('survey-export-format').value;
		document.getElementById("export-data-url").href = encodeURI(buildSurveyExport(format, surveyTracker));
  });*/

  selectedStakeholderFeature(event) {
	console.log(event);
	var { nodes, edges } = event;
	console.log("Selected nodes:");
	console.log(nodes);
	console.log("Selected edges:");
	console.log(edges);
	//var modify_edge = this.state.edges.get(edges[0]);
	console.log(this.state.edgesObject);
	var targetEdgeId = edges[0];
	var edgeState = this.state.edgesObject.get(targetEdgeId,{fields: ['state']});
	console.log(edgeState);
	var manipulation = {};
	switch (edgeState.state) {
		case 0:
		case undefined:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: true},from:{enabled: false}}, color:{color:"grey"}, dashes: true, width: 1, state: 1};
			break;
		case 1:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: false},from:{enabled: true}}, color:{color:"grey"}, dashes: true, width: 1, state: 2};
			break;
		case 2:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: true},from:{enabled: true}}, color:{color:"green"}, dashes: false, width: 2, state: 3};
			break;
		case 3:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: true},from:{enabled: false}}, color:{color:"green"}, dashes: false, width: 2, state: 4};
			break;
		case 4:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: false},from:{enabled: true}}, color:{color:"green"}, dashes: false, width: 2, state: 5};
			break;
		case 5:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: true},from:{enabled: true}}, color:{color:"red"}, dashes: false, width: 1, state: 6};
			break;
		case 6:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: true},from:{enabled: false}}, color:{color:"red"}, dashes: false, width: 1, state: 7};
			break;
		case 7:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: false},from:{enabled: true}}, color:{color:"red"}, dashes: false, width: 1, state: 8};
			break;
		case 8:
		default:
			manipulation = {id:targetEdgeId, arrows:{to:{enabled: true},from:{enabled: true}}, color:{color:"grey"}, dashes: true, width: 1, state: 0};
			break;
	}
	this.state.edgesObject.update([manipulation]);
  }

  stakeholderEvents = {
	select: this.selectedStakeholderFeature.bind(this)
  }

  setEdges = edges => {
	  console.log(edges);
	  this.setState({edgesObject: edges});
  }

  setNodes = nodes => {
	console.log(nodes);
    this.setState({nodesObject: nodes});
  }

  storeSwot(evt, quadrant) {
	this.setState(update(this.state, { swot: { [quadrant]: {$set: evt.target.value} } }));
	console.log(this.state.swot);
  }

  storeData(evt, data, type, reference, replacedArray = null, dpIndex = null) {
	console.log(evt.target.textContent);
	console.log(data);
	console.log(type);
	console.log(reference);
	data.setIn(reference, evt.target.textContent);
	//var copy = data.setIn(reference, evt.target.textContent);
	//copy = copy.deref();
	//console.log(copy);
	//this.setState({data: copy});
  }

  mapStakeholder(evt, node) {
	console.log(evt.currentTarget);
	var label;
	var el = evt.currentTarget;
	var nodeId = parseInt(el.dataset.node, 10);
	var name = el.querySelector('.stakeholder-name').textContent;
	var titleContent = el.querySelector('.stakeholder-title').textContent;
	var title = titleContent ? '\n' + titleContent : "";
	var orgContent = el.querySelector('.stakeholder-org').textContent;
	var org = orgContent ? '\n' + orgContent : "";
	if(name) {
		label = '<b>' + name + '</b>' + title + org;
	} else {
		label = '<b>' + orgContent + '</b>';
	}
	var type = el.querySelector('input[name="type"]').value;
	console.log(type);
	var background = '#f0f8ff';
	switch(type) {
		case 'Government':
		default:
			background = '#f0f8ff';
			break;
		case 'Business':
			background = '#98FB98';
			break;
		case 'NGO':
			background = '#D8BFD8';
			break;
		case 'Faith-based':
			background = '#ffffff';
			break;
		case 'Community':
			background = '#FFFFE0';
			break;
	}
	var replacementNode = {id: nodeId, label: label, color: {background: background}}
	var nodes = this.state.nodes.slice();
	for (var mi = 0; mi < nodes.length; mi++) {
			console.log(nodes[mi].id);
			console.log(nodeId);
			if (nodes[mi].id === nodeId) {
				console.log("IN");
				nodes.splice(mi, 1, replacementNode);
				this.setState({
				  'nodes': nodes
				})
			}
	}
  }

  addRow(evt, data, reference, index, datapoints, subcat, dataNodes) {
	console.log(dataNodes);
	datapoints = datapoints.deref();
	reference.pop();
	var insertValue;
	var datapointArray = []
	//console.log(reference);
	for(let ni = 0; ni < dataNodes; ni++) {
		datapointArray.push("");
	}
	if(subcat) {
		insertValue = Map({name:"", subcategory:subcat, datapoints: List(datapointArray)});
	} else {
		insertValue = Map({name:"", datapoints: List(datapointArray)});
	}
	  //insertValue = Map({name:"", datapoints: List(["","",""])});
	datapoints = datapoints.insert((index + 1), insertValue);
	//console.log(datapoints);
	//console.log(datapoints.splice(index, 1, insertValue));
	var copy = data.setIn(reference, datapoints).deref();
	this.setState({data: copy});
  }

  addStakeholder(evt, index) {
	var copy = this.state.stakeholders.slice();
	var newId = this.state.nextStakeholder;
	index = index + 1;
	copy.splice(index, 0, {name:"", id:newId, title:"", organization:"", type:"Government", contact:"", Remarks:""});

	var insertNode = {id: newId, label: '<b>Stakeholder</b>'}
	//var oldGraph = this.state.stakeholderGraph;
	//var nodeArray = oldGraph.nodes.slice();
	//var edgeArray = oldGraph.nodes.slice();
	//nodeArray.push(insertNode);

	newId++;
	//console.log(this.state.nodes.get(nodes[0]));
	this.setState({nodes: this.state.nodes.concat([insertNode]), stakeholders: copy, nextStakeholder: newId});
	return;
  }

  deleteRow(evt, data, reference) {
	var copy = data.deleteIn(reference).deref();
	this.setState({data: copy});
  }

  deleteStakeholder(evt, index) {
	var copy = this.state.stakeholders;
	copy.splice(index, 1);
	this.setState({stakeholders: copy});
  }

  toggleTab(tab) {
    if (this.state.frame.activeTab !== tab) {
      this.setState({
        frame: {activeTab: tab, active:true}
      });
    }
  }

  render() {
    return (
		<div className="container-fluid">
			<Controls isActive={this.state.frame.active} isLoadable={localStorage.getItem("profile")?true:false} handleGeneration={this.handleGeneration.bind(this)} handleLoad={this.handleLoad.bind(this)} handleLoadFromFile={this.handleLoadFromFile.bind(this)} handleSave={this.handleSave.bind(this)} handleSaveToFile={this.handleSaveToFile.bind(this)} />
			{this.state.jurisdiction ?
			<React.Fragment>
			<Fade in={this.state.frame.active} tag="div">
				<Card body>
				  <CardTitle className="mx-auto">{this.state.jurisdiction.place.name?this.state.jurisdiction.place.name:this.state.jurisdiction.county.name}</CardTitle>
				  <CardText className="mx-auto">Population: {parseInt(this.state.population, 10).toLocaleString()}</CardText>
				</Card>
			</Fade>
			<Nav tabs className="navigation">
			  <NavItem>
				<NavLink className={classnames({ active: this.state.frame.activeTab === '1' }) + ' rolodex'} onClick={() => { this.toggleTab('1'); }} >
				  Assessment<br/>Surveys
				</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink disabled className={classnames({ active: this.state.frame.activeTab === '2' }) + ' rolodex'} onClick={() => { this.toggleTab('2'); }} >
				  Key Informant<br/>Interviews
				</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink className={classnames({ active: this.state.frame.activeTab === '3' }) + ' rolodex'} onClick={() => { this.toggleTab('3'); }} >
				  Data<br/>Collection
				</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink disabled className={classnames({ active: this.state.frame.activeTab === '4' }) + ' rolodex'} onClick={() => { this.toggleTab('4'); }} >
				  Community<br/>Conversations
				</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink className={classnames({ active: this.state.frame.activeTab === '5' }) + ' rolodex'} onClick={() => { this.toggleTab('5'); }} >
				  Infrastructure<br/>Maps
				</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink className={classnames({ active: this.state.frame.activeTab === '6' }) + ' rolodex'} onClick={() => { this.toggleTab('6'); }} >
				  Stakeholder<br/>Analysis/Ecomap
				</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink className={classnames({ active: this.state.frame.activeTab === '7' })  + ' rolodex'} onClick={() => { this.toggleTab('7'); }} >
				  SWOT<br/>Analysis
				</NavLink>
			  </NavItem>
			  <NavItem>
				<NavLink className={classnames({ active: this.state.frame.activeTab === '8' }) + ' rolodex'} onClick={() => { this.toggleTab('8'); }} >
				  Capacity &<br/>Vulnerability
				</NavLink>
			  </NavItem>
			</Nav>
			<TabContent activeTab={this.state.frame.activeTab}>
			  <TabPane tabId="1">
        <Surveys surveys={this.state.surveys} generateSurvey={this.newSurvey} surveyExport={this.surveyExport} surveyImport={this.surveyImport.bind(this)} renameParticipant={this.renameParticipant} handleInput={this.handleSurveyInput} />
			  </TabPane>
			  <TabPane tabId="2">
				<Row>
				  <Col sm="6">
					<Card body>
					  <CardTitle>Special Title Treatment</CardTitle>
					  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
					  <Button>Go somewhere</Button>
					</Card>
				  </Col>
				  <Col sm="6">
					<Card body>
					  <CardTitle>Special Title Treatment</CardTitle>
					  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
					  <Button>Go somewhere</Button>
					</Card>
				  </Col>
				</Row>
			  </TabPane>
			  <TabPane id="data-pane" tabId="3">
					<DataCollection handleChange={this.storeData.bind(this)} addRow={this.addRow.bind(this)} deleteRow={this.deleteRow.bind(this)} data={Cursor.from(this.state.data, (nextValue, prevValue, keyPath) => {this.setState({data: nextValue});})} />
			  </TabPane>
			  <TabPane tabId="4">
				<Row>
				  <Col sm="12">
					<h4>Tab 4 Contents</h4>
				  </Col>
				</Row>
			  </TabPane>
			  <TabPane tabId="5">
				<Row>
				  <Col sm="12">
					<Mapping visible={this.state.frame.activeTab === "8" ? true:false} bounds={this.state.location}/>
				  </Col>
				</Row>
			  </TabPane>
			  <TabPane tabId="6">
				<Stakeholders visible={this.state.frame.activeTab === "6" ? true:false} stakeholders={this.state.stakeholders} graph={{nodes:this.state.nodes, edges:this.state.edges}} events={this.stakeholderEvents} addStakeholder={this.addStakeholder.bind(this)} deleteStakeholder={this.deleteStakeholder.bind(this)} mapStakeholder={this.mapStakeholder.bind(this)} setEdges={this.setEdges.bind(this)} setNodes={this.setNodes.bind(this)}/>
			  </TabPane>
			  <TabPane tabId="7">
				<Swot swot={this.state.swot} store={this.storeSwot.bind(this)} />
			  </TabPane>
			  <TabPane tabId="8">
				<Row>
				  <Col sm="12">
					<Analysis visible={this.state.frame.activeTab === "8" ? true:false} surveys={this.state.surveys} data={Cursor.from(this.state.data, (nextValue, prevValue, keyPath) => {console.log('Value changed from', prevValue, 'to', nextValue, 'at', keyPath);})} />
				  </Col>
				</Row>
			  </TabPane>
			</TabContent>
			</React.Fragment>
			:null}
		</div>
    );
  }
}

export default Assessment;
