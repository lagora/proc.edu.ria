function defaultArgsChecking(args) {
  if (typeof args === "undefined") {
    throw new Error("no args");
  }
}

export default defaultArgsChecking;
