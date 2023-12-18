const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/create', ProductController.createProduct);
router.put('/update/:id', authMiddleware, ProductController.updateProduct);
router.get('/get-details/:id', ProductController.detailProduct);
router.get('/get-all', ProductController.getAllProducts);
router.delete('/delete/:id', ProductController.deleteProduct);

module.exports = router;