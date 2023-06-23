const uuid = require('uuid')
const path = require('path');
const {Truck, TruckInfo, TruckImage, TruckTariff} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");


class TruckController {
    async create(req, res, next) {
        try {
            let {name, price, truckTypeId, truckBrandId, year, truck_info, truck_tariff} = req.body;
            const img = req.files.images instanceof Array ? req.files.images : [req.files.images];
            let imgArray = [];

            // Загрузка каждого изображения в массив
            for (let i = 0; i < img.length; i++) {
                let fileName = uuid.v4() + ".jpg" || uuid.v4() + ".png";
                img[i].mv(path.resolve(__dirname, '..', 'static', fileName));
                imgArray.push(fileName);
            }

            const truck = await Truck.create({name, price, truckBrandId, truckTypeId, year});

            // Создание записей для каждого изображения в модели "CarImage"
            for (let i = 0; i < imgArray.length; i++) {
                await TruckImage.create({
                    truckId: truck.id,
                    img: imgArray[i]
                });
            }

            if (truck_info) {
                truck_info = JSON.parse(truck_info)
                truck_info.forEach(i =>
                    TruckInfo.create({
                        title: i.title,
                        description: i.description,
                        truckId: truck.id
                    })
                )
            }

            if (truck_tariff) {
                truck_tariff = JSON.parse(truck_tariff)
                truck_tariff.forEach(i =>
                    TruckTariff.create({
                        title: i.title,
                        description: i.description,
                        truckId: truck.id
                    })
                )
            }

            // Возвращение объекта "car" с добавленными изображениями
            return res.json({
                id: truck.id,
                name: truck.name,
                price: truck.price,
                truckBrandId: truck.truckBrandId,
                truckTypeId: truck.truckTypeId,
                year: truck.year,
                img: imgArray,
                createdAt: truck.createdAt,
                updatedAt: truck.updatedAt
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, price, year } = req.body;
            const { img } = req.files;
            let fileName;

            if (img) { // если в запросе есть новое изображение
                fileName = uuid.v4() + ".jpg" || uuid.v4() + ".png";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
                await TruckImage.create({ truckId: id, img: fileName }); // создаем новую запись в таблице CarImage
            }

            const truck = await Truck.update({
                name: name,
                price: price,
                year: year,
                img: fileName || undefined, // обновляем img только если было передано новое изображение
            }, { where: { id } });

            return res.json(truck);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let { truckBrandId, truckTypeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        const offset = page * limit - limit;
        let trucks;
        const include = { model: TruckImage, as: 'truck_img' };
        const order = [['price', 'DESC']];

        if (!truckBrandId && !truckTypeId) {
            trucks = await Truck.findAndCountAll({
                include, // добавляем параметр include
                limit,
                offset,
                order
            });
        } else if (truckBrandId && !truckTypeId) {
            trucks = await Truck.findAndCountAll({
                include, // добавляем параметр include
                limit,
                offset,
                order
            });
        } else if (!truckBrandId && truckTypeId) {
            trucks = await Truck.findAndCountAll({
                include, // добавляем параметр include
                limit,
                offset,
                order
            });
        } else if (truckBrandId && truckTypeId) {
            trucks = await Truck.findAndCountAll({
                include, // добавляем параметр include
                limit,
                offset,
                order
            });
        }

        return res.json(trucks);
    }

    async getOne(req, res) {
        const {id} = req.params
        const truck = await Truck.findOne(
            {
                where: {id},
                include: [{model: TruckInfo, as: 'truck_info'}, {model: TruckTariff, as: 'truck_tariff'}, {model: TruckImage, as: 'truck_img'}]
            },
        )
        return res.json(truck)
    }

    async delete(req, res) {
        const {id} = req.params
        const truck = await Truck.destroy({where: {id}})
        return res.json(truck)
    }

    async search(req, res) {
        const {id} = req.params
        const searchQuery = req.query.q;
        const truck = await Truck.findAll({
            where: {
                name: { [Op.iLike]: `%${searchQuery}%` },
            }
        });
        res.json(truck);
    }
}

module.exports = new TruckController()