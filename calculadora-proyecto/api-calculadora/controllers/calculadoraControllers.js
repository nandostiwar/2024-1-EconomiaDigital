const {
  add,
  subtract,
  multiply,
  split,
  square,
} = require("../operaciones/operaciones.js");

function sumar(req, res) {
  const { body } = req;
  const { number1, number2 } = body;
  const result = add(number1, number2);
  res.json({
    resultado: result,
  });
}

function restar(req, res) {
  const { body } = req;
  const { number1, number2 } = body;
  const result = subtract(number1, number2);
  res.json({
    resultado: result,
  });
}

function multiplicar(req, res) {
  const { body } = req;
  const { number1, number2 } = body;
  const result = multiply(number1, number2);
  res.json({
    resultado: result,
  });
}

function dividir(req, res) {
  const { body } = req;
  const { number1, number2 } = body;
  const result = split(number1, number2);
  res.json({
    resultado: result,
  });
}

function raizuno(req, res) {
  const { body } = req;
  const { number1, number2 } = body;
  const result = square(number1);
  res.json({
    resultado: result,
  });
}

function raizdos(req, res) {
  const { body } = req;
  const { number1, number2 } = body;
  const result = square(number2);
  res.json({
    resultado: result,
  });
}

module.exports = {
  sumar,
  restar,
  multiplicar,
  dividir,
  raizuno,
  raizdos,
};
