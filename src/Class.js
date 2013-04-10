function Class(this_class, super_class, access_flags, constant_pool, interfaces, fields, methods) {
	this.this_class = this_class;
	this.super_class = super_class;
	this.access_flags = access_flags;
	this.constant_pool = constant_pool;
	this.interfaces = interfaces;
	this.fields = fields;
	this.methods = methods;
}

// static class initialization
Class.prototype.clinit = function(executor) {
	write_console('Initing: '+this.this_class+'\n');
	if(executor.initializing[this]) { // don't reinit
		return;
	}
	executor.initializing[this] = true;
	// init superclass first
	if (this.super_class != JAVASCRIPT_SUCKS) {
		var sc = find_class(this.super_class);
		var super_clinit_frame = sc.clinit(executor);
	}
	
	// set fields to defaults
	executor.statics[this.this_class] = {};
	for (f in this.fields) {
		if (this.fields[f].access_flags.Static) {
			executor.statics[this.this_class][this.fields[f].name] = this.fields[f].type.getDefault();
		}
	}
	// call our own <clinit> method
	var clinit_method = this.getMethod("<clinit>", new MethodType(new VoidType(), []))
	
	if(clinit_method != undefined) {
		// we now construct a frame chain, then get_static_field
		// backs up the PC, and all of this is rerun, but initialized
		// this time around
		var clinit_frame = clinit_method.createStaticFrame([], executor.frame, executor);
		if (super_clinit_frame != undefined) {
			super_clinit_frame.parent = clinit_frame;
			return super_clinit_frame;
		} else {
			return clinit_frame;
		}
	} else {
		return super_clinit_frame;
	}
	
	throw new Error("Die");
}

Class.prototype.this_class = 'The name of this class';
Class.prototype.super_class = 'The name of the parent class';
Class.prototype.access_flags = 'The accessibility of this class';
Class.prototype.constant_pool = 'The constant pool for this class';
Class.prototype.interfaces = 'The interfaces for this class';
Class.prototype.fields = 'The fields for this class';
Class.prototype.methods = 'The methods for this class';

Class.prototype.name = 'Class Name';
Class.prototype.package = 'Class Package';

Class.natives = {};

Class.prototype.getName = function() {
	var parts = this.this_class.split('.');
	return parts.pop();
}

Class.prototype.getFullyQualifiedName = function() {
	return this.this_class;
}

Class.prototype.getMethod = function(name, type) {
	// if the class you asked to search in has the method
	// you are looking for, call it
	for(var i in this.methods) {
		if(this.methods[i].getName() == name && this.methods[i].getType().equals(type)) {
			return this.methods[i];
		}
	}
	// otherwise, look for the method in this class's superclass
	// unless there is no superclass (i.e., this == JAVASCRIPT_SUCKS sentinel)
	if(this.super_class != JAVASCRIPT_SUCKS) {
		return find_class(this.super_class).getMethod(name, type);
	}
}

Class.prototype.getPackage = function() {
	var parts = this.this_class.split('.');
	parts.pop();
	return parts.join('.');
}

Class.prototype.isRunnable = function() {
	for(var i in this.methods) {
		if(this.methods[i].isMain()) {
			return true;
		}
	}

	return false;
}

Class.initStaticClass = function(class_name) {
	
}

Class.prototype.copy = function() {
	return this;
}

Class.prototype.toString = function() {
	return this.this_class;
	
	var s = '';

	s += 'class ' + this.this_class + ' extends ' + this.super_class;

	if(this.interfaces.length > 0) {
		s += ' implements';
		for(var i in this.interfaces) {
			s += ' ' + this.interfaces[i].toString();
		}
	}
	s += ' {\n';

	s += '  constant pool:\n';
	for(var i in this.constant_pool) {
		s += '    '+i+': '+this.constant_pool[i].toString()+'\n';
	}
	s += '\n';

	for(var i in this.fields) {
		s += '  ' + this.fields[i].name + ' :: ' + this.fields[i].type.toString() + '\n';
	}
	s += '\n';

	for(var i in this.methods) {
		var ms = this.methods[i].toString().split('\n');
		for(var j in ms) {
			ms[j] = '  ' + ms[j];
		}
		s += ms.join('\n');
		s += '\n';
	}

	s += '}\n'
	return s;
}
