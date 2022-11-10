import {currentCoordsObj} from "./data/coordsObj.js";
import {appSettings} from "./data/appSettings.js";
import {hystory, addFrame, addStepInFrame} from "./data/hystory.js";

import {
  clearCanvas,
  drawPreviousFrame,
  drawFrameFromHystory,
  setStrokeWidth,
  drawLine,
} from "./utils/drawing.js";
//-------------------------------------
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
//-------------------------------------
const invisibleCanvas = document.createElement("canvas");
const invisContext = invisibleCanvas.getContext("2d");
//-------------------------------------
let currentFrame = document.querySelector(".frame");
currentFrame.className += " selected-frame";
//-------------------------------------
const addFrameBtn = document.querySelector(".add-frame");
const frameDiv = document.getElementById("frameDiv");
const frameCount = document.querySelector(".frame-count");
//-------------------------------------
canvas.width = appSettings.canvas.width;
canvas.height = appSettings.canvas.height;

invisibleCanvas.width = canvas.width;
invisibleCanvas.height = canvas.height;
//-------------------------------------
const pencilButton = document.getElementById("pencil");
const eraserButton = document.getElementById("eraser");
const swidth = document.getElementById("swidth");

swidth.value = appSettings.canvas.strokeWidth;
//-------------------------------------
const playButton = document.getElementById("play");
let animIndex = -1;
//-------------------------------------
function changeFrameSelectClass(newFrame) {
  currentFrame.className = "frame";
  currentFrame = newFrame;
  currentFrame.className += " selected-frame";
}
//-------------------------------------
//SET EVENTS LISTENERS
//-------------------------------------
canvas.addEventListener("mousemove", getMouseMoveHandler());
//-------------------------------------
canvas.addEventListener("mouseup", getMouseUpHandler());
//-------------------------------------
canvas.addEventListener("mousedown", getMouseDownHandler());
//-------------------------------------
addFrameBtn.addEventListener("click", getAddFrameClickHandler());
//-------------------------------------
pencilButton.addEventListener("click", getPencilButtonClickHandler());
//-------------------------------------
eraserButton.addEventListener("click", getEraseButtonClickHandler());
//-------------------------------------
swidth.addEventListener("change", getStrokeWidthChangeHandler());
//-------------------------------------
currentFrame.addEventListener("click", getFrameClickHandler());
//-------------------------------------
playButton.addEventListener("click", (e) => {
  if (appSettings.doesItPlay) {
    appSettings.doesItPlay = false;
    e.target.innerHTML = "Play";
  } else {
    appSettings.doesItPlay = true;
    e.target.innerHTML = "Stop";

    requestAnimationFrame(draw);
  }
});
//----------------------------------------------
function draw() {
  if (++animIndex > hystory.lastIndex) animIndex = 0;
  if (appSettings.doesItPlay) requestAnimationFrame(draw);
  clearCanvas(context, canvas);
  drawFrameFromHystory(context, animIndex, hystory);
}
//-------------------------------------
//EVENTS LISTENERS
//-------------------------------------
function getFrameClickHandler() {
  return (event) => {
    clearCanvas(context, canvas);
    clearCanvas(invisContext, canvas);

    const index = parseInt(event.target.getAttribute("index"));

    hystory.currentIndex = index;

    if (index)
      drawPreviousFrame(
        context,
        index - 1,
        hystory,
        appSettings.invisibleCanvas.previousFrameColor
      );

    drawFrameFromHystory(context, index, hystory);
    (async function () {
      drawFrameFromHystory(invisContext, index, hystory);
    })();

    changeFrameSelectClass(event.target);
  };
}
//-------------------------------------
function getStrokeWidthChangeHandler() {
  return (e) => {
    appSettings.canvas.strokeWidth = e.target.value
      ? parseInt(e.target.value)
      : 1;
  };
}
//-------------------------------------
function getEraseButtonClickHandler() {
  return (e) => {
    canvas.className = appSettings.canvas.eraserClassName;
    appSettings.canvas.strokeColor = "white";
  };
}
//-------------------------------------
function getPencilButtonClickHandler() {
  return (e) => {
    canvas.className = appSettings.canvas.pencilClassName;
    appSettings.canvas.strokeColor = "black";
  };
}
//-------------------------------------
export function getMouseDownHandler() {
  return (e) => {
    appSettings.canvas.isMouseDown = true;
    currentCoordsObj.from[0] = e.offsetX * 2;
    currentCoordsObj.from[1] = e.offsetY * 2;
  };
}
//-------------------------------------
//-------------------------------------
function getMouseMoveHandler() {
  return (e) => {
    if (appSettings.canvas.isMouseDown) {
      setStrokeWidth(
        appSettings.canvas.strokeWidth,
        appSettings.canvas.strokeColor,
        context
      );

      currentCoordsObj.to[0] = e.offsetX * 2;
      currentCoordsObj.to[1] = e.offsetY * 2;

      drawLine(context, currentCoordsObj);

      (async function () {
        setStrokeWidth(
          appSettings.canvas.strokeWidth,
          appSettings.canvas.strokeColor,
          invisContext
        );
        drawLine(invisContext, currentCoordsObj);
      })();

      addStepInFrame(
        hystory,
        hystory.currentIndex,
        appSettings,
        currentCoordsObj
      );

      currentCoordsObj.from[0] = e.offsetX * 2;
      currentCoordsObj.from[1] = e.offsetY * 2;
    }
  };
}
//-------------------------------------
function getMouseUpHandler() {
  return (e) => {
    appSettings.canvas.isMouseDown = false;
    (async function () {
      currentFrame.src = invisibleCanvas.toDataURL();
    })();
  };
}

//-------------------------------------
function getAddFrameClickHandler() {
  return (e) => {
    const newFrame = document.createElement("img");
    newFrame.setAttribute("index", hystory.lastIndex + 1);

    newFrame.className = currentFrame.className;
    newFrame.addEventListener("click", getFrameClickHandler());

    frameDiv.appendChild(newFrame);

    changeFrameSelectClass(newFrame);

    clearCanvas(context, canvas);
    clearCanvas(invisContext, canvas);

    addFrame(hystory);
    drawPreviousFrame(
      context,
      hystory.lastIndex - 1,
      hystory,
      appSettings.invisibleCanvas.previousFrameColor
    );

    frameCount.innerHTML = hystory.lastIndex + 1;
  };
}
//-------------------------------------
function play() {
  hystory.frames.forEach((item) => {
    if (appSettings.doesItPlay) {
      setTimeout(() => {
        clearCanvas(context, canvas);
        drawFrameFromHystory(context, item.id, hystory);
      }, 1000 / 24);
    }
    console.log(appSettings.doesItPlay);
  });
}

//------------
const getCurrentPlayState = () => {
  return appSettings.doesItPlay;
};
