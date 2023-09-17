import { Flight } from "../models/flight.js"

function addOneYear() {
  // Add 1 more year from now and reformat
  let now = new Date()
  let month = now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth()
  return `${now.getFullYear() + 1}-${month}-${now.getDate()}`
}

function index(req, res) {
  res.render("flights/index", {
    title: "All Flights"
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
export { index, newFlight, create }