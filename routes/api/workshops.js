const express = require('express')
const Joi = require('joi');
const mongoose = require('mongoose')
const router = express.Router()
router.use(express.json())
const objectId = require('mongoose').objectid

const validator = require('../../validations/WorkshopValidations')
const Workshop = require('../../models/Workshop')
const Member = require('../../models/Member') //yan

//create A workshop
router.post('/', async (req, res) =>  {
    try{
    const isValidated = validator.createValidation(req.body)
    if (isValidated.eraror) return res.status(400).send({ error: isValidated.error.details[0].message });

    else{
    await new Workshop({
        _id: mongoose.Types.ObjectId(),
        title : req.body.title,
        eduOrganisation : req.body.eduOrganisation,
        duration : req.body.duration,
        educator : req.body.educator,
        price : req.body.price,
        description : req.body.description,
        location : req.body.location,
        applicants : req.body.applicants
      }).save()
        .then( res.redirect('/api/workshops'))
        .catch(err => { console.log(err); return res.send(`Sorry, could not create a new workshop with this data !`) })
    }
    }
    catch(error) { 
        console.log(error)
    } 
})
//update 
router.put('/:id', async (req, res) => {
    
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });

    else{
    await Workshop.findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(r => {return res.redirect(303, `/api/workshops/${req.params.id}`) })
    .catch(err => {console.log(err); return res.send(`Sorry, couldn't update a workshop with that id !`) })
    }
})

//get by id
router.get('/:id', async (req,res) => {
    
    try {
        const id = req.params.id

        const workshop = await Workshop.findById(id)
       // Workshop.getById(id)
        //const Course = await Course.reviews

        if(!workshop) return res.status(404).send({error: 'Workshop does not exist'})
        // for()
        res.json({data: workshop})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }  
    

    //res.json({data: workshop})
})

//get
router.get('/', async (req,res) => {
    const workshops = await Workshop.find()
    res.json({data: workshops})
})

//delete
router.delete('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const deletedWorkshop = await Workshop.findByIdAndRemove(id)
        res.json({msg:'workshop was deleted successfully', data: deletedWorkshop})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
})

///////////////////////////////////
//member apply for workshop WORKS!!!
router.put("/:wid/apply/:mid",async (req,res)=>{
    const memberid = req.params.mid
    const workid=req.params.wid
    const member =await Member.findById(memberid)
    const workshop =await Workshop.findById(workid)
    if(!workshop) return res.status(404).send({error: 'workshop does not exist'})
    if(!member) return res.status(404).send({error: 'This member does not exist'})
    //const updateWorkshop = await Workshop.findOneAndUpdate({workid},{ $push: { applicants: memberid }),
    //add element to applicants
    //workshop.applicants.push(memberid);
    
    Workshop.update(
        { _id: workid }, 
        { $push: { applicants: memberid } },
        //done
    )
    res.json({msg:'applicant was added successfully', data:workshop})
    //workshop.save(done);
   })
////////////////////////

module.exports = router;