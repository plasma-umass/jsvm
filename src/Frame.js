function Frame(method, locals, parent, executor) {
	this.o_stack = new Array();
	this.pc = 0;
	this.locals = locals;
	this.method = method;
	this.parent = parent;
	this.executor = executor;
}

Frame.prototype.o_stack = "the operand array"
Frame.prototype.pc = "program counter, points at NEXT INSTRUCTION"
Frame.prototype.method = "a reference to a method object"
Frame.prototype.locals = "local variables"
Frame.prototype.parent = "the frame of the caller";

Frame.prototype.getMethod = function() {
	return this.method;
}

Frame.prototype.getOpcode = function() {
	return this.method.getOpcode(this.pc);
}

Frame.prototype.getConstantPool = function () {
	return this.method.getConstantPool();
}

Frame.prototype.getParentFrame = function() {
	return this.parent;
}
