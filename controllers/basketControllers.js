const ApiError = require("../error/apiError")
const { BasketDevice, Basket, Device } = require("../models/models")

class basketController {
    async addDeviceToBasket(req, res, next) {
        const { basketId, deviceId } = req.body
        const device = await BasketDevice.create({ basketId, deviceId })
        res.json(device)
    }
    async getUserBasket(req, res, next) {
        const { userId } = req.query
        const basket = await Basket.findOne({ where: { userId: +userId } })
        res.json(basket.id)
    }
    async getDevices(req, res, next) {
        const { basketId } = req.query
        const basketDevices = await BasketDevice.findAll({ where: { basketId: +basketId } })
        const devicesId = basketDevices.map(e => e.deviceId)
        const devices = await Device.findAll({ where: { id: devicesId } })
        res.json(devices)
    }
    async removeDevice(req, res, next) {
        const { basketId, deviceId } = req.query
        await BasketDevice.destroy({ where: { basketId: +basketId, deviceId: +deviceId } })
        res.sendStatus(201)
    }
    async checkDevice(req, res, next) {
        const { basketId, deviceId } = req.query
        const device = await BasketDevice.findOne({ where: { basketId: +basketId, deviceId: +deviceId } })
        res.json(device)
    }
}
module.exports = new basketController()