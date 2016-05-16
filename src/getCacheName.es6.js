export default function getCacheName(functionName, cfg) {
  return `${functionName}-${cfg.seed}-${cfg.size}`;
}
