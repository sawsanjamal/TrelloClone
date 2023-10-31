import addGlobalEventListener from "./utils/addGlobalEventsListener.js";

export default function setupDragAndDrop() {
  addGlobalEventListener("mousedown", "[data-draggable]", (e) => {
    const selectedItem = e.target;
    const itemClone = selectedItem.cloneNode(true);
    const ghost = selectedItem.cloneNode();
    const offset = setupDragItems(selectedItem, itemClone, ghost, e);
    setupDragEvents(selectedItem, itemClone, ghost, offset);
  });
}
function setupDragItems(selectedItem, itemClone, ghost, e) {
  const originalRect = selectedItem.getBoundingClientRect();
  const offset = {
    x: e.clientX - originalRect.left,
    y: e.clientY - originalRect.top,
  };

  selectedItem.classList.add("hide");

  itemClone.style.width = `${originalRect.width}px`;
  itemClone.classList.add("dragging");
  positionClone(itemClone, e, offset);
  document.body.append(itemClone);

  ghost.style.height = `${originalRect.height}px`;
  ghost.classList.add("ghost");
  ghost.innerHTML = " ";
  selectedItem.parentElement.insertBefore(ghost, selectedItem);
  return offset;
}
function setupDragEvents(selectedItem, itemClone, ghost, offset) {
  const mouseMoveFunction = (e) => {
    positionClone(itemClone, e, offset);
  };

  document.addEventListener("mousemove", mouseMoveFunction);
  document.addEventListener(
    "mouseup",
    () => {
      document.removeEventListener("mousemove", mouseMoveFunction);
      stopDrag(selectedItem, itemClone, ghost);
    },
    { once: true }
  );
}
function positionClone(itemClone, mousePosition, offset) {
  itemClone.style.top = `${mousePosition.clientY - offset.y}px`;
  itemClone.style.left = `${mousePosition.clientX - offset.x}px`;
}
function stopDrag(selectedItem, itemClone, ghost) {
  selectedItem.classList.remove("hide");
  itemClone.remove();
  ghost.remove();
}
