const canvas = new fabric.Canvas('c');

fabric.Image.fromURL('maceta.png', img => {
  img.set({ crossOrigin: 'anonymous', selectable: false, evented: false });
  img.scaleToWidth(canvas.width);
  img.scaleToHeight(canvas.height);
  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
    crossOrigin: 'anonymous'
  });
}, { crossOrigin: 'anonymous' });

document.getElementById('addText').onclick = () => {
  const t = document.getElementById('textInput').value;
  const c = document.getElementById('colorPicker').value;
  const f = document.getElementById('fontSelector').value;
  const tb = new fabric.Textbox(t, { left:150, top:150, fill:c, fontFamily:f, fontSize:30 });
  canvas.add(tb).setActiveObject(tb);
};

document.getElementById('finish').onclick = () => {
  try {
    const imgData = canvas.toDataURL({ format: 'png' });
    window.parent.postMessage({ type: 'finishedDesign', image: imgData }, '*');
  } catch (e) {
    console.error("❌ No se pudo exportar el diseño:", e);
    alert("No se pudo exportar el diseño. Verifica que la imagen base tenga CORS habilitado.");
  }
};

