const express = require('express')
const router = express.Router()
router.use(express.json())
const Joi = require('joi')
const uuid = require('uuid') 
const mongoose = require('mongoose')
//const objectId = require('mongoose').objectid //needed to access by id
const workshops = require('./workshops')
const fn = require('../../fn')
const EducationalOrganization = require('../../models/EducationalOrganization')
const validator = require('../../validations/EduOrgValidations')

router.get('/', async (req,res) => {
    const educationalOrganizations = await EducationalOrganization.find()
    res.json({data: educationalOrganizations})
})
///get masterclassesof this EduORg


// router.get('/:id', async (req,res) => {
    
//     try {
//         const id = req.params.id

//         const educationalOrganizations = await EducationalOrganization.findById(id)  //.populate('masterClasses').populate('courses')
//      //   const user = await book.reviews
//      console.log(educationalOrganizations.userName)

//         if(!educationalOrganizations) {
//         return res.status(404).send({error: 'educational organization does not exist'})}
        
//         res.json({data: educationalOrganizations})
//         console.log(res.data)
//        }
//        catch(error) {
//            // We will be handling the error later
//            console.log(error)
//        }  
    

//  //   res.json({data: educationalOrganizations})
// })

router.get("/:_id", (req, res) => {
 


    const id = req.params._id;
     EducationalOrganization.findById(id)
      .exec()
      .then(doc => {
        if (doc) {
          res.status(200).json(doc);
         
        } else {
          res
            .status(404)
            .json({ message: "No Educational Organization found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
      
  });

router.post('/', async (req,res) => {
    try {
     const isValidated = validator.createValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const newEducationalOrganization = await EducationalOrganization.create(req.body)
     res.json({msg:'Educational organization was created successfully', data: newEducationalOrganization})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })






 
// update Profile
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const eduorg = await EducationalOrganization.findById(id)
     const ID = {"_id":id}
     if(!eduorg) return res.status(404).send({error: 'eduorg does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedEduorg = await EducationalOrganization.findOneAndUpdate(ID,req.body)
     res.json({msg: 'EduOrg updated successfully',data:updatedEduorg})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }
 })

//yara Delete  Works
router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedEduOrgProfile = await EducationalOrganization.findByIdAndRemove(id)
     res.json({msg:'Profile was deleted successfully', data: deletedEduOrgProfile})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

    
 router.get('/w/:id', async (req,res) =>{
     const id = req.params.id
     console.log(id)
     const e = await fn.getAllWorkshops(id)
     console.log(e)
     res.json({msg: 'found it!!',data:e})
 })

module.exports = router

// applyForCourse: async (cid, mid) => {
//     const path = "http://localhost:5000/api/courses/" + cid + "/apply";
//     return await axios.put(path, { applicantId: '"' + mid + '" ' });
//   },

// router.get('/:id/masterclasses' ,async (req,res)=>{

// })
//5cb078659b955f1ba40e22a1