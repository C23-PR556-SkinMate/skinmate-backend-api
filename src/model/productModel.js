const app = require('../firebase');
const db = app.firestore();

const direction = ['asc', 'desc'];
const defaultLimit = 5;

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

const getProductsModel = async (arr, collection, tag, limit) => {
    const tagRef = db.collection(collection);
    const tagSnapshot = await tagRef
        .where('tags', '==', tag)
        .orderBy('__name__', direction[Math.round(Math.random())])
        .limit(Number(limit) || defaultLimit)
        .get();

    if (!tagSnapshot.empty) {
        tagSnapshot.docs.forEach((doc) => {
            const data = doc.data();
            data.price = 'Rp ' + data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            arr.push(data);
        });
        shuffleArray(arr);
    }
};

module.exports = {
    getProductsModel,
};