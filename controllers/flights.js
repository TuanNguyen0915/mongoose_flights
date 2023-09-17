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
      console.log("Create successful");
      res.redirect("/flights/new")
    })
    .catch(err => {
      console.log(err);
      res.redirect("/flights/new")
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

export { index, newFlight, create, show }