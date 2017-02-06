# d3-upgrade-codemods

Codemods to upgrade d3 from version 3.x.

This repository contains a collection of codemod scripts for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) to upgrade code using
[d3](https://d3js.org/) version 3.x to the version 4.x.

> Note that this codemods are not comprehensive of all the
> [changes](https://github.com/d3/d3/blob/master/CHANGES.md) of d3 version 4.x but covers
> only the changes I needed to apply to my codebase. Please feel free to contribute with additional
> codemods to increase the change's coverage.


## Setup & Run

```sh
$ yarn global add jscodeshift
$ git clone https://github.com/expobrain/d3-upgrade-codemods.git
$ jscodeshift -t <codemod-script> <file_or_directory>
```

Use the `-d` option for a dry-run and use `-p` to print the output for
comparison.

> Note that if you code uses [Flow](https://flowtype.org/) annotations you must change the default
> parser with the `--parser flow` switch


## Tests

To run the unit tests:

```sh
$ yarn test
```


## Included Scripts

### `d3-axis`

Apply changes relative to [d3-axis](https://github.com/d3/d3/blob/master/CHANGES.md#axes-d3-axis):

 * d3.svg.axis().scale(x).orient("bottom") ↦ d3.axisBottom(x)
 * d3.svg.axis().scale(x).orient("top") ↦ d3.axisTop(x)
 * d3.svg.axis().scale(x).orient("right") ↦ d3.axisRight(x)
 * d3.svg.axis().scale(x).orient("left") ↦ d3.axisLeft(x)

```sh
$ jscodeshift --extensions=js,jsx -t d3-upgrade-codemods/transforms/d3-axis.js <file>
```


### `d3-scale`

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
$ jscodeshift --extensions=js,jsx -t d3-upgrade-codemods/transforms/d3-scale.js <file>
```


### `d3-scale-parse-to-timeParse`

Transforms code which uses `d3.timeFormat().parse()` function into `d3.timeParse()`.

> To be applied after [d3-scale](#d3-scale)

 * d3.timeFormat(<fmt>).parse ↦ d3.timeParse(<fmt>)

```sh
$ jscodeshift --extensions=js,jsx -t d3-upgrade-codemods/transforms/d3-scale-parse-to-timeParse.js <file>
```


### `d3-shape`

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
$ jscodeshift --extensions=js,jsx -t d3-upgrade-codemods/transforms/d3-shape.js <file>
```


### `d3-shape-line-area-interpolate`

Transforms `interpolate()` calls into `curve()`.

 * d3.[line|area].interpolate() ↦ d3.[line|area].curve()

`line.curve` and `area.curve` now take a function which instantiates a curve for a given context,
rather than a string. The full list of equivalents:

 * linear ↦ d3.curveLinear
 * linear-closed ↦ d3.curveLinearClosed
 * step ↦ d3.curveStep
 * step-before ↦ d3.curveStepBefore
 * step-after ↦ d3.curveStepAfter
 * basis ↦ d3.curveBasis
 * basis-open ↦ d3.curveBasisOpen
 * basis-closed ↦ d3.curveBasisClosed
 * bundle ↦ d3.curveBundle
 * cardinal ↦ d3.curveCardinal
 * cardinal-open ↦ d3.curveCardinalOpen
 * cardinal-closed ↦ d3.curveCardinalClosed
 * monotone ↦ d3.curveMonotoneX

```sh
$ jscodeshift --extensions=js,jsx -t d3-upgrade-codemods/transforms/d3-shape-line-area-interpolate.js <file>
```


### `d3-time`

Transforms time intervals in the new format.

* d3.time.second ↦ d3.timeSecond
* d3.time.minute ↦ d3.timeMinute
* d3.time.hour ↦ d3.timeHour
* d3.time.day ↦ d3.timeDay
* d3.time.sunday ↦ d3.timeSunday
* d3.time.monday ↦ d3.timeMonday
* d3.time.tuesday ↦ d3.timeTuesday
* d3.time.wednesday ↦ d3.timeWednesday
* d3.time.thursday ↦ d3.timeThursday
* d3.time.friday ↦ d3.timeFriday
* d3.time.saturday ↦ d3.timeSaturday
* d3.time.week ↦ d3.timeWeek
* d3.time.month ↦ d3.timeMonth
* d3.time.year ↦ d3.timeYear

The UTC time intervals have likewise been renamed:

* d3.time.second.utc ↦ d3.utcSecond
* d3.time.minute.utc ↦ d3.utcMinute
* d3.time.hour.utc ↦ d3.utcHour
* d3.time.day.utc ↦ d3.utcDay
* d3.time.sunday.utc ↦ d3.utcSunday
* d3.time.monday.utc ↦ d3.utcMonday
* d3.time.tuesday.utc ↦ d3.utcTuesday
* d3.time.wednesday.utc ↦ d3.utcWednesday
* d3.time.thursday.utc ↦ d3.utcThursday
* d3.time.friday.utc ↦ d3.utcFriday
* d3.time.saturday.utc ↦ d3.utcSaturday
* d3.time.week.utc ↦ d3.utcWeek
* d3.time.month.utc ↦ d3.utcMonth
* d3.time.year.utc ↦ d3.utcYear

The local time range aliases have been renamed:

* d3.time.seconds ↦ d3.timeSeconds
* d3.time.minutes ↦ d3.timeMinutes
* d3.time.hours ↦ d3.timeHours
* d3.time.days ↦ d3.timeDays
* d3.time.sundays ↦ d3.timeSundays
* d3.time.mondays ↦ d3.timeMondays
* d3.time.tuesdays ↦ d3.timeTuesdays
* d3.time.wednesdays ↦ d3.timeWednesdays
* d3.time.thursdays ↦ d3.timeThursdays
* d3.time.fridays ↦ d3.timeFridays
* d3.time.saturdays ↦ d3.timeSaturdays
* d3.time.weeks ↦ d3.timeWeeks
* d3.time.months ↦ d3.timeMonths
* d3.time.years ↦ d3.timeYears

The UTC time range aliases have been renamed:

* d3.time.seconds.utc ↦ d3.utcSeconds
* d3.time.minutes.utc ↦ d3.utcMinutes
* d3.time.hours.utc ↦ d3.utcHours
* d3.time.days.utc ↦ d3.utcDays
* d3.time.sundays.utc ↦ d3.utcSundays
* d3.time.mondays.utc ↦ d3.utcMondays
* d3.time.tuesdays.utc ↦ d3.utcTuesdays
* d3.time.wednesdays.utc ↦ d3.utcWednesdays
* d3.time.thursdays.utc ↦ d3.utcThursdays
* d3.time.fridays.utc ↦ d3.utcFridays
* d3.time.saturdays.utc ↦ d3.utcSaturdays
* d3.time.weeks.utc ↦ d3.utcWeeks
* d3.time.months.utc ↦ d3.utcMonths
* d3.time.years.utc ↦ d3.utcYears

```sh
$ jscodeshift --extensions=js,jsx -t d3-upgrade-codemods/transforms/d3-time.js <file>
```
