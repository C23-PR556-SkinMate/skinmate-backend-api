const app = require('../firebase');
const db = app.firestore();
const Joi = require('joi');


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

    const articles = [];

    if (error) { 
        return res.status(404).json({ message: error.details[0].message });
    }
    
    try {
        const tags = value.tags;
        const articleRef = db.collection('articles');
        const articleSnapshot = await articleRef.where('tags','==', tags).get();
        if (!articleSnapshot.empty) {
            articleSnapshot.docs.forEach((doc)=>{
                articles.push(doc.data());
            });
        }
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
