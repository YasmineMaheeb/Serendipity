const Joi = require('joi')



module.exports = {

    createValidation: request => {

        const createSchema = {

            title : Joi.string().required(),

            eduOrganisation : Joi.string().required(),

            duration : Joi.number(),

            educator : Joi.string().required(),

            price : Joi.number().required(),

            description : Joi.string(),

            location : Joi.string(),

            applicants : Joi.array().items(Joi.string(),Joi.number())

        }

        return Joi.validate(request, createSchema)

    },



    updateValidation: request => {

        const updateSchema = {

        title : Joi.string(),

        eduOrganisation : Joi.string(),

        duration : Joi.number(),

        educator : Joi.string(),

        price : Joi.number(),

        description : Joi.string(),

        location : Joi.string(),

        applicants : Joi.array().items(Joi.string(),Joi.number())

        }



        return Joi.validate(request, updateSchema)

    },



    applyValidation : request => {

        const applySchema = {

            applicantId : Joi.string()

        }

        return Joi.validate(request,applySchema)

    }





}