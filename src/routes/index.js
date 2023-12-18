const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')

// mọi route được định nghĩa trong UserRouter sẽ có đường dẫn bắt đầu bằng /api/user
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
}

module.exports = routes;