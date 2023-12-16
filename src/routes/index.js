const UserRouter = require('./UserRouter')

// mọi route được định nghĩa trong UserRouter sẽ có đường dẫn bắt đầu bằng /api/user
const routes = (app) => {
    app.use('/api/user', UserRouter)
}

module.exports = routes;