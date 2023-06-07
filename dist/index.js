"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const link_routes_1 = __importDefault(require("./Routes/link.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// Env
dotenv_1.default.config();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 7001;
const app = (0, express_1.default)();
// Enabled CORS Globally
app.use((0, cors_1.default)());
// Parse Body Form Request
app.use(express_1.default.json());
// Default Get Route
app.get("/", (request, response) => {
    response.send("<h1>WELCOME TO API</h1>");
});
// Routes for Link
app.use('/link', link_routes_1.default);
app.listen(port, () => {
    console.log("App is listening on port: %d", port);
});
