var data=[
     {"month": "January", "to": 4,"from": -3},
     {"month": "February", "to": 5,"from": -2},
     {"month": "March", "to": 10,"from": 2},
     {"month": "April", "to": 16,"from": 7},
     {"month": "May", "to": 22,"from": 12},
     {"month": "June", "to": 26,"from": 18},
     {"month": "July", "to": 30,"from": 20},
     {"month": "August", "to": 28,"from": 20},
     {"month": "September", "to": 24,"from": 16},
     {"month": "October", "to": 18,"from": 10},
     {"month": "November", "to": 12,"from": 5},
     {"month": "December", "to": 6,"from": 0}
    ]

    var margin = {top: 50, right: 50, bottom: 50, left: 100},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var y = d3.scale.ordinal()
        .rangeRoundBands([0, height], .08);

    var x = d3.scale.linear()
        .range([0,width]);

    y.domain(data.map(function(d) { return d.month; }));
    x.domain([d3.min(data,function(d){return d.from;}), d3.max(data,function(d){return d.to;})]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(15);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("x", width-75)
          .attr("dx", ".71em")
          .attr("dy", "-.71em")
          .text("Temperatures (C)");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("y", function(d) { return y(d.month); })
          .attr("height", y.rangeBand())
          .attr("x", function(d) { return x(d.from); })
          .attr('width',function(d){ return 0; });


    var transit = d3.select("svg").selectAll("rect")
          .data(data)
          .transition()
          .duration(1000)
          .attr("width", function(d) {return x(d.to)-x(d.from)});

        // add legend
        var legend = svg.append("g")
          .attr("class", "legend")

        legend
          .append("rect")
          .attr("x", width-margin.left)
          .attr("y", -10)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", function(d) {
            return '#3498db';
          })

        legend
          .append("text")
          .attr("x", width-margin.left+15)
          .attr("y", 0)
          .text("New York City");


		var tooltip = d3.select("body")
		.append('div')
		.attr('class', 'tooltip');

		tooltip.append('div')
		.attr('class', 'month');
		tooltip.append('div')
		.attr('class', 'tempRange');

		svg.selectAll(".bar")
		.on('mouseover', function(d) {

			tooltip.select('.month').html("<b>" + d.month + "</b>");
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
