const { skinProducts, skinIssues } =  require('../data/products');

const getProducts = async (req, res, next) => {
    const { tag, limit } = req.query;

    if (!tag) {
        return res.status(404).json({
            message: 'Error, missing tag'
        });
    }

    if (!skinIssues.includes(tag)) {
        return res.status(404).json({
            message: 'Error, tag does not exists'
        });
    }

    try {
        const filteredProducts = skinProducts.filter((product) => {
            return product.tags.includes(tag);
        }).splice(0, limit || 5);

        res.status(200).json({
            data: {
                tag,
                products: filteredProducts,
            },
            message: 'Successfully retrieved the products',
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getProducts };