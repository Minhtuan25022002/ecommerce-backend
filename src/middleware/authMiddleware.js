const jwt = require('jsonwebtoken');
const dotenv  = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const tokenHeader = req.headers.token;

    if (!tokenHeader) {
        return res.status(401).json({
            message: 'Token is missing',
            status: 'ERROR'
        });
    }
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        console.log(user);
        const { payload } = user;
        if (payload?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.REFRESH_TOKEN, function(err, user) {
        if(err) {
            return res.status(404).json({
                message: 'The authentication!',
                status: 'ERROR'
            })
        }
        const { payload } = user;
        if (payload?.isAdmin || payload?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}