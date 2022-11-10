//-------------------------------------
//App Settings singleton object
export const appSettings = {
  canvas: {
    width: 1200,
    height: 1200,
    strokeWidth: 1,
    strokeColor: "black",
    isMouseDown: false,
    pencilClassName: "canvas-pencil",
    eraserClassName: "canvas-eraser",
  },
  invisibleCanvas: {
    previousFrameColor: "lightgray",
  },
  doesItPlay: false,
};
//-------------------------------------
