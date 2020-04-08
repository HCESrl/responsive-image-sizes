#RESPONSIVE IMAGE SIZES

Retrieve the correct sizes for a responsive image based on its intrinsic width and its width on screen

Based on the logic explained in this article:

https://medium.com/hceverything/applying-srcset-choosing-the-right-sizes-for-responsive-images-at-different-breakpoints-a0433450a4a3

Given a set of options, the library will return an array with the optimal image widths you need to use in your responsive image tag.
The widths are optimized based on real device screen widths, and will produce much better results in terms of optimization than most other responsive image sizing techniques.

One of the big advantages is to set the actual width (in vw) you're using the image at in your front-end layout. This way you get very specific sizes that will perform optimally for all smartphones, improving your site's speed especially with poor network connections.

The resulting sizes should be used to do your own local image resizing and/or to build the `srcset` for your `<img>` or `<picture>` tags.


#Usage

##Installation

With **Yarn**

`yarn add responsive-image-sizes`

With **NPM**

`npm i responsive-image-sizes`

##Including the library

```
const responsiveImageSizes = require('./index');

```
##Using the library

**Sample usage**

```
// create an options object
let options = {
  deviceType: "all",
  sourceImageWidth: 3220,
  widthOnPage: 100,
  mode: "standard",
  topSize: 1920,
}
// pass it to the function
let result = responsiveImageSizes.getResponsiveSizes(options)
// result will be an array of widths at which you have to create your image

// let's get the sizes for smartphone only, for an image at 100vw
let smartphoneResult = responsiveImageSizes.getResponsiveSizes({...options, deviceType: "smartphone"})
//  smartphoneResult is [ 1242, 828, 768, 640 ]

```

##Parameters
```
   * @param sourceImageWidth     the width of the original image you need to resize, in pixels (to avoid upscaling)
   * @param widthOnPage          the actual width of the image on the page, in vw (% of screen width)
   * @param deviceType           whether to generate sizes for desktop, tabletPortrait, smartphone or all
   * @param topSize              the highest resolution to generate (fullHD 1920px is default, but if you need to go above that provide image width in pixels)
   * @param mode                 granular,  standard, or custom the first has more precise resolutions and creates more images
   * @param customSizes          an object with desktop, tabletPortrait, smartphone custom sizes  
```

For more examples, see the unit tests in the index.test.js file
