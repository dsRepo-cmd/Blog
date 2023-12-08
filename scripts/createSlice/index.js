const createTemplate = require("./templates/createTemplate");

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ["features", "entities", "pages"];

if (!layer || !layers.includes(layer)) {
  throw new Error(`Specify a layer ${layers.join(" или ")}`);
}

if (!sliceName) {
  throw new Error("Specify the name of the slice");
}

createTemplate(layer, sliceName);
