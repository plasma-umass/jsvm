Int = function(num) {
	this.value = num | 0;
}

Int.fromBits = function(num) {
	return new Int(num);
}

Int.fromInt = function(num) {
	return new Int(num);
}

Int.fromByte = function(b) {
	return new Int((b<<24)>>24);
}

Int.fromShort = function(s) {
	return new Int((s<<16)>>16);
}

Int.fromNumber = function(num) {
	return new Int(num);
}

Int.fromString = function(s, radix) {
	return new Int(parseInt(s, radix));
}

// Get bottom 8 bits, sign extend from bit 7
Int.prototype.toByte = function() {
	return new Int((this.value<<24)>>24);
}

// Get bottom 16 bits, do not sign extend
Int.prototype.toChar = function() {
	return new Int((this.value<<16)>>>16);
}

Int.prototype.toDouble = function() {
	return this.value;
}

Int.prototype.toFloat = function() {
	return this.value;
}

Int.prototype.toLong = function() {
	return Long.fromInt(this.value);
}

// Get bottom 16 bits, sign extend from bit 15
Int.prototype.toShort = function() {
	return new Int((this.value<<16)>>16);
}

Int.prototype.add = function(x) {
	return new Int(this.value + x.value);
}

Int.prototype.and = function(x) {
	return new Int(this.value & x.value);
}

Int.prototype.compare = function(x) {
	if(this.value == x.value) {
		return new Int(0);
	} else if(this.value < x.value) {
		return new Int(-1);
	} else {
		return new Int(1);
	}
}

Int.prototype.div = function(x) {
	return new Int(Math.floor(this.value / x.value));
}

Int.prototype.equals = function(x) {
	return this.value == x.value;
}

Int.prototype.greaterThan = function(x) {
	return this.value > x.value;
}

Int.prototype.greaterThanOrEqual = function(x) {
	return this.value >= x.value;
}

Int.prototype.isNegative = function() {
	return this.value < 0;
}

Int.prototype.isOdd = function() {
	return this.value % 2 == 1;
}

Int.prototype.isEven = function() {
	return this.value % 2 == 0;
}

Int.prototype.isZero = function() {
	return this.value == 0;
}

Int.prototype.lessThan = function(x) {
	return this.value < x.value;
}

Int.prototype.lessThanOrEqual = function(x) {
	return this.value <= x.value;
}

Int.prototype.modulo = function(x) {
	return new Int(this.value % x.value);
}

Int.prototype.multiply = function(x) {
	return new Int(this.value * x.value);
}

Int.prototype.negate = function() {
	return new Int(-this.value);
}

Int.prototype.not = function() {
	return new Int(~this.value);
}

Int.prototype.notEquals = function(x) {
	return this.value != x.value;
}

Int.prototype.or = function(x) {
	return new Int(this.value | x.value);
}

Int.prototype.shiftLeft = function(bits) {
	return new Int(this.value<<bits.value);
}

Int.prototype.shiftRight = function(bits) {
	return new Int(this.value>>>bits.value);
}

Int.prototype.shiftRightUnsigned = function(bits) {
	return new Int(this.value>>bits.value);
}

Int.prototype.subtract = function(x) {
	return new Int(this.value - x.value);
}

Int.prototype.toInt = function(x) {
	return this.value;
}

Int.prototype.toNumber = function() {
	return this.value;
}

Int.prototype.toString = function(radix) {
	return this.value.toString(radix);
}

Int.prototype.xor = function(x) {
	return new Int(this.value ^ x.value);
}
