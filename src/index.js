"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
class Master {
    _os;
    constructor() {
        this._os = os_1.default.platform();
    }
    js(code) {
        eval(code);
    }
    async py(code, listener = "stdout", base = "3", exponent = "3") {
        return new Promise((res, rej) => {
            let filename = `${__dirname}/cache/python.py`;
            fs_1.default.writeFile(filename, code, "utf-8", function (err) {
                if (err) {
                    console.log(err);
                }
                const exponentProcess = child_process_1.default.spawn("python", [filename, base, exponent]);
                exponentProcess[listener].on("data", async (data) => {
                    let result = await data.toString();
                    res({ output: result });
                });
            });
        });
    }
    async _compilerLua(code, flavour = "lua") {
        return new Promise((res, rej) => {
            if (this._os == "win32") {
                let filename = `${__dirname}/cache/${flavour}.lua`;
                fs_1.default.writeFile(filename, code, "utf-8", async function (err) {
                    if (err) {
                        console.log(err);
                    }
                    let command = `${__dirname}/compilers/${flavour}.exe ${filename}`.replace(/\\/g, "/");
                    let output = child_process_1.default.execSync(command);
                    res({
                        command: command,
                        stdout: output.toString(),
                    });
                });
            }
            else {
                rej({ Success: false, Message: "Operatin system is not supported" });
            }
        });
    }
    async lua(code) {
        return new Promise((res, rej) => {
            this._compilerLua(code, "lua")
                .then((data) => {
                res(data);
            })
                .catch((err) => {
                rej(err);
            });
        });
    }
    async luac(code) {
        return new Promise((res, rej) => {
            this._compilerLua(code, "luac")
                .then((data) => {
                res(data);
            })
                .catch((err) => {
                rej(err);
            });
        });
    }
    async wlua(code) {
        return new Promise((res, rej) => {
            this._compilerLua(code, "wlua")
                .then((data) => {
                res(data);
            })
                .catch((err) => {
                rej(err);
            });
        });
    }
    async luau(code) {
        return new Promise((res, rej) => {
            this._compilerLua(code, "luau")
                .then((data) => {
                res(data);
            })
                .catch((err) => {
                rej(err);
            });
        });
    }
}
exports.default = Master;
