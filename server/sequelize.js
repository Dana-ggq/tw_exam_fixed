const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './test.db',
    define: {
            timestamps: false
          }
});

//heroku
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   dialectOptions: {
//     ssl : {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// })


//alter: true -> daca exista alta tabela;
//mai exsta si force: true care sterge tabela daca exista
// sequelize.sync({force: true}).then(() => {
//     console.log("All models were syncronized succesful.");
// })

module.exports = sequelize;