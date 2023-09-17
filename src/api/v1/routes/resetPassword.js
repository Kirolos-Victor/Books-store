const express = require('express')
const { sendResetLinkEmail, changePassword } = require('../controllers/ResetPasswordController')
const router = express.Router()

router.post('/forgot-password', sendResetLinkEmail)
router.post('/reset-password', changePassword)

module.exports = router