import React, { Component } from 'react';
import axios from 'axios';
import Calendar from "./Datepicker";
import ChartBar from './Bar';
import TextArea from './TextArea';
/* eslint-disable */

class Estatistica extends Component {

  constructor() {
    super();
    this.state = {
      textOut: '',
      chartData: {
        labels: ["Seu aproveitamento da aula", "Explicação do conteúdo", "Material da aula", "Avaliação geral da aula"],
        datasets: [
          {
            label: "Avaliações Recebidas",
            data: [],
            data2: []
          }
        ]
      },
      date: ((new Date().getDate() < 9 ? "0" + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth() < 9 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + "/" + new Date().getFullYear())
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let d = e
    d = (d.getDate() < 9 ? "0" + d.getDate() : d.getDate()) + "/" + (d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "/" + d.getFullYear();
    this.setState({ date: d })
    this.getDados(d);
  }

  componentDidMount() {
    this.getDados(this.state.date);
  }

  async getDados(date) {
    const dataAgora = { data: date };
    await axios.get("https://backend-icc.herokuapp.com/pegaValores", { params: dataAgora }) //"https://backend-icc.herokuapp.com/pegaValores"  "http://localhost:9000/pegaValores"
      .then(res => {
        let chartData2 = { ...this.state.chartData }
        chartData2.datasets[0].data = res.data;
        if (res.data[5] !== undefined) {
          this.setState({ textOut: res.data[5] });
        }
        const a = res.data;
        const v1 = [
          {
            name: "Muito Bom", "Aproveitamento da aula": a[4][0], "Conteúdo": a[4][1], "Material": a[4][2], "Geral": a[4][3],
          },
          {
            name: "Bom", "Aproveitamento da aula": a[3][0], "Conteúdo": a[3][1], "Material": a[3][2], "Geral": a[3][3],
          },
          {
            name: "Normal", "Aproveitamento da aula": a[2][0], "Conteúdo": a[2][1], "Material": a[2][2], "Geral": a[2][3],
          },
          {
            name: "Ruim", "Aproveitamento da aula": a[1][0], "Conteúdo": a[1][1], "Material": a[1][2], "Geral": a[1][3],
          },
          {
            name: "Muito Ruim", "Aproveitamento da aula": a[0][0], "Conteúdo": a[0][1], "Material": a[0][2], "Geral": a[0][3],
          }
        ]
        chartData2.datasets[0].data2 = v1;
        this.setState({ chartData: chartData2 });
      });
  }

  render() {
    return (
      <div className="App">

        <div className="my-4">
          <Calendar
            myFunction={this.handleChange}
          ></Calendar>
        </div>

        <div className="my-5">
          <ChartBar values={this.state.chartData.datasets[0].data2}></ChartBar>
        </div>

        <div>
          <TextArea className="mb-5" value={this.state.textOut}></TextArea>
        </div>

      </div>
    )
  }
}

export default Estatistica;