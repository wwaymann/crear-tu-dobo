const canvas = new fabric.Canvas('c');

// Cargar imagen base con CORS habilitado
fabric.Image.fromURL('maceta.png', function(img) {
  img.set({
    crossOrigin: 'anonymous',
    selectable: false,
    evented: false
  });
  img.scaleToWidth(canvas.width);
  img.scaleToHeight(canvas.height);
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
}, { crossOrigin: 'anonymous' });

// Añadir texto
document.getElementById('addText').onclick = () => {
  const text = document.getElementById('textInput').value;
  const color = document.getElementById('colorPicker').value;
  const font = document.getElementById('fontSelector').value;

  const textbox = new fabric.Textbox(text, {
    left: 150,
    top: 150,
    fill: color,
    fontFamily: font,
    fontSize: 30,
    editable: true
  });

  canvas.add(textbox);
  canvas.setActiveObject(textbox);
};

// Finalizar diseño
document.getElementById('finish').onclick = () => {
  try {
    const imageData = canvas.toDataURL({ format: 'png' });

    console.log("✅ Imagen generada, enviando...");
    window.parent.postMessage({
      type: 'finishedDesign',
      image: imageData
    }, '*');
  } catch (e) {
    console.error("❌ No se pudo exportar el diseño:", e);
    alert("No se pudo exportar el diseño. Verifica que la imagen base tenga CORS habilitado.");
  }
};
