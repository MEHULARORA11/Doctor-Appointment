"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Vercel serverless entry: export Express app without listen().
 * Local/dev still uses src/server.ts.
 */
const buffer_1 = __importDefault(require("buffer"));
if (!buffer_1.default.SlowBuffer) {
    buffer_1.default.SlowBuffer = buffer_1.default.Buffer;
}
const app_1 = __importDefault(require("./app"));
exports.default = app_1.default;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = app_1.default;
    module.exports.default = app_1.default;
}
