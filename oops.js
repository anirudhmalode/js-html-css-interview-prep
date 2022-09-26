"use-strict"; // Shows potential problems at constructor levels
// Function constructor
let Car = function (color, isAutomatic) {
  (this.color = color),
    (this.isAutomatic = isAutomatic),
    (this.getAuto = function () {
      return this.isAutomatic;
    });
};
// have to call with new keyword
let maruti = new Car("black", false);
// If called without new keyword will provide undefined --> i.e., the properties will be created on window object.
let maruti1 = Car("red", false);
console.log("Function Constructor --->", maruti, maruti1);

// ===============================================================================================
// Prototype & prototype chain - Every object have property called __proto__ (i.e., prototype).
Car.prototype.getColor = function () {
  return this.color;
};
// By use of this the method will be attached to prototype of Car constructor.
console.log("Prototype check -->", maruti.getAuto(), maruti.getColor());
// Though the getColor method is not available on the Car constructor
// --> So, prototype will be checked
// --> If is does not get there.
// --> will again drill check for next prototype
// --> This concept is only known as prototype chain.
// --> Prototype chain works in 2 ways --> From top to Bottom & Bottom to top

// =================================================================================================
// Object.create --> Used to extend constructor with use of base constructor. Takes reference with Global Object.
console.log("With console.log", Object); // To show only log
console.dir(Object); // To look in detail, can not attach log message
// Prototype will be attached by-default
const c1 = Object.create(Object.prototype);
const c2 = {};
console.dir(c1);
console.dir(c2);
// To remove prototype
const c3 = Object.create(null);
console.dir(c3);
const legoCar = Object.create(Car.prototype);
console.dir(legoCar);

// ===============================================================================================
// Object.setPrototypeOf(dObj<sub object>, sObj<base object>)
// --> Takes metthods of base / parent obejct & make it avalable for child.
const Toyota = {
  drive() {
    return "drive Toyota";
  },
};
const innova = {
  drive() {
    // return 'drive innova!'
    return `${super.drive()} innova`;
    // By using super keyword --> Sub class can access all the methods from parent class.
  },
};
Object.setPrototypeOf(innova, Toyota);
console.dir(innova.drive());

// ============================================================================================
// object.assign(dObj, sObj) --> Copies methods of base object into the child
// --> Shallow copy only copies methods not prototypes
const camry = {
  wifi() {
    return "drive camry";
  },
};
const ob1 = Object.assign(camry, Toyota);
console.dir(ob1);
const ob2 = Object.assign(innova, Toyota);
console.dir(ob2.drive()); // if same method have into dObj, sObj --> will take the last overwritten method.

// =============================================================================================
// Mixins --> Borrow functionality from different mixins(piece of code) to make our own objects.
let mixinsObj = Object.assign({}, innova, camry);
console.dir(mixinsObj);
// Function mixins are the functions which ill take object as an argument & will attach properties of other mixins & returns a new object.
const human = function (obj) {
  let isCrying = false;
  return Object.assign({}, obj, {
    cry() {
      isCrying = true;
      return this;
    },
    isCrying() {
      return isCrying;
    },
  });
};
const alien = function (obj) {
  let isFlying = false;
  return Object.assign({}, obj, {
    fly() {
      isFlying = true;
      return this;
    },
    isFlying() {
      return isFlying;
    },
  });
};
// Function mixin
const superman = human(alien({}));
console.dir(superman);

// ==============================================================================================
// Class --> is nothing but function constructor with prototype.
class MajorCar{
  constructor(color){
    this.color = color
  }
  drive(){
    console.log("Driving Major car");
  }
}
const major_car = new MajorCar('black')
console.dir(MajorCar);
console.dir(major_car);
// Extending class --> to add the properties of base class into the sub calsses.
class Mammal {
  constructor(legs, name){
    this.legs = legs,
    this.name = name
  }
  walk(){
    return `${this.name} can walk!`
  }
}

class Bat extends Mammal {
  constructor(legs, name, isVeg){
    super(legs, name);
    this.isVeg = isVeg;
  }
  fly(){
    let holding = isVeg ? 'carrot' : 'insects';
    return `${this.name} can fly with ${holding}!`
  }
}
const new_mammal = new Bat(4, "Chaman", false);
console.dir(new_mammal);

// ===========================================================================================
// Static class Methods --> 
class Sample {
  // Static method being defined ith keyord static
  static staticMethod() {
    console.dir(this);
  }
  // If static is not provided that means it is instance method.
  // Have to create instance of a class to call these methods
  getSample() {
    console.dir(this);
  }
}
// Instance of Sample
let newSample = new Sample();
console.dir(newSample); // o/p will not show the static method in instances.
console.dir(Sample); // Will show whole class with static method.


// ===========================================================================================
// Decorators --> Hold more functions by adding on the top of class or object.
// Have to set target.
function lipstick(target){
  target.lips = 'pink';
}

function earings(target){
  target.earings = true;
}

@lipstick // Decorator
@earings // Decorator
class Girl{}

console.log(`The girl having ${Girl.lips} lips & have ${Girl.earings ? 'earings' : 'nothing else'}`);