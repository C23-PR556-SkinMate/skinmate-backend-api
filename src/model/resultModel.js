const dayjs = require('dayjs');
const app = require('../firebase');
const db = app.firestore();

const sortResult = (arr) => {
    return arr.slice().sort((a,b) => b.unix - a.unix);
};

const updateResultModel = async (uid, problem) => {
    const createdAt = Date.now();
    const formattedDate = dayjs(createdAt).format('DD/MM/YYYY');

    const resultRef = db.collection('results');
    const resultSnapshot = await resultRef.doc(uid).get();

    if (resultSnapshot.exists) {
        const { results } = resultSnapshot.data();

        results.push({
            unix: createdAt,
            date: formattedDate,
            problem,
        });

        await resultRef.doc(uid).set({
            updatedAt: createdAt,
            results,
        }, {
            merge: true,
        });
    } else {
        await resultRef.doc(uid).set({
            createdAt,
            updatedAt: createdAt,
            results: [{
                unix: createdAt,
                date: formattedDate,
                problem,
            }]
        });
    }
};

const getResultsModel = async (uid) => {
    const resultRef = db.collection('results');
    const resultSnapshot = await resultRef.doc(uid).get();

    if(resultSnapshot.exists) {
        const { results } = resultSnapshot.data();
        return sortResult(results); 
    } else {
        return [];
    }
};

module.exports = {
    updateResultModel,
    getResultsModel,
};
