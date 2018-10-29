d3.axisBottom(x);
d3.axisTop(x);
d3.axisRight(x);
d3.axisLeft(x);
d3.axisBottom(x)
  .tickFormat(timeFormatter);
d3.axisBottom()
  .tickFormat(timeFormatter);
d3.axisLeft(y)
  .tickFormat(numberFormat)
  .ticks(5)
  .tickSize(-width + margin.left + margin.top);
