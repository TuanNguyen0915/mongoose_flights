import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js";

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight",
  });
}

function create(req, res) {
  if (req.body.departs === "") delete req.body.departs;
  Flight.create(req.body)
    .then((flight) => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function index(req, res) {
  Flight.find({})
    .then((flights) => {
      // sort flights data by departs in ascending order.
      flights = flights.sort((flight1, flight2) => flight1.departs - flight2.departs);
      res.render("flights/index", {
        title: "All Flights",
        flights: flights,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
    .then((flight) => {
      res.redirect("/flights");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function show(req, res) {
  Flight.findById(req.params.flightId)
    .populate("meals")
    .then((flight) => {
      Meal.find({ _id: { $nin: flight.meals } })
        .then((meals) => {
          res.render("flights/show", {
            title: "Flight Details",
            meals: meals,
            flight: flight,
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/flights");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
    .then((flight) => {
      res.render("flights/edit", {
        title: "Edit Flight Information",
        flight: flight,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function update(req, res) {
  if (req.body.departs === "") delete req.body.departs;
  Flight.findByIdAndUpdate(req.params.flightId, req.body, { new: true })
    .then((flight) => {
      res.redirect(`/flights/${flight._id}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function addTicket(req, res) {
  Flight.findById(req.params.flightId)
    .then((flight) => {
      flight.tickets.push(req.body);
      flight
        .save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/flights");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function deleteTicket(req, res) {
  Flight.findById(req.params.flightId)
    .then((flight) => {
      flight.tickets.id(req.params.ticketId).deleteOne();
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/flights");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function addMeal(req, res) {
  Flight.findById(req.params.flightId)
    .then((flight) => {
      flight.meals.push(req.body.mealId);
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`);
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/flights");
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}

function deleteMeal(req, res) {
  Flight.findById(req.params.flightId)
    .then((flight) => {
      for (let i = 0; flight.meals.length; i++) {
        if (flight.meals[i] === req.body.mealId) {
          flight.meals.splice(i, 1)
          flight.save()
            .then(() => {
              res.redirect(`/flights/${flight._id}`);
            })
        }
      }
    });
}

export { newFlight, create, index, deleteFlight, show, edit, update, addTicket, deleteTicket, addMeal, deleteMeal };
