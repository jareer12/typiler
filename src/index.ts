interface InformationType {
  Name: String;
  Type?: String;
  Age?: number;
  Created?: number;
}

class Master {
  Data: {
    Experience: number;
    Level: number;
  };
  Information: InformationType;
  constructor(Information: InformationType) {
    this.Data = {
      Experience: 0,
      Level: 3,
    };
    this.Information = Information;
  }
  cron() {
    this.Information.Age = Math.floor(
      (new Date().getTime() - this.Information.Created) / 1000
    );

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
  feed(Food: "Apple" | "Banana" | "Orange", Quantity: number) {
    const _values = {
      Banana: 12,
      Apple: 18,
      Orange: 24,
    };
    this.Data.Experience += Quantity * _values[Food];
    this.cron();
  }
  stats() {
    return this.Data;
  }
  info() {
    return this.Information;
  }
}

export default Master;
