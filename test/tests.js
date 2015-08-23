/*
How to use mClass
 */

require(['../node_modules/qunitjs/qunit/qunit', '../mclass'], function(QUnit, mClass) {

	QUnit.start();

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

	QUnit.test( "instanceof", function(assert) {
		assert.ok( snake instanceof Animal );
	});

	QUnit.test( "constructor", function(assert) {
		assert.ok( snake.constructor === Animal );
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

	QUnit.test( "instanceof", function(assert) {
		assert.ok( dove instanceof Animal );
	});

	QUnit.test( "instanceof parent", function(assert) {
		assert.ok( dove instanceof Bird );
	});

	QUnit.test( "overridden method", function(assert) {
		assert.ok( dove.sound() == "tweet" );
	});

	QUnit.test( "overridden member", function(assert) {
		assert.ok( dove.legs == 2 );
	});

	QUnit.test( "inherited method toString", function(assert) {
		assert.ok( ''+dove == "I'm a dove with 2 legs saying tweet" );
	});

// If you don't like new, you can use Object.create()
	var sparrow = Object.create( Bird.prototype, {specie: {value: "sparrow"}} );
	QUnit.test( "Object.create()", function(assert) {
		assert.ok( ''+sparrow == "I'm a sparrow with 2 legs saying tweet" );
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
	QUnit.test( "inherited static function", function(assert) {
		assert.ok( Fish.info() == "Carl Linnaeus is known as the father of modern taxonomy.");
	});

	var minnow = new Fish("minnow");

	QUnit.test( "inherited function using private function", function(assert) {
		assert.ok( minnow.sound() == "blub" );
	});

	QUnit.test( "toString with super", function(assert) {
		assert.ok( ''+minnow == "I'm a minnow with 0 legs saying blub and I can swim" );
	});

	// Test augmentation

	// You can only extend from one class, but augment your classes with other classes and objects

	// Augment a object literal
	var weightService = {
		weight: 10,
		getWeight: function() {
			return this.weight;
		}
	};

	// Augment another mClass instance. You can even use private variables
	var Skin = mClass(function() {
		var skin;

		return {
			public: {
				setSkin: function(newSkin) {
					skin = newSkin;
				},
				getSkin: function () {
					return skin;
				}
			}
		}
	});

	// A new class augmenting the object and class above
	var Dog = mClass({
		extends: Animal,
		augments: [weightService, new Skin()],
		public: {
			sound: function() {
				return "woof";
			}
		}
	});

	var dog = new Dog('dog');

	QUnit.test( "augment with object literal", function(assert) {
		assert.ok( dog.getWeight() == 10 );
	});

	dog.setSkin('furry');
	QUnit.test( "augment with mClass instance", function(assert) {
		assert.ok( dog.getSkin() == 'furry' );
	});

});
