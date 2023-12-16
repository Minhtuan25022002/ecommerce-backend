const User = require('../models/UserModel')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email,
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already in the database'
                })
            }
            const createdUser = await User.create({
                name,
                email,
                password,
                confirmPassword,
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

module.exports = {
    createUser
}

//khi tách controller ra services như này Nó sẽ giúp mình phân tách code ra, để sau này dự án có lớn lên thì sẽ dễ quản lí