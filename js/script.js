$(function() {
var answers = new Answers();

var openED = false
function submit() {

}
  var day = 3
  var o2data = 75;
  var chart;
  console.log($('.slider'))
  var sliders = ['plant','animal']
  $('.slider').on('change', function(evt) {

    var sliderVals = sliders.map((cur, index) => $(`#${cur}`).val())
     //console.log(sliderVals)
var current =evt.currentTarget.id

    //chart.data.datasets[0].data
    o2data = Math.min(100,Math.max(0, o2data + o2formula(...sliderVals)))
    //console.log(...sliderVals)
    day = day + 1
    label = 'Day '+day

    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(o2data);
    });
    chart.update();

drawGrid(current, parseInt(sliderVals[sliders.indexOf(current)]/10))


    //  addData(chart, "df", 3)


  })



  setInterval(function(evt){     var sliderVals = sliders.map((cur, index) => $(`#${cur}`).val())
       //console.log(sliderVals)


      //chart.data.datasets[0].data
      o2data = Math.min(100,Math.max(0, o2data + o2formula(...sliderVals)))


      day = day + 1
      label = 'Day '+day
      if(!openED){
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(o2data);
      }
      );
      chart.update();}


      if(o2data%100 == 0 && !openED) {
        openED = true
        $( "#question" ).dialog({
            height: 400,
            width: 350,
            modal: true,
            buttons: {
              "submit": function() {
                answers.addAnswer('submit');
                $(this).dialog( "close" );
              },
              Cancel: function() {
                answers.addAnswer('cancel');
                $(this).dialog( "close" );
              }
            }
          });


      }




    }, 2000);

  var labels = Array.apply(null, {
    length: 3
  }).map((cur, index) => {
    return `Day ${index+1}`

  })
    var ctx = document.getElementById('myChart').getContext('2d');


  var img = new Image();
  img.src = 'img/resized.png';
  img.onerror=function(){alert('No network connection or image is not available.')}
  img.onload = function() {
    var fillPattern = ctx.createPattern(img, 'repeat');

 chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Percent',
        borderColor: 'rgb(0, 0, 0)',
        data: [75, 75, 75],
         backgroundColor: fillPattern,
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




}

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

function drawGrid(type, amount) { console.log(type)
var el= $(`#${type}Grid`);
//ar gridItem =

el.html("")
while(amount--){
console.log("f")

  $(`#${type}Grid`).append($(
      "<div/>",{class:"type"}
    ))}







}

function o2formula(plant, animal) {
  return 0.21 * plant - 0.35 * animal;
}


class Answers {
  constructor() {
    this.answers=[];

  }
  addAnswer(answer){
postLTI(ses)
this.answers.push(answer)

}

sendAnswer()
  {

   //  $.post( "save.php",  {data:this.answers} )
   // .done(function( data ) {
   //   alert( "Data Loaded: " + data );
   // });

  }
}


// $.post("save.php",{    } function(data, status){
//
// }).done(function( data ) {
// alert( "Data Loaded: " + data );
// });;
//function o2Level(animal, plant, initial = 0, range = 3) {
//  var o2Array = []
//  var prev = initial;
//for (i = 0; i < range; i++) {
//var prev = prev - 0.56 * animal + 0.21 * plant;
//o2Array.push(Math.max(0, prev))
//}
//return o2Array;
//}

// function changeData(chart, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }
