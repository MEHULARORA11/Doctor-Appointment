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
exports.EmailtTransporter = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const Transporter_1 = require("./Transporter");
const config_1 = __importDefault(require("../config"));
const EmailtTransporter = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pathName, replacementObj, toMail, subject }) {
    const html = yield readHtmlFile(pathName);
    const template = handlebars_1.default.compile(html);
    const htmlToSend = template(replacementObj);
    const mailOptions = {
        from: `<${config_1.default.adminEmail}>`,
        to: toMail,
        subject: subject,
        html: htmlToSend
    };
    try {
        yield Transporter_1.Transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log(error);
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Unable to send Email !");
    }
});
exports.EmailtTransporter = EmailtTransporter;
const readHtmlFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (fs_1.default.existsSync(filePath)) {
            return yield fs_1.default.promises.readFile(filePath, { encoding: 'utf-8' });
        }
        const fileName = path_1.default.basename(filePath);
        const candidates = [
            path_1.default.join(process.cwd(), 'template', fileName),
            path_1.default.join(process.cwd(), 'dist', 'template', fileName),
            path_1.default.join(process.cwd(), 'api', 'template', fileName),
            path_1.default.join(process.cwd(), 'api', 'dist', 'template', fileName),
            path_1.default.join(__dirname, '../../../../template', fileName),
            path_1.default.join(__dirname, '../../../../dist/template', fileName),
            path_1.default.join(__dirname, '../../template', fileName),
            path_1.default.join(__dirname, '../template', fileName),
        ];
        for (const candidate of candidates) {
            if (fs_1.default.existsSync(candidate)) {
                return yield fs_1.default.promises.readFile(candidate, { encoding: 'utf-8' });
            }
        }
        return yield fs_1.default.promises.readFile(filePath, { encoding: 'utf-8' });
    }
    catch (error) {
        console.log("Error Reading html file", error);
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Unable to read HTML file");
    }
});
