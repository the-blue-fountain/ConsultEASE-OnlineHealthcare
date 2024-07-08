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
exports.detailsRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const info_1 = require("../../InputType/info");
exports.detailsRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.detailsRouter.use('/*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const webtoken = req.header('Authorization');
    //console.log(webtoken);
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
        res.set({ 'doctorId': payload.id });
        next();
    }
    catch (e) {
        res.status(408);
        return res.json({
            message: "Not logged in"
        });
    }
}));
exports.detailsRouter.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = info_1.doctorInfo.safeParse(req.body);
    if (!success) {
        return res.json({ error: "Invalid Input" });
    }
    const doctorId = res.get('doctorId');
    const body = req.body;
    try {
        yield prisma.doctor.update({
            where: { id: doctorId },
            data: {
                age: body.age,
                gender: body.gender,
                mobile: body.mobile,
                latitude: body.latitude,
                longitude: body.longitude,
                specialization: body.specialization,
                experience: body.experience,
                clinic: body.clinic,
                fee: body.fee,
                online_fee: body.online_fee,
                clinic_days: body.clinic_days,
                profile_pic: body.profile_pic,
                medical_certificate: body.medical_certificate
            }
        });
        return res.json({ message: "Successfully Added" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.detailsRouter.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = res.get('doctorId');
    try {
        const doctor = yield prisma.doctor.findFirst({
            where: { id: doctorId }
        });
        return res.json(doctor);
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.detailsRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = res.get('doctorId');
    const body = req.body;
    try {
        yield prisma.doctor.update({
            where: { id: doctorId },
            data: {
                password: body.password,
                mobile: body.mobile,
                age: body.age,
                gender: body.gender,
                latitude: body.latitude,
                longitude: body.longitude,
                specialization: body.specialization,
                experience: body.experience,
                clinic: body.clinic,
                fee: body.fee,
                online_fee: body.online_fee,
                clinic_days: body.clinic_days,
                profile_pic: body.profile_pic
            }
        });
        return res.json({ message: "Successfully Updated" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
