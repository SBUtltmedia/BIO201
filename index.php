<html>

<head>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
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

 <link rel="stylesheet" type="text/css" href="index.css">
</head>

<body>

  <center><h1>Balance a mesocosm</center>

<p style = 'margin-left:75px;margin-right:15px'>  A mesocosm is a small version of an ecosystem that scientists use to study interactions among organisms.Now that we know about processes like photosynthesis and respiration, we know that plants and animals influence the amounts of carbon dioxide and oxygen in the atmosphere. Design a mesocosm in a glass chamber with some combination of sunflower plants and rats so that both organisms can survive.</p>

<div id="outer">
    <h3 style = 'margin-bottom:0px'> Size of glass chamber in cubic liters </h3> <br>


    <div id="slider" style = 'margin-left:59px;margin-right:59px'>
        <div id="custom-handle" class="ui-slider-handle"></div>
    </div>





    </div>
</div>
<br>
<br>

  <div id='chartO2' style="margin-right: 100px;
    margin-left: 100px;">
    <canvas id="myChartO2" width='400' height='180'></canvas>
  </div><br>
<div id='chartCO2' style="margin-right: 100px;
  margin-left: 100px;">
  <canvas id="myChartCO2" width='400' height='180'></canvas>
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
