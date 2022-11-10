//-------------------------------------
export const hystory = {
  frames: [
    {
      id: 0,
      steps: [
        {
          from: [0, 0],
          to: [0, 0],
          color: "black",
          width: 1,
        },
      ],
    },
  ],
  lastIndex: 0,
  currentIndex: 0,
};
//-------------------------------------
export function addFrame(hystory) {
  hystory.frames.push({
    id: ++hystory.lastIndex,
    steps: [{}],
  });
  hystory.currentIndex = hystory.lastIndex;
}
//-------------------------------------
export async function addStepInFrame(hystory, index, appSettings, coordsObj) {
  hystory.frames[index].steps.push({
    from: [coordsObj.from[0], coordsObj.from[1]],
    to: [coordsObj.to[0], coordsObj.to[1]],
    color: appSettings.canvas.strokeColor,
    width: appSettings.canvas.strokeWidth,
  });
}
//-------------------------------------
