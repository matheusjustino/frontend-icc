import React, { Component } from 'react';
import CorpoInput from './CorpoInput';
import CorpoInputTextArea from './CorpoInputTextArea';
import Titulo from './Title';
import Matricula from './Matricula';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Navbar } from 'reactstrap';
import swal from 'sweetalert';
import Funcoes from '../Funcoes';



class Corpo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: [1, 1, 1, 1],
      matricula: "",
      textArea: ""
    }
    this.setMatricula = this.setMatricula.bind(this);
    this.setTextArea = this.setTextArea.bind(this);
  }

  setMatricula(e) {
    this.setState({ matricula: e.target.value });
  }

  setValues(e, id) {
    let arr = this.state.values;
    arr[id] = parseInt(e);
    this.setState({ values: arr });
  }

  setTextArea(e) {
    this.setState({ textArea: e.target.value });
  }

  onSubmit = () => {
    let d = new Date();
    let dataAtual = (d.getDate() < 9 ? "0" + d.getDate() : d.getDate()) + "/" + (d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "/" + d.getFullYear();
    let submissaoValida = Funcoes.validarMatricula(this.state.matricula);

    if (submissaoValida) {
      Funcoes.metodoPost(this.state.values, this.state.matricula, this.state.textArea, dataAtual);
      mensagemInformativa(submissaoValida);
    } else {
      mensagemInformativa(submissaoValida);
    }

  }

  render() {

    return (
      <div>

        <div>

          <Navbar id="navbar" color="dark" expand="md">
            <div className="container" style={{ whiteSpace: "nowrap" }}>
              <div className="row col-12">

                <Titulo></Titulo>

                <Matricula myFunction={this.setMatricula} ></Matricula>

              </div>
            </div>
          </Navbar>

        </div>

        <div id="outroteste" className="mt-5">
          <Container id="body" className="borda" expand="md">
            <div id="teste">
              <Row>
                <div className="col-sm-12 col-lg-6">
                  <Col className="form-group my-3">
                    {renderCorpo([
                      {
                        id: 0,
                        text: "Aproveitamento da aula"
                      },
                      {
                        id: 1,
                        text: "Explicação do conteúdo"
                      },
                      {
                        id: 2,
                        text: "Material da aula"
                      },
                      {
                        id: 3,
                        text: "Avaliação geral da aula"
                      }
                    ], this.setValues.bind(this), this.state.values)}
                  </Col>
                </div>

                <Col className="col-lg-6 col-sm-12 my-3">
                  <CorpoInputTextArea myFunction={this.setTextArea} text="Dica(s) para melhorar a aula"></CorpoInputTextArea>
                </Col>

              </Row>
              <button onClick={this.onSubmit} className="btn btn-primary direita my-2 mx-2">Enviar</button>
              <Link className="btn btn-primary direita my-2" to={"/resultado"}>Ver o Gráfico</Link>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}


const renderCorpo = (arrayObjs, myFunction, values) => {

  return arrayObjs.map((obj) => (
    <CorpoInput key={obj.id} id={obj.id} myFunction={myFunction} text={obj.text} value={values[obj.id]}></CorpoInput>
  ));
};

function mensagemInformativa(value) {
  const alertMsg = value === true ? swal({ text: "Avaliação de aula recebida!", icon: "success", closeOnClickOutside: false }).then(() => { window.location.reload(); }) :
                                    swal({ title: "Opss...", text: "Matrícula inválida!", icon: "error", closeOnClickOutside: false });
  return (alertMsg);
}


export default Corpo;
