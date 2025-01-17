const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then((pokemon) => {
    res.render('favorites', { pokemon: pokemon })   
  })
  .catch(err => {console.log(err)}) 
})

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // Get form data
  let name = req.body.name

  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: name
    }
  })
  .then((data) => {
    // redirect back to favorites page
    res.redirect('/pokemon')
  })
  .catch(err => {console.log(err)})
})

  //res.send(req.body)

router.get('/:name', (req,res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
  .then((response) => {
    //console.log(response.data)
    res.render('detail', {data: response.data})
  })
  .catch(err => {console.log(err)})
})

module.exports = router
