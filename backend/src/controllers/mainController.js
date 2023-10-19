const { validationResult } = require('express-validator')

const controller = {
    index: (req, res) => {
        res.render('index')
    },
    processCreditCardData: (req, res) => {
        const resultValidation = validationResult(req);
        
        res.json(resultValidation.mapped());
        
        console.log(JSON.stringify(resultValidation.mapped()));

    }
}
module.exports = controller;