// #ff0000 -> [0, 0, 255]
function hexToRgb(hex) {
    let b = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let r = parseInt(hex.substring(5, 7), 16);

    return [r, g, b];
}

// '0 0 255' -> '#ff0000
function rgbToHex(color) {
    let rgbArray = color.split(' ').map(Number)
    let hex = rgbArray.map(x => {
        let hex = (x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    });
    // rgb->bgr
    [hex[0], hex[2]] = [hex[2] , hex[0]]
    return '#' + hex.join('');
}

export { hexToRgb, rgbToHex }