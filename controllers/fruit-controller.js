const {validationResult} = require('express-validator');
const RequestError = require('../middleware/request-error');
const Fruit = require('../models/fruit');

const getFruitById = async (req, res, next) => {
    const fruitId = req.params.fruitId;
    let fruit;
    try {
        fruit = await Fruit.findById(fruitId);
    } catch (err) {
        const error = new RequestError('Fetching fruit failed, please try again later.', 500, err);
        return next(error);
    }
    if (!fruit) {
        const error = new RequestError('fruit not found', 500);
        return next(error);
    }
    await res.json({"status": "success", fruit: fruit});
};

const getAllFruits = async (req, res, next) => {
    let fruits;
    try {
        fruits = await Fruit.find({});
    } catch (err) {
        const error = new RequestError('Fetching fruits failed, please try again later.', 500, err);
        return next(error);
    }
    await res.json({"status": "success", "fruits": fruits.map(fruit => fruit.toObject({getters: true}))});
}

const addFruit = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let params = "";
        errors.array().forEach((e) => {
            params += `${e.param}, `
        });
        params += "triggered the error!!";
        return next(
            new RequestError(params, 422)
        );
    }
    const {name,rating,taste} = req.body;
    const fruit = new Fruit({
        name,
        rating,
        taste
    });
    try {
        await fruit.save();
    } catch (err) {
        const error = new RequestError("Error creating fruit", 500, err);
        return next(error);
    }
    res.json({"status": "success", "fruit": fruit});

}

exports.getFruitById = getFruitById;
exports.getAllFruits = getAllFruits;
exports.addFruit = addFruit;
