
const canvas = new fabric.Canvas('c');

fabric.Image.fromURL('maceta.png', function(img) {
  img.crossOrigin = 'anonymous';
  img.selectable = false;
  img.evented = false;
  img.scaleToWidth(canvas.width);
  img.scaleToHeight(canvas.height);
  canvas.setBackgroundImage(img, () => {
    canvas.renderAll();
  });
}, { crossOrigin: 'anonymous' });

document.getElementById('addText').onclick = () => {
  const text = document.getElementById('textInput').value;
  const color = document.getElementById('colorPicker').value;
  const font = document.getElementById('fontSelector').value;

  const textbox = new fabric.Textbox(text, {
    left: 200,
    top: 200,
    fill: color,
    fontFamily: font,
    fontSize: 30,
    editable: true
  });

  canvas.add(textbox);
  canvas.setActiveObject(textbox);
};

document.getElementById('finish').onclick = () => {
  try {
    const imageData = canvas.toDataURL({ format: 'png' });

    window.parent.postMessage({
      type: 'finishedDesign',
      image: imageData
    }, '*');
  } catch (error) {
    alert("No se pudo exportar el diseño. Verifica CORS y errores en el canvas.");
    console.error(error);
  }
};
