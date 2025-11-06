const { body } = require('express-validator');
module.exports = [
body('name').notEmpty().withMessage('Name is required')
];