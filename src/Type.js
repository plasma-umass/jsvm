/**
 * Define an object representation of the value types used by the JVM
 */

// An abstract base type
function Type() {}

Type.prototype.toString = function() {
	return 'Type';
}

Type.prototype.equals = function(t) {
	return false;
}

Type.prototype.isVoid = false;
Type.prototype.isByte = false;
Type.prototype.isChar = false;
Type.prototype.isDouble = false;
Type.prototype.isFloat = false;
Type.prototype.isInt = false;
Type.prototype.isLong = false;
Type.prototype.isShort = false;
Type.prototype.isBoolean = false;
Type.prototype.isObject = false;
Type.prototype.isArray = false;
Type.prototype.isMethod = false;
Type.prototype.isReference = false;

// A reference type
function ReferenceType() {}

// Inherit from Type
ReferenceType.prototype = new Type();
ReferenceType.prototype.constructor = ReferenceType;
ReferenceType.prototype.toString = function() {
	return 'reference';
}
ReferenceType.prototype.equals = function(t) {
	return t instanceof ReferenceType;
}
ReferenceType.prototype.isReference = true;
ReferenceType.prototype.getDefault = function() {
	return new Value(new ReferenceType(), NULL);
}

// A void type
function VoidType() {}

// Inherit from Type
VoidType.prototype = new Type();
VoidType.prototype.constructor = VoidType;

VoidType.prototype.toString = function() {
	return 'void';
}

VoidType.prototype.equals = function(t) {
	return t instanceof VoidType;
}
VoidType.prototype.isVoid = true;
VoidType.prototype.getDefault = function() {
	throw new Error("Cannot call default type value setter on void type.");
}

// A byte type
function ByteType() {}

// Inherit from Type
ByteType.prototype = new Type();
ByteType.prototype.constructor = ByteType;

ByteType.prototype.toString = function() {
	return 'byte';
}

ByteType.prototype.equals = function(t) {
	return t instanceof ByteType;
}
ByteType.prototype.isByte = true;
ByteType.prototype.getDefault = function() {
	return new Value(new ByteType(), Int.fromInt(0));
}

// A char type
function CharType() {}

// Inherit from Type
CharType.prototype = new Type();
CharType.prototype.constructor = CharType;

CharType.prototype.toString = function() {
	return 'char';
}

CharType.prototype.equals = function(t) {
	return t instanceof CharType;
}
CharType.prototype.isChar = true;
CharType.prototype.getDefault = function() {
	return new Value(new CharType(), Int.fromInt(0));
}

// A double type
function DoubleType() {}

// Inherit from Type
DoubleType.prototype = new Type();
DoubleType.prototype.constructor = DoubleType;

DoubleType.prototype.toString = function() {
	return 'double';
}

DoubleType.prototype.equals = function(t) {
	return t instanceof DoubleType;
}
DoubleType.prototype.isDouble = true;
DoubleType.prototype.getDefault = function() {
	return new Value(new DoubleType(), 0.0);
}

// A float type
function FloatType() {}

// Inherit from Type
FloatType.prototype = new Type();
FloatType.prototype.constructor = FloatType;

FloatType.prototype.toString = function() {
	return 'float';
}

FloatType.prototype.equals = function(t) {
	return t instanceof FloatType;
}
FloatType.prototype.isFloat = true;
FloatType.prototype.getDefault = function() {
	return new Value(new FloatType(), 0.0);
}

// An int type
function IntType() {}

// Inherit from Type
IntType.prototype = new Type();
IntType.prototype.constructor = IntType;

IntType.prototype.toString = function() {
	return 'int';
}

IntType.prototype.equals = function(t) {
	return t instanceof IntType;
}
IntType.prototype.isInt = true;
IntType.prototype.getDefault = function() {
	return new Value(new IntType(), Int.fromInt(0));
}

// A long type
function LongType() {}

// Inherit from Type
LongType.prototype = new Type();
LongType.prototype.constructor = LongType;

LongType.prototype.toString = function() {
	return 'long';
}

LongType.prototype.equals = function(t) {
	return t instanceof LongType;
}
LongType.prototype.isLong = true;
LongType.prototype.getDefault = function() {
	return new Value(new LongType(), Long.fromInt(0));
}

// A short type
function ShortType() {}

// Inherit from Type
ShortType.prototype = new Type();
ShortType.prototype.constructor = ShortType;

ShortType.prototype.toString = function() {
	return 'short';
}

ShortType.prototype.equals = function(t) {
	return t instanceof ShortType;
}
ShortType.prototype.isShort = true;
ShortType.prototype.getDefault = function() {
	return new Value(new ShortType(), Int.fromInt(0));
}

// A boolean type
function BooleanType() {}

// Inherit from Type
BooleanType.prototype = new Type();
BooleanType.prototype.constructor = BooleanType;

BooleanType.prototype.toString = function() {
	return 'boolean';
}

BooleanType.prototype.equals = function(t) {
	return t instanceof BooleanType;
}
BooleanType.prototype.isBoolean = true;
BooleanType.prototype.getDefault = function() {
	return new Value(new BooleanType(), Int.fromInt(0));
}

// An object type
function ObjectType(class_name) {
	this.class_name = class_name;
}

// Inherit from Type
ObjectType.prototype = new Type();
ObjectType.prototype.constructor = ObjectType;

// Define the fields
ObjectType.prototype.class_name = 'Name of the class for this object type';

ObjectType.prototype.toString = function() {
	return this.class_name;
}

ObjectType.prototype.equals = function(t) {
	return t instanceof ObjectType && t.class_name == this.class_name;
}
ObjectType.prototype.isObject = true;
ObjectType.prototype.getDefault = function() {
	return new Value(new ObjectType(), NULL);
}

// An array type
function ArrayType(element_type) {
	// element_type is the actual loaded class of the element
	this.element_type = element_type;
}

// Inherit from Type
ArrayType.prototype = new Type();
ArrayType.prototype.constructor = ArrayType;

// Define the fields
ArrayType.prototype.element_type = 'Type of the array element';

ArrayType.prototype.toString = function() {
	return this.element_type.toString()+'[]';
}

ArrayType.prototype.equals = function(t) {
	return t instanceof ArrayType && t.element_type.equals(this.element_type);
}
ArrayType.prototype.isArray = true;
ArrayType.prototype.getDefault = function() {
	return new Value(new ArrayType(new VoidType()), NULL);
}

// A method type
function MethodType(return_type, parameter_types) {
	this.return_type = return_type;
	this.parameter_types = parameter_types;
}

// Inherit from Type
MethodType.prototype = new Type();
MethodType.prototype.constructor = MethodType;

// Define the fields
MethodType.prototype.return_type = 'Method return type';
MethodType.prototype.parameter_types = 'List of parameter types';

MethodType.prototype.toString = function() {
	var result = this.return_type.toString()+' function(';

	for(var i in this.parameter_types) {
		if(i != 0) {
			result += ', ';
		}
		result += this.parameter_types[i].toString();
	}

	result += ')';

	return result;
}

MethodType.prototype.equals = function(t) {
	if(!(t instanceof MethodType)) {
		return false;
	}

	if(!t.return_type.equals(this.return_type)) {
		return false;
	}

	if(t.parameter_types.length != this.parameter_types.length) {
		return false;
	}

	for(var i in this.parameter_types) {
		if(!this.parameter_types[i].equals(t.parameter_types[i])) {
			return false;
		}
	}

	return true;
}
MethodType.prototype.isMethod = true;
MethodType.prototype.getDefault = function() {
	return new Value(new MethodType(), NULL);
}

