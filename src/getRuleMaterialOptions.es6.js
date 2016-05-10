import THREE from "three";
let keysToHex = ["color", "specular"];

function getRuleMaterialOptions (options) {
  keysToHex.filter((key) => {
    return !!options[key];
  }).forEach((key) => {
    options[key] = parseInt(options[key]);
  });

  if (options.shading) {
    options.shading = THREE[options.shading];
  }

  return options;
}
export default getRuleMaterialOptions;
