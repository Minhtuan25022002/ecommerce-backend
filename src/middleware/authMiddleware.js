const jwt = require('jsonwebtoken');
const dotenv  = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    // console.log('checktoken', req.headers.token);
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err) {
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

module.exports = {
    authMiddleware
}