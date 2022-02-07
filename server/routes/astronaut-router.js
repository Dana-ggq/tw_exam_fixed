const Spacecraft = require("../models/spacecraft");
const Astronaut = require("../models/astronaut");

const router = require("express").Router();

//import operatori
const {Op} = require("sequelize");


router.route("/spacecrafts/:pid/astronauts")
//GET
.get(async (req, res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.pid)
        if (spacecraft) {
          const astronauts = await spacecraft.getAstronauts()
    
          res.status(200).json(astronauts)
        } else {
          res.status(404).json({ message: 'not found' })
        }
      } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
      }
    })
//POST
.post(async (req, res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.pid)
        if (spacecraft) {
          const astronaut = req.body
          astronaut.spacecraftId = spacecraft.id
          console.warn(astronaut)
          await Astronaut.create(astronaut)
          res.status(201).json({ message: 'created' })
        } else {
          res.status(404).json({ message: 'not found' })
        }
      } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
      }
    });


router
.route("/spacecrafts/:pid/astronauts/:sid")
//get cu id
.get(async (req,res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.pid)
        if (spacecraft) {
          const astronauts = await spacecraft.getAstronauts({ where: { id: req.params.sid } })
          if(astronauts){
          res.status(200).json(astronauts.shift())
          } else {
            res.status(404).json({ message: 'not found' })
          }
        } else {
          res.status(404).json({ message: 'not found' })
        }
      } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
      }
    })
//put
.put(async (req,res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.pid)
        if (spacecraft) {
          const astronauts = await spacecraft.getAstronauts({ where: { id: req.params.sid } })
          const astronaut = astronauts.shift()
          if (astronaut) {
            await astronaut.update(req.body)
            res.status(202).json({ message: 'accepted' })
          } else {
            res.status(404).json({ message: 'not found' })
          }
        } else {
          res.status(404).json({ message: 'not found' })
        }
      } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
      }
    })
//delete
.delete(async (req,res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.pid)
        if (spacecraft) {
          const astronauts = await spacecraft.getAstronauts({ where: { id: req.params.sid } })
          const astronaut = astronauts.shift()
          if (astronaut) {
            await astronaut.destroy(req.body)
            res.status(202).json({ message: 'accepted' })
          } else {
            res.status(404).json({ message: 'not found' })
          }
        } else {
          res.status(404).json({ message: 'not found' })
        }
      } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
      }
    })

module.exports = router;