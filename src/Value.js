function Value(type, value) {
	this.type = type
	this.value = value
}

Value.prototype.type = "the type";
Value.prototype.value = "the value";
Value.prototype.copy = function() { return new Value(this.type, this.value); }
Value.prototype.getValue = function () { return this.value; }
Value.prototype.setValue = function (value) { this.value = value; }
Value.prototype.isVoid = function () { return this.type.isVoid }
Value.prototype.isByte = function () { return this.type.isByte }
Value.prototype.isChar = function () { return this.type.isChar }
Value.prototype.isInt = function () { return this.type.isInt }
Value.prototype.isDouble = function () { return this.type.isDouble }
Value.prototype.isFloat = function () { return this.type.isFloat }
Value.prototype.isLong = function () { return this.type.isLong }
Value.prototype.isShort = function () { return this.type.isShort }
Value.prototype.isBoolean = function () { return this.type.isBoolean }
Value.prototype.isObject = function () { return this.type.isObject }
Value.prototype.isArray = function () { return this.type.isArray }
Value.prototype.isMethod = function () { return this.type.isMethod }
Value.prototype.isReference = function () { return this.type.isReference }

Value.prototype.toString = function() { return this.value.toString() + '::' + this.type.toString(); }

function NullObject() {}
NullObject.prototype = new Value();
NullObject.prototype.constructor = NullObject;

NullObject.prototype.type = new VoidType();
NullObject.prototype.value = "NULL";

NullObject.prototype.toString = function() {
	return 'NULL';
}

var NULL = new NullObject()

var JAVASCRIPT_SUCKS = "JavaScript sucks";