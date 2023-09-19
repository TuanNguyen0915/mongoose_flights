import { Flight } from "../models/flight.js";

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  if (req.body.departs === '') delete req.body.departs
  Flight.create(req.body)
    .then(flight => {
      res.redirect('/flights')
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}

function index(req, res) {

  Flight.find({})
    .then(flights => {
      // sort flights data by departs in ascending order.
      flights = flights.sort((flight1, flight2) => flight1.departs - flight2.departs)
      res.render('flights/index', {
        title: 'All Flights',
        flights: flights
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}


function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
    .then(flight => {
      res.redirect('/flights')
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
    .then(flight => {
      res.render('flights/show', {
        title: 'Flight Details',
        flight: flight
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
    .then(flight => {
      res.render('flights/edit', {
        title: 'Edit Flight Information',
        flight: flight
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}

function update(req, res) {
  if (req.body.departs === '') delete req.body.departs
  Flight.findByIdAndUpdate(req.params.flightId, req.body, { new: true })
    .then(flight => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}

export {
  newFlight, create, index, deleteFlight, show, edit, update
}
