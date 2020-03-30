const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthUserService = require('../Auth/service');
const AuthUserValidation = require('../Auth/validation');
const ValidationError = require('../../error/ValidationError');
const { getUserMainFields } = require('../../helpers/user');

const dbError = 'MongoError: E11000 duplicate key error collection';
const defaultError = 'An error has occurred';
const userNotFound = 'This Email not found';
const wrongPassword = 'Wrong Password';
const saltRounds = 10;

async function getJWTTokens(user) {
    const accessToken = jwt.sign({ user }, process.env.JWT_Access_Secret_KEY, { expiresIn: 10 });
    const refreshToken = jwt.sign({}, process.env.JWT_Refresh_Secret_KEY, { expiresIn: '2d' });

    await AuthUserService.updateRefreshToken(user, refreshToken);
    return {
        accessToken,
        refreshToken,
    };
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function createUser(req, res, next) {
    try {
        const { error } = AuthUserValidation.createUser(req.body);
        if (error) {
            throw new ValidationError(error.details);
        }

        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        const user = await AuthUserService.createUser(req.body);

        return res.status(200).json({ user });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(200).json({ message: error.message });
        }
        if (error.name === 'MongoError') {
            return res.status(200).json({ message: dbError });
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
    try {
        const { error } = AuthUserValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthUserService.findUser(req.body.email);
        if (!user) {
            return res.status(401).json({
                message: userNotFound,
            });
        }
        if (!error && user) {
            const reqPassword = req.body.password;
            const userPassword = user.password;
            const passwordsMatch = await bcrypt.compare(reqPassword, userPassword);
            if (!passwordsMatch) {
                return res.status(401).json({
                    message: wrongPassword,
                });
            }
            const token = await getJWTTokens(user.id);
            let data = {};
            data = {
                ...getUserMainFields(user),
                token,
            };
            req.session.user = data;
            return res.status(200).json({ data });
        }
        return res.status(200);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(401).json({
                message: error.message,
            });
        }

        if (error.name === 'MongoError') {
            return res.status(401).json({
                message: defaultError,
            });
        }

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function logout(req, res, next) {
    try {
        console.log('logout');
        await AuthUserService.logout(req.session.user['_id']);
        const userName = req.session.user.fullName;
        console.log(req.session.user);
        delete req.session.user;
        return res.status(200).json({
            message: `User ${userName} successful logout`,
        });
    } catch (error) {
        req.flash('error', { message: defaultError });
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById(req, res, next) {
    try {
        const { error } = AuthUserValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        await AuthUserService.deleteById(req.body.id);

        return res.status(200);
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.message);
            return res.status(401);
        }
        if (error.name === 'MongoError') {
            return res.status(500).json({
                message: error.message,
            });
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Promise < void >}
 */
function passport(req, res) {
    console.log('passport');
    return res.render('private.ejs');
}

module.exports = {
    createUser,
    logout,
    login,
    getJWTTokens,
    passport,
    deleteById,
};
