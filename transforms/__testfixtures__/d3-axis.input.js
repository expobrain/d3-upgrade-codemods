d3.svg.axis().scale(x).orient("bottom")
d3.svg.axis().scale(x).orient("top")
d3.svg.axis().scale(x).orient("right")
d3.svg.axis().scale(x).orient("left")

d3.svg.axis()
    .scale(x)
    .orient("bottom").tickFormat(timeFormatter)

d3.svg.axis()
    .orient("bottom").tickFormat(timeFormatter)

d3.svg.axis()
    .scale(y)
    .tickFormat(numberFormat)
    .ticks(5)
    .tickSize(-width + margin.left + margin.top)
    .orient("left")
