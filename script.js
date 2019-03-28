var dataP = d3.json("classData.json");
dataP.then(function(data)
{
  drawChart(data);

})

var drawChart = function(data)
{

  var screen =
  {
    width: 500,
    height: 400
  }

  var margins =
  {
    top:10,
    bottom:40,
    left:40,
    right:100
  }
  var width = screen.width-margins.left-margins.right;
  var height = screen.height-margins.top-margins.bottom;

 var day = 7;




  //create scales
  var xScale = d3.scaleLinear()
                .domain([0,10])
                .nice()
                .range([0,width]);

  var binMaker = d3.histogram()
                .domain([xScale.domain()])
                .thresholds(xScale.ticks(10));



  var m_data = data.map(function(d){return d.quizes[day+1].grade;});
  var bins = binMaker(m_data);
  bins.shift();
  bins.pop();
    console.log('bins',bins);
  var yScale = d3.scaleLinear()
                .domain([0,d3.max(bins,function(d){return d.length})])
                .range([height,0])
                .nice();

  var svg = d3.select("svg").attr("width",width)
                            .attr("height",height);
  svg.append('g').call(d3.axisLeft(yScale));
  svg.append('g').attr("transform","translate(0,"+height+")").call(d3.axisBottom(xScale));
  var plotLand = svg.append('g')
                    .classed("plot",true)
                    .attr("transform","translate("+margins.left+","+margins.top+")");

  plotLand.selectAll('rect')
          .data(bins)
          .enter()
          .append("rect")
          .attr("x",function(d) {return xScale(d.x0);})
          .attr("width",function(d)
          {return xScale(d.x1-.1)-xScale(d.x0);})
          .attr("y",function(d){return yScale(d.length);})
          .attr('height',function(d)
          {
            return height - yScale(d.length);
          });






}
