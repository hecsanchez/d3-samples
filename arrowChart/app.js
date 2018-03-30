var impactOnOfferings=[
     {"industry": "Technology, Media, Telecom", "to": 70,"from": 20},
     {"industry": "Consumer", "to": 65,"from": 15},
     {"industry": "Financial Services", "to": 62,"from": 12},
     {"industry": "Professional Services", "to": 61,"from": 10},
     {"industry": "Health Care", "to": 65,"from": 15},
     {"industry": "Industrial", "to": 58,"from": 14},
     {"industry": "Energy", "to": 45,"from": 10},
     {"industry": "Public Sector", "to": 42,"from": 11},
     {"industry": "OVERALL", "to": 61,"from": 15},
    ]

createChart(impactOnOfferings, 'offerings')

//
// Function for creating horizontal arrow chart
//
function createChart(data, id) {
  var margin = {top: 50, right: 50, bottom: 50, left: 250},
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var y = d3.scale.ordinal()
      .rangeRoundBands([0, height], .08);

  var x = d3.scale.linear()
      .range([0,width]);

  y.domain(data.map(function(d) { return d.industry; }));
  x.domain([0, 80]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(9);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#" + id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("rect")
      .attr("x", -240)
      .attr("y", 353)
      .attr("width", 750)
      .attr("height", 40)
      .style("fill", "#ebebeb");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width-75)
        .attr("dx", "6em")
        .attr("dy", ".5em")
        .text("(%)")
        .style("font-size", "15px");;

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")
        .attr('class', 'x-title')
        .attr("x", "-11em")
        .attr("dy", "-.41em")
        .text("INDUSTRY");

    svg.append("text")
        .attr('class', 'x-label')
        .attr('width', '100')
        .attr("dx", "5em")
        .attr("dy", "-.41em")
        .text("Large effect today");

    svg.append("text")
        .attr('class', 'x-label')
        .attr('width', '100')
        .attr("dx", "24em")
        .attr("dy", "-.41em")
        .text("Large effect in 5 years");

    // Gradient
    // Create the svg:defs element and the main gradient definition.
    // set the gradient
    svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", function(d) { return width; })
      .attr("y2", y(1000))
      .selectAll("stop")
        .data([
          {offset: "20%", color: "#ec1a36"},
          {offset: "100%", color: "#134a94"}
        ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    // Build arrows

    svg.selectAll(".bar")
        .data(data)
        .enter().append("line")
        .attr("class", "bar line")
        .attr("y1", function(d) { return y(d.industry) + 20; })
        .attr("y2", function(d) { return y(d.industry) + 20; })
        .attr("x1", function(d) { return x(d.from) + 35; })
        .attr('x2',function(d){ return x(d.from) + 35; })
        .attr("marker-end", "url(#triangle)") // add the marker
        .style("stroke-linecap", "square");

    svg.append("svg:defs")
          .append("svg:marker")
          .attr("id", "triangle")
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 6)
          .attr('markerWidth', 4)
          .attr('markerHeight', 4)
          .style("stroke", "#134a94")
          .style("fill", "#134a94")           // colour the line
          .attr('orient', 'auto')
          .append('svg:path')
          .attr('d', 'M0,-5L10,0L0,5');

    // Build squares

    svg.selectAll(".start")
        .data(data)
        .enter().append("rect")
        .attr("class", "start")
        .attr("x", function(d) { return x(d.from); })
        .attr("y", function(d) { return y(d.industry) + 11; })
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) {
          return '#ec1a36';
        })

    svg.selectAll(".end")
        .data(data)
        .enter().append("rect")
        .attr("class", "end")
        .attr("x", function(d) { return x(d.to) + 25; })
        .attr("y", function(d) { return y(d.industry) + 11; })
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) {
          return '#134a94';
        })

  var transit = d3.select("svg").selectAll(".bar")
        .data(data)
        .transition()
        .duration(1000)
        .attr("x2", function(d) { return x(d.to); })

      // add legend
      var legend = svg.append("g")
        .attr("class", "legend")

  var tooltip = d3.select("body")
  .append('div')
  .attr('class', 'tooltip');

  tooltip.append('div')
  .attr('class', 'industry');
  tooltip.append('div')
  .attr('class', 'tempRange');

  svg.selectAll(".bar")
  .on('mouseover', function(d) {

    tooltip.select('.industry').html("<b>" + d.industry + "</b>");
    tooltip.select('.tempRange').html(d.from + "&#8451; to " + d.to + "&#8451;");

    tooltip.style('display', 'block');
    tooltip.style('opacity',2);

  })
  .on('mousemove', function(d) {
    tooltip.style('top', (d3.event.layerY + 10) + 'px')
    .style('left', (d3.event.layerX - 25) + 'px');
  })
  .on('mouseout', function() {
    tooltip.style('display', 'none');
    tooltip.style('opacity',0);
  });

}
