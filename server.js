const request = require('request');
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var cors = require('cors');

app.use(cors());

app.get('/', function(req, res) {
  res.send({
    "Output" : "Hello World!"
  });
});

app.post('/', function(req, res) {
  res.send({
    "Output" : "Hello World!"
  });
});
function nombre() {
  
  var i =Math.floor(Math.random() * 10)+1;
  switch(i) {
    case 1:
      return "Alex";
      break;
    case 2:
      return "Alexis";
      break;
    case 3:
        return "Andrea";
        break;
    case 4:
        return "Cris";
        break;
    case 5:
        return "Denis";
        break;
    case 6:
        return "Francis";
        break;
    case 7:
        return "Nain";
        break;
    case 8:
          return "Rene";
          break;
    case 9:
          return "Zuri";
          break;

    default:
      return "Noa";
  }

}
function apellido() {
  
  var i =Math.floor(Math.random() * 10)+1;
  switch(i) {
    case 1:
      return "Alvarez";
      break;
    case 2:
      return "Sosa";
      break;
    case 3:
        return "Morales";
        break;
    case 4:
        return "Juarez";
        break;
    case 5:
        return "Cabrera";
        break;
    case 6:
        return "de Paz";
        break;
    case 7:
        return "Rivera";
        break;
    case 8:
          return "Martinez";
          break;
    case 9:
            return "Mayorga";
            break;
    default:
      return "Alvarado";
  }

}
//busca persona por DPI
app.get('/consultaDpi', function(req, res) {
  // por ejemplo se puede hacer un GET de http://localhost:3000/consultaDpi?dpi=200001555
  // donde el ?dpi es el parametro a evaluar luego
  var body;
  var dpi = req.query.dpi;
  if(!dpi){
    dpi=Math.floor(Math.random() * 1000000000000000);
  }
  var nombre1=nombre();
  var nombre2=nombre();
  var apellido1=apellido();
  var apellido2=apellido();
  body = {
    "dpi" : dpi,
    "nombre1" : nombre1,
    "nombre2" : nombre2,
    "apellido1" : apellido1,
    "apellido2" : apellido2,
  };  


  res.json( [body] )
});

//valida estado de DPI nuevo o reposicion
app.get('/entregaDPI', function(req, res) {
  var body;
  var id = req.query.id;
  var entrega=false;
  if(!id){
    id=Math.floor(Math.random() * 1000000000000000);
  }
  if(Math.floor(Math.random() * 10)<5){
    entrega=true;
  }
  body = { "id" : id,
   "paraentrega":entrega};
  res.json( [body] )
  console.log('Servicio consumido->entregaDPI');
});
//valida certificado de nacimiento,defuncion, matimonio
app.get('/certificado', function(req, res) {
  var body;
  var id = req.query.id;
  var valido=false;
  if(!id){
    id=Math.floor(Math.random() * 1000000000000000);
  }
  if(Math.floor(Math.random() * 10)<5){
    valido=true;
  }
  body = { "id" : id,
   "valido":valido};
  res.json( [body] )
  console.log('Servicio consumido->certificado');
});

app.get('/grupo21', function(req, res) {
  request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res2, body) => {
  if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.json(body.explanation);
  });
});

//ejemplo de autoconsumo de webservice
app.get('/grupo4', function(req, res) {
  request('http://localhost:3000/entregaDPI', { json: true }, (err, res2, body) => {
  if (err) { return console.log(err); }
    res.json(body);
  });
});


app.listen(port);
module.exports = app;
