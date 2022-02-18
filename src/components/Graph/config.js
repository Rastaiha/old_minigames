const widthScale = window.innerWidth / 671;
const heightScale = window.innerHeight / 381;

export const vertexConfig = {
  radius: 30 * widthScale,
  fill: 'black',
  draggable: true,
};
export const edgeConfig = {
  tension: 0,
  stroke: 'red',
};
