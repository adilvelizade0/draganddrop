const draggableItems = document.querySelectorAll(".draggable-item");
const dropZones = document.querySelectorAll(".dropzone");

let innerX, innerY;

draggableItems.forEach((draggableItem, index) => {
  draggableItem.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData(`draggableItemId`, event.target.id);
    innerX = event.offsetX;
    innerY = event.offsetY;
  });
  draggableItem.addEventListener("mousedown", () => {
    draggableItem.style.zIndex = "1";
    draggableItems.forEach((item, i) => {
      if (i !== index) {
        draggableItems[i].style.zIndex = "0";
      }
    });
  });
});

dropZones.forEach((dropZone, index) => {
  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
});

dropZones.forEach((dropZone, index) => {
  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    const draggableItemId = event.dataTransfer.getData("draggableItemId");
    const draggableItem = document.querySelector(`#${draggableItemId}`);
    draggableItem.style.position = "absolute";

    let offsetX = event.offsetX - innerX + "px";
    let offsetY = event.offsetY - innerY + "px";

    if (event.offsetX > 320 && event.offsetY < 80) {
      draggableItem.style.top = "0px";
      draggableItem.style.left = "320px";
    } else if (event.offsetY > 320 && event.offsetX < 80) {
      draggableItem.style.top = "320px";
      draggableItem.style.left = "0px";
    } else if (event.offsetY > 320 && event.offsetX > 320) {
      draggableItem.style.top = "320px";
      draggableItem.style.left = "320px";
    } else if (event.offsetY < 80 && event.offsetX < 80) {
      draggableItem.style.top = "0px";
      draggableItem.style.left = "0px";
    } else if (event.offsetY < 80) {
      draggableItem.style.top = "0px";
      draggableItem.style.left = offsetX;
    } else if (event.offsetX < 80) {
      draggableItem.style.top = offsetY;
      draggableItem.style.left = "0px";
    } else if (event.offsetY > 320) {
      draggableItem.style.top = "320px";
      draggableItem.style.left = offsetX;
    } else if (event.offsetX > 320) {
      draggableItem.style.top = offsetY;
      draggableItem.style.left = "320px";
    } else {
      draggableItem.style.left = offsetX;
      draggableItem.style.top = offsetY;
    }

    event.target.appendChild(draggableItem);
  });

  dropZone.addEventListener("dragleave", (event) => {
    if (event.target.classList.contains("draggable-item")) {
      console.log(event.layerY);
      if (
        event.layerX > 90 ||
        event.layerX < 0 ||
        event.layerY < 0 ||
        event.layerY > 90
      ) {
        event.target.remove();
      }
    }
  });
});
