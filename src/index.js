"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Master {
    Data;
    Information;
    constructor(Information) {
        this.Data = {
            Experience: 0,
            Level: 3,
        };
        this.Information = Information;
    }
    save() {
        this.Information.Age = Math.floor((new Date().getTime() - this.Information.Created) / 1000);
        const x = this.Data.Level;
        const equation = x * 250 + x * 250 + x * 250;
        while (this.Data.Experience >= equation) {
            this.Data.Level++;
            this.Data.Experience -= equation;
        }
        return {
            equation: equation,
        };
    }
    feed(Food, Quantity) {
        const _values = {
            Banana: 12,
            Apple: 18,
            Orange: 24,
        };
        this.Data.Experience += Quantity * _values[Food];
        this.save();
    }
    stats() {
        return this.Data;
    }
    info() {
        return this.Information;
    }
}
exports.default = Master;
