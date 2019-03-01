$(function() {

  console.log($('.slider'))
var sliders=['animal','plant']
  $('.slider').on('input change', function(evt) {

var sliderVals= sliders.map((cur,index)=>$(`#${cur}`).val())



    chart.data.datasets[0].data = o2Level(...sliderVals)
    //  addData(chart, "df", 3)

    chart.update();
  })

  var labels = Array.apply(null, {
    length: 3
  }).map((cur, index) => {
    return `Day ${index+1}`

  })
  var ctx = $("#myChart");


  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Percent',
        data: [0, 25, 50],
        fill: false
      }],
      labels: labels
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }]
      }
    }
  });




})
//
// function getO2Range(animal,plant, initial,range=3){
//
//   var o2 = []
//   for(i = 0; i < range; i++) {
//  o2.push(o2Level(animal,plant, initial))
//   }
//
// }


function o2Level(animal, plant, initial=0, range=3) {
  var o2Array = []
  var prev = initial;

  for (i = 0; i < range; i++) {

    var prev = prev - 0.56 * animal + 0.21 * plant;
    o2Array.push(Math.max(0,prev))
  }
  return o2Array;

}

// function changeData(chart, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }
