import {
  clearCanvas,
  drawPreviousFrame,
  drawFrameFromHystory,
  setStrokeWidth,
  drawLine,
} from "./drawing.js";

import {addFrame, addStepInFrame} from "../data/hystory.js";

//-------------------------------------
export function getFrameClickHandler(props) {
  return (event) => {
    clearCanvas(props.context, props.canvas);
    clearCanvas(props.invisContext, props.canvas);

    const index = parseInt(event.target.getAttribute("index"));

    props.hystory.currentIndex = index;

    if (index)
      drawPreviousFrame(
        props.context,
        index - 1,
        props.hystory,
        props.appSettings.invisibleCanvas.previousFrameColor
      );

    drawFrameFromHystory(props.context, index, props.hystory);
    (async function () {
      drawFrameFromHystory(props.invisContext, index, props.hystory);
    })();

    props.changeFrameSelectClass(event.target);
  };
}
//-------------------------------------
export function getStrokeWidthChangeHandler(props) {
  return (e) => {
    props.appSettings.canvas.strokeWidth = e.target.value
      ? parseInt(e.target.value)
      : 1;
  };
}
//-------------------------------------
export function getEraseButtonClickHandler(props) {
  return (e) => {
    props.canvas.className = props.appSettings.canvas.eraserClassName;
    props.appSettings.canvas.strokeColor = "white";
  };
}
//-------------------------------------
export function getPencilButtonClickHandler(props) {
  return (e) => {
    props.canvas.className = props.appSettings.canvas.pencilClassName;
    props.appSettings.canvas.strokeColor = "black";
  };
}
//-------------------------------------
export function getMouseDownHandler(props) {
  return (e) => {
    props.appSettings.canvas.isMouseDown = true;
    props.currentCoordsObj.from[0] = e.offsetX * 2;
    props.currentCoordsObj.from[1] = e.offsetY * 2;
  };
}
//-------------------------------------
//-------------------------------------
export function getMouseMoveHandler(props) {
  return (e) => {
    if (props.appSettings.canvas.isMouseDown) {
      setStrokeWidth(
        props.appSettings.canvas.strokeWidth,
        props.appSettings.canvas.strokeColor,
        props.context
      );

      props.currentCoordsObj.to[0] = e.offsetX * 2;
      props.currentCoordsObj.to[1] = e.offsetY * 2;

      drawLine(props.context, props.currentCoordsObj);

      (async function () {
        setStrokeWidth(
          props.appSettings.canvas.strokeWidth,
          props.appSettings.canvas.strokeColor,
          props.invisContext
        );
        drawLine(props.invisContext, props.currentCoordsObj);
      })();

      addStepInFrame(
        props.hystory,
        props.hystory.currentIndex,
        props.appSettings,
        props.currentCoordsObj
      );

      props.currentCoordsObj.from[0] = e.offsetX * 2;
      props.currentCoordsObj.from[1] = e.offsetY * 2;
    }
  };
}
//-------------------------------------
export function getMouseUpHandler(props) {
  return (e) => {
    props.appSettings.canvas.isMouseDown = false;
    (async function () {
      props.currentFrame.src = props.invisibleCanvas.toDataURL();
    })();
  };
}
