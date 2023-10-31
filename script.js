import setupDragAndDrop from "./dragAndDrop.js";

setupDragAndDrop(onDragComplete);

function onDragComplete(e) {
  console.log(e);
}
