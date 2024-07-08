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
exports.docRouter = void 0;
const express_1 = __importDefault(require("express"));
const details_1 = require("./Doctor/details");
const dashboard_1 = require("./Doctor/dashboard");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.docRouter = express_1.default.Router();
exports.docRouter.use('/details', details_1.detailsRouter);
exports.docRouter.use('/dashboard', dashboard_1.dashRouter);
exports.docRouter.get('/get/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
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
exports.docRouter.get('/feedback/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentid = req.params.id;
    try {
        const offline_appointment = yield prisma.offline_Appointment.findFirst({
            where: {
                id: appointmentid
            }
        });
        const online_appointment = yield prisma.online_Appointment.findFirst({
            where: {
                id: appointmentid
            }
        });
        if (offline_appointment) {
            return res.json(offline_appointment);
        }
        else {
            return res.json(online_appointment);
        }
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
