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
exports.patRouter = void 0;
const express_1 = __importDefault(require("express"));
const details_1 = require("./Patient/details");
const finddoc_1 = require("./Patient/finddoc");
const appointment_1 = require("./Patient/appointment");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.patRouter = express_1.default.Router();
exports.patRouter.use('/details', details_1.detailsRouter);
exports.patRouter.use('/doctors', finddoc_1.findDocRouter);
exports.patRouter.use('/book', appointment_1.bookRouter);
exports.patRouter.get('/get/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.params.id;
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
