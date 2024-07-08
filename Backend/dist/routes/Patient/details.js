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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const info_1 = require("../../InputType/info");
exports.detailsRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.detailsRouter.use('/*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.detailsRouter.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = info_1.patInfo.safeParse(req.body);
    if (!success) {
        return res.json({ error: "Invalid Input" });
    }
    const patientId = res.get('patientId');
    const body = req.body;
    try {
        yield prisma.patient.update({
            where: { id: patientId },
            data: {
                mobile: body.mobile,
                age: body.age,
                gender: body.gender,
                latitude: body.latitude,
                longitude: body.longitude,
                profile_pic: body.profile_pic
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
    const patientId = res.get('patientId');
    try {
        const patient = yield prisma.patient.findFirst({
            where: { id: patientId }
        });
        return res.json(patient);
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.detailsRouter.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = res.get('patientId');
    const body = req.body;
    try {
        yield prisma.patient.update({
            where: { id: patientId },
            data: {
                name: body.name,
                password: body.password,
                age: body.age,
                mobile: body.mobile,
                gender: body.gender,
                latitude: body.latitude,
                longitude: body.longitude,
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
