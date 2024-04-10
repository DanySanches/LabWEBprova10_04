const db = require("./banco")

const cadastrar = db.sequelize.define("cadastrar",{
    nome:{
        type : db.Sequelize.STRING
    },
    tel:{
        type : db.Sequelize.STRING
    },
    end:{
        type : db.Sequelize.STRING
    },
    Bairro:{
        type : db.Sequelize.STRING
    },
    CEP:{
        type : db.Sequelize.STRING
    },
    cidade:{
        type : db.Sequelize.STRING
    },
    estado:{
        type : db.Sequelize.STRING
    }
   
   
});

//só um UMA vez para criar o  BD
// cadastrar.sync({force:true})

module.exports = cadastrar