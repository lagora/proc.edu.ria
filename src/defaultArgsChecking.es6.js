export default function defaultArgsChecking(args) {
  if (typeof args === "undefined") {
    throw new Error("no args");
  }
}
