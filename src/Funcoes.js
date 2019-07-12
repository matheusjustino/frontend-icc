import axios from 'axios';
const nums = '0123456789';

export default {
  metodoPost: (valores, matricula, texto, data) => {
    axios({
      method: 'post',
      url: "https://backend-icc.herokuapp.com/salvaValores", //"https://backend-icc.herokuapp.com/salvaValores"   "http://localhost:9000/salvaValores"
      headers: { "Content-Type": "application/json" },
      data: {
        values: valores,
        matricula: matricula,
        textArea: texto,
        data: data
      }
    });
  },
  metodoGet: (dataAgora) => {
    return axios.get("https://backend-icc.herokuapp.com/pegaValores", { params: dataAgora }); //"https://backend-icc.herokuapp.com/pegaValores"  "http://localhost:9000/pegaValores"
  },
  validarMatricula: (matricula) => {

    if (matricula.length < 10 && matricula.length > 0) {
      for (let i = 0; i < matricula.length; i++) {
        if (!nums.match(matricula[i])) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }
};