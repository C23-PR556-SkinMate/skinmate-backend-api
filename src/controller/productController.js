const { getProductsModel } = require('../model/productModel');

const validProblems = ['acnes', 'blackheads', 'darkspot', 'wrinkles'];
const validSkinTypes = ['normal', 'dry', 'oily', 'combination'];

const getProducts = async (req, res, next) => {
    const { problem, skintype, limit } = req.query;

    if (!problem && !skintype) {
        return res.status(404).json({
            message: 'Error, missing problem or skintype query'
        });
    }

    if (Number(limit) && limit <= 0) {
        return res.status(404).json({
            message: 'Error, invalid limit'
        });
    }

    if (problem && !validProblems.includes(problem)) {
        return res.status(404).json({
            message: 'Error, invalid problem query'
        });
    }

    if (skintype && !validSkinTypes.includes(skintype)) {
        return res.status(404).json({
            message: 'Error, invalid skintype query'
        });
    }

    try {
        const skinTreatment = [];
        const dailyCare = [];

        if (problem) await getProductsModel(skinTreatment, 'skinTreatment', problem, limit);
        if (skintype) await getProductsModel(dailyCare, 'dailyCare', skintype, limit);

        res.status(200).json({
            data: {
                products: [
                    ...skinTreatment,
                    ...dailyCare,
                ],
            },
            message: 'Successfully retrieved the products',
            success: true,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = { getProducts };