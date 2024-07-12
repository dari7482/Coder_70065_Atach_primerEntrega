const express = require("express")
const router = express.Router()
const cart = require('../utils/cart.js')


let cartList = []
cartList = cart

console.log(cart)


router.get("/cart/:cid", (req, res) => {

    const { cid } = req.params
    console.log(cartList)
    const filterCarList = cartList.filter((item) => item.id === cid)

    if (filterCarList) {
        res.json(filterCarList)
    } else {
        res.status(400).json({ message: "product Not found" })

    }

})


router.post("/cart/:cid/:pid", (req, res) => {

    const { cid, pid } = req.params
    const quantity = req.body

    console.log('33', quantity[0].produto)

    const filterProdId = quantity[0].produto.find((prodid) => prodid.id === pid)
    console.log(filterProdId)

    console.log(cid, pid)

    const newProducts = [{
        "id": cid,
        "produto": [
            {
                "id": pid,
                "quantity": filterProdId ? filterProdId.quantity : quantity[0].produto[0].quantity
            }

        ]



    }]

    console.log(newProducts)
    const result = addToCart(newProducts, cartList)

    function addToCart(newProducts, cart) {
        newProducts.forEach(newItem => {

            let cartItem = cart.find(item => item.id === newItem.id);

            if (cartItem) {

                let product = cartItem.produto.find(prod => prod.id === newItem.produto[0].id);

                if (product) {

                    product.quantity = String(Number(product.quantity) + Number(newItem.produto[0].quantity));
                } else {

                    cartItem.produto.push(newItem.produto[0]);
                }
            } else {

                cart.push(newItem);
            }
        });


        return cart;
    }



    console.log(result)
    res.json(res.json(result))


})




module.exports = router