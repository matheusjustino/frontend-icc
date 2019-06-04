import React, { Component } from 'react';
import CorpoInput from './CorpoInput';
import CorpoInputTextArea from './CorpoInputTextArea';
import axios from 'axios';
import Titulo from './Title';
import Matricula from './Matricula';
import api from '../Service';
import { Link } from 'react-router-dom'

import { Container, Row, Col, Form, Navbar } from 'reactstrap';

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
    this.setState({ textArea: e.target.value});
  }

  print() {
    console.log(this.state.values);
  }

  onSubmit = () => {
    let d = new Date();
    let dataAtual = (d.getDate() < 9 ? "0" + d.getDate() : d.getDate()) + "/" + (d.getMonth() < 9 ? "0"+ (d.getMonth() + 1) : (d.getMonth() + 1)) + "/" + d.getFullYear();
    
    axios({
      method: 'post',
      url: "https://localhost:" + (process.env.PORT || 9000) + "/salvaValores",
      headers: { "Content-Type": "application/json" },
      data: {
        values: this.state.values,
        matricula: this.state.matricula,
        textArea: this.state.textArea,
	      data: dataAtual
      }
    });
  }

  render() {

    return (
      <div>

        <div>

          <Navbar color="dark" expand="md">
            <div className="container">
              <div className="row col-12">

                <Titulo></Titulo>

                <Matricula myFunction={this.setMatricula} ></Matricula>

              </div>
            </div>
          </Navbar>

        </div>

        <div className="mt-5">
          <Container className="borda" expand="md">
            <Form>
              <Row>

                <Col className="form-group my-3">
                  {renderCorpo([
                    {
                      id: 0,
                      text: "Seu aproveitamento da aula"
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

                <Col className="col-lg-6 col-sm-12 my-3">
                  <CorpoInputTextArea myFunction={this.setTextArea}  text="Dica(s) para melhorar a aula"></CorpoInputTextArea>
                </Col>

              </Row>
              <Link onClick={this.onSubmit} className="btn btn-primary direita my-2" to={"/resultado"}>Enviar</Link>
            </Form>
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
}


export default Corpo;
