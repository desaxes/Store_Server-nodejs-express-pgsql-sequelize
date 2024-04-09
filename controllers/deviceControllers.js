const { Device, DeviceInfo, BasketDevice } = require('../models/models')
const ApiError = require('../error/apiError')
const path = require('path')
const uuid = require('uuid')
class deviceController {
    async addDevice(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            let { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            let device = await Device.create({
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
        let splitBrands = brandId.split(',')
        let devices = await Device.findAll()
        if (brandId) {
            devices = devices.filter(e => splitBrands.some(b => +b === e.brandId))
        }
        if (typeId) {
            devices = devices.filter(e => e.typeId === parseInt(typeId))
        }
        if (name) {
            devices = devices.filter(e => e.name.toLowerCase().indexOf(
                (name).toLowerCase()) > -1)
        }
        res.json({ devices: devices.slice(offset, offset + +limit), total: devices.length })
    }
    async getDeviceById(req, res) {
        const { id } = req.params
        const device = await Device.findOne({
            where: {
                id: id
            },
            include: [{
                model: DeviceInfo, as: "info"
            }]
        })
        res.json(device)
    }
    async addDeviceToBasket(req, res) {
        const { basketId, deviceId } = req.body
        const device = await BasketDevice.create({ basketId, deviceId })
        res.json(device)
    }
}
module.exports = new deviceController()