import React, { Component } from 'react';
import Calendar from "./Datepicker";
import ChartBar from './Bar';
import TextArea from './TextArea';
import Funcoes from '../Funcoes';
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
            data: []
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
    const dadosBackend = await Funcoes.metodoGet({ data: date });
    const a = dadosBackend.data;
    const valoresDoGrafico = [
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
    ];
    
    this.state.textOut = dadosBackend.data[5];
    this.state.chartData.datasets[0].data = valoresDoGrafico;
    this.setState({ ...this.state });
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
          <ChartBar values={this.state.chartData.datasets[0].data}></ChartBar>
        </div>

        <div>
          <TextArea className="mb-5" value={this.state.textOut}></TextArea>
        </div>

      </div>
    )
  }
}

export default Estatistica;
