const Spacecraft = require("../models/spacecraft");
const Astronaut = require("../models/astronaut");

const router = require("express").Router();

//import operatori
const {Op} = require("sequelize");


router.route("/spacecrafts")
//GET filter 2 campuri, sort 1 camp, paginare 1 camp
.get(async (req, res) => {
  try {
    const query = {}
    let pageSize = 2
    const allowedFilters = ['name', 'speed']
    const filterKeys = Object.keys(req.query).filter(e => allowedFilters.indexOf(e) !== -1)
    if (filterKeys.length > 0) {
      query.where = {}
      for (const key of filterKeys) {
        query.where[key] = {
          [Op.like]: `%${req.query[key]}%`
        }
      }
    }

    const sortField = req.query.sortField
    let sortOrder = 'ASC'
    if (req.query.sortOrder && req.query.sortOrder === '-1') {
      sortOrder = 'DESC'
    }

    if (req.query.pageSize) {
      pageSize = parseInt(req.query.pageSize)
    }

    if (sortField) {
      query.order = [[sortField, sortOrder]]
    }

    if (!isNaN(parseInt(req.query.page))) {
      query.limit = pageSize
      query.offset = pageSize * parseInt(req.query.page)
    }

    const records = await Spacecraft.findAll(query)
    const count = await Spacecraft.count()
    res.status(200).json({ records, count })
  } catch (e) {
    console.warn(e)
    res.status(500).json({ message: 'server error' })
  }
})

//POST
.post(async (req, res) => {
    try {
      await Spacecraft.create(req.body);
      res.status(201).json({ message: "Spacecraft Created!" });
    } catch (err) {
        console.warn(err);
        res.status(500).json(err);
    }
  });


router
.route("/spacecrafts/:id")
//get cu id
.get(async (req,res) => {
    try{
        const spacecraft = await Spacecraft.findByPk(req.params.id);
        if(spacecraft){
            res.status(200).json(spacecraft);
        } else{
            res.status(404).json({Error : `spacecraft with id ${req.params.id} not found`});
        }
    }catch (err){
        console.warn(err);
        res.status(500).json(err);
    }
})
//put
.put(async (req,res) => {
    try {
        const spacecraft = await Spacecraft.findByPk(req.params.id)
        if (spacecraft) {
          await spacecraft.update(req.body, { fields: ['name', 'speed', 'weight'] })
          res.status(202).json({ message: 'accepted' })
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
        const spacecraft = await Spacecraft.findByPk(req.params.id, { include: Astronaut })
        if (spacecraft) {
          await spacecraft.destroy()
          res.status(202).json({ message: 'accepted' })
        } else {
          res.status(404).json({ message: 'not found' })
        }
      } catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
      }
    })


module.exports = router;