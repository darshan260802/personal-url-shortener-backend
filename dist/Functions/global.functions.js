"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLink = exports.getRandomString = void 0;
// Function : generates random string
function getRandomString(length = 7) {
    const POOL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomStr = "";
    while (randomStr.length < length) {
        const randomIndex = Math.floor(Math.random() * POOL.length);
        randomStr += POOL[randomIndex];
    }
    return randomStr;
}
exports.getRandomString = getRandomString;
// Function: returns link data if link exist in array
function getLink(short_url, array) {
    var _a;
    return ((_a = array.find((link) => link.short_url === short_url)) !== null && _a !== void 0 ? _a : null);
}
exports.getLink = getLink;
