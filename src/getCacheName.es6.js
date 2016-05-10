function getCacheName(functionName, cfg) {
  return `${functionName}-${cfg.seed}-${cfg.size}`;
}

export default getCacheName;
