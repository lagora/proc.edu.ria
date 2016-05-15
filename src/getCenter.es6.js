import defaultArgsChecking from "./defaultArgsChecking.es6.js";
import cycleCheck from "./cycleCheck.es6.js";

function getCenter(args) {
  defaultArgsChecking(args);
  var err = cycleCheck(args, ["position", "size", "axis"]);
  if (err) {
    throw new Error(err);
  }
  return (args.position[args.axis] + args.size[args.axis]) / 2;
}

export default getCenter;
