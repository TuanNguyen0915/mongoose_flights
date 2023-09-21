import { escapeXML } from "ejs";
import { Meal } from "../models/meal.js";

function newMeal(req, res) {
  Meal.find({})
    .then((meals) => {
      res.render("meals/new", {
        title: "Add Meal",
        meals: meals,
        error: null,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/flights");
    });
}



function create(req, res) {
  let matched = false;
  let addedMeal = req.body.name
  Meal.find({})
    .then(meals => {
      for (let meal of meals) {
        if (meal.name.toLowerCase() === addedMeal.toLowerCase()) {
          matched = true
          break
        }
      }
      // if matched = trues, render to view with error message
      if (matched) {
        res.render("meals/new", {
          title: "Add Meal",
          meals: meals,
          error: `"${addedMeal}" had exists.`
        })
        // create meal to db, and redirect
      } else {
        Meal.create(req.body)
          .then(() => {
            res.redirect('/meals/new')
          })
      }
    })
}


export { newMeal, create };
