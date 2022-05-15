const express = require('express')
const router = new express.Router()

const AuthCtrl = require('../middleware/auth')

const ProductsCtrl = require('../controllers/product');

//POST PRODUCTS

router.post('/product/create_new_product', AuthCtrl, ProductsCtrl.createProduct),

    router.get('/product/:id/avatar', ProductsCtrl.getProductPhoto),
 
    router.get('/product/me', AuthCtrl, ProductsCtrl.fetchMyProducts),
    router.get('/product/fetch_all_products', ProductsCtrl.fetchAllProducts),

    router.get('/product/:id', ProductsCtrl.getProductById),
    router.get('/product/count_products', AuthCtrl, ProductsCtrl.countProducts),

    router.patch('/product/:id', AuthCtrl, ProductsCtrl.updateProduct),
    router.delete('/product/:id', AuthCtrl, ProductsCtrl.deleteProduct)

module.exports = router