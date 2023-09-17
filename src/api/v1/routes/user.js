const express = require('express')
const { getUserById, getAllUsers, storeUsers, updateUser, deleteUser } = require('../controllers/UserController')
const router = express.Router()

router.route('/')
  .get(getAllUsers)
  .post(storeUsers)
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router