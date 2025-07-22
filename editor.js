const canvas = new fabric.Canvas('c');

// Cargar imagen de fondo
fabric.Image.fromURL('maceta.png', function(img) {
  img.crossOrigin = 'anonymous';
  img.selectable = false;
  img.evented = false;
  img.scaleToWidth(canvas.width);
  img.scaleToHeight(canvas.height);
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
}, { crossOrigin: 'anonymous' });

// Agregar texto
document.getElementById('addText').onclick = () => {
  const text = document.getElementById('textInput').value;
  const color = document.getElementById('colorPicker').value;
  const font = document.getElementById('fontSelector').value;

  const textbox = new fabric.Textbox(text, {
    left: 100,
    top: 100,
    fill: color,
    fontFamily: font,
    fontSize: 30,
    editable: true
  });

  canvas.add(textbox);
  canvas.setActiveObject(textbox);
};

// Enviar imagen al sitio Wix (padre del iframe)
document.getElementById('finish').onclick = () => {
  console.log("🟡 Botón Finalizar presionado");

  try {
    const imageData = canvas.toDataURL({
      format: 'png'
    });

    console.log("📤 Enviando imagen al parent");

    window.parent.postMessage({
      type: 'finishedDesign',
      image: imageData
    }, '*');
  } catch (error) {
    alert("❌ No se pudo exportar el diseño. Revisa CORS o errores en el canvas.");
    console.error("❌ Error al generar imagen:", error);
  }
};

