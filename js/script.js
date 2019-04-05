$(function() {
var answers = new Answers();

var openED = false


var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
      min: 0,
      max: 10000,
      value: 2,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value + 'L');
      }
    });


  var day = 3
  var o2data = 75;
  var chart;
  var chart2;
  console.log($('.slider'))
  var sliders = ['plant','animal']

  $('.slider').on('change', function(evt) {

    var sliderVals = sliders.map((cur, index) => $(`#${cur}`).val())
     //console.log(sliderVals)
     var x = ['1min','2min','3min'];
     var o2 = [1000,2000,3000];
     var co2 = [5000,6000,7000]
 chart2.data.datasets[0].data = co2;
 chart2.data.labels = x;

 chart2.update();


 chart.data.datasets[0].data = o2;
 chart.data.labels = x;

 chart.update();




//drawGrid(current, parseInt(sliderVals[sliders.indexOf(current)/10]))
})







  setInterval(function(evt){     var sliderVals = sliders.map((cur, index) => $(`#${cur}`).val())
       //console.log(sliderVals)


      //chart.data.datasets[0].data
      o2data = Math.min(100,Math.max(0, o2data + o2formula(...sliderVals)))
      co2data = 7000 - o2data

      day = day + 1
      label = day + " min"
      if(!openED){
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(o2data);
      }
      );
      chart.update();}



      if(!openED) {
      chart2.data.datasets.forEach((dataset) => {
        dataset.data.push(co2data);
      });
      chart2.update();
       }

      if(2==3 && o2data%100 == 0 && !openED) {
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




    }, 4000);

  var labels = Array.apply(null, {
    length: 3
  }).map((cur, index) => {
    return `${index+1} min`

  })
    var ctx = document.getElementById('myChartO2').getContext('2d');


  var img = new Image();
  img.src = 'img/resized.png';
  img.onerror=function(){alert('No network connection or image is not available.')}
  img.onload = function() {
    var fillPattern = ctx.createPattern(img, 'repeat');

 chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Concentrition',
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




var ctx2 = document.getElementById('myChartCO2').getContext('2d');


var img2 = new Image();
img2.src = 'img/resize_rat.jpeg';
img2.onerror=function(){alert('No network connection or image is not available.')}
img2.onload = function() {
var fillPattern = ctx2.createPattern(img2, 'repeat');

chart2 = new Chart(ctx2, {
type: 'line',
data: {
  datasets: [{
    label: 'Concentrition',
    borderColor: 'rgb(0, 0, 0)',
    data: [6005, 8750, 7509],
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

// function drawGrid(type, amount) { console.log(type)
// var el= $(`#${type}Grid`);
// //ar gridItem =
//
// el.html("")
// while(amount--){
// console.log("f")
//
//   $(`#${type}Grid`).append($(
//       "<div/>",{class:"type"}
//     ))}
// }


function drawGrid(type, amount) { console.log(type)
var el= $(`#${type}Bar`);
//ar gridItem =

el.css({width:`${amount*10}%`})




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
