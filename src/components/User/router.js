const { Router } = require('express');
const UserComponent = require('../User');
const { isAuthJWT } = require('../../polices/isAuth');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const userRouter = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
// userRouter.get('/', isAuthPasport, csrfProtection, UserComponent.findAll);
userRouter.get('/', isAuthJWT, UserComponent.findAll);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
userRouter.get('/:id', UserComponent.findById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
// router.post('/create', UserComponent.create);
userRouter.post('/', isAuthJWT, UserComponent.create);
/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
userRouter.put('/', UserComponent.updateById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
userRouter.delete('/', UserComponent.deleteById);

module.exports = userRouter;
