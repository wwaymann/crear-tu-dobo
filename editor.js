
const canvas = new fabric.Canvas('c');

// Imagen base de la maceta
fabric.Image.fromURL('maceta.png', function(img) {
  img.selectable = false;
  img.evented = false;
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
});

// Añadir texto al canvas
document.getElementById('addText').onclick = () => {
  const textValue = document.getElementById('textInput').value;
  const colorValue = document.getElementById('colorPicker').value;
  const fontValue = document.getElementById('fontSelector').value;

  const text = new fabric.Textbox(textValue, {
    left: 200,
    top: 200,
    fill: colorValue,
    fontFamily: fontValue,
    fontSize: 30,
    editable: true
  });
  canvas.add(text);
};

// Finalizar y enviar diseño al sitio principal
document.getElementById('finish').onclick = () => {
  const imageData = canvas.toDataURL({ format: 'png' });
  window.parent.postMessage({ type: 'finishedDesign', image: imageData }, '*');
};
