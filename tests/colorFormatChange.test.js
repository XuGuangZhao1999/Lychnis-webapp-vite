import { expect } from 'vitest'
import { hexToRgb, rgbToHex } from '../src/assets/js/utils/colorFormatChange.js'

describe('colorFormatChange.js tests', () => {
    it('hexToRgb test', () => {
        // valid hex color
        expect(hexToRgb('#af234c')).toEqual([76, 35, 175])

        // invalid hex color
        expect(() => hexToRgb(123)).toThrowError('Invalid hex color')
        expect(() => hexToRgb('af234c')).toThrowError('Invalid hex color')
        expect(() => hexToRgb('#af234')).toThrowError('Invalid hex color')
        expect(() => hexToRgb('#af234cf')).toThrowError('Invalid hex color')
        expect(() => hexToRgb('#a*ff00')).toThrowError('Invalid hex color')

        // border case
        expect(hexToRgb('#000000')).toEqual([0, 0, 0])
        expect(hexToRgb('#ffffff')).toEqual([255, 255, 255])
        expect(hexToRgb('#000001')).toEqual([1, 0, 0])
        expect(hexToRgb('#fffffe')).toEqual([254, 255, 255])
    })

    it('rgbToHex test', () => {
        // valid rgb color
        expect(rgbToHex('0.5 0 1')).toBe('#ff0080')   

        // invalid rgb color
        expect(() => rgbToHex(123)).toThrowError('Invalid rgb color')
        expect(() => rgbToHex('0.5 0')).toThrowError('Invalid rgb color')
        expect(() => rgbToHex('0.5 0 1 0.5')).toThrowError('Invalid rgb color')
        expect(() => rgbToHex('0.5 01')).toThrowError('Invalid rgb color')
        expect(() => rgbToHex('0.5 0  1')).toThrowError('Invalid rgb color')
        expect(() => rgbToHex('2 0 0.5')).toThrowError('Invalid rgb color')
        expect(() => rgbToHex('a 0 0.5')).toThrowError('Invalid rgb color')

        // border case
        expect(rgbToHex('0 0 0')).toBe('#000000')
        expect(rgbToHex('1 1 1')).toBe('#ffffff')
    })
})