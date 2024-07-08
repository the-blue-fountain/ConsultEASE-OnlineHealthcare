"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDocRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
exports.findDocRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
function calculateDistance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
}
exports.findDocRouter.use('/*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const webtoken = req.header('Authorization');
    if (!webtoken) {
        res.status(401);
        return res.json({ error: "Unauthorized" });
    }
    const token = webtoken.split(' ')[1];
    try {
        const jwtsecret = process.env.JWT_PASSWORD || 'secret';
        const payload = jsonwebtoken_1.default.verify(token, jwtsecret);
        if (!payload || typeof payload === 'string') {
            res.status(401);
            return res.json({ error: "Unauthorized" });
        }
        //console.log(payload.id);
        res.set({ 'patientId': payload.id });
        next();
    }
    catch (e) {
        res.status(403);
        return res.json({
            message: "Not logged in"
        });
    }
}));
exports.findDocRouter.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter;
    const patientId = res.get('patientId');
    const patient = yield prisma.patient.findFirst({
        where: { id: patientId },
        select: {
            latitude: true,
            longitude: true
        }
    });
    if (!patient) {
        return res.status(404).send("Not Logged In");
    }
    const { latitude: patientLat, longitude: patientLon } = patient;
    let doctors;
    if (filter != "") {
        doctors = yield prisma.doctor.findMany({
            where: {
                name: {
                    contains: filter
                }
            },
            select: {
                id: true,
                name: true,
                latitude: true,
                longitude: true,
                specialization: true,
                experience: true,
                clinic: true,
                rating: true,
                fee: true,
                online_fee: true,
                clinic_days: true,
                profile_pic: true
            }
        });
    }
    else {
        doctors = yield prisma.doctor.findMany({
            select: {
                id: true,
                name: true,
                latitude: true,
                longitude: true,
                specialization: true,
                experience: true,
                clinic: true,
                rating: true,
                fee: true,
                online_fee: true,
                clinic_days: true,
                profile_pic: true
            }
        });
    }
    if (!patientLat || !patientLon) {
        return res.json(doctors);
    }
    const doctorsWithDist = doctors.map(doctor => {
        const { latitude, longitude } = doctor;
        if (!latitude || !longitude) {
            return Object.assign(Object.assign({}, doctor), { distance: Number.POSITIVE_INFINITY });
        }
        const distance = calculateDistance(latitude, longitude, patientLat, patientLon);
        return Object.assign(Object.assign({}, doctor), { distance: distance });
    });
    const sortedDoctors = doctorsWithDist.sort((a, b) => a.distance - b.distance);
    return res.json(sortedDoctors);
}));
exports.findDocRouter.get('/:type', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const specialization = req.params.type;
    const patientId = res.get('patientId');
    const patient = yield prisma.patient.findFirst({
        where: { id: patientId },
        select: {
            latitude: true,
            longitude: true
        }
    });
    if (!patient) {
        return res.status(404).send("Not Logged In");
    }
    const { latitude: patientLat, longitude: patientLon } = patient;
    const doctors = yield prisma.doctor.findMany({
        where: { specialization: specialization },
        select: {
            id: true,
            name: true,
            latitude: true,
            longitude: true,
            specialization: true,
            experience: true,
            clinic: true,
            rating: true,
            fee: true,
            online_fee: true,
            clinic_days: true,
            profile_pic: true
        }
    });
    if (!patientLat || !patientLon) {
        return res.json(doctors);
    }
    const doctorsWithDist = doctors.map(doctor => {
        const { latitude, longitude } = doctor;
        if (!latitude || !longitude) {
            return Object.assign(Object.assign({}, doctor), { distance: Number.POSITIVE_INFINITY });
        }
        const distance = calculateDistance(latitude, longitude, patientLat, patientLon);
        return Object.assign(Object.assign({}, doctor), { distance: distance });
    });
    const sortedDoctors = doctorsWithDist.sort((a, b) => a.distance - b.distance);
    return res.json(sortedDoctors);
}));
