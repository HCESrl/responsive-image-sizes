/** main static class
 *
 * */
let responsiveImageSizes = {
  /**
   * Base sizes to create images on
   */
  baseSizes: {
    desktop: [
      2880,
      2560,
      1920,
      1600, // same as tablet portrait first
      1440,
      1366,
      1024
    ],
    tabletPortrait: [
      1600, // same as second entry for desktop
      1024,
      768
    ],
    smartphone: [1242, 828, 768, 640]
  },

  /**
   * Granular base sizes (more images, more precise, higher top image size)
   */
  granularBaseSizes: {
    desktop: [
      2880,
      2560, //2K iMac
      2048, // iPad Landscape
      1920,
      1680,
      1440,
      1366,
      1280,
      1024
    ],
    tabletPortrait: [
      2048, // iPad Pro
      1536,
      1024,
      768
    ],
    smartphone: [
      1242,
      828,
      750,
      720,
      640
    ]
  },

  /**
   * Returns an array of image sizes to produce
   * @param object, with:
   *
   * @param sourceImageWidth     the width of the original image, in pixels (to avoid upscaling)
   * @param widthOnPage          the actual width of the image on the page, in vw (% of width)
   * @param deviceType           whether to generate sizes for desktop, tabletPortrait, smartphone or all
   * @param topSize              the highest resolution to generate (fullHD is default, but if you need to go above that provide pixels)
   * @param mode                 granular,  standard, or custom the first has more precise resolutions and creates more images
   * @param customSizes          an object with desktop, tabletPortrait, smartphone custom sizes
   */
  getResponsiveSizes: function({
                                 sourceImageWidth = 1920,
                                 widthOnPage = 100,
                                 deviceType = "all",
                                 topSize = 1920,
                                 mode = "standard",
                                 customSizes = {}
                               } = {}) {

    let baseSizes = this.collectSizes(deviceType, mode, customSizes);

    // check that we're not producing images bigger than the maximum desired width
    baseSizes = this.checkTopSize(baseSizes, topSize);

    // get list of sizes based on width on page
    baseSizes = this.buildSizeList(baseSizes, widthOnPage);

    // check that we're not producing images that are bigger than the source image, to avoid unnecessary upsampling
    baseSizes = this.checkMaxImageSize(baseSizes, sourceImageWidth);

    return baseSizes;
  },

  /**
   * adapts the standard size list to the current requirement in terms of space
   *
   * @param baseSizes
   * @param widthOnPage
   * @returns Array
   */
  buildSizeList: function(baseSizes, widthOnPage) {
    return baseSizes.map(size => Math.round((size / 100) * widthOnPage));
  },

  /**
   * Make sure we do not build images that are wider than the top required size
   *
   * @param baseSizes
   * @param topSize
   * @returns Array
   */
  checkTopSize: function(baseSizes, topSize) {
    return baseSizes.filter(size => size <= topSize);
  },

  /**
   * Make sure we do not build images that are wider than the original, once we get the final image sizes
   *
   * @param baseSizes
   * @param sourceImageWidth
   * @returns Array
   */
  checkMaxImageSize: function(baseSizes, sourceImageWidth) {
    return baseSizes.filter(size => size <= sourceImageWidth);
  },

  /**
   * Return all sizes for the desired mode
   * @param mode
   */
  collectSizes: function(deviceType, mode, customSizes) {

    let baseSizes;
    switch (mode) {
      case "granular":
        baseSizes = this.granularBaseSizes;
        break;
      case "custom":
        baseSizes = customSizes;
        break;
      case "standard":
      default:
        baseSizes = this.baseSizes;
        break;
    }
    let res = [];
    switch (deviceType) {
      case "all": // images from all types, without duplicates
        res = Array.from(
          new Set(
            Object.values(baseSizes).reduce((base, value) => {
              return base.concat(value);
            }, [])
          )
        ).sort((a, b) => {
          return a > b ? -1 : 1;
        });
        break;
      case "mobile": // tablet portrait and smartphone
        res = Array.from(
          new Set(
            baseSizes.smartphone.concat(baseSizes.tabletPortrait)
          )
        ).sort((a, b) => {
          return a > b ? -1 : 1;
        });
        break;
      default:
        res = baseSizes[deviceType];
        break;
    }
    return res;
  }
};

module.exports =  responsiveImageSizes;
