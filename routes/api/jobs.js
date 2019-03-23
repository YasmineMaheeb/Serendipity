const express = require('express')

const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose')
router.use(express.json())
// We will be connecting using database 

const router = express.Router()
const mongoose = require('mongoose')


const Job = require('../../models/Job')
const validator = require('../../validations/jobValidations')


// list all jobs
router.get('', async(req, res) => {
   const jobs = await Job.find()
   res.json({data: jobs})
});

const validator = require('../../validation/JobValidations')



// Get all jobs 
router.get('/', async (req,res) => {
   const jobs = await Job.find()
   res.json({data: jobs})
})
  
// Get a certain job



router.get('/:id', async (req,res) => {
    
   try {
       const id = req.params.id

       const job = await Job.findById(id)
      

       if(!job) return res.status(404).send({error: 'job does not exist'})
       
       res.json({data: job})
      }
      catch(error) {
          // We will be handling the error later
          console.log(error)
      }  
   

   res.json({data: job})
})






// Delete a job


router.delete('/:id', async (req,res) => {
   try {
    const id = req.params.id
    const deletedJob = await Job.findByIdAndRemove(id)
    res.json({msg:'Job was deleted successfully', data: deletedJob})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})




// Update a job



//create a job
// create a new member and add it to the database
router.post('/', async (req, res) => {
   try {
       const isValidated = validator.createValidation(req.body)
       if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
       const newJob = await Job.create(req.body)
       res.json({msg:'Job created successfully', data: newJob})
      }
      catch(error) {
          // We will be handling the error later
          console.log(error)

      } 
});

router.put('/:id', async (req,res) => {
   try {
    const id = req.params.id
    const job = await Job.findById(id)
    const ID={"_id":id}
    if(!job) return res.status(404).send({error: 'Job does not exist'})
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const updatedJob = await Job.findOneAndUpdate(ID,req.body)
    res.json({msg: 'Job updated successfully',data:updatedJob
   })
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

//create a job

router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newJob = await Job.create(req.body)
    res.json({msg:'Job was created successfully', data: newJob})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})



module.exports = router