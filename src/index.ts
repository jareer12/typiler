import cp from "child_process";
import fs from "fs";
import os from "os";

class Master {
  _os: String;
  constructor() {
    this._os = os.platform();
  }
  js(code: string) {
    eval(code);
  }
  async py(
    code: string,
    listener: "stdout" | "stderr" = "stdout",
    base: string = "3",
    exponent: string = "3"
  ) {
    return new Promise((res: Function, rej: Function) => {
      let filename: string = `${__dirname}/cache/python.py`;
      fs.writeFile(filename, code, "utf-8", function (err) {
        if (err) {
          console.log(err);
        }

        const exponentProcess: {
          stdout: {
            on: Function;
          };
          stderr: {
            on: Function;
          };
        } = cp.spawn("python", [filename, base, exponent]);

        /**
         * @desc      get and log value returned by python
         * @listens   'data' in pipeline: stdout.on()
         * @returns   {string} data from python math
         */
        exponentProcess[listener].on("data", async (data: any) => {
          let result = await data.toString();
          res({ output: result });
        });
      });
    });
  }
  async _compilerLua(
    code: string,
    flavour: "lua" | "luau" | "luac" | "wlua" = "lua"
  ) {
    return new Promise((res: Function, rej: Function) => {
      if (this._os == "win32") {
        let filename: string = `${__dirname}/cache/${flavour}.lua`;
        fs.writeFile(filename, code, "utf-8", async function (err) {
          if (err) {
            console.log(err);
          }
          let command: string =
            `${__dirname}/compilers/${flavour}.exe ${filename}`.replace(
              /\\/g,
              "/"
            );
          let output = cp.execSync(command);

          res({
            command: command,
            stdout: output.toString(),
          });
        });
      } else {
        rej({ Success: false, Message: "Operatin system is not supported" });
      }
    });
  }
  async lua(code: string) {
    return new Promise((res: Function, rej: Function) => {
      this._compilerLua(code, "lua")
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
  async luac(code: string) {
    return new Promise((res: Function, rej: Function) => {
      this._compilerLua(code, "luac")
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
  async wlua(code: string) {
    return new Promise((res: Function, rej: Function) => {
      this._compilerLua(code, "wlua")
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
  async luau(code: string) {
    return new Promise((res: Function, rej: Function) => {
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

export default Master;
