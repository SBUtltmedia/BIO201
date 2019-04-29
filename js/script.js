$(function() {
  var answers = new Answers();

  var openED = false
  var time = 0

  var chart;
  var chart2;

  var error = 5

  var ratslopeO2 = (-278 / 60)
  var ratslopeCO2 = (253 / 60)
  var plantslopeCO2 = (-113.5 / 60)
  var plantslopeO2 = 91.5 / 60
  var startplantmass = 10
  var startratmass = 253
  var tanksize = 100000
  var pCO2 = 0.000407
  var pO2 = 0.20946
  var curCO2 = pCO2
  var curO2 = pO2

 var species={plant:1,animal:0}
 $('#plant').val(species.plant)
  var sliders = ['plant', 'animal']

  var handle = $("#custom-handle");
  $("#slider").slider({
    min: 100,
    max: 10000,
    value: 2,
    create: function() {
      handle.text($(this).slider("value"));
    },
    slide:function(event, ui) {
      handle.text(ui.value + 'L');
    },
    change: function(event, ui) {

      tanksize = ui.value * 1000

      updateGraph()
    }

  });


  function updateGraph(adding = 10){
   // var sliderVal= $("#slider").val()
   //  var handle = $("#custom-handle");
   // handle.text(sliderVal + 'L');
   //
   // tanksize =sliderVal
     time = 0
     var plantO2 = calc(time,tanksize*pO2, species, {slope1:plantslopeO2},100,adding)
     var aniO2 = calc(time,tanksize*pO2, species, {slope2:ratslopeO2},100,adding)
     var plantCO2 = calc(time,tanksize*pCO2, species, {slope1:plantslopeCO2},100,adding)
     var aniCO2 = calc(time,tanksize*pCO2, species, {slope2:ratslopeCO2},100,adding)
     var combineO2 = calc(time,tanksize*pO2, species, {slope1:plantslopeO2,slope2:ratslopeO2},100,adding)
     var combineCO2 = calc(time,tanksize*pCO2,species, {slope1:plantslopeCO2,slope2:ratslopeCO2},100,adding)

     var ctx = document.getElementById('myChartO2').getContext('2d');

if(chart){
  chart.destroy();
}

       chart = new Chart(ctx , {
         type: 'line',
         data: {
           labels: aniO2['time'],
           datasets: [{
             label: 'Rats',
             fill: false,
             backgroundColor: "rgb(255, 0, 0)",
             borderColor: "rgb(255, 0, 0)",
             data: aniO2['value']
           }, {
             label: 'Plants',
             fill: false,
             backgroundColor: "rgb(0, 255, 0)",
             borderColor: "rgb(0, 255, 0)",
             data: plantO2['value'],
           }, {
             label: 'Net',
             fill: false,
             backgroundColor: "rgb(0, 0, 255)",
             borderColor: "rgb(0, 0, 255)",
             data: combineO2['value'],
           }]
       }, options: {
         tooltips: {enabled: false},
hover: {mode: null},
           title: {
               display: true,
               text: 'O2 Concentration in Ml'
           }
       }});
       console.log('ratsO2',aniO2['value'])
       console.log('plantO2',plantO2['value'])
       curO2 = combineO2['value'][9]
     var ctx2 = document.getElementById('myChartCO2').getContext('2d');


if(chart2) {
  chart2.destroy()
}
       chart2 = new Chart(ctx2, {
         type: 'line',
         data: {
           labels: aniCO2['time'],
           datasets: [{
             label: 'Rats',
             fill: false,
             backgroundColor: "rgb(255, 0, 0)",
             borderColor: "rgb(255, 0, 0)",
             data: aniCO2['value']
           }, {
             label: 'Plants',
             fill: false,
             backgroundColor: "rgb(0, 255, 0)",
             borderColor: "rgb(0, 255, 0)",
             data: plantCO2['value'],
           }, {
             label: 'Net',
             fill: false,
             backgroundColor: "rgb(0, 0, 255)",
             borderColor: "rgb(0, 0, 255)",
             data: combineCO2['value'],
           }]
       }, options: {
         tooltips: {enabled: false},
hover: {mode: null},
           title: {
               display: true,
               text: 'CO2 Concentration in Ml'
           }
       }});
       console.log('ratsCO2',aniCO2['value'])
       console.log('plantCO2',plantCO2['value'])
       curCO2 = combineO2['value'][2]

   //
   //
   //   chart = new Chart(ctx , {
   //     type: 'line',
   //     data: {
   //       labels: aniO2[0],
   //       datasets: [{
   //         label: 'Rats',
   //         fill: false,
   //         backgroundColor: "rgb(255, 0, 0)",
   //         borderColor: "rgb(255, 0, 0)",
   //         data: aniO2[1]
   //       }, {
   //         label: 'Plants',
   //         fill: false,
   //         backgroundColor: "rgb(0, 255, 0)",
   //         borderColor: "rgb(0, 255, 0)",
   //         data: plantO2[1],
   //       }, {
   //         label: 'Net',
   //         fill: false,
   //         backgroundColor: "rgb(0, 0, 255)",
   //         borderColor: "rgb(0, 0, 255)",
   //         data: combineO2[1],
   //       }]
   //   }, options: {
   //       title: {
   //           display: true,
   //           text: 'O2 Concentration in Ml'
   //       }
   //   }});
   //   curCO2 = combineO2[1][2]
   // var ctx2 = document.getElementById('myChartCO2').getContext('2d');
   //
   //
   //
   //   chart2 = new Chart(ctx2, {
   //     type: 'line',
   //     data: {
   //       labels: aniCO2[0],
   //       datasets: [{
   //         label: 'Rats',
   //         fill: false,
   //         backgroundColor: "rgb(255, 0, 0)",
   //         borderColor: "rgb(255, 0, 0)",
   //         data: aniCO2[1]
   //       }, {
   //         label: 'Plants',
   //         fill: false,
   //         backgroundColor: "rgb(0, 255, 0)",
   //         borderColor: "rgb(0, 255, 0)",
   //         data: plantCO2[1],
   //       }, {
   //         label: 'Net',
   //         fill: false,
   //         backgroundColor: "rgb(0, 0, 255)",
   //         borderColor: "rgb(0, 0, 255)",
   //         data: combineCO2[1],
   //       }]
   //   }, options: {
   //       title: {
   //           display: true,
   //           text: 'CO2 Concentration in Ml'
   //       }
   //   }});



 }











//
//
//
//   setInterval(function(evt) {
//     time = time + 300
// //     var sliderVals = sliders.map((cur, index) => $(`#${cur}`).val())
// //     //console.log(sliderVals)
// //     var plantO2 = formula(tanksize*curO2,plant, plantslopeO2, time,100,error,2)
// //     var aniO2 = formula(tanksize*curO2,animal, ratslopeO2,time,100,error, 2)
// //     var plantCO2 = formula(tanksize*curCO2,plant, plantslopeCO2,time, 100, error,2)
// //     var aniCO2 = formula(tanksize*curCO2,ratslopeCO2, time, 100, error, 2)
// //     var combineO2 = coformula(tanksize*curO2,animal, ratslopeO2, plant, plantslopeO2,time, 100,error,2)
// //     var combineCO2 = coformula(tanksize*curCO2,animal, ratslopeCO2, plant, plantslopeCO2, time, 100,error,2)
// // console.log(chart.data.datasets[0]['data'])
//     // chart.data.datasets[0]['data'].concat(aniO2[1])
//     //
//     // chart.data.datasets[1]['data'].concat(plantO2[1])
//     // chart.data.datasets[2]['data'].concat(combineO2[1]);
//     // chart.data.labels.concat(['0'],[0],['abc']);
//     // chart.update();
//     // chart2.data.datasets[0]['data'].concat(aniO2[1])
//     //
//     // chart2.data.datasets[1]['data'].concat(plantO2[1])
//     // chart2.data.datasets[2]['data'].concat(combineO2[1]);
//   updateGraph(time/100+3)
//
//
//
//
//     if (2 == 3 && o2data % 100 == 0 && !openED) {
//       openED = true
//       $("#question").dialog({
//         height: 400,
//         width: 350,
//         modal: true,
//         buttons: {
//           "submit": function() {
//             answers.addAnswer('submit');
//             $(this).dialog("close");
//           },
//           Cancel: function() {
//             answers.addAnswer('cancel');
//             $(this).dialog("close");
//           }
//         }
//       });
//
//
//     }
//
//
//
//
//   }, 3000);





    $('.slider').off().on('change', function(evt) {
      console.log('activtied')
    //  var current =evt.currentTarget.id
      var sliderVals = sliders.map((cur, index) => {
  time = 0
      var value=  $(`#${cur}`).val()
  drawGrid(cur, Math.floor(value))




        species[cur] = Math.floor(value)
        // if(  species[cur] < 10 ||   species['cur']== 0) {
        //   species[cur]++
        // }

  })
 updateGraph()

//   var [plantO2,aniO2, plantCO2,aniCO2 ,combineO2 ,combineCO2] = superCalc()
//
//
//
// function superCalc(){
//    return[
//   calc(time,tanksize*pO2, {plant:plant}, {slope1:plantslopeO2},100,3),
//    calc(time,tanksize*pO2, {animal:animal}, {slope2:ratslopeO2},100,3),
// calc(time,tanksize*pCO2, {plant:plant}, {slope1:plantslopeCO2},100,3),
//   calc(time,tanksize*pCO2, {animal:animal}, {slope2:ratslopeCO2},100,3),
// calc(time,tanksize*pO2, {animal:animal,plant:plant}, {slope1:plantslopeO2,slope2:ratslopeO2},100,3),
// calc(time,tanksize*pCO2, {animal:animal,plant:plant}, {slope1:plantslopeCO2,slope2:ratslopeCO2},100,3)]
// }
//
//   var ctx = document.getElementById('myChartO2').getContext('2d');
//
//
//
//     chart = new Chart(ctx , {
//       type: 'line',
//       data: {
//         labels: aniO2['time'],
//         datasets: [
//           {
//           label: 'Rats',
//           fill: false,
//           backgroundColor: "rgb(255, 0, 0)",
//           borderColor: "rgb(255, 0, 0)",
//           data: aniO2['value']
//         },
//         {
//           label: 'Plants',
//           fill: false,
//           backgroundColor: "rgb(0, 255, 0)",
//           borderColor: "rgb(0, 255, 0)",
//           data: plantO2['value'],
//         },
//         {
//           label: 'Net',
//           fill: false,
//           backgroundColor: "rgb(0, 0, 255)",
//           borderColor: "rgb(0, 0, 255)",
//           data: combineO2['value'],
//         }
//       ]
//     }, options: {
//         title: {
//             display: true,
//             text: 'O2 Concentration in Ml'
//         }
//     }});
//     curO2 = combineO2['value'][2]
//
//   var ctx2 = document.getElementById('myChartCO2').getContext('2d');
//
//
//
//     chart2 = new Chart(ctx2, {
//       type: 'line',
// 			data: {
// 				labels: aniCO2['time'],
// 				datasets: [
//           {
// 					label: 'Rats',
// 					fill: false,
// 					backgroundColor: "rgb(255, 0, 0)",
// 					borderColor: "rgb(255, 0, 0)",
// 					data: aniCO2['value']
// 				},
//         {
// 					label: 'Plants',
// 					fill: false,
// 					backgroundColor: "rgb(0, 255, 0)",
// 					borderColor: "rgb(0, 255, 0)",
// 					data: plantCO2['value'],
// 				}, {
// 					label: 'Net',
// 					fill: false,
// 					backgroundColor: "rgb(0, 0, 255)",
// 					borderColor: "rgb(0, 0, 255)",
// 					data: combineCO2['value'],
// 				}]
//     }, options: {
//         title: {
//             display: true,
//             text: 'CO2 Concentration in Ml'
//         }
//     }});
//     curCO2 = combineO2['value'][2]
  // console.log("fd")



  }).trigger('change')










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


// function formula(start, {animal=0,plant=0}, {slope1 = 0,slope2 = 0}, time, step, error, adding,calc) {
//   var timeX = [];
//
//   var conY = [];
//   while(adding >= 0) {
//  timeX.push(time)
//
//   value = start + time*slope1*animal + time*slope2*plant
//   // /+ error*Math.abs(slope1)*Math.floor(Math.random() * time)
//
//    conY.push(value);
//    adding = adding - 1;
//    time = time + step
//
//    }
//
//    return [timeX, conY]
// }

function calc(time,start,species,{slope1 = 0,slope2 = 0},step,adding){

  var timeX = [];

  var conY = [];
  while(adding+1) {
 timeX.push(time)

  value = start + time*slope2*species.animal + time*slope1*species.plant

   conY.push(value);
   adding --;
   time +=step

   }

   return {time:timeX, value:conY}

}


//
// function formula(start, obj, slope1, time, step, error, adding) {
//   var timeX = [];
//   var conY = [];
//
//   while(adding >= 0) {
// timeX.push(time)
//
//    value = start + time*slope1*obj
//    //+ error*Math.abs(slope1)*Math.floor(Math.random() * time)
//
//    conY.push(value);
//    adding = adding - 1;
//    time = time + step
//
//    }
//
//    return [timeX, conY]
// }


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
