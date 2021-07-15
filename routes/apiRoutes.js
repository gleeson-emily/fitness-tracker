const db = require('../models');
const router = require("express").Router();


//get exercises
router.get("/api/workouts", (req, res) => {
    db.Workout.find({}.then(savedWorkouts => {
        savedWorkouts.forEach(workout => {
            let total = 0;
        })
    })
);
})

//add exercises
router.post("/api/workouts", ( {body}, res) => {
    db.Workout.create(body)
      .then(dbTransaction => {
        res.json(dbTransaction);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  