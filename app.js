const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const post = require("./models/post");

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8081, function () {
  console.log("Sevidor ativo!");
});

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/cadastrar", function (req, res) {
  post
    .create({
      nome: req.body.nome,
      tel:req.body.tel,
      end: req.body.end,
      Bairro: req.body.Bairro,
      CEP: req.body.CEP,
      cidade: req.body.cidade,
      estado: req.body.estado,
    })
    .then(function () {
      console.log("Agendamento feito com  sucesso");
    })
    .catch(function (erro) {
      console.log("Erro: Agendamento não realizado" + erro);
    });
  res.render("index");
});

app.get("/consultar", function (req, res) {
  post
    .findAll()
    .then(function (post) {
      res.render("consultar", { post: post });
    })
    .catch(function (erro) {
      console.log("Erro: Agendamento não realizado" + erro);
    });
});

app.get("/atualizar/:id", function (req, res) {
  post
    .findAll({ where: { id: req.params.id } })
    .then(function (post) {
      res.render("atualizar", { post: post });
    })
    .catch(function (erro) {
      console.log("Erro: agendamento não encontrado" + erro);
    });
});

app.post("/atualizar", function (req, res) {
  post
    .update(
      {
        nome: req.body.nome,
        tel:req.body.tel,
        end: req.body.end,
        Bairro: req.body.Bairro,
        CEP: req.body.CEP,
        cidade: req.body.cidade,
        estado: req.body.estado,
      },
      { where: { id: req.body.id } }
    )
    .then(function () {
      console.log("Agendamento atualizado com sucesso!");
    })
    .catch(function (erro) {
      console.log("Erro: Agendamento não atualizado!" + erro);
    });

  post
    .findAll()
    .then(function (post) {
      res.render("consultar", { post: post });
      res.redirect("/consultar");
    })
    .catch(function (erro) {
      console.log("Erro: Nenhum agendamento encontrado!" + erro);
    });
});

app.get("/excluir/:id", function (req, res) {
  post
    .destroy({ where: { id: req.params.id } })
    .then(function () {
      res.render("index");
      console.log("agendamento excluido com sucesso");
    })
    .catch(function (erro) {
      console.log("Erro: agedamento não excluido" + erro);
    });
});

