import uuid from 'uuid';

export function remove(newState, action) {
  const name = uuid.v4();
  newState.lights = newState.lights.filter(name => name !== action.name);
  newState.scene.remove(action.name);
  return newState;
}
