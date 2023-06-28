import {makeAutoObservable} from "mobx";

export default class CarStore {
    constructor() {
        this._types = []
        this._services = []
        this._brands = []
        this._cars = []
        this._img = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 24
        makeAutoObservable(this)
    }

    setServices(services) {
        this._services = services
    }
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setCars(cars) {
        this._cars = cars
    }
    setImg(img) {
        this._img = img
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    get services() {
        return this._services
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get cars() {
        return this._cars
    }
    get img() {
        return this._img
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}