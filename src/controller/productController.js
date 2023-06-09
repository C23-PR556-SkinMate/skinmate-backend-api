const app = require('../firebase');
const db = app.firestore();

const validProblems = ['acnes', 'blackheads', 'darkspot', 'wrinkles'];
const validSkinTypes = ['normal', 'dry', 'oily', 'combination'];
const direction = ['asc', 'desc'];
const defaultLimit = 5;

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

const fetchDb = async (arr, collection, tag, limit) => {
    const tagRef = db.collection(collection);
    const tagSnapshot = await tagRef
        .where('tags', '==', tag)
        .where('tags', )
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

const getProducts = async (req, res, next) => {
    const { problem, skintype, limit } = req.query;

    if (!problem && !skintype) {
        return res.status(404).json({
            message: 'Error, missing problem or skintype query'
        });
    }

    if (!Number(limit) || limit <= 0) {
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

        if (problem) await fetchDb(skinTreatment, 'skinTreatment', problem, limit);
        if (skintype) await fetchDb(dailyCare, 'dailyCare', skintype, limit);

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