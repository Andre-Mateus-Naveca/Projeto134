song = "";
status1 = "";
objects = [];
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Bebês";
}
function preload()
{
    song = loadSound("myalarm.mp3");
}
function setup() {
    canvas = createCanvas(380, 380)
    canvas.center();
    video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function modelLoaded() {
    console.log("Modelo Carregado!")
    status1 = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {

    image(video, 0, 0, 380, 380);
    
      if (status1 != "") {
          r = random(255)
          g = random(255)
          b = random(255)
          objectDetector.detect(video, gotResults)
          for (var i = 0; i < objects.length; i++) {
              document.getElementById("status").innerHTML = "Status: Bebê Detectado";
  
              document.getElementById("numberOfObjects").innerHTML = "Quantidade de bebês detectados: " + objects.length;
              fill(r,g,b)
  
              percent = floor(objects[i].confidence * 100)
  
              text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
  
              noFill()
  
              stroke(r,g,b)
  
              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  
          }
      }
  }
//   function play() {
//     if(objects.length > 0){
// 	song.play();
// 	song.setVolume(1);
// 	song.rate(1);
//     document.getElementById("status").innerHTML = "Status: Bebê Não Detectado";
//     }
// }