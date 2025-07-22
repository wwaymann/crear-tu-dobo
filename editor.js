const canvas = new fabric.Canvas('c');

// Cargar la imagen de la maceta asegurando CORS
fabric.Image.fromURL('maceta.png', function(img) {
  img.set({ crossOrigin: 'anonymous', selectable: false, evented: false });
  img.scaleToWidth(canvas.width);
  img.scaleToHeight(canvas.height);
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
}, { crossOrigin: 'anonymous' });

// Agregar texto personalizado
document.getElementById('addText').onclick = () => {
  const text = document.getElementById('textInput').value;
  const color = document.getElementById('colorPicker').value;
  const font = document.getElementById('fontSelector').value;

  const textbox = new fabric.Textbox(text, {
    left: 100, top: 100,
    fill: color, fontFamily: font,
    fontSize: 30, editable: true
  });

  canvas.add(textbox);
  canvas.setActiveObject(textbox);
};

// Exportar imagen y enviar al parent
document.getElementById('finish').onclick = () => {
  try {
    const imageData = canvas.toDataURL({ format: 'png' });
    console.log("✅ Imagen generada exitosamente", imageData.substr(0,50) + '...');

    window.parent.postMessage({
      type: 'finishedDesign',
      image: imageData
    }, '*');
  } catch (error) {
    console.error("❌ No se pudo exportar el canvas:", error);
    alert("No se pudo exportar el diseño. Verifica CORS en la imagen base.");
  }
};

