const years = [];
const streets = [];

class Parks {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park6 extends Parks {
  constructor(name, buildYear, trees, parkArea) {
    super(name, buildYear);
    this.trees = trees;
    this.parkArea = parkArea;
  }
}

Park6.prototype.treeDensity = function () {
  console.log(` ${this.name} has a tree density of ${Math.round(this.trees / this.parkArea)} trees per square km`);
  if (this.trees > 1000) {
    console.log(`${this.name} has more than 1000 trees.`);
  }
};

//Make some parks..
const OldFaithful = new Park6('Old Faithful', 220, 1110, 50);
const Geraldton = new Park6('Geraldton', 70, 350, 15);
const CanbyPark = new Park6('Canby Park', 115, 35, 2);
const MadelynCreek = new Park6('Madelyn Creek', 20, 15, 2);


const parks = new Map();
parks.set('name', 'age');
parks.set('Old Faithful', 220);
parks.set('Geraldton', 70);
parks.set('Canby Park', 115);
parks.set('Madelyn Creek', 20);

for (let [key, value] of
  parks.entries()) {
  if (typeof value === 'number') {
    years.push(value);


  }

}

// Getting sum of numbers
const Year_Sum = years.reduce(function (a, b) {
  return a + b / years.length;
}, 0);


console.log(`---PARKS REPORT---\n Our 4 parks have an average age of ${Year_Sum} years.`);

//Listing out the calculations of tree density for each park to the console log 'park report'...
OldFaithful.treeDensity();
Geraldton.treeDensity();
CanbyPark.treeDensity();
MadelynCreek.treeDensity();
/////////////////////////////

//Using ES6 syntax..
function Street(name, buildYear, size, classification) {
  classification = classification === undefined ? classification = 'normal' : classification;
  this.name = name;
  this.buildYear = buildYear;
  this.size = size;
  this.classification = this.classification;
}

let oceanAve = new Street('Ocean Avenue', 1965, 1);
let groveRd = new Street('Grove Road', 1920, 5);
let fourthSt = new Street('4th Street', 1978, 0.25);
let oscarAve = new Street('Oscar Ave', 1991, 3);

Street.prototype.sizeClass = function () {
  if (this.size < 1) {
    this.classification = 'tiny';
  } else if (this.size >= 1 && this.size < 3) {
    this.classification = 'small';
  } else if (this.size >= 3 && this.size < 5) {
    this.classification = 'normal';
  } else if (this.size >= 5) {
    this.classification = 'big';
  }
  console.log(`${this.name} built in ${this.buildYear} is a ${this.classification} street.`);

};


const streetCapture = new Map();
streetCapture.set('name', 'size');
streetCapture.set('Ocean Avenue', 1);
streetCapture.set('Grove Road', 5);
streetCapture.set('4th Street', 0.25);
streetCapture.set('Oscar Avenue', 3);

for (let [key, value] of
  streetCapture.entries()) {
  if (typeof value === 'number') {
    streets.push(value);
  }

}


// Get sum of street lengths and average length
const Street_Sum = streets.reduce(function (a, b) {
  return a + b;
}, 0);

//...and the average street length
const StreetAvg = Street_Sum / streets.length;


console.log('---STREETS REPORT---');
console.log(`Our four streets have a total length of ${Street_Sum} miles with an average of ${StreetAvg} miles.`);
oceanAve.sizeClass();
groveRd.sizeClass();
fourthSt.sizeClass();
oscarAve.sizeClass();
