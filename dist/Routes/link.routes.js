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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const global_functions_1 = require("../Functions/global.functions");
const router = express_1.default.Router();
// [POST] Route 1: ( /link/create ) => create new short link
router.post("/create", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { long_url } = request.body;
    // Get Already Created Links From Data
    const links = (_a = (yield new Promise((resolve, reject) => {
        fs_1.default.readFile("Data/links.json", "utf-8", (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(JSON.parse(data));
        });
    }).catch((error) => {
        console.log("File Read Error: ", error);
        response.status(500).json({ message: "INTERNAL SERVER ERROR" });
        return;
    }))) !== null && _a !== void 0 ? _a : [];
    //   generating random string while current string exist in created links
    let short_url = (0, global_functions_1.getRandomString)(7);
    while ((0, global_functions_1.getLink)(short_url, links) !== null) {
        short_url = (0, global_functions_1.getRandomString)(7);
    }
    // Storing new shortened link in data
    const createdLink = yield new Promise((resolve, reject) => {
        const newLink = {
            long_url,
            short_url,
            created_at: new Date().getTime(),
        };
        fs_1.default.writeFile("Data/links.json", JSON.stringify([...links, newLink]), "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(newLink);
        });
    }).catch(error => {
        console.log("Create ERROR", error);
        response.status(500).json({ message: "INTERNAL SERVER ERROR" });
    });
    response.json({ data: createdLink });
}));
exports.default = router;
