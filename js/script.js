$(function() {
  var answers = new Answers();

  var openED = false
  var time = 3
  var o2data = 75;
  var chart;
  var chart2;
  var day = 3
  var error = 5

  var ratslopeO2 = -278 / 60
  var ratslopeCO2 = 253 / 60
  var plantslopeCO2 = -113.5 / 60
  var plantslopeO2 = 91.5 / 60
  var startplantmass = 10
  var startratmass = 253
  var tanksize = 100
  var pCO2 = 0.000407
  var pO2 = 0.20946

  var sliders = ['plant', 'animal']

  var handle = $("#custom-handle");
  $("#slider").slider({
    min: 100,
    max: 10000,
    value: 2,
    create: function() {
      handle.text($(this).slider("value"));
    },
    slide: function(event, ui) {
      handle.text(ui.value + 'L');
      time = 3;
      var x = ['1min', '2min', '3min'];
      var o2 = [1000, 2000, 3000];
      var co2 = [5000, 6000, 7000]
      chart2.data.datasets[0].data = co2;
      chart2.data.labels = x;

      chart2.update();


      chart.data.datasets[0].data = o2;
      chart.data.labels = x;

      chart.update();
    }

  });






  $('.slider').off().on('change', function(evt) {
  //  var current =evt.currentTarget.id
    var sliderVals = sliders.map((cur, index) => {

    var value=  $(`#${cur}`).val()
drawGrid(cur, Math.floor(value/10))

})
//     //console.log(sliderVals)
//
//     var x = ['1min', '2min', '3min'];
//     var o2 = [1000, 2000, 3000];
//     var co2 = [5000, 6000, 7000]
//     chart2.data.datasets[0].data = co2;
//     chart2.data.labels = x;
//     time = 3;
//     chart2.update();
//
//
//     chart.data.datasets[0].data = o2;
//     chart.data.labels = x;
//
//     chart.update();
// console.log("fd")



}).trigger('change')







  setInterval(function(evt) {
    var sliderVals = sliders.map((cur, index) => $(`#${cur}`).val())
    //console.log(sliderVals)


    // //chart.data.datasets[0].data
    // o2data = Math.min(100, Math.max(0, o2data + o2formula(...sliderVals)))
    // co2data = 7000 - o2data
    //
    // day = day + 1
    // label = day + " min"
    // if (!openED) {
    //   chart.data.labels.push(label);
    //   chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(o2data);
    //   });
    //   chart.update();
    // }



    // if (!openED) {
    //   chart2.data.datasets.forEach((dataset) => {
    //     dataset.data.push(co2data);
    //   });
    //   chart2.update();
    // }

    if (2 == 3 && o2data % 100 == 0 && !openED) {
      openED = true
      $("#question").dialog({
        height: 400,
        width: 350,
        modal: true,
        buttons: {
          "submit": function() {
            answers.addAnswer('submit');
            $(this).dialog("close");
          },
          Cancel: function() {
            answers.addAnswer('cancel');
            $(this).dialog("close");
          }
        }
      });


    }




  }, 3000);

  var labels = Array.apply(null, {
    length: 3
  }).map((cur, index) => {
    return `${index+1} min`

  })
  var ctx = document.getElementById('myChartO2').getContext('2d');





  var initPlantO2 = formula(tanksize*pO2,0,100,error,3)
  var initaniO2 = formula(tanksize*pO2,0,100,error, 3)
  var initPlantCO2 = formula(tanksize*pCO2,0,100, error,3)
  var initaniCO2 = formula(tanksize*pCO2,0,100, error, 3)
  var combineO2 = formula(tanksize*pO2,0,100,error,3)
  var combineCO2 = formula(tanksize*pCO2,0,100,error,3)

  var ctx = document.getElementById('myChartO2').getContext('2d');



    chart = new Chart(ctx , {
      type: 'line',
      data: {
        labels: initaniO2[0],
        datasets: [{
          label: 'Rats',
          fill: false,
          backgroundColor: "rgb(255, 0, 0)",
          borderColor: "rgb(255, 0, 0)",
          data: initaniO2[1]
        }, {
          label: 'Plants',
          fill: false,
          backgroundColor: "rgb(0, 255, 0)",
          borderColor: "rgb(0, 255, 0)",
          data: initPlantO2[1],
        }, {
          label: 'Net',
          fill: false,
          backgroundColor: "rgb(0, 0, 255)",
          borderColor: "rgb(0, 0, 255)",
          data: combineO2[1],
        }]
    }});
  var ctx2 = document.getElementById('myChartCO2').getContext('2d');



    chart2 = new Chart(ctx2, {
      type: 'line',
			data: {
				labels: initaniCO2[0],
				datasets: [{
					label: 'Rats',
					fill: false,
					backgroundColor: "rgb(255, 0, 0)",
					borderColor: "rgb(255, 0, 0)",
					data: initaniCO2[1]
				}, {
					label: 'Plants',
					fill: false,
					backgroundColor: "rgb(0, 255, 0)",
					borderColor: "rgb(0, 255, 0)",
					data: initPlantCO2[1],
				}, {
					label: 'Net',
					fill: false,
					backgroundColor: "rgb(0, 0, 255)",
					borderColor: "rgb(0, 0, 255)",
					data: combineCO2[1],
				}]
    }});










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
var el= $(`#${type}Grid`);
//ar gridItem =
if(amount < 10) {
amount++
}
el.html("")
while(amount--){
console.log("f")

  $(`#${type}Grid`).append($(
      "<div/>",{class:"type"}
    ))}
}








function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function o2formula(plant, animal) {
  return 0.21 * plant - 0.35 * animal;
}

function formula(start, slope1, time, error, adding) {
  var timeX = [];
  var conY = [];
  while(adding >= 0) {
  time = time + 60
   value = start + time*slope1 + error*Math.abs(slope1)*Math.floor(Math.random() * time)
   timeX.push(time);
   conY.push(value);
   adding = adding - 1;
   }

   return [timeX, conY]
}


class Answers {
  constructor() {
    this.answers = [];

  }
  addAnswer(answer) {
    postLTI(ses)
    this.answers.push(answer)

  }

  sendAnswer() {

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
