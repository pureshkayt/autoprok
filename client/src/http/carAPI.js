import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}
export const deleteType = async (id) => {
    const {data} = await $authHost.delete('api/type/' + id)
    return data
}
export const createService = async (service) => {
    const {data} = await $authHost.post('api/service', service)
    return data
}
export const fetchServices = async () => {
    const {data} = await $host.get('api/service')
    return data
}
export const deleteService = async (id) => {
    const {data} = await $authHost.delete('api/service/' + id)
    return data
}
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}
export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete('api/brand/' + id)
    return data
}
export const createCar = async (car) => {
    const {data} = await $authHost.post('api/car', car)
    return data
}
export const updateCar = async (id, formData) => {
    const {data} = await $authHost.put('api/car/' + id, formData)
    return data
}
export const fetchCars = async (typeId, brandId, page, img, limit= 5) => {
    const {data} = await $host.get('api/car', {params: {
            typeId, brandId, page, img, limit
        }})
    return data
}
export const fetchOneCar = async (id) => {
    const {data} = await $host.get('api/car/' + id)
    return data
}
export const deleteCar = async (id) => {
    const {data} = await $authHost.delete('api/car/' + id)
    return data
}
