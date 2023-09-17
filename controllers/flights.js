import { Flight } from "../models/flight.js"

function addOneYear() {
  // Add 1 more year from now and reformat
  let now = new Date()
  let month = now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth()
  return `${now.getFullYear() + 1}-${month}-${now.getDate()}`
}

function index(req, res) {
  Flight.find({})
    .then(flights => {

      res.render("flights/index", {
        flights: flights,
        title: "All Flights"
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect("/flights/new")
    })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight"
  })
}


function create(req, res) {
  if (req.body.depart === "") req.body.depart = addOneYear()
  Flight.create(req.body)
    .then(flight => {
      res.redirect("/flights")
    })
    .catch(err => {
      console.log(err);
      res.redirect("/flights")
    })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
    .then(flight => {
      res.render('flights/show', {
        title: "Flight Details",
        flight: flight
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
      res.redirect("/flights")
    })
    .catch(err => {
      console.log(err);
      res.redirect("/flights")
    })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
    .then(flight => {
      res.render('flights/edit', {
        title: "Edit Flight",
        flight: flight
      })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.flightId, req.body, { new: true })
    .then(flight => {
      res.render("flights/show", {
        title: "Flight Details",
        flight: flight
      })
    })
}
export { index, newFlight, create, show, deleteFlight, edit, update }