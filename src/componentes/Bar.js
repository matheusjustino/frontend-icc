import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
/* eslint-disable */

export default class ChartBar extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">

        <BarChart
          width={1080}
          height={720}
          data={this.props.values}
          margin={
            {
              top: 20, right: 30, left: 20, bottom: 5,
            }
          }
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Aproveitamento da aula" stackId="a" fill="rgba(255,99,132,0.6)" />
          <Bar dataKey="Conteúdo" stackId="a" fill="rgba(54,162,235,0.6)" />
          <Bar dataKey="Material" stackId="a" fill="rgba(255,206,86,0.6)" />
          <Bar dataKey="Geral" stackId="a" fill="rgba(75,192,192,0.6)" />
        </BarChart>
        
      </div>
    );
  }
}