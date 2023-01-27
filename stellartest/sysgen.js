let font;
function preload() {
  font = loadFont("font.ttf");
}

const sysFeatures = {
    'bountiful'     :{name:"Bountiful",desc:""},
    'gravitytides'  :{name:"Gravity Tides",desc:""},
    'haven'         :{name:"Haven",desc:""},
    'illomened'     :{name:"Ill-Omened",desc:""},
    'pirateden'     :{name:"Pirate Den",desc:""},
    'ruinedempire'  :{name:"Ruined Empire",desc:""},
    'starfarers'    :{name:"Starfarers",desc:""},
    'stellaranomaly':{name:"Stellar Anomaly",desc:""},
    'warpstasis'    :{name:"Warp Stasis",desc:""},
    'warpturbulence':{name:"Warp Turbulence",desc:""},
}

const starTypes = {
    'mighty'        :{name:"Mighty",       desc:"The fierce light of this star dominates its system utterly. Its coloration is likely to be blue or blue-white."},
    'vigorous'      :{name:"Vigorous",     desc:"A steady illumination burns forth from the heart of this star. Its coloration is likely to be a pure white."},
    'luminous'      :{name:"Luminous",     desc:"Though it is has been long aeons since this star has shone at its brightest, a constant glow nonetheless provides for the system. It is likely to be yellow or yellow-orange in colour."},
    'dull'          :{name:"Dull",         desc:"The end of the star’s life advances inexorably, although it can still burn for millennia yet. Many stars of this type are of a vast size, seemingly incongruous with their wan light. Its coloration is likely a sullen red."},
    'anomalous'     :{name:"Anomalous",    desc:"The star is an unnatural outlier, shedding a strange light that behaves in ways it should not. Its light can be of any colour, even one that is not typical for a star, from bilious green to barely-visible purple. "},
    'binary'        :{name:"Binary",       desc:"The system is lit by not by a single star, but two or even more stars. Most binary systems are lit by stars of the same type, but some sets seem to be less well matched."},
}

const sysElements = {
    'na'                :{name:"N/A",features:[],desc:""},
    'asteroidbelt'      :{name:"Asteroid Belt",features:[],desc:""},
    'asteroidcluster'   :{name:"Asteroid Cluster",features:[],desc:""},
    'derelictstation'   :{name:"Derelict Station",features:[],desc:""},
    'dustcloud'         :{name:"Dust Cloud",features:[],desc:""},
    'gasgiant'          :{name:"Gas Giant",features:[],desc:""},
    'gravityriptide'    :{name:"Gravity Riptide",features:[],desc:""},
    'planet'            :{name:"Planet",features:[],desc:""},
    'radiationbursts'   :{name:"Radiation Bursts",features:[],desc:""},
    'solarflares'       :{name:"Solar Flares",features:[],desc:""},
    'starshipgraveyard' :{name:"Starship Graveyard",features:[],desc:""},
}

const derelictStations = {
    'egarianvoidmaze'       :{name:"Egarian Void-Maze",desc:""},
    'eldarorrey'            :{name:"Eldar Orrey",desc:""},
    'eldargate'             :{name:"Eldar Gate",desc:""},
    'orkrok'                :{name:"Ork Rok",desc:""},
    'stcdefensestation'     :{name:"STC Defense Station",desc:""},
    'stcmonitorstation'     :{name:"STC Monitor Station",desc:""},
    'stryxiscollection'     :{name:"Stryxis Collection",desc:""},
    'xenosdefensestation'   :{name:"Xenos Defense Station",desc:""},
    'xenosmonitorstation'   :{name:"Xenos Monitor Station",desc:""},
}

const starshipGraveyard = {
    'crusheddefenseforce'   :{name:"Crushed Defense Force/Routed Invasion",desc:""},
    'fleetengagement'       :{name:"Fleet Engagement",desc:""},
    'lostexplorers'         :{name:"Lost Explorers",desc:""},
    'plunderedconvoy'       :{name:"Plundered Convoy",desc:""},
    'skirmish'              :{name:"Skirmish",desc:""},
    'unknownprovenance'     :{name:"Unknown Provenance",desc:""},
}

const planetBody = {
    'lowmass'           :{name:"Low-Mass",          size:10,desc:""},
    'small'             :{name:"Small",             size:10,desc:""},
    'smallanddense'     :{name:"Small and Dense",   size:10,desc:""},
    'large'             :{name:"Large",             size:20,desc:""},
    'largeanddense'     :{name:"Large and Dense",   size:20,desc:""},
    'vast'              :{name:"Vast",              size:30,desc:""},
    'gasdwarf'          :{name:"Gas Dwarf",         size:35,desc:""},
    'gasgiant'          :{name:"Gas Giant",         size:40,desc:""},
    'massivegasgiant'   :{name:"Massive Gas Giant", size:45,desc:""},
}

const gravity = {
    'lowgravity'    : {name:"Low Gravity"},
    'normalgravity' : {name:"Normal Gravity"},
    'highgravity'   : {name:"High Gravity"},
    'weak'          : {name:"Weak"},
    'strong'        : {name:"Strong"},
    'powerful'      : {name:"Powerful"},
    'titanic'       : {name:"Titanic"}
}

const orbitalFeatures = {
    'na'            : {name: "N/A"},
    'largeasteroid' : {name: "Large Asteroid"},
    'lessermoon'    : {name: "Lesser Moon"},
    'moon'          : {name: "Moon"},
    'ringsdebris'   : {name: "Planetary Rings(Debris)"},
    'ringsdust'     : {name: "Planetary Rings(Dust)"},
}

const atmosphericPresence = {
    'na'        : {name:"N/A"},
    'thin'      : {name:"Thin"},
    'moderate'  : {name:"Moderate"},
    'heavy'     : {name:"Heavy"},
}

const atmosphericComposition = {
    'deadly'    : {name:"Deadly"},
    'corrosive' : {name:"Corrosive"},
    'toxic'     : {name:"Toxic"},
    'tainted'   : {name:"Tainted"},
    'pure'      : {name:"Pure"}, 
}

const climate = {
    'burning'   : {name:"Burning World"},
    'hot'       : {name:"Hot World"},
    'temperate' : {name:"Temperate World"},
    'cold'      : {name:"Cold World"},
    'ice'       : {name:"Ice World"},
}

const habitability = {
    'inhospitable'  : {name:"Inhospitable"},
    'trappedwater'  : {name:"Trapped Water"},
    'liquidwater'   : {name:"Liquid Water"},
    'limitedeco'    : {name:"Limited Ecosystem"},
    'verdant'       : {name:"Verdant"},
}

function genSysfeatures(num10){
    switch(num10){
        case 1: return 'bountiful';
        case 2: return 'gravitytides';
        case 3: return 'haven';
        case 4: return 'illomened';
        case 5: return 'pirateden';
        case 6: return 'ruinedempire';
        case 7: return 'starfarers';
        case 8: return 'stellaranomaly';
        case 9: return 'warpstasis';
        case 10: return 'warpturbulence';
    }
    return 'ERROR';
}

function genStar(num10){
    let mystar = undefined;
    switch(num10){
        case 1: mystar = 'mighty'; break;
        case 2:
        case 3:
        case 4:
            mystar = 'vigorous'; break;
        case 5:
        case 6:
        case 7:
            mystar = 'luminous'; break;
        case 8: mystar = 'dull'; break;
        case 9: mystar = 'anomalous'; break;
        case 10: mystar = 'binary'; break;
    }
    return mystar;
}

function genSyselements(band,num100){
    let myelement = undefined;
    if(band==='inner'){
        switch(true){
            case inRange(num100,1,20): myelement = sysElements['na']; break;
            case inRange(num100,21,29): myelement = sysElements['asteroidcluster']; break;
            case inRange(num100,30,41): myelement = sysElements['dustcloud']; break;
            case inRange(num100,42,45): myelement = genPlanet("gasgiant"); break;
            case inRange(num100,46,56): myelement = sysElements['gravityriptide']; break;
            case inRange(num100,57,76): myelement = genPlanet("planet"); break;
            case inRange(num100,77,88): myelement = sysElements['radiationbursts']; break;
            case inRange(num100,89,100): myelement = sysElements['solarflares']; break;
        }
    } else if (band==='biosphere'){
        switch(true){
            case inRange(num100,1,20): myelement = sysElements['na']; break;
            case inRange(num100,21,30): myelement = sysElements['asteroidbelt']; break;
            case inRange(num100,31,41): myelement = sysElements['asteroidcluster']; break;
            case inRange(num100,42,47): myelement = sysElements['derelictstation']; break;
            case inRange(num100,48,58): myelement = sysElements['dustcloud']; break;
            case inRange(num100,59,64): myelement = sysElements['gravityriptide']; break;
            case inRange(num100,65,93): myelement = genPlanet("planet"); break;
            case inRange(num100,94,100): myelement = sysElements['starshipgraveyard']; break;
        }
    } else if (band==='outer'){
        switch(true){
            case inRange(num100,1,20): myelement = sysElements['na']; break;
            case inRange(num100,21,29): myelement = sysElements['asteroidbelt']; break;
            case inRange(num100,30,40): myelement = sysElements['asteroidcluster']; break;
            case inRange(num100,41,46): myelement = sysElements['derelictstation']; break;
            case inRange(num100,47,55): myelement = sysElements['dustcloud']; break;
            case inRange(num100,56,73): myelement = genPlanet("gasgiant"); break;
            case inRange(num100,74,80): myelement = sysElements['gravityriptide']; break;
            case inRange(num100,81,93): myelement = genPlanet("planet"); break;
            case inRange(num100,94,100): myelement = sysElements['starshipgraveyard']; break;
        }
    }else {
        myelement = 'ERROR';
    }
    console.log("generated system element: ",myelement);
    return myelement;
}

function genPlanet(type){
    let myplanet = sysElements[type];
    myplanet.size = genPlanetSize(type);
    console.log("the generated planet: ",myplanet.size);
    return myplanet;
}

function genPlanetSize(type){
    let num10 = roll(10);
    let mysize = undefined;
    if(type==='gasgiant'){
        switch(num10){
            case 1: 
            case 2: 
                mysize = planetBody['gasdwarf']; 
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8: 
                mysize = planetBody['gasgiant']; 
                break;
            case 9:
            case 10: 
                mysize = planetBody['massivegasgiant'];
                break;
        };
    }else {
        switch(num10){
            case 1: 
                mysize = planetBody['lowmass']; break;
            case 2:
            case 3: 
                mysize = planetBody['small']; break;
            case 4: 
                mysize = planetBody['smallanddense']; 
                break;
            case 5:
            case 6:
            case 7: 
                mysize = planetBody['large'];
                break;
            case 8: 
                mysize = planetBody['largeanddense']; 
                break;
            case 9: 
            case 10: 
                mysize = planetBody['vast']; 
                break;
        }
    }
    console.log("generated planet size: ",mysize);
    return mysize;
}

function roll(maximum){
    return Math.floor(Math.random() * (maximum)) + 1
}

function inRange(num,min,max){
    if (num <= max && num >= min) return true;
    else return false;
}

function createSystem(){
    let numInner = roll(5);
    let numBio = roll(5);
    let numOuter = roll(5);

    //generate the star
    let mystar = genStar(roll(10));

    //adjust feature balance by star features
    switch(mystar){
        case 'mighty':
            numInner += 2;
            numBio -= 2;
            star.index = 1;
            break;
        case 'luminous':
            numInner -= 2;
            break;
        case 'dull':
            numOuter += 2;
            star.index = floor(random(3))+5;
            break;
        default:
            star.index = floor(random(8));
    }

    let i = 0;
    let system = [];
    system.push(starTypes[mystar]);
    for(i=0; i<numInner;i++){system.push(genSyselements('inner',roll(100)));}
    for(i=0; i<numBio;i++){system.push(genSyselements('biosphere',roll(100)));}
    for(i=0; i<numOuter;i++){system.push(genSyselements('outer',roll(100)));}
    return system;
}


//original data
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
  createCanvas(800, 800);

  angleMode(DEGREES);

  textFont(font);

  systemName = random(names);

  planetCount = 0;
  beltCount = 0;

  var base_r = 0.9;

  //replacing with warhammer equivalent
  //star.index = floor(random(8));
  //generate our system
  let mysystem = createSystem();
  star.size = 20 + star.index * 15 + random(star.index * 5);
  star.name = systemName;

  starrad = (star.size+30) / width;
  max_r = 0.9;

  //remove the star
  mysystem.shift();
  let count = mysystem.length-1;
  let interval = (max_r - starrad) / count;
  let curpos = starrad;

  for(i = 0; i <= count;i++){
    var cur = mysystem.shift();
    console.log("current item: ",cur);
    var t = random([0, 0, 0, 1, 2]);
    if (cur.name == "Planet" || cur.name == "Gas Giant") {
      //planet
      let planet = {
        rad: curpos,
        startingAngle: random(360),
        rotationSpeed: random(2) - 1,
        //size: random(35) + 10,
        size: cur.size.size,
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
    else if(cur.name=="Derelict Station"){
      //planet
      let planet = {
        rad: curpos,
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
    else if(cur.name=="Asteroid Belt" || cur.name=="Asteroid Cluster"){
      //asteroids
      let belt = {
        isplanet: false,
        isbelt: true,
        rad: curpos,
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
    } else {
        //do nothing
    }
    //base_r -= 0.12 + random(0.25);
    curpos += interval;
  }


  /*
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
  */
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
