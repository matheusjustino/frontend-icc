import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class ColumnChart extends Component {
		constructor(props) {
			super(props);
			this.state = {
				title: {
					text: "Estatística de avaliação de Aula",
				},
				animationEnabled: true,
				data: [
					{
						type: "column",
						dataPoints: [
							{ label: "Seu aproveitamento da aula",  y: 0 },
							{ label: "Explicação do conteúdo", y: 0 },
							{ label: "Material da aula", y: 0 },
							{ label: "Avaliação geral da aula",  y: 0 }
						]
					}
				]
			}
		}

		componentDidUpdate() {
			this.state.data[0].dataPoints[0].y = this.props.values.data[0];
			this.state.data[0].dataPoints[1].y = this.props.values.data[1];
			this.state.data[0].dataPoints[2].y = this.props.values.data[2];
			this.state.data[0].dataPoints[3].y = this.props.values.data[3];
			this.chart.render();
		}
		
		render() {
			return (
			<div>
				<CanvasJSChart  options = {this.state} 
					 onRef={ref => this.chart = ref} 
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
			);
	}
}

export default ColumnChart;
