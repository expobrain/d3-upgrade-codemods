d3.line.interpolate()
d3.area.interpolate()

d3.line().x(function(d) { return d.x }).interpolate()
d3.area().x(function(d) { return d.x }).interpolate('basic')
