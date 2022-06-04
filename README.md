# Pets - Typescript

Small typescript module, I made to learn typescript.

```ts
import Pet from "petz";

const MyPet = new Pet({
  Created: new Date().getTime(),
  Name: "Charlie",
  Type: "Dog",
  Age: 3,
});

console.log(MyPet.info());

MyPet.feed("Banana", 100);
console.log(MyPet.stats());
```

## Installation

```sh
npm install pets
```
