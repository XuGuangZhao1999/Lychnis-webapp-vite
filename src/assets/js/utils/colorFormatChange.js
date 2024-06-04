// Check hex color format.
function isValidHexColor(color) {
    const regex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
    return regex.test(color);
}

// Check rgb color format.
function isValidRgbColor(color) {
    const regex = /^(0(\.\d+)?|1(\.0+)?)(\s(0(\.\d+)?|1(\.0+)?)){2}$/;
    return regex.test(color);
}

// If showMessage is not defined, define it as an empty function.
// This is to prevent the error that occurs when running the test code.
if(typeof window.showMessage !== 'function') {
    window.showMessage = () => {};
}

// #ff0000 -> [0, 0, 255]
function hexToRgb(hex) {
    if (!isValidHexColor(hex) || hex.length !== 7) {
        showMessage('Invalid hex color format' + hex);
        throw new Error('Invalid hex color');
    }
    let b = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let r = parseInt(hex.substring(5, 7), 16);

    return [r, g, b];
}

// '0 0 1' -> '#ff0000
function rgbToHex(color) {
    if (!isValidRgbColor(color)) {
        showMessage('Invalid rgb color format' + color);
        throw new Error('Invalid rgb color');
    }
    let rgbArray = color.split(' ').map(Number)
    let hex = rgbArray.map(x => {
        let hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    });
    // rgb->bgr
    [hex[0], hex[2]] = [hex[2] , hex[0]]
    return '#' + hex.join('');
}

export { hexToRgb, rgbToHex }