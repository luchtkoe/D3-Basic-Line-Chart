// DATA PLOTTING AND VISUALISATION

// Needed Variables
const height = 720;
const width = 1080;
const margin = {top:40, right:80, bottom:60, left:50};

// Needed Functions
  // Transform year to date time
var createDate = function(date){
  var date = Number(date);
  var dateTime = new Date(date,0,1,1,0,0,0,0)
  return dateTime
}
// Create Necessary HTML Elements

  // Add svg element
d3.select('body')                                                               // Data visualisation will happen on svg element
  .append('svg')                                                                // Add svg element
  .classed('DataVisualisation', true)                                           // Give class
  .attr('height', height)                                                       // Assign height to svg element
  .attr('width', width)                                                         // Assign width to svg element
  ;

var svg = d3.select('svg')                                                      // Shortcut to select svg element

// Visualise Data
function render(data){                                                          // Function that will start visualizing the data

  //Function to format Integers
  var formatInteger = function(integer){                                          // Function to improve readibility of integers
    if(integer == 0){                                                             // If Integer  is 0 return 0M
      return "0M"
    } else if (integer >= 10000000 && integer< 100000000) {                       // Elseif integer between 10.000.000 and 100.000.00. return format 10m,20m,30m, ....
      var population = integer;
      var format = d3.format(".2s")
      return format(integer)
    } else if (integer >= 100000000 && integer <1000000000) {                      // elseif >100.000.000 < 1.000.000.000 return format 100m, 120m,150m, ....
      var population = integer;
      var format = d3.format(".3s")
      return format(integer)
    } else{
      var population = integer;
      var format = d3.format(".2s")
      return format(integer)
    }
  }

  // Scales
  var yScale = d3.scaleLinear()                                                 // Function create linear scale
    .domain([0, d3.max(data, (item) => item.Indonesia)])                        // Data domain, 0 to highest population size in data
    .range([height - margin.bottom, margin.top])                                // The bounds of data domain
    .nice()                                                                     // Rounding the domain
    ;

  var xScale = d3.scaleTime()                                                   // STime based scale
    .domain(d3.extent(data, (item) => item.Year))                               // Data domain consisting of every year
    .range([margin.left, width - margin.right])                                 // Bounds of data domain                                                               // Spacing between bands
    ;

  // Axis
  var yAxis = d3.axisLeft()                                                     // Function create axis
    .scale(yScale)
    .tickFormat((d) => formatInteger(d))                                                              // Axis based on yScale

  svg
    .append('g')                                                                // Add group element to place axis in
    .classed('axis y', true)                                                    // Give classes
    .call(yAxis)                                                                // Call yAxis function
    .attr('transform', 'translate(' + margin.left + ',' + 0 + ')' )             // Set axis on right coordinates
    ;

  var xAxis = d3.axisBottom()                                                   // function create axis
    .scale(xScale)                                                              // Axis based on xScale
    ;

  svg
    .append('g')                                                                // Add group element to place axis in
    .classed('axis x', true)                                                    // Give classes
    .call(xAxis)                                                                // Call yAxis function
    .attr('transform', 'translate('+ 0 + ',' + (height -margin.bottom) + ')')   // Set axis on right coordinates
    ;

  var line = d3.line()
    .x(function(d, i) {return xScale(d.Year); })                                // set the x values for the line generator
    .y(function(d) {return yScale(d.Indonesia); })                             // set the y values for the line generator

  svg
    .append('g')                                                                // Add group element to place line in
    .classed('line', true)                                                      // Give classes
    .append('path')                                                             // Select all path elements to draw bars with
    .attr("fill", "none")                                                       // Remove fill
    .attr("stroke", "black")                                                    // Path color
    .attr("stroke-width", 1.5)                                                  // Width path
    .attr("d", line(data))
    ;
}


// DATA LOADING
d3.csv('IndonesiaTotalPopulation19502100.csv').then((data) => {
// DATA CLEANING & PREPARATION

  // Missing Data
    // No missing data

  // Duplicate Data
    // No duplicate data


  // Transforming Data
    // Ensure correct data types
  data.forEach((item, i) => {                                                   // For each object in array
    item.Indonesia = +item.Indonesia * 1000;                                    // Transform value from key Indonesia from string to integer
    item.Year = createDate(item.Year)                                           // Transform value from key Year from string to integer
  });
  console.log(data)
// Function to start Plotting and Visualisation
  render(data)

})
