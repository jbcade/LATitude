import React, { Component } from 'react';
import Swot from './Swot';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Fade } from 'reactstrap';
import classnames from 'classnames';

class Frame extends Component { 
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
	  titleCardToggle: false
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
		<Fade in={this.state.titleCardToggle} tag="div" baseClass="no-display">
			<Card body>
			  <CardTitle className="mx-auto">Community Name</CardTitle>
			  <CardText className="mx-auto">Population: </CardText>
			</Card>
		</Fade>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' }) + ' rolodex'}
              onClick={() => { this.toggle('1'); }}
            >
              Assessment<br/>Surveys
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' }) + ' rolodex'}
              onClick={() => { this.toggle('2'); }}
            >
              Key Informant<br/>Interviews
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' }) + ' rolodex'}
              onClick={() => { this.toggle('3'); }}
            >
              Data<br/>Collection
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' }) + ' rolodex'}
              onClick={() => { this.toggle('4'); }}
            >
              Community<br/>Conversations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' }) + ' rolodex'}
              onClick={() => { this.toggle('5'); }}
            >
              Infrastructure<br/>Maps
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '6' }) + ' rolodex'}
              onClick={() => { this.toggle('6'); }}
            >
              Stakeholder<br/>Analysis/Ecomap
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '7' })  + ' rolodex'}
              onClick={() => { this.toggle('7'); }}
            >
              SWOT<br/>Analysis
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '8' }) + ' rolodex'}
              onClick={() => { this.toggle('8'); }}
            >
              Capacity/Vulnerability<br/>Assessment
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
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
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <h4>Tab 3 Contents</h4>
              </Col>
            </Row>
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
                <h4>Tab 5 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="6">
            <Row>
              <Col sm="12">
                <h4>Tab 6 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="7">
			<Swot />
          </TabPane>
          <TabPane tabId="8">
            <Row>
              <Col sm="12">
                <h4>Tab 8 Contents</h4>
              </Col>
            </Row>
          </TabPane>
		</TabContent>
		<footer className="footer">
        	<Row>
				<Col sm="col-4">Center for Heath and Homeland Security</Col>
				<Col sm="col-4">500 W. Baltimore St. Baltimore, MD 21201</Col>
				<Col sm="col-4">Tel: 410-706-1014 Fax: 410-706-2726</Col>
			</Row>
		</footer>
      </div>
    );
  }
}

export default Frame;