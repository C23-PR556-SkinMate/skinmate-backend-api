const Joi = require('joi');
const { getArticleModel } = require('../model/articleModel');

const articleSchema = Joi.object({
    tags: Joi.string().valid(
        'acnes', 
        'wrinkles', 
        'darkspot', 
        'blackheads', 
    ).required()
});

async function getArticles(req, res, next) {
    const { error, value } = articleSchema.validate(req.query);

    
    if (error) { 
        return res.status(404).json({ message: error.details[0].message });
    }
    
    try {
        const tags = value.tags;
        const articles = await getArticleModel(tags);
        res.status(200).json({
            data: articles,
            message: 'Successfully retrieved the article',
            success: true
        });  
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getArticles,
};
