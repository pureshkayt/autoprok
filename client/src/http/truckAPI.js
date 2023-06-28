import {$authHost, $host} from "./index";

export const createTruckType = async (truck_type) => {
    const {data} = await $authHost.post('api/truck_type', truck_type)
    return data
}
export const fetchTruckTypes = async () => {
    const {data} = await $host.get('api/truck_type')
    return data
}
export const deleteTruckType = async (id) => {
    const {data} = await $authHost.delete('api/truck_type/' + id)
    return data
}
export const createTruckBrand = async (truck_brand) => {
    const {data} = await $authHost.post('api/truck_brand', truck_brand)
    return data
}
export const fetchTruckBrands = async () => {
    const {data} = await $host.get('api/truck_brand', )
    return data
}
export const deleteTruckBrand = async (id) => {
    const {data} = await $authHost.delete('api/truck_brand/' + id)
    return data
}
export const createTruck = async (truck) => {
    const {data} = await $authHost.post('api/truck', truck)
    return data
}
export const updateTruck = async (id, formData) => {
    const {data} = await $authHost.put('api/truck/' + id, formData)
    return data
}
export const fetchTrucks = async (truckTypeId, truckBrandId, truck_img, page, limit= 5) => {
    const {data} = await $host.get('api/truck', {params: {
            truckTypeId, truckBrandId, truck_img, page, limit
        }})
    return data
}
export const fetchTruckMain = async (page, limit= 5) => {
    const {data} = await $host.get('api/truck', {params: {
            page, limit
        }})
    return data
}
export const fetchOneTruck = async (id) => {
    const {data} = await $host.get('api/truck/' + id)
    return data
}
export const deleteTruck = async (id) => {
    const {data} = await $authHost.delete('api/truck/' + id)
    return data
}
