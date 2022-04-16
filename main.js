//https://teachablemachine.withgoogle.com/models/Zvg4Sv_u2/
pre_1=""
pre_2=""

Webcam.set({
    width:350,
    height:300,
    image_format:'png'
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function snap()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Zvg4Sv_u2/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }

  function speak(){
    var synth = window.speechSynthesis;
    sdata_1 = "The first prediction is " + pre_1;
    sdata_2 = "And the second prediction is " + pre_2;
    var utterThis = new SpeechSynthesisUtterance(sdata_1 + sdata_2);
    synth.speak(utterThis);
  }

  function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResults);
  }

  function gotResults(error,results){
    if(error){
console.log(error);
    }
    else{
      console.log(results);
      pre_1=results[0].label;
      pre_2=results[1].label;
      speak()
      document.getElementById("emo_1").innerHTML=pre_1;
      document.getElementById("emo_2").innerHTML=pre_2;
      if(results[0].label=="happy"){
        document.getElementById("emoji_1").innerHTML="&#128512;"
      }
      else if(results[0].label=="angry"){
        document.getElementById("emoji_1").innerHTML="&#128545;"
      }
      else if(results[0].label=="sad"){
        document.getElementById("emoji_1").innerHTML="&#128532;"
      }

      if(results[1].label=="happy"){
        document.getElementById("emoji_2").innerHTML="&#128513;"
      }
      else if(results[1].label=="angry"){
        document.getElementById("emoji_2").innerHTML="&#128548;"
      }
      else if(results[1].label=="sad"){
        document.getElementById("emoji_2").innerHTML="&#128543;"
      }
    }


  }