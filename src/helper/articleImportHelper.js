const app = require('../firebase');
const article = require('../data/article');
const db = app.firestore();

const importArticle = async () => {
    const articleRef = db.collection('tips');
    for (let i = 1; i <= article.length; i++) {
        await articleRef.add({
            id: i,
            ...article[i-1],
        });
        await new Promise(o => setTimeout(o, 2000));
    }
};

importArticle();
