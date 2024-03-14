const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/apiError')
const path = require('path')
const uuid = require('uuid')
class deviceController {
    async addDevice(req, res, next) {
        try {
            const { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({
                name, price, brandId, typeId, img: fileName
            })
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async getAllDevice(req, res) {
        let { name, brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 3
        let offset = page * limit - limit
        // if (brandId && typeId) {
        //     devices = await Device.findAndCountAll({where:{typeId,brandId},limit,offset})
        // }
        let devices = await Device.findAll()
        if (brandId) {
            devices = devices.filter(e => e.brandId === parseInt(brandId))
        }
        if (typeId) {
            devices = devices.filter(e => e.typeId === parseInt(typeId))
        }
        if (name) {
            devices = devices.filter(e => e.name.toLowerCase().indexOf(
                (name).toLowerCase()) > -1)
        }
        if (devices.slice(offset, offset + limit).length > 0) {
            res.json(devices.slice(offset, offset + limit))
        }
        else {
            res.json(devices.slice(0, limit))
        }
    }
    async getDeviceById(req, res) {
        const { id } = req.params
        const device = await Device.findAll({
            where: {
                id: id
            },
            include:[{
                model:DeviceInfo, as: "info"
            }]
        })
        res.json(device)
    }
}
module.exports = new deviceController()