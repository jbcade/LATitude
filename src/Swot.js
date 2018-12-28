import React, { Component } from 'react';
import { Table } from 'reactstrap';
import ContentEditable from 'react-contenteditable';

class Swot extends Component { 
  render() {
	return (
		<Table className="swot-table">
			<thead>
				<tr>
					<th> </th>
					<th className="swot-helpful">Helpful</th>
					<th className="swot-harmful">Harmful</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th className="swot-internal">Internal</th>
					<ContentEditable tagName="td" data-text="Strengths" html={this.props.swot.strengths} onChange={(evt)=>this.props.store(evt, "strengths")} />
					<ContentEditable tagName="td" data-text="Weaknesses" html={this.props.swot.Weaknesses} onChange={(evt)=>this.props.store(evt, "weaknesses")} />
				</tr>
				<tr>
					<th className="swot-external">External</th>
					<ContentEditable tagName="td" data-text="Opportunities" html={this.props.swot.opportunities} onChange={(evt)=>this.props.store(evt, "opportunities")} />
					<ContentEditable tagName="td" data-text="Threats" html={this.props.swot.threats} onChange={(evt)=>this.props.store(evt, "threats")} />
				</tr>
			</tbody>
		</Table>  
	);
  };
};

export default Swot;