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
exports.dashRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.dashRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.dashRouter.use('/*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.set({ 'doctorId': payload.id });
        next();
    }
    catch (e) {
        res.status(403);
        return res.json({
            message: "Not logged in"
        });
    }
}));
exports.dashRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = res.get('doctorId');
    try {
        const pending = yield prisma.offline_Appointment.findMany({
            where: {
                doctorId: doctorId,
                completed: false
            }
        });
        return res.json(pending);
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.get('/online', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = res.get('doctorId');
    try {
        const pending = yield prisma.online_Appointment.findMany({
            where: {
                doctorId: doctorId,
                completed: false
            }
        });
        return res.json(pending);
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.get('/feedback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = res.get('doctorId');
    try {
        const offline_appointments = yield prisma.offline_Appointment.findMany({
            where: {
                doctorId: doctorId,
                feedback_given: true
            }
        });
        const online_appointments = yield prisma.online_Appointment.findMany({
            where: {
                doctorId: doctorId,
                feedback_given: true
            }
        });
        return res.json({ offline: offline_appointments,
            online: online_appointments });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = res.get('doctorId');
    try {
        const appointments = yield prisma.offline_Appointment.findMany({
            where: {
                doctorId: doctorId,
                confirmed: true
            }
        });
        const currentdate = new Date();
        const appointmentstoUpdate = appointments.filter(appointment => new Date(appointment.appointment_date) < currentdate);
        yield prisma.offline_Appointment.updateMany({
            where: {
                id: {
                    in: appointmentstoUpdate.map(appointment => appointment.id)
                }
            },
            data: {
                completed: true
            }
        });
        const updatedAppointments = yield prisma.offline_Appointment.findMany({
            where: {
                doctorId: doctorId
            }
        });
        return res.json(updatedAppointments);
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.get('/online/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = res.get('doctorId');
    try {
        const appointments = yield prisma.online_Appointment.findMany({
            where: {
                doctorId: doctorId,
                confirmed: true
            }
        });
        const currentdate = new Date();
        const appointmentstoUpdate = appointments.filter(appointment => new Date(appointment.appointment_date) < currentdate);
        yield prisma.online_Appointment.updateMany({
            where: {
                id: {
                    in: appointmentstoUpdate.map(appointment => appointment.id)
                }
            },
            data: {
                completed: true
            }
        });
        const updatedAppointments = yield prisma.online_Appointment.findMany({
            where: {
                doctorId: doctorId
            }
        });
        return res.json(updatedAppointments);
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.post('/:id/confirm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const time = req.body.time;
    try {
        yield prisma.offline_Appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                appointment_time: time,
                confirmed: true
            }
        });
        return res.json({ message: "Appointment Confirmed" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.post('/:id/online/confirm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const time = req.body.time;
    const link = req.body.link;
    try {
        yield prisma.online_Appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                appointment_time: time,
                meeting_link: link,
                confirmed: true
            }
        });
        return res.json({ message: "Appointment Confirmed" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.post('/:id/reject', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    try {
        yield prisma.offline_Appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                rejected: true
            }
        });
        return res.json({ message: "Appointment Rejected" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.post('/:id/online/reject', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    try {
        yield prisma.online_Appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                rejected: true
            }
        });
        return res.json({ message: "Appointment Rejected" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.post('/:id/completed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const datetimenow = new Date();
    const datenow = datetimenow.toISOString().split('T')[0];
    try {
        const appointment = yield prisma.offline_Appointment.findFirst({
            where: {
                id: appointmentId
            }
        });
        if (!appointment) {
            res.status(404);
            return res.json({
                message: "Appointment not found"
            });
        }
        const appdate = appointment.appointment_date.toISOString().split('T')[0];
        if (!appdate) {
            res.status(404);
            res.json({ message: "Can't access appointment date" });
        }
        if (datenow > appdate) {
            yield prisma.offline_Appointment.update({
                where: {
                    id: appointmentId
                },
                data: {
                    completed: true
                }
            });
            return res.json({ message: "Appointment Completed" });
        }
        else {
            return res.json({ message: "Appointment not yet completed" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.dashRouter.post('/:id/online/prescription', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    try {
        yield prisma.online_Appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                prescription: req.body.prescription
            }
        });
        return res.json({ message: "Prescription Uploaded" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
