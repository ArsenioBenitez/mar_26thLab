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
  var barWidth = 100;

 var day = 0;




  //create scales
  var xScale = d3.scaleLinear()
                .domain([0,10])
                .nice()
                .range([0,width]);

  var binMaker = d3.histogram()
                .domain(xScale.domain())
                .thresholds(xScale.ticks(4));



  var m_data = data.map(function(d){return d.quizes[day].grade;});
  var bins = binMaker(m_data);


    console.log(m_data,bins);
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
          .attr("x",function(d,i) {return i*barWidth;})
          .attr("width",barWidth)
          .attr("y",function(d){return yScale(d.length);})
          .attr('height',function(d)
          {
            return height - yScale(d.length);
          });
    var buttons =
              d3.selectAll('button')
               .on('click',function()
               {
                  var clicked = this.name;
                   updateChart(data,clicked,binMaker,plotLand,height,yScale,barWidth);
                });


};

var updateChart = function(data,clicked,binMaker,plotLand,h,yScale,barWidth)
{


    //do something
    var dd = parseInt(clicked)-1;
    var m_data = data.map(function(d){return d.quizes[dd].grade;});
    var bins = binMaker(m_data);
    plotLand.selectAll('rect')
        .data(bins)
        .attr("width",barWidth)
        .attr('y', function(d)
        {
        return  yScale(d.length);
        })
        .attr('height',function(d)
        {
          return h - yScale(d.length);
        });


  };
