const { Router } = require('express');
const AuthUserComponent = require('../Auth');
const Auth = require('../../polices/isAuth');

/**
 * Express router to auth user related functions on.
 * @type {Express.Router}
 * @const
 */
const authUserRouter = Router();

/**
 * Route post user login action
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.post('/login', AuthUserComponent.login);

/**
 * Route get user logout action
 * @name /v1/auth/logout
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.post('/logout', AuthUserComponent.logout);

/**
 * Route get user private page
 * @name /v1/auth/private
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.get('/private', AuthUserComponent.passport);

/**
 * Route post create new user
 * @name /v1/auth/createUser
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.post('/createUser', AuthUserComponent.createUser);

authUserRouter.delete('/delete', AuthUserComponent.deleteById);
/**
 * Route post update user JWT token
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
authUserRouter.post('/updateToken', Auth.isAuthJWT);

module.exports = authUserRouter;
