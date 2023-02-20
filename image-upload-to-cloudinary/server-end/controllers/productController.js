const Product = require("../models/product");
const cloudinary = require('../utils/cloudinary');



exports.createProduct = async (req, res, next) => {

    const { image } = req.body;


    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "products",
            // width: 300,
            // crop: "scale"
        })
        console.log(result)
        const product = await Product.create({
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        });
        res.status(201).json({
            success: true,
            product
        })

    } catch (error) {
        console.log("error", error);

    }

}