# d3-upgrade-codemods

Codemods to upgrade d3 from version 3.x.

This repository contains a collection of codemod scripts for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) to upgrade code using
[d3](https://d3js.org/) version 3.x to the version 4.x.

> Note that this codemods are not comprehensive of all the [changes]() of d3 version 4.x but covers
> only the changes I needed to apply to my codebase. Please feel free to contribute with additional
> codemods to increase the change's coverage.

### Setup & Run

```sh
npm install -g jscodeshift
git clone https://github.com/expobrain/d3-upgrade-codemods.git
jscodeshift -t <codemod-script> <file_or_directory>
```

Use the `-d` option for a dry-run and use `-p` to print the output for
comparison.


### Tests

To run the unit tests:

```sh
npm test
```


### Included Scripts

#### `d3-axis`

Apply changes relative to [d3-axis](https://github.com/d3/d3/blob/master/CHANGES.md#axes-d3-axis):

 * d3.svg.axis().scale(x).orient("bottom") ↦ d3.axisBottom(x)
 * d3.svg.axis().scale(x).orient("top") ↦ d3.axisTop(x)
 * d3.svg.axis().scale(x).orient("right") ↦ d3.axisRight(x)
 * d3.svg.axis().scale(x).orient("left") ↦ d3.axisLeft(x)

```sh
jscodeshift -t d3-upgrade-codemods/transforms/d3-axis.js <file>
```


#### `d3-scale`

Apply changes relative to [d3-axis](https://github.com/d3/d3/blob/master/CHANGES.md#scales-d3-scale):

 * d3.scale.linear ↦ d3.scaleLinear
 * d3.scale.sqrt ↦ d3.scaleSqrt
 * d3.scale.pow ↦ d3.scalePow
 * d3.scale.log ↦ d3.scaleLog
 * d3.scale.quantize ↦ d3.scaleQuantize
 * d3.scale.threshold ↦ d3.scaleThreshold
 * d3.scale.quantile ↦ d3.scaleQuantile
 * d3.scale.identity ↦ d3.scaleIdentity
 * d3.scale.ordinal ↦ d3.scaleOrdinal
 * d3.time.scale ↦ d3.scaleTime
 * d3.time.scale.utc ↦ d3.scaleUtc
 * d3.scale.category10 ↦ d3.schemeCategory10
 * d3.scale.category20 ↦ d3.schemeCategory20
 * d3.scale.category20b ↦ d3.schemeCategory20b
 * d3.scale.category20c ↦ d3.schemeCategory20c
 * d3.time.format ↦ d3.timeFormat
 * d3.time.format.utc ↦ d3.utcFormat
 * d3.time.format.iso ↦ d3.isoFormat

```sh
jscodeshift -t d3-upgrade-codemods/transforms/d3-scale.js <file>
```


#### `d3-scale-parse-to-timeParse`

Transforms code which uses `d3.timeFormat().parse()` function into `d3.timeParse()`.

> To be applied after [d3-scale](#d3-scale)

 * d3.timeFormat(<fmt>).parse ↦ d3.timeParse(<fmt>)

```sh
jscodeshift -t d3-upgrade-codemods/transforms/d3-scale-parse-to-timeParse.js <file>
```


#### `d3-shape`

Apply changes relative to [d3-axis](https://github.com/d3/d3/blob/master/CHANGES.md#shapes-d3-shape):

 * d3.svg.line ↦ d3.line
 * d3.svg.line.radial ↦ d3.radialLine
 * d3.svg.area ↦ d3.area
 * d3.svg.area.radial ↦ d3.radialArea
 * d3.svg.arc ↦ d3.arc
 * d3.svg.symbol ↦ d3.symbol
 * d3.svg.symbolTypes ↦ d3.symbolTypes
 * d3.layout.pie ↦ d3.pie
 * d3.layout.stack ↦ d3.stack
 * d3.svg.diagonal ↦ **REMOVED** (see d3/d3-shape#27)
 * d3.svg.diagonal.radial ↦ **REMOVED**

```sh
jscodeshift -t d3-upgrade-codemods/transforms/d3-shape.js <file>
```


#### `d3-shape-line-area-interpolate`

Transforms `interpolate()` calls into `curve()`.

 * d3.[line|area].interpolate() ↦ d3.[line|area].curve()

```sh
jscodeshift -t d3-upgrade-codemods/transforms/d3-shape-line-area-interpolate.js <file>
```
