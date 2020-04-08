const responsiveImageSizes = require('./index');

let testOptions = {
  deviceType: "all",
  sourceImageWidth: 3220,
  widthOnPage: 100,
  mode: "standard",
  topSize: 1920,
}
const baseResult = responsiveImageSizes.getResponsiveSizes(testOptions)
// console.log('base result', baseResult)
const granularResult = responsiveImageSizes.getResponsiveSizes({...testOptions, mode: "granular" })
// console.log('granularResult', granularResult)
const narrowerResult = responsiveImageSizes.getResponsiveSizes({...testOptions, widthOnPage: 50 })
// console.log('narrowerResult', narrowerResult)

customSizes = {
  desktop: [
    1800, 900, 450
  ],
  tabletPortrait: [
    500, 250
  ],
  smartphone: [100]
}
const customSizeResult = responsiveImageSizes.getResponsiveSizes({...testOptions, mode: "custom", customSizes: customSizes })
// console.log('customSizeResult', customSizeResult)

const smartphoneResult = responsiveImageSizes.getResponsiveSizes({...testOptions, deviceType: "smartphone"})
// console.log('smartphoneResult', smartphoneResult)
const mobileResult = responsiveImageSizes.getResponsiveSizes({...testOptions, deviceType: "mobile"})
// console.log('mobileResult', mobileResult)



test('Result is array', () => {
  expect(Array.isArray(baseResult)).toBe(true);
});
test('Result is array of numbers', () => {
  expect(baseResult.every((a) => typeof a === 'number')).toBe(true);
});
test('Check top size works, biggest value for width is smaller or equal to checkTopSize parameter', () => {
  expect(baseResult.reduce((p,v) => p > v ? p: v) <= testOptions.topSize).toBe(true);
});
test('Granular mode returns more image sizes', () => {
  expect(granularResult.length > baseResult.length).toBe(true);
});
test('If width on page is 50, images are half the width of base mode', () => {
  expect(narrowerResult[0] < baseResult[0]).toBe(true);
});
test('Custom mode is working', () => {
  expect(customSizeResult.length === 6).toBe(true);
});
test('Mobile mode returns fewer images than standard', () => {
  expect(mobileResult.length < baseResult.length).toBe(true);
});test('Smartphone mode returns fewer images than standard', () => {
  expect(smartphoneResult.length < baseResult.length).toBe(true);
});
