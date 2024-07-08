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
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../InputType/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.authRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = auth_1.signupInput.safeParse(req.body);
    if (!success) {
        return res.json({ message: "Invalid Input" });
    }
    try {
        const existinguser1 = yield prisma.doctor.findFirst({
            where: { email: req.body.email }
        });
        const existinguser2 = yield prisma.patient.findFirst({
            where: { email: req.body.email }
        });
        if (existinguser1 || existinguser2) {
            return res.json({ message: "User Already Exists" });
        }
        const body = req.body;
        if (body.type == "Patient") {
            const patient = yield prisma.patient.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    appointments: {}
                }
            });
            const jwtsecret = process.env.JWT_PASSWORD || 'secret';
            const token = jsonwebtoken_1.default.sign({ id: patient.id }, jwtsecret);
            return res.json({ jwt: token });
        }
        else {
            const doctor = yield prisma.doctor.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    clinic_days: [],
                    appointments: {}
                }
            });
            const jwtsecret = process.env.JWT_PASSWORD || 'secret';
            const token = jsonwebtoken_1.default.sign({ id: doctor.id }, jwtsecret);
            return res.json({ jwt: token });
        }
    }
    catch (e) {
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.authRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = auth_1.signinInput.safeParse(req.body);
    if (!success) {
        return res.json({ message: "Invalid Input" });
    }
    const body = req.body;
    const patient = yield prisma.patient.findFirst({
        where: { email: body.email,
            password: body.password }
    });
    if (patient) {
        const jwtsecret = process.env.JWT_PASSWORD || 'secret';
        const token = jsonwebtoken_1.default.sign({ id: patient.id }, jwtsecret);
        return res.json({ jwt: token,
            type: "Patient" });
    }
    else {
        const doctor = yield prisma.doctor.findFirst({
            where: { email: body.email,
                password: body.password }
        });
        if (doctor) {
            const jwtsecret = process.env.JWT_PASSWORD || 'secret';
            const token = jsonwebtoken_1.default.sign({ id: doctor.id }, jwtsecret);
            return res.json({ jwt: token,
                type: "Doctor" });
        }
        else {
            return res.json({ message: "Password or Email did not match" });
        }
    }
}));
