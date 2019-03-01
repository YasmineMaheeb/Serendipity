const express = require('express')
const Joi = require('joi')
const uuid = require('uuid')
const router = express.Router()

// We will be connecting using database 
const EducationalOrganization = require('../../models/EducationalOrganization')

// temporary data created as if it was pulled out of the database ...
const educationalOrganizations = [
    new EducationalOrganization('1','GUC', 'GUC', 'YIFIYF546', 'email',['df','wef'],['math','cs'],['df'],
    ['salma','sama'],['dareen','omar'],['p1','p2'],'university',true,'1/1/2023'),
    new EducationalOrganization('2','AUC', 'AUC', 'YIFAAAIYF546', 'emailA',['Adf','Awef'],['math3','cs2'],
    ['dfRFG'], ['dareen','samah'],['mayar','nora'],['pr1','pr2'],'uni',true,'1/12/2023'),
];

router.get('/', (req, res) => res.json({ data: educationalOrganizations }))


router.get('/', (req, res) => {
    let data = "";
    educationalOrganizations.forEach((value) => {
        const educationalOrganizations_id = value.id;
        const educationalOrganizations_name = value.name;
        data += `<a href="/api/courses/${educationalOrganizations_id}">${educationalOrganizations_name}</a><br>`;
    });
    res.send(data);
});

router.get('/:id', (req, res) => {
    var data = "";
    educationalOrganizations.forEach((value) => {
        if(value.id === req.params.id) {
            data = `Id: ${value.id}<br>Name: ${value.name}<br>eduOrganisation: ${value.eduOrganisation}<br>duration: ${value.duration}<br>educator: ${value.educator}<br>price: ${value.price}<br>decription: ${value.decription}<br>location: ${value.location}`;
            return;
        }
    });
    res.send(data || 'No educatioinal organization matches the requested id');
});

//Creating an educational organization
router.post('/', (req, res) => {
	const userName = req.body.userName;
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const masterClasses = req.body.masterClasses;
    const courses = req.body.courses;
    const workshops = req.body.workshops;
    const trainers = req.body.trainers;
    const educators = req.body.educators;
    const trainingPrograms = req.body.trainingPrograms;
    const description = req.body.description;
    const contract = req.body.contract;
    const expirationDate = req.body.expirationDate;
    

    const schema = {
		userName: Joi.string().min(3).required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        masterClasses: Joi.array().items(),
        courses: Joi.array().items(),
        workshops: Joi.array().items(),
        trainers: Joi.array().items(),
        educators: Joi.array().items(),
        trainingPrograms: Joi.array().items(),
        description: Joi.string().required(),
        contract: Joi.boolean().required(),
        expirationDate: Joi.string().required()
    }
    
    const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newEducationalOrganization = {
        userName: userName,
        name: name,
        password: password,
        email: email,
        masterClasses: masterClasses,
        courses: courses,
        workshops: workshops,
        trainers: trainers,
        educators: educators,
        trainingPrograms: trainingPrograms,
        description: description,
        contract: contract,
        expirationDate: expirationDate,
		id: uuid.v4(),
    };
    educationalOrganizations.push(newEducationalOrganization)
    
	return res.json({ data: newEducationalOrganization });
});

module.exports = router

