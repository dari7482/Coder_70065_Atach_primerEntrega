const express = require("express")
const router = express.Router()
const chekValues = require("../middleware/productMid.js")
const products = require('../utils/products.js')




let productList = []
productList = products




router.get("/product", (req, res) => {
    res.json(productList)
})


router.get("/product/:id", (req, res) => {

    const { id } = req.params

    const filterProdid = productList.filter((item) => item.id === id)

    if (filterProdid) {
        res.json(filterProdid)
    } else {
        res.status(400).json({ message: "product Not found" })

    }

})


router.post("/product/NewProduct", (req, res) => {

    const { title, description, code, price, stock, category, thumbnails } = req.body
    console.log(code)

    try {
        if (!chekValues(req.body)) {
            throw new Error('Los valores no son válidos');
        }
        const newProduct = {
            id: productList.length + 1,
            title,
            description,
            code,
            price,
            status: "true",
            stock,
            category,
            thumbnails,
        }
        productList.push(newProduct)
        res.json(newProduct)
    } catch (error) {
        console.error('Error al crear el producto:', error.message);
        res.status(400).json({ error: error.message });
    }

})


router.put("/product/edit/:id", (req, res) => {

    const { id } = req.params
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const findProduct = productList.find((item) => item.id === id)


    const newProduct = {

        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    }

    res.status(201).json(newProduct)

})

router.delete("/producto/delete/:id", (res, req) => {
    const { id } = req.params

    const findProduct = productList((items) => items.id === id)

    if (findProduct.length > 1) {

        productList = productList.filter((items) => items.id !== id)

        res.json({ message: `producto elliminado ${id}` })


    } else {
        res.status(400).json({ message: "product Not found" })
    }


})



module.exports = router