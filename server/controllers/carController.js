const uuid = require('uuid')
const path = require('path');
const {Car, CarInfo, CarConditions, CarImage} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");


class CarController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, year, deposit, price_per_day_1_2_days, price_per_day_3_7_days, price_per_day_8_20_days, price_per_day_21_days_and_more, info, conditions} = req.body;
            const img = req.files.images instanceof Array ? req.files.images : [req.files.images];
            let imgArray = [];

            // Загрузка каждого изображения в массив
            for (let i = 0; i < img.length; i++) {
                let fileName = uuid.v4() + ".jpg" || uuid.v4() + ".png";
                img[i].mv(path.resolve(__dirname, '..', 'static', fileName));
                imgArray.push(fileName);
            }

            const car = await Car.create({name, price, brandId, typeId, year, deposit, price_per_day_1_2_days, price_per_day_3_7_days, price_per_day_8_20_days, price_per_day_21_days_and_more,});

            // Создание записей для каждого изображения в модели "CarImage"
            for (let i = 0; i < imgArray.length; i++) {
                await CarImage.create({
                    carId: car.id,
                    img: imgArray[i]
                });
            }


            // Добавление информации и условий, если они есть
            if (conditions) {
                conditions = JSON.parse(conditions)
                conditions.forEach(i =>
                    CarConditions.create({
                        title: i.title,
                        description: i.description,
                        carId: car.id
                    })
                )
            }

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    CarInfo.create({
                        title: i.title,
                        description: i.description,
                        carId: car.id
                    })
                )
            }

            // Возвращение объекта "car" с добавленными изображениями
            return res.json({
                id: car.id,
                name: car.name,
                price: car.price,
                brandId: car.brandId,
                typeId: car.typeId,
                year: car.year,
                deposit: car.deposit,
                price_per_day_1_2_days: car.price_per_day_1_2_days,
                price_per_day_3_7_days: car.price_per_day_3_7_days,
                price_per_day_8_20_days: car.price_per_day_8_20_days,
                price_per_day_21_days_and_more: car.price_per_day_21_days_and_more,
                img: imgArray,
                createdAt: car.createdAt,
                updatedAt: car.updatedAt
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, price, brandId, typeId, year, deposit, price_per_day_1_2_days, price_per_day_3_7_days, price_per_day_8_20_days, price_per_day_21_days_and_more, } = req.body;
            const img = req.files.images instanceof Array ? req.files.images : [req.files.images];
            let imgArray = [];
            // Загрузка каждого изображения в массив
            for (let i = 0; i < img.length; i++) {
                let fileName = uuid.v4() + ".jpg" || uuid.v4() + ".png";
                img[i].mv(path.resolve(__dirname, '..', 'static', fileName));
                imgArray.push(fileName);
            }

            await CarImage.destroy({ where: { carId: id } }); // удаляем все записи в таблице CarImage с carId = id

            // Создание записей для каждого изображения в модели "CarImage"
            for (let i = 0; i < imgArray.length; i++) {
                await CarImage.create({
                    carId: id,
                    img: imgArray[i]
                });
            }

            // Обновление записи в таблице "Car"
            await Car.update({
                name: name,
                price: price,
                brandId: brandId,
                typeId: typeId,
                year: year,
                deposit: deposit,
                price_per_day_1_2_days: price_per_day_1_2_days,
                price_per_day_3_7_days: price_per_day_3_7_days,
                price_per_day_8_20_days: price_per_day_8_20_days,
                price_per_day_21_days_and_more: price_per_day_21_days_and_more,
            }, { where: { id } });


            // Возвращение объекта "car" с обновленными изображениями
            return res.json({
                id: id,
                name: name,
                price: price,
                brandId: brandId,
                typeId: typeId,
                year: year,
                deposit: deposit,
                price_per_day_1_2_days: price_per_day_1_2_days,
                price_per_day_3_7_days: price_per_day_3_7_days,
                price_per_day_8_20_days: price_per_day_8_20_days,
                price_per_day_21_days_and_more: price_per_day_21_days_and_more,
                img: imgArray
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        const offset = page * limit - limit;

        const include = { model: CarImage, as: 'img' };
        const order = [['price', 'DESC']]; // добавляем параметр сортировки

        let cars;

        if (!brandId && !typeId) {
            cars = await Car.findAndCountAll({ include, limit, offset, order });
        } else if (brandId && !typeId) {
            cars = await Car.findAndCountAll({ where: { brandId }, include, limit, offset, order });
        } else if (!brandId && typeId) {
            cars = await Car.findAndCountAll({ where: { typeId }, include, limit, offset, order });
        } else if (brandId && typeId) {
            cars = await Car.findAndCountAll({ where: { brandId, typeId }, include, limit, offset, order });
        }

        return res.json(cars);
    }


    async getOne(req, res) {
        const {id} = req.params
        const car = await Car.findOne(
            {
                where: {id},
                include: [{model: CarInfo, as: 'info'}, {model: CarConditions, as: 'conditions'}, {model: CarImage, as: 'img'}]
            },
        )
        return res.json(car)
    }

    async delete(req, res) {
        const {id} = req.params
        const car = await Car.destroy({where: {id}})
        return res.json(car)
    }

    async search(req, res) {
        const {id} = req.params
        const searchQuery = req.query.q;
        const car = await Car.findAll({
            where: {
                name: { [Op.iLike]: `%${searchQuery}%` },
            }
        });
        res.json(car);
    }
}

module.exports = new CarController()