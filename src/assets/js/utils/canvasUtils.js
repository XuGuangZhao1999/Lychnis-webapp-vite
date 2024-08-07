function drawScaleLine(context, height, scale){
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(50, height - 50 );
    context.lineTo(50, height - 44);
    context.lineTo(120, height - 44);
    context.lineTo(120, height - 50);
    context.strokeStyle = 'white';
    context.stroke();
    context.fillStyle = 'white';
    let scaleText = scale.toString() + ' μm';
    let textWidth = context.measureText(scaleText).width;
    context.fillText(scaleText, 50 + (70 - textWidth)/2, height - 52, textWidth);
}

export { drawScaleLine }