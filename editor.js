const canvas = new fabric.Canvas('c');

// Cargar imagen base de la maceta
fabric.Image.fromURL('maceta.png', function(img) {
  img.selectable = false;
  img.evented = false;

  // Escalar la imagen para que encaje bien en el canvas
  img.scaleToWidth(canvas.width);
  img.scaleToHeight(canvas.height);

  // Establecer como fondo y renderizar
  canvas.setBackgroundImage(img, () => {
    canvas.renderAll();
  });
});

// Añadir texto personalizado
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

// Finalizar diseño y enviar imagen al sitio Wix
document.getElementById('finish').onclick = () => {
  const imageData = canvas.toDataURL({
    format: 'png'
  });

  // Enviar imagen por postMessage (funciona si estás embebido en un iframe, como en Wix)
  window.parent.postMessage({
    type: 'finishedDesign',
    image: imageData
  }, '*');
};

