//-------------------------------------
export function setStrokeWidth(width, color, context) {
  context.strokeStyle = color;
  context.lineWidth = width;
}
//-------------------------------------
export function drawLine(context, coordsObj) {
  context.beginPath();

  context.moveTo(coordsObj.from[0], coordsObj.from[1]);
  context.lineTo(coordsObj.to[0], coordsObj.to[1]);
  context.stroke();

  context.closePath();
}
//-------------------------------------
export function drawFrameFromHystory(context, index, hystory) {
  hystory.frames[index].steps.forEach((item, index) => {
    if (index) {
      setStrokeWidth(item.width, item.color, context);
      drawLine(context, {from: item.from, to: item.to});
    }
  });
}
//-------------------------------------
export function drawPreviousFrame(context, index, hystory, color) {
  hystory.frames[index].steps.forEach((item, index) => {
    if (index) {
      setStrokeWidth(
        item.width,
        item.color !== "white" ? color : item.color,
        context
      );
      drawLine(context, {from: item.from, to: item.to});
    }
  });
}
//-------------------------------------
export function clearCanvas(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
