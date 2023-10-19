const { body } = require('express-validator');

const validations = [

  body('cardNumber')
    .notEmpty()
    .withMessage('You have enter to enter a card number')
    .blacklist(' -')
    .isLength({ min: 16, max: 19 })
    .withMessage('Invalid card number length')
    .isNumeric()
    .withMessage('Card number must be numeric')
    // .custom((value) => {
    //   let sum = 0;
    //   let double = false;
    //   for (let i = value.length - 1; i >= 0; i--) {
    //     let digit = parseInt(value[i], 10);
    //     if (double) {
    //       digit *= 2;
    //       if (digit > 9) digit -= 9;
    //     }
    //     sum += digit;
    //     double = !double;
    //   }
    //   return sum % 10 === 0;
    // })
    .isLuhnNumber()
    .withMessage('Invalid card number'),

  body('expiryDate')
    .notEmpty()
    .withMessage('You have to enter an expiry date')
    .isAfter(new Date().toISOString())
    .withMessage('Expiry date must be in the future'),

  body('cvv')
    .notEmpty()
    .trim()
    .withMessage('You have to enter a CVV number')
    // .custom((value, { req }) => {
    //   if (req.body.cardType === 'americanexpress') {
    //     return value.length === 4;
    //   } else {
    //     return value.length === 3;
    //   }
    // })
    .custom((value, { req }) => {
      const cardNumber = req.body.cardNumber
      if (cardNumber.substring(0, 2) == 34 || cardNumber.substring(0, 2) == 37 ) {
        return value.length === 4;
      } else {
        return value.length === 3;
      }
    })
    .withMessage('Invalid CVV length'),
];

module.exports = validations;
