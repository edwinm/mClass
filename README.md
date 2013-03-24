# newClass

Implementing class like functionality using prototypal inheritance.

Making object oriented programming in JavaScript a bit easier, at least for people with a background in class based
programming languages like C++, Java and C#.

Supported object oriented features:

1. inheritance of methods and members
2. private methods and members
3. public methods and members
4. static methods and members
5. calling parent methods and members (super)

NewClass tries to stay close to the priciples of prototypal inheritance (in contrast to some other oop libraries):

1. The JavaScript keyword instanceof is fully supported
2. Easy conversion from object to string with toString()
3. Economical memory consumption: an instance object only contains instance data, no methods or other data is copied
	into the instance object

See tests.js for examples of how to use newClass.

Possible features to add in the future: augmentation, interfaces and ES5 object methods support.

NewClass is written by Edwin Martin and is licensed with the MIT license.