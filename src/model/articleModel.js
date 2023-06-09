const app = require('../firebase');
const db = app.firestore();
const getArticleModel = async (tags) => {
    const articles = [];
    const articleRef = db.collection('articles');
    const articleSnapshot = await articleRef.where('tags','==', tags).get();
    if (!articleSnapshot.empty) {
        articleSnapshot.docs.forEach((doc)=>{
            articles.push(doc.data());
        });
    }

    return articles;
};

module.exports = {
    getArticleModel,
};


