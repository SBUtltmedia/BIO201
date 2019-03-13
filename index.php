<html>

<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script
  src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"
  integrity="sha256-0YPKAwZP7Mp3ALMRVB2i8GXeEndvCq3eSl/WsAl1Ryk="
  crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.js"></script>
  <script src="js/script.js"></script>


  <?php
print"<script>var ses;</script>";
if(array_key_exists("lis_person_name_given", $_POST)){
  $JSON_POST=json_encode($_POST);
  print<<<EOT
  <script src="/vq/vqPlayer/js/grading.js"></script>
  <script>
  ses=$JSON_POST;
  </script>
EOT;
  }
  else{
  print_r("<!---not found $_POST----->");

  }


  ?>

  <script>
  function postLTI(ses){
ses.grade=.25;
  var dfd = jQuery.Deferred();
  $.post( "/LTI/postLTI.php", {data:ses} ).done(function(result){

  dfd.resolve(result)


  });
   return dfd.promise();

  }
</script>



<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <title>Example</title>

  <style>
    .slidecontainer {
      width: 100%;
    }
#question{display:none;}
#sliders >div,#sliders >.row{width:40%;}

    /* canvas {
   background-image: url(img/Co2.png);
    } */.row,#sliders{flex-direction:row;display: flex;width:100%; }
#sliders{ justify-content: space-around;}
.type{width:10%;height:4%;background-repeat:no-repeat;}
    #plantGrid .type{background-image:url(img/plant.svg);}
    #animalGrid .type{background-image:url(img/animal.svg);}
    .slider {
      float: left;
      -webkit-appearance: none;
      width: 100%;
      height: 15px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
      position:relative;
       top:0;
       right:0;
    }
  </style>
</head>

<body>

  <center><h1>Simulation</center>
  <br>
  <br>


<div id='chart' style="margin-right: 100px;
  margin-left: 100px;">
  <canvas id="myChart" width='400' height='180'></canvas>
</div><br>
<div id = 'sliders'>
<div>
  <label>Plant</label>
  <input class="slider" type='range' id='plant' name='animal' min="0" max="100" value="0">
  <br style = 'clear:both'/>
  <div class='row' id="plantGrid"></div>

</div>


<div>
  <label>Animal</label>

  <input class="slider" type='range' id='animal' name='animal' min="0" max="100" value="0">

    <br style = 'clear:both'/>

  <div class='row' id="animalGrid"></div>
</div>
</div>
<div id = 'question'><label for="name">Why is it 0?</label>

      <input type="text" name="question" id="question" class="text ui-widget-content ui-corner-all">

      <!-- Allow form submission with keyboard without duplicating the dialog button -->
      <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
</div>


</body>

</html>
