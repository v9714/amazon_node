const productLike = require("./productLikeModel")
const productModel = require("./productModel")

const product = [
    {
        "alias": "Fjallraven - Foldsack No. 1 s",
        "title": "Fjallraven - Foldsack No. 1 s",
        "price": 1009.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://5.imimg.com/data5/SELLER/Default/2022/11/FS/LN/SB/128607083/haldi-ceremony-bride-and-groom-tshirt-500x500.png",
        "rating": 3.0,
        "countInstock": 18,
        "NumReviews": 20,
        "brand": "Fjallraven"
    },
    {
        "title": "Mens Casual  Slim T-Shirts ",
        "alias": "Mens Casual  Slim T-Shirts ",
        "price": 1122.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": 4.1,
        "countInstock": 0,
        "NumReviews": 20,
        "brand": "piter england"

    },
    {
        "title": " for Mens Cotton Jackets ",
        "alias": " for Mens Cotton Jackets ",
        "price": 1555.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": 4.7,
        "countInstock": 10,
        "NumReviews": 10,
        "brand": "raymond"

    },
    {
        "title": "Mens Casual Slim Fit",
        "alias": "Mens Casual Slim Fit",
        "price": 1500.99,
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        "rating": 2.1,
        "countInstock": 30,
        "NumReviews": 32,
        "brand": "blue buddha"

    },
    {

        "title": "John Hardy Women's Legends ",
        "alias": "John Hardy Women's Legends ",
        "price": 695,
        "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "rating": 4.6,
        "countInstock": 22,
        "NumReviews": 2,
        "brand": "john hardy"
    },

    {

        "title": "Solid Gold Petite Micropave ",
        "alias": "Solid Gold Petite Micropave ",
        "price": 1680,
        "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
        "rating": 3.9,
        "countInstock": 12,
        "NumReviews": 7,
        "brand": "petite"
    }

]



class ProductController {

    async insertProducts(req, res) {
        try {
            const result = await productModel.inn(product)
            if (result) {
                return res.status(200).send({ message: "Success", products: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Internal server error' })
        }
    }

    async getProduct(req, res) {
        try {
            const result = await productModel.getProduct()
            if (result) {
                return res.status(200).send({ message: "Success", Product: result })
            }

            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server Error..!" })
        }
    }

    async getProductByCarts(req, res) {
        try {
            const result = await productModel.getProductByCarts(req.body)
            if (result) {
                return res.status(200).send({ message: "Success", Product: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server Error..!" })
        }
    }


    async getProductId(req, res) {
        try {
            const { id } = req.params
            const result = await productModel.getProductId(id)
            if (result) return res.status(200).send({ message: "Success", productById: result })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }

    }

    async productLike(req, res) {
        try {
            const { userid, productId } = req.body;
            if (!userid || !productId) return res.status(400).send({ message: "Messing feilds..!" });
            const result = await productLike.addLike(req.body)
            if (result) return res.status(200).send({ message: "Success", productById: result })
            return res.status(400).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            if (error && error.message && error.message.includes("E11000")) {
                return res.status(400).send({ message: "Already Add in Favorite." })
            }

            return res.status(500).send({ message: "Internal server error" })
        }
    }
    async getProductLike(req, res) {
        try {
            const { id } = req.params;
            const result = await productLike.getLike(id)
            if (result) {
                return res.status(200).send({ message: "Success", Product: result })
            }
            return res.status(400).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }




}

const productController = new ProductController();
module.exports = productController;