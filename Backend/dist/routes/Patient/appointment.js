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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
exports.bookRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
exports.bookRouter.use('/*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.bookRouter.post('/offline/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = res.get('patientId');
    const doctorId = req.params.id;
    const body = req.body;
    if (!patientId || !doctorId) {
        res.status(404);
        return res.json({
            message: "Can't fetch doctor details"
        });
    }
    try {
        yield prisma.offline_Appointment.create({
            data: {
                patientId: patientId,
                doctorId: doctorId,
                Symptoms: body.symptoms,
                appointment_date: body.appointment_date
            }
        });
        return res.json({ message: "Appointment Booked. Waiting for confirmation..." });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.bookRouter.post('/online/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = res.get('patientId');
    const doctorId = req.params.id;
    const body = req.body;
    if (!patientId || !doctorId) {
        res.status(404);
        return res.json({
            message: "Can't fetch doctor details"
        });
    }
    try {
        yield prisma.online_Appointment.create({
            data: {
                patientId: patientId,
                doctorId: doctorId,
                Symptoms: body.symptoms,
                appointment_date: body.appointment_date
            }
        });
        return res.json({ message: "Appointment Booked. Waiting for confirmation..." });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.bookRouter.get('/offline/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = res.get('patientId');
    try {
        const appointments = yield prisma.offline_Appointment.findMany({
            where: { patientId: patientId,
                confirmed: true }
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
                patientId: patientId
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
exports.bookRouter.get('/online/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = res.get('patientId');
    try {
        const appointments = yield prisma.online_Appointment.findMany({
            where: { patientId: patientId,
                confirmed: true }
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
                patientId: patientId
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
exports.bookRouter.post('/offline/appointments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const rating = req.body.rating;
    try {
        const appointment = yield prisma.offline_Appointment.update({
            where: {
                id: appointmentId,
                completed: true
            },
            data: {
                feedback: rating
            }
        });
        const doctor = yield prisma.doctor.findFirst({
            where: { id: appointment.doctorId }
        });
        if (!doctor) {
            res.status(404);
            return res.json({
                message: "Can't fetch doctor details"
            });
        }
        const numRatings = doctor.numRatings;
        const prev = doctor.rating;
        const now = (prev * numRatings + rating) / (numRatings + 1);
        yield prisma.doctor.update({
            where: { id: doctor.id },
            data: {
                rating: now,
                numRatings: numRatings + 1
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.bookRouter.post('/online/appointments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const rating = req.body.rating;
    try {
        const appointment = yield prisma.online_Appointment.update({
            where: {
                id: appointmentId,
                completed: true
            },
            data: {
                feedback: rating
            }
        });
        const doctor = yield prisma.doctor.findFirst({
            where: { id: appointment.doctorId }
        });
        if (!doctor) {
            res.status(404);
            return res.json({
                message: "Can't fetch doctor details"
            });
        }
        const numRatings = doctor.numRatings;
        const prev = doctor.rating;
        const now = (prev * numRatings + rating) / (numRatings + 1);
        yield prisma.doctor.update({
            where: { id: doctor.id },
            data: {
                rating: now,
                numRatings: numRatings + 1
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.bookRouter.post('/offline/feedback/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const body = req.body;
    try {
        yield prisma.offline_Appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                feedback_given: true,
                punctuality: body.punctuality,
                Comfort: body.comfort,
                Communication: body.communication,
                clarity: body.clarity,
                Comments: body.comments
            }
        });
        return res.json({ message: "Thanks for the feedback" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.bookRouter.post('/online/feedback/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const body = req.body;
    try {
        yield prisma.online_Appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                feedback_given: true,
                punctuality: body.punctuality,
                Comfort: body.comfort,
                Communication: body.communication,
                clarity: body.clarity,
                Comments: body.comments
            }
        });
        return res.json({ message: "Thanks for the feedback" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.bookRouter.delete('/offline/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    try {
        yield prisma.offline_Appointment.delete({
            where: {
                id: appointmentId
            }
        });
        return res.json({ message: "Appointment Cancelled" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
exports.bookRouter.delete('/online/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    try {
        yield prisma.online_Appointment.delete({
            where: {
                id: appointmentId
            }
        });
        return res.json({ message: "Appointment Cancelled" });
    }
    catch (e) {
        console.log(e);
        res.status(403);
        return res.json({ error: "Database Issue" });
    }
}));
