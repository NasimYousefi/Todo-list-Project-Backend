
import express from 'express';
import { getUserByIdController,
    createUserController,
    updatedUserDataController
 } from './controllers.js';
import { getUserByIdValidator,
    createUserValidator,
    updateUserValidator, } from './validations.js';


const router = express.Router();


router.get('/:id', getUserByIdValidator,getUserByIdController);

router.post('', createUserValidator,createUserController);

router.put('/:id', updateUserValidator, updatedUserDataController);


export {
  router
};