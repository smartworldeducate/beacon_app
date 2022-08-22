import express from 'express'
import { getAllUser ,updateUser,deleteUser } from '../mysqlController/userController.js'

const router=express.Router()


router.get('/getAllUser',getAllUser)
router.put('/updateuser',updateUser)
router.delete('/deleteUser',deleteUser)


export default router