"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorInfo = exports.patInfo = void 0;
const zod_1 = __importDefault(require("zod"));
exports.patInfo = zod_1.default.object({
    mobile: zod_1.default.string().min(10).max(10),
    age: zod_1.default.number(),
    gender: zod_1.default.string(),
    latitude: zod_1.default.number(),
    longitude: zod_1.default.number()
});
exports.doctorInfo = zod_1.default.object({
    mobile: zod_1.default.string().min(10).max(10),
    age: zod_1.default.number().int(),
    gender: zod_1.default.string(),
    latitude: zod_1.default.number(),
    longitude: zod_1.default.number(),
    specialization: zod_1.default.string(),
    experience: zod_1.default.string(),
    clinic: zod_1.default.string(),
    fee: zod_1.default.number(),
    online_fee: zod_1.default.number(),
    clinic_days: zod_1.default.array(zod_1.default.string())
});
