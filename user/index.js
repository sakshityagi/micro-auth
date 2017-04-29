'use strict';

import { Router } from 'express';
import * as controller from './user.controller';
import * as auth from '../auth/auth.service';

const router = new Router();

router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id', auth.isAuthenticated(), controller.updateUser);
router.post('/', controller.create);

export default router;
