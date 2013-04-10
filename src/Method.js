function Method(class_name, name, type, access_flags, code, max_locals, local_variable_table, exception_table, constant_pool) {
	this.class_name = class_name;
	this.name = name;
	this.type = type;
	this.access_flags = access_flags;
	this.code = code;
	this.max_locals = max_locals;
	this.local_variable_table = local_variable_table;
	this.exception_table = exception_table;
	this.constant_pool = constant_pool;
	
	if(access_flags.Native) {
		if(class_name in Method.natives && name in Method.natives[class_name]) {
			this.code = Method.natives[class_name][name];
		} else {
			this.code = function(frame) {
				write_console('ERROR: unimplemented native method:\n'+class_name+'.'+this.toString()+'\n');
			}
		}
	}
	
	if(class_name in hooks && name in hooks[class_name]) {
		// Insert the JSVM hook opcode (xxxunusedxxx) just before returning
		this.code.splice(code.length-1, 0, JSVM_HOOK_OPCODE);
	}
}

Method.prototype.name = 'Method name';
Method.prototype.type = 'Method type';
Method.prototype.access_flags = 'Method access flags';
Method.prototype.code = 'Method body';
Method.prototype.max_locals = 'maximum local count';
Method.prototype.local_variable_table = 'Method\'s local variable table';
Method.prototype.exception_table = 'Method\'s exception table';
Method.prototype.constant_pool = 'The containing class\'s constant pool';

Method.natives = [];

Method.prototype.getName = function() {
	return this.name;
}

Method.prototype.getType = function() {
	return this.type;
}

Method.prototype.getAccessFlags = function() {
	return this.access_flags;
}

Method.prototype.getOpcode = function(pc) {
	return this.code[pc];
}

Method.prototype.getNumLocals = function() {
	return this.max_locals;
}

Method.prototype.getLocalVariableTable = function() {
	return this.local_variable_table;
}

Method.prototype.getExceptionTable = function() {
	return this.exception_table;
}

Method.prototype.getConstantPool = function() {
	return this.constant_pool;
}

Method.prototype.getConstantPoolValueAtIdx = function(index) {
	return this.constant_pool[index].getValue();
}

Method.prototype.createFrame = function(instance, args, prev_frame, executor_id) {
	var locals = [instance];

	for(var i in args) {
		locals.push(args[i]);

		if(args[i].isLong() || args[i].isDouble()) {
			write_console("pushing padding object onto the local stack after "+args[i]+"\n");
			locals.push(JAVASCRIPT_SUCKS);
		}
	}

	return new Frame(this, locals, prev_frame, executor_id);
}

Method.prototype.createStaticFrame = function(args, prev_frame, executor_id) {
	var locals = [];

	for(var i in args) {
		locals.push(args[i]);

		if(args[i].isLong() || args[i].isDouble()) {
			write_console("pushing padding object onto the local stack after "+args[i]+"\n");
			locals.push(JAVASCRIPT_SUCKS);
		}
	}

	return new Frame(this, locals, prev_frame, executor_id);
}

Method.prototype.isMain = function() {
	if(this.name == 'main' &&
	   this.access_flags.Public &&
	   this.access_flags.Static &&
	   this.type.equals(new MethodType(new VoidType(), [new ArrayType(new ObjectType('java.lang.String'))]))) {
		return true;
	} else {
		return false;
	}
}

Method.prototype.toString = function() {
	var s = '';

	s += this.name + ' :: ';

	if(this.access_flags.Native) {
		s += 'native ';
	}

	if(this.access_flags.Public) {
		s += 'public ';
	}

	if(this.access_flags.Private) {
		s += 'private ';
	}

	if(this.access_flags.Protected) {
		s += 'protected ';
	}

	if(this.access_flags.Static) {
		s += 'static ';
	}

	s += this.type.toString() + '\n';

	for(var i in this.local_variable_table) {
		s += '  ' + this.local_variable_table[i].name + ' :: ' + this.local_variable_table[i].type.toString() + '\n';
	}

	return s;
}
