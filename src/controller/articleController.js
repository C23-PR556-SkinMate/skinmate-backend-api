const Joi = require('joi');

// Validation schema for query parameters
const articleSchema = Joi.object({
    category: Joi.string().valid('acne', 'wrinkle', 'blackspots', 'blackheads', 'dryness', 'dullness').required(),
});

// Controller function for handling the /articles endpoint
function getArticles(req, res) {
    const { error, value } = articleSchema.validate(req.query);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
    } else {
        const category = value.category;
        //Perform logic to fetch articles based on the category
        const articles = [
            { title: 'Article 1', category },
            { title: 'Article 2', category },
        ];
        res.json(articles);
    }
}

module.exports = {
    getArticles,
};
