const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Car = sequelize.define('car', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
    deposit: {type: DataTypes.INTEGER, allowNull: true},
    price_per_day_1_2_days: {type: DataTypes.INTEGER, allowNull: true},
    price_per_day_3_7_days: {type: DataTypes.INTEGER, allowNull: true},
    price_per_day_8_20_days: {type: DataTypes.INTEGER, allowNull: true},
    price_per_day_21_days_and_more: {type: DataTypes.INTEGER, allowNull: true},
})

const CarService = sequelize.define('service', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.INTEGER, allowNull: false},
})

const CarImage = sequelize.define('car_image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: true},
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const CarInfo = sequelize.define('car_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CarConditions = sequelize.define('car_conditions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.INTEGER, allowNull: false},
})

const Truck = sequelize.define('truck', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false},
})

const TruckInfo = sequelize.define('truck_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TruckTariff = sequelize.define('truck_tariff', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TruckImage = sequelize.define('truck_image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: true},
});

const TruckType = sequelize.define('truck_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const TruckBrand = sequelize.define('truck_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const TruckTypeBrand = sequelize.define('truck_type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Car.hasMany(CarImage, {as: 'img'});
CarImage.belongsTo(Car);

Truck.hasMany(TruckImage, {as: 'truck_img'});
TruckImage.belongsTo(Truck);

Type.hasMany(Car)
Car.belongsTo(Type)

TruckType.hasMany(Truck)
Truck.belongsTo(TruckType)

Brand.hasMany(Car)
Car.belongsTo(Brand)

TruckBrand.hasMany(Truck)
Truck.belongsTo(TruckBrand)

Car.hasMany(CarInfo, {as: 'info'});
CarInfo.belongsTo(Car)

Truck.hasMany(TruckInfo, {as: 'truck_info'});
TruckInfo.belongsTo(Truck)

Truck.hasMany(TruckTariff, {as: 'truck_tariff'});
TruckTariff.belongsTo(Truck)

Car.hasMany(CarConditions, {as: 'conditions'});
CarConditions.belongsTo(Car)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

TruckType.belongsToMany(TruckBrand, {through: TruckTypeBrand })
TruckBrand.belongsToMany(TruckType, {through: TruckTypeBrand })

module.exports = {
    User,
    Car,
    Type,
    Brand,
    TypeBrand,
    CarInfo,
    CarConditions,
    CarImage,
    Truck,
    TruckInfo,
    TruckTariff,
    TruckImage,
    TruckType,
    TruckBrand,
    TruckTypeBrand,
    CarService
}