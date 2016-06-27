export function remove(newState, action) {
  newState.helpers = newState.helpers.filter(name => name !== action.name);
  newState.scene.remove(action.name);
  return newState;
}
