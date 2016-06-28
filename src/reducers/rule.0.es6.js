export default function rule_0(newState, action) {
  let position = Object.assign({}, action);
  let size = { x: 1, y: 1, z: 1};

  switch(action.hex) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
      size = { x: 0.5, y: 0.5, z: 0.5 };
      break;
    case '9':
    case 'a':
      size.x = 0.5;
      break;
    case 'b':
    case 'c':
      size.y = 0.5;
      break;
    case 'd':
    case 'e':
      size.z = 0.5;
      break;
  }

  if (['2', '3', '6', '7', 'a'].indexOf() >= 0) {
    position.x += 0.5;
  }

  if (['3', '4', '7', '8', 'c'].indexOf() >= 0) {
    position.y += 0.5;
  }

  if (['5', '6', '7', '8', 'e'].indexOf() >= 0) {
    position.z += 0.5;
  }

  newState.data[0].push({
    position, size
  });
  return newState;
}
