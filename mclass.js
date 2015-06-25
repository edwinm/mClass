/**!
 @preserve mClass 1.0.3

 Copyright 2013-2015 Edwin Martin <edwin@bitstorm.org>

 https://github.com/edwinm/mClass

 License: MIT
 */

function mClass(param) {
	'use strict';

	var i, definition = param;

	if (typeof param == "function") {
		definition = param();
	}

	if (definition.extends && definition.extends._definition.public) {
		linkParent.prototype = definition.extends.prototype;
		Link.prototype = new linkParent();
	}
	Temp.prototype = new Link();

	// Parent Static
	if (definition.extends && definition.extends._definition.static) {
		for(i in definition.extends._definition.static) {
			Temp[i] = definition.extends._definition.static[i];
		}
	}
	// Static
	for(i in definition.static) {
		Temp[i] = definition.static[i];
	}

	// Set internal representation for extended classes
	Temp._definition = definition;

	// Set _super member for calling parent methods and members
	Temp._super = definition.extends && definition.extends._definition.public;

	return Temp;

	////// Function definitions //////

	// Object to return
	function Temp(){
		// Super constructor
		if (definition.extends && definition.extends._definition.construct) {
			definition.extends._definition.construct.apply(this, arguments);
		}

		// This contructor
		if (definition.construct) {
			definition.construct.apply(this, arguments);
		}
	};

	// Add public functions
	function Link() {
		this.constructor = Temp;
		for(i in definition.public) {
			this[i] = definition.public[i];
		}
		// Set _super member for calling parent methods and members
		this._super = definition.extends && definition.extends._definition.public;
	}

	// Extends
	function linkParent() {
		this.constructor = definition.extends;
	}
}
