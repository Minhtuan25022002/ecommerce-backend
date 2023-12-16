const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtServices');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email,
            })
            const hashPassword = bcrypt.hashSync(password, 10);
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already in the database'
                })
            }
            const createdUser = await User.create({
                name,
                email,
                password: hashPassword,
                phone
            });
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            };
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email,
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser
}

//khi tách controller ra services như này Nó sẽ giúp mình phân tách code ra, để sau này dự án có lớn lên thì sẽ dễ quản lí