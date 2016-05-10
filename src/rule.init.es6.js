export default (world) => {
  world.data = world.data || [];
  world.rule = world.rule || {}
  world.rule.index = world.data.length;
  world.data.push([]);
  return world;
}
