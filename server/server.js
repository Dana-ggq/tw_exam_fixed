//initializare express
const express = require("express");
const app = express();

//initializare sequelize
const sequelize = require("./sequelize");

//importare modele
const Spacecraft = require("./models/spacecraft");
const Astronaut = require("./models/astronaut");

//definire relatii
Spacecraft.hasMany(Astronaut, { 
  onDelete: 'cascade',
  hooks: true, 
});

// Express middleware
const bodyParser = require('body-parser');
const cors = require('cors');

//normal
app.use(cors())
app.use(bodyParser.json())

//heroku
// const path = require('path')
// app.use(cors())
// app.use(express.static(path.join(__dirname,'build')))
// app.use(bodyParser.json())


//sincronizare modele
app.get('/sync', async (req, res) => {
    try {
      await sequelize.sync({ force: true })
      res.status(201).json({ message: 'created' })
    } catch (e) {
      console.warn(e)
      res.status(500).json({ message: 'server error' })
    }
  })


//adaugare router 
app.use("/api", require("./routes/spacecraft-router"));
//adaugare router 
app.use("/api", require("./routes/astronaut-router"));


//IMPORT
//json de spacecrafts : name, speed, weight, astronauts[]
app.post('/import', async (request, response) => {
  try {
    const registry = {};
    for (let p of request.body) {
      const spacecraft = await Spacecraft.create(p);
      for (let s of p.astronauts) {
        const astronaut = await Astronaut.create(s);
        registry[s.key] = astronaut;
        spacecraft.addAstronaut(astronaut);
      }
      await spacecraft.save();
    }
    response.sendStatus(204);
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
});

//EXPORT continutului bazei de date
//json de spacecrafts : name, speed, weight, astronauts[]
app.get('/export', async (request, response) => {
  try {
    const result = [];
    for (let p of await Spacecraft.findAll()) {
      const spacecraft = {
        name: p.name,
        speed: p.speed,
        weight: p.weight,
        astronauts: []
      };
      for (let s of await p.getAstronauts()) {
        spacecraft.astronauts.push({
         // key: s.id,
         name: s.name,
         role: s.role
        });
      }
      result.push(spacecraft);
    }
    if (result.length > 0) {
      response.json(result);
    } else {
      response.sendStatus(204); //no content
    }
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
});


// Kickstart the Express aplication; sync db with models
const port = 8080;
app.listen(port, async () => {
    console.log("The server is running on http://localhost:" + port);
    try{
        await sequelize.authenticate();
        console.log("Connection has been established succesfully.");
    }catch{
        console.error("Unable to connect to the database:", error);
    }
  });

//heroku
//app.listen(process.env.PORT);

