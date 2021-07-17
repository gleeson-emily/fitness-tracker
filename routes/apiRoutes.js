//const db = require('../models/index.js');
const router = require("express").Router();
const Workout = require('../models/models.js');


//get exercises + add duration
router.get("/api/workouts/", (req, res) => {
    Workout.aggregate([
      {
        $addFields: 
            { duration: 
              { $sum: '$exercises.duration',
         }, 
        }, 
      },
    ])
      .then((dbWorkout) => {
      res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
    })
  
router.get("/api/workouts/range", (req, res) => {
        Workout.aggregate([
          {
            $addFields: 
                { duration: 
                  { $sum: '$exercises.duration',
             },
            }, 
          },
        ])
          .sort({ _id: -1 })
          .limit(7)
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.status(400).json(err);
          });
  })
  //db.Workout.find({}.then(savedWorkouts => {
     //   savedWorkouts.forEach(workout => {
      //      let total = 0;
            
//         })
//     })
// );
// })

//add exercises
router.post("/api/workouts", ( {body}, res) => {
    Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  
  //update exercises

  router.put("api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate({ _id: req.params.id}, { exercises: req.body })
      .then(dbWorkout => {
        res.json(dbWorkout)
      })
  });


  //delete
  router.delete("api/workouts/:id", (req, res) => {
    Workout.findByIdAndDelete({ _id: req.params.id}, { exercises: req.body })
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
  })