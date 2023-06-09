const { validateImageType } = require('../helper/imageValidationHelper');
const { getProductsModel } = require('../model/productModel');
const { getArticleModel } = require('../model/articleModel');
const {
    updateResultModel, 
    getResultsModel,
} = require('../model/resultModel');


const axios = require('axios');
const FormData = require('form-data');
const validSkinTypes = ['normal', 'dry', 'oily', 'combination'];
const URL = 'https://skinmate-predict-api-vle27crhfa-et.a.run.app/scan';

const setResult = async (req, res, next) => {
    const { skintype, limit } = req.query;
    const { uid } = req.result;
    const file = req.file;

    if (!uid) {
        return res.status(404).json({
            message: 'Error, missing uid',
        });
    }

    if (!file) {
        return res.status(404).json({
            message: 'Error, missing file',
        });
    }

    if (Number(limit) && limit <= 0) {
        return res.status(404).json({
            message: 'Error, invalid limit'
        });
    }

    if (!validateImageType(file)) {
        return res.status(404).json({
            message: 'Error, invalid file type',
        });
    }

    if (skintype && !validSkinTypes.includes(skintype)) {
        return res.status(404).json({
            message: 'Error, invalid skintype query'
        });
    }

    try {
        const { buffer, originalname } = file;
        const formData = new FormData();

        formData.append(
            'file',
            buffer,
            { filename: originalname }
        );

        const response = await axios({
            method: 'POST',
            mode: 'cors',
            url : URL,
            timeout: 8000,
            data: formData,
        });

        const problem = response.data.data.skinProblem;

        const skinTreatment = [];
        const dailyCare = [];
        const article = await getArticleModel(problem);

        if (problem) await getProductsModel(skinTreatment, 'skinTreatment', problem, limit);
        if (skintype) await getProductsModel(dailyCare, 'dailyCare', skintype, limit);

        await updateResultModel(uid, problem);
    
        return res.status(200).json({
            data: {
                article,
                problem,
                skintype,
                products: {
                    skinTreatment,
                    dailyCare,
                }
            },
            message: 'Results has been predicted and saved successfully',
            success: true,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getResults = async (req, res, next) => {
    const { limit } = req.query;
    const { uid } = req.result;

    if (!uid) {
        return res.status(404).json({
            message: 'Error, missing uid',
        });
    }

    if (Number(limit) && limit <= 0) {
        return res.status(404).json({
            message: 'Error, invalid limit'
        });
    }

    try {
        const results = await getResultsModel(uid);
        return res.status(200).json({
            data: {
                results: limit ? results.splice(0, limit) : results
            },
            message: 'Results has been retrieved successfully',
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    setResult,
    getResults,
};
