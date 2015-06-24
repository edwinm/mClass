# mClass

Implementing class like functionality using prototypal inheritance.

Making object oriented programming in JavaScript a bit easier, at least for people with a background in class based
programming languages like C++, Java and C#.

Supported object oriented features:

1. inheritance of methods and members
2. private methods and members
3. public methods and members
4. static methods and members
5. calling parent methods and members (super)

MClass tries to stay close to the priciples of prototypal inheritance (in contrast to some other oop libraries):

1. The JavaScript keyword instanceof is fully supported
2. Easy conversion from object to string with toString()
3. Economical memory consumption: an instance object only contains instance data, no methods or other data is copied
	into the instance object

See tests.js for examples of how to use mClass.

```javascript
/*
How to use mClass
 */

var Animal = mClass(function() {
	// Private
	var info = "Carl Linnaeus is known as the father of modern taxonomy.";

	return {
		// Constructor
		construct: function(specie) {
			this.specie = specie;
		},
		// Public methods and members
		public: {
			sound: function() {
				return undefined;
			},
			toString: function() {
				return "I'm a " + this.specie + " with " + this.legs + " legs saying " + this.sound();
			}
		},
		// Static methods and members
		static : {
			info: function() {
				return info;
			}
		}
	};
});

var snake = new Animal("snake");

test( "instanceof", function() {
	ok( snake instanceof Animal );
});

test( "constructor", function() {
	ok( snake.constructor === Animal );
});



// A class without private methods or members is much easier
var Bird = mClass({
	// inherit from another class
	extends: Animal,
	// Override public method and member
	public: {
		sound: function() {
			return "tweet";
		},
		legs: 2
	}
});

var dove = new Bird("dove");

test( "instanceof", function() {
	ok( dove instanceof Animal );
});

test( "instanceof parent", function() {
	ok( dove instanceof Bird );
});

test( "overridden method", function() {
	ok( dove.sound() == "tweet" );
});

test( "overridden member", function() {
	ok( dove.legs == 2 );
});

test( "inherited method toString", function() {
	ok( ''+dove == "I'm a dove with 2 legs saying tweet" );
});

// If you don't like new, you can use Object.create()
var sparrow = Object.create( Bird.prototype, {specie: {value: "sparrow"}} );
test( "Object.create()", function() {
	ok( ''+sparrow == "I'm a sparrow with 2 legs saying tweet" );
});

// A class with private methods and members is a little bit more work
var Fish = mClass(function() {
	function calculateLegs() {
		return 0;
	}
	var sound = "blub";

	return {
		extends: Animal,
		public: {
			sound: function() {
				return sound;
			},
			// Call a parent method with the _super member (both this._super and Fish._super are possible)
			toString: function() {
				return this._super.toString.call(this)+" and I can swim";
			},
			legs: calculateLegs()
		}
	};
});

// Test inherited static function
test( "inherited static function", function() {
	ok( Fish.info() == "Carl Linnaeus is known as the father of modern taxonomy.");
});

var minnow = new Fish("minnow");

test( "inherited function using private function", function() {
	ok( minnow.sound() == "blub" );
});

test( "toString with super", function() {
	ok( ''+minnow == "I'm a minnow with 0 legs saying blub and I can swim" );
});
```

Possible features to add in the future: augmentation, interfaces and ES5 object methods support.

MClass is written by Edwin Martin and is licensed with the MIT license.