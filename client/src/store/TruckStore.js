import {makeAutoObservable} from "mobx";

export default class TruckStore {
    constructor() {
        this._trucks = []
        this._truck_types = []
        this._truck_brands = []
        this._truck_img = []
        this._truck_selectedType = {}
        this._truck_selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 24
        makeAutoObservable(this)
    }

    setTruckTypes(truck_types) {
        this._truck_types = truck_types
    }
    setTruckBrands(truck_brands) {
        this._truck_brands = truck_brands
    }
    setTrucks(trucks) {
        this._trucks = trucks
    }
    setTruckImg(truck_img) {
        this._truck_img = truck_img
    }
    setTruckSelectedType(truck_type) {
        this.setTruckPage(1)
        this._truck_selectedType = truck_type
    }
    setTruckSelectedBrand(truck_brand) {
        this.setTruckPage(1)
        this._truck_selectedBrand = truck_brand
    }
    setTruckPage(page) {
        this._page = page
    }
    setTruckTotalCount(count) {
        this._totalCount = count
    }
    get truck_types() {
        return this._truck_types
    }
    get truck_brands() {
        return this._truck_brands
    }
    get trucks() {
        return this._trucks
    }
    get truck_img() {
        return this._truck_img
    }
    get selectedTruckType() {
        return this._truck_selectedType
    }
    get selectedTruckBrand() {
        return this._truck_selectedBrand
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