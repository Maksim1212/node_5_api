const jwt = require('jsonwebtoken');
// const passport = require('passport');

// const { Strategy } = require('passport-local');
const AuthUserService = require('../components/Auth/service');
const { getJWTTokens } = require('../components/Auth/index');

const accessError = 'Acces Error, need auth!';
/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function isAuthJWT(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: accessError });
    }
    let token = req.session.user.token.accessToken;
    const tokens = await getJWTTokens(req.session.user.id);
    let decoded;
    console.log('first token', token);
    try {
        decoded = jwt.verify(token, process.env.JWT_Access_Secret_KEY);
    } catch (error) {
        if (error.message === 'jwt expired') {
            const user = await AuthUserService.getUserByRefreshToken(req.session.user.token.refreshToken);
            req.session.user.token.accessToken = tokens.accessToken;
            token = req.session.user.token.accessToken;
            console.log('New Token', token);
            decoded = jwt.verify(token, process.env.JWT_Access_Secret_KEY);
            if (!user) {
                return res.status(401).json({ message: accessError });
            }
        } else {
            return res.status(401).json({ message: accessError });
        }
    }
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp > currentTime) {
        return next();
    }
    return res.status(200);
}

async function isAuthPassport(req, res, next) {
    // pasport auth
}


module.exports = {
    isAuthJWT,
    isAuthPassport,
};
