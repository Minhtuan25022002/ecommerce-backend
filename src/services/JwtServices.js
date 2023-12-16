const jwt = require('jsonwebtoken');

const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, 'access_token', { expiresIn: '1h' })
    return access_token;
}

const generalRefreshToken = async (payload) => {
    const access_token = jwt.sign({
        payload
    }, 'refresh _token', { expiresIn: '365d' })
    return access_token;
}

module.exports = {
    generalAccessToken,
    generalRefreshToken
}