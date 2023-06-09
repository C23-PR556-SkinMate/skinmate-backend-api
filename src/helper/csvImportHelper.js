const app = require('../firebase');
const db = app.firestore();
const { parse } = require('csv-parse');
const fs = require('fs');
require('dotenv').config();

const cleanObjects = (obj, storageURL) => {
    const cleanedObj = {};

    Object.entries(obj).forEach(([key, value]) => {
        const cleanedKey = key.split(' ').map((ele, index) => {
            return !index ? ele.toLowerCase() : ele.charAt(0).toUpperCase() + ele.slice(1);
        }).join('');
        
        switch(cleanedKey) {
        case 'id':
            cleanedObj[cleanedKey] = Number(value);
            break;
        case 'price':
            cleanedObj[cleanedKey] = Number(value.replace(/\D+/g, ''));
            break;
        case 'links':
            cleanedObj.url = {
                cover: storageURL + `${cleanedObj.id}.png`,
                external: value
            };
            break;
        default:
            cleanedObj[cleanedKey] = value;
            break;
        }
    });
    return cleanedObj;
};

const parseData = (collection, folder, file) => {
    const imageURL = `https://storage.googleapis.com/${process.env.GCS_BUCKET_PRODUCT}/${folder}/`;

    fs.readFile(`../data/${file}`, 'utf8', (err, fileData) => {
        if (err) {
            console.error(err);
            return;
        }
        
        const parser = parse(fileData, { columns: true, delimiter: ',' });
    
        parser.on('readable', async () => {
            let record; while ((record = parser.read())) {
                const productRef = db.collection(collection);
                await productRef.add(cleanObjects(record, imageURL));
                await new Promise(r => setTimeout(r, 1000));
            }
        });
    
        parser.on('finish', () => console.log('finished-' + folder));
    });
};

parseData('dailyCare', 'daily-care', 'data-daily-care.csv');
parseData('skinTreatment', 'skin-treatment', 'data-skin-treatment.csv');