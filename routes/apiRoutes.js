const db = require('../models/index.js')
const router = require('express').Router();
const Workout = require('../models/models.js');


//get exercises + add duration
router.get("/api/workouts/", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: 
            { totalDuration: 
              { $sum: '$exercises.duration',
         }, 
        }, 
      },
    ])
      .then((dbWorkout) => {
        console.log(dbWorkout)
      res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
    })
  
router.get("/api/workouts/range", (req, res) => {
        db.Workout.aggregate([
          {
            $addFields: 
                { totalDuration: 
                  { $sum: '$exercises.duration',
             },
            }, 
          },
        ])
          .sort({ _id: -1 })
          .limit(7)
          .then((dbWorkout) => {
            console.log(dbWorkout)
            res.json(dbWorkout);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
  })

//add exercises
router.post("/api/workouts", (req, res) => {
    db.Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  
  //update exercises

  router.put("/api/workouts/:id" , ({body, params}, res) => {
    db.Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } }, 
      { new : true, runValidators: true}
    )
      .then((dbWorkout) => {
        res.json(dbWorkout)
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });


  //delete
  router.delete("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndDelete({ _id: req.params.id}, { exercises: req.body })
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
  })

  module.exports = router;