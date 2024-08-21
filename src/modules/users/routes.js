
import express from 'express';
import { getUserByIdController,
    createUserController,
    updatedUserDataController,
    updateUserPasswordController
 } from './controllers.js';
import { getUserByIdValidator,
    createUserValidator,
    updateUserValidator,
   } from './validations.js';

    import { getUserInfo } from './controllers.js';
    import {authMiddleware} from '../../core/middleware/authorization.js';

const router = express.Router();

router.get('/info', authMiddleware, getUserInfo);

router.get('/:id', getUserByIdValidator,getUserByIdController);

router.post('', createUserValidator,createUserController);

router.put('/:id', updateUserValidator, updatedUserDataController);

router.put('/edit/:id', authMiddleware, updatedUserDataController);
router.put('/edit/password/:id', authMiddleware, updateUserPasswordController);

export {
  router
};