"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createBlog = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional(),
});
//export the type of signInput
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
//export the type of createBlog
exports.createBlog = zod_1.default.object({
    title: zod_1.default.string().min(1),
    content: zod_1.default.string().min(10),
});
exports.updateBlog = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().min(1),
    content: zod_1.default.string().min(10),
});
