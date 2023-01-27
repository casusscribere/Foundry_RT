let font;
function preload() {
  font = loadFont("font.ttf");
}

labels = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

moonlabels = ["a", "b", "c"];

names = [
  "Hel",
  "Ceres",
  "Hecate",
  "Marjing",
  "Iris",
  "Sanamahi",
  "Juno",
  "Tenjin",
  "Gama",
  "Atar",
];

stationnames = [
  "Talos",
  "Traveler",
  "Illiac",
  "Tereshkova",
  "Kerimov",
  "Hope",
  "Sundancer",
  "Starlight",
  
]

planets = [
  //   {
  //     rad: 0.6,
  //     startingAngle: 45,
  //     rotationSpeed: -0.2,
  //     size: 20,
  //     highlight: false,
  //     isplanet:true,
  //     name: "Angel II",
  //     type: "Gas Giant",
  //   },
  //   {
  //     rad: 0.3,
  //     startingAngle: 45,
  //     rotationSpeed: 1,
  //     size: 5,
  //     highlight: false,
  //     isplanet:true,
  //     name: "Angel III",
  //     type: "Terrestrial",
  //   }
];

var highlightStar = false;

var systemName;

var planetTypes = [
  "Terrestrial",
  "Gas Giant",
  "Gas Dwarf",
  "Mesoplanet",
]

function setup() {
  createCanvas(600, 600);

  angleMode(DEGREES);

  textFont(font);

  systemName = random(names);

  planetCount = 0;
  beltCount = 0;

  var base_r = 0.9;

  star.index = floor(random(8));
  star.size = 20 + star.index * 15 + random(star.index * 5);
  star.name = systemName;

  while (base_r > (star.size + 30) / width) {
    var t = random([0, 0, 0, 1, 2]);
    if (t == 0) {
      //planet
      let planet = {
        rad: base_r,
        startingAngle: random(360),
        rotationSpeed: random(2) - 1,
        size: random(35) + 10,
        highlight: false,
        isplanet: true,
        name: systemName + " " + labels[planetCount],
        type: random(planetTypes),
        hasMoon: false,
      };
      if(abs(planet.rotationSpeed) < 0.05){
        planet.rotationSpeed = random([-1,1]) * 0.05
      }
      if(planet.size < 15 && random() < 0.5){
        planet.type = "Dwarf Planet"
      }
      if(base_r < 0.35 && random() < 0.25){
        planet.type = "Cthonian"
      }
      if (random() < 0.25) {
        planet.hasMoon = true;
        planet.moon = {
          size: 4 + random(4),
          spd: 0.5 + random(4),
          orbit: 4 + random(4),
          name: planet.name+"-I"
        };
      }
      planetCount++;
      planets.push(planet);
    }
    else if(t == 1){
      //planet
      let planet = {
        rad: base_r,
        startingAngle: random(360),
        rotationSpeed: random(1),
        size: 4 + random(3),
        highlight: false,
        isplanet: true,
        isstation:true,
        name: random(stationnames),
        type: "Artificial Satellite",
      };
      if(random() < 0.5){
        planet.name += " Station"
      }
      planetCount++;
      planets.push(planet);
    }
    else {
      //asteroids
      let belt = {
        isplanet: false,
        isbelt: true,
        rad: base_r,
        thickness: 0.03 + random(0.06),
        beltStart: 0,
        beltEnd: 360,
        beltDensity: random(1) + 0.5,
        asteroids: [],
        highlight: false,
        name: systemName + "-" + moonlabels[beltCount],
        type: "Asteroid Belt",
      };
      if (random() < 0.3) {
        belt.beltStart = random(360);
        belt.beltEnd = random(360);
        if (belt.beltStart > belt.beltEnd) {
          var tmp = belt.beltEnd;
          belt.beltEnd = belt.beltStart;
          belt.beltStart = tmp;
        }
        for (let i = belt.beltStart; i < belt.beltEnd; i += belt.beltDensity) {
          let r = (belt.rad * width) / 2 + (random(belt.thickness) * width) / 2;
          belt.asteroids.push({
            theta: i,
            radius: r,
            size: random(2) + 1,
            spd: 0.015,
          });
        }
      } else {
        for (let i = belt.beltStart; i < belt.beltEnd; i += belt.beltDensity) {
          let r = (belt.rad * width) / 2 + (random(belt.thickness) * width) / 2;
          belt.asteroids.push({
            theta: i,
            radius: r,
            size: random(2.5) + 1,
            spd: random(0.025) + 0.005,
          });
        }
      }

      beltCount++;

      planets.push(belt);
    }
    base_r -= 0.12 + random(0.25);
  }
}

star = {
  size: 60,
  index: 2,
  name: "Sol",
};

var startypes = [
  "Red Dwarf",
  "Subdwarf",
  "Main-Sequence Star",
  "Subgiant",
  "Giant",
  "Bright Giant",
  "Supergiant",
  "Hypergiant",
];

var starclasses = ["VII", "VI", "V", "IV", "III", "II", "I", "0"];

var starcolors = [
  "#ae2334",
  "#fb6b1d",
  "#f9c22b",
  "#fbff86",
  "#d5e04b",
  "#8ff8e2",
  "#8fd3ff",
  "#4d9be6",
];

//from: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  noFill()
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function draw() {
  background(25);

  fill(starcolors[star.index]);
  if (highlightStar) {
    strokeWeight(4);
    stroke(255, 255, 255, 85);
  } else {
    strokeWeight(1);
    stroke(255, 255, 255, 0);
  }
  ellipse(width / 2, height / 2, star.size);

  noFill();
  stroke(255, 255, 255, 85);

  planets.forEach(function (planet) {
    if (planet.highlight) {
      textSize(20);
      text(planet.name + "\n" + planet.type, 20, height - 60);
    }

    if (!planet.isplanet) {
      planet.asteroids.forEach(function (asteroid) {
        push();
        translate(width / 2, height / 2);
        rotate(asteroid.theta + asteroid.spd * frameCount);
        translate(asteroid.radius, 0);
        strokeWeight(1);
        if (planet.highlight) fill(255, 255, 255, 150);
        ellipse(0, 0, asteroid.size);
        strokeWeight(1);
        noFill();
        pop();
      });
      return;
    }
    let rot = planet.startingAngle + frameCount * planet.rotationSpeed;
    let radius = (planet.rad * width) / 2;
    let x = width / 2 + radius * cos(rot);
    let y = height / 2 + radius * sin(rot);

    var circumference = 2 * PI * radius;
    var planetGap = (planet.size + 15) / circumference;
    if (planet.moon) {
      planetGap =
        (planet.size + 15 + planet.moon.size * 2 + planet.moon.orbit * 2) /
        circumference;
    }
    var arcShare = planetGap * 360;

    push();
    translate(width / 2, height / 2);
    rotate(rot);
    strokeWeight(0.5);
    if (planet.highlight) strokeWeight(4);
    arc(0, 0, radius * 2, radius * 2, arcShare / 2, 360 - arcShare / 2);
    translate(radius, 0);
    strokeWeight(1);
    if (planet.highlight) strokeWeight(4);
    fill(255, 255, 255, 85);
    if(planet.isstation){
      var ps = planet.size
      triangle(-ps/2,-ps/2, ps/2,-ps/2,0,ps/2)
    }
    else{
      ellipse(0, 0, planet.size);  
    }
    
    noFill(0);
    strokeWeight(1);
    if (planet.moon) {
      rotate(planet.moon.spd * frameCount);
      translate(planet.moon.size / 2 + planet.size / 2 + planet.moon.orbit, 0);

      ellipse(0, 0, planet.moon.size);
    }
    pop();
  });

  if (highlightStar) {
    strokeWeight(1);
    textSize(20);
    text(
      star.name +
        "\n" +
        startypes[star.index] +
        " (" +
        starclasses[star.index] +
        ")",
      20,
      height - 60
    );
  }
  
  if(mouseIsPressed){
    fill(25, 25, 25, 255*lerp(0, 1, coverAlpha/1));
    coverAlpha += deltaTime * 0.002;
    rect(0, 0, width, height);
    if(coverAlpha >= 1){
      coverAlpha = 0
      mouseIsPressed = false
      fading = true
      fadingIn = 1
      planets = []
      setup()
    }
  }
  if(fading){
    fill(25, 25, 25, 255*lerp(0, 1, fadingIn/1));
    fadingIn -= deltaTime * 0.004;
    rect(0, 0, width, height);
    if(fadingIn <= 0){
      fading = false
      canReset = true
    }
  }
}

var mouseIsPressed = false;
var coverAlpha = 0

var fadingIn = 0
var fading = false
var canReset = true

function mousePressed() {
  if(canReset){
    mouseIsPressed = true;
  }
}

function mouseReleased(){
  mouseIsPressed = false;
  coverAlpha = 0
}


function mouseMoved() {
  var dx = abs(mouseX - width / 2);
  var dy = abs(mouseY - height / 2);

  planets.forEach(function (planet) {
    // print(sqrt(dx*dx + dy*dy))
    if (abs(sqrt(dx * dx + dy * dy) - (planet.rad * width) / 2) < 20) {
      planet.highlight = true;
    } else {
      planet.highlight = false;
    }
  });

  if (abs(sqrt(dx * dx + dy * dy)) < star.size / 2) {
    highlightStar = true;
  } else {
    highlightStar = false;
  }
}
