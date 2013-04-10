function Executor(frame, ondone, onerror) {
	this.statics = new Array();
	this.frame = frame;
	this.depth = 0;
	this.initializing = new Array();
	
	if(ondone == undefined) {
		this.ondone = function(){};
	} else {
		this.ondone = ondone;
	}
	
	if(onerror == undefined) {
		this.onerror = function(err){alert(err);};
	} else {
		this.onerror = onerror;
	}
	
	this.single_step = false;
}

Executor.waiting_interrupts = [];
Executor.upshifting = [];

Executor.prototype.frame = 'The current frame';
Executor.prototype.depth = 'The current recursion depth';
Executor.prototype.ondone = 'Run when done executing';
Executor.prototype.onerror = 'Run when execution stops with an error';
Executor.prototype.single_step = false;

Executor.prototype.get_static_field = function(opcode, cp_fieldref) {
	// look for static field in this.statics
	// if it's there, return the Value
	// if it's not there, initialize the static class's
	// fields, including all of its parent static class fields
	var class_name = cp_fieldref.class_name;
	var field_name = cp_fieldref.field_name;
	var field_type = cp_fieldref.field_type;
	
	if(!this.static_init(opcode, class_name)) {
		return false;
	}
	
	if(field_name in this.statics[class_name]) {
		return this.statics[class_name][field_name];
	} else {
		var c = find_class(class_name);
		return this.get_static_field(opcode, {
			class_name: c.super_class, 
			field_name: field_name, 
			field_type: field_type
		});
	}
}

Executor.prototype.put_static_field = function(opcode, cp_fieldref, value) {
	var class_name = cp_fieldref.class_name;
	var field_name = cp_fieldref.field_name;
	var field_type = cp_fieldref.field_type;
	
	// Make sure class is initialized
	if(!this.static_init(opcode, class_name)) {
		return false;
	}
	
	// Set the class
	this.statics[class_name][field_name] = value;
	return true;
}

Executor.prototype.static_init = function(opcode, class_name) {
	if (class_name in this.statics) {
		return true;
	} else {
		// back up the PC so that getstatic/putstatic are run again
		// after init
		this.frame.pc -= codelen[opcode];
		var c = find_class(class_name);
		this.frame = c.clinit(this);
		return false;
	}
}

Executor.prototype.fetch_decode = function() {
	// fetch opcode; this is a function object
	var opcode = this.frame.getOpcode();

	var mnemonic;
	var width;
	var runner;
	
	// Handle the wide opcode
	if(opcode == 196) {
		this.frame.pc++;
		opcode = this.frame.getOpcode();
		
		mnemonic = wide_mnemonics[opcode];
		width = wide_codelen[opcode];
		runner = wide_opcodes[opcode];
		
	} else {
		mnemonic = mnemonics[opcode];
		width = codelen[opcode];
		runner = opcodes[opcode];
	}

	// Increment past the opcode
	this.frame.pc++;

	// Pull immediate operands from the code array
	var operands = [];
	for(var i=1; i<width; i++) {
		operands.push(this.frame.getOpcode());
		this.frame.pc++;
	}
	
	return {
		pc: this.frame.pc - width,
		opcode: opcode,
		mnemonic: mnemonic,
		width: width,
		runner: runner,
		operands: operands
	};
}

Executor.prototype.exec = function(op) {
	var next_frame = op.runner(this.frame, new Chomper(op.operands));

	if(next_frame != undefined) {
		this.frame = next_frame;
	}
}

Executor.interrupt = function(handler) {
	Executor.waiting_interrupts.push(handler);
}

Executor.prototype.handle_interrupts = function() {
	while(Executor.waiting_interrupts.length > 0) {
		var h = Executor.waiting_interrupts.shift();
		h(this);
	}
}

/**
 * Check if the recursion depth is too high.  If so, register this executor in the
 * 'upshifting' array and throw an exception.  The window error handler will catch
 * the exception and resume execution at depth 0.
 */
Executor.prototype.check_recursion = function() {
	if(this.depth > 100) {
		this.depth = 0;
		Executor.upshifting.push(this);
		throw 'CPS upshift';
		return false;
	}
}

/**
 * Catch upshift exceptions from recursive execution and resume the executor.
 */
window.onerror = function(msg, url, line) {
	if(msg == 'Uncaught CPS upshift' && Executor.upshifting.length > 0) {
		Executor.upshifting.shift().run();
		return false;
	}
	write_console(msg+'\n');
}

Executor.prototype.run = function() {
	this.check_recursion();
	
	while(this.frame != false) {
		this.handle_interrupts();
		
		if(this.single_step) {
			return this.breakpoint();
		}

		var op = this.fetch_decode();
		this.exec(op);
		
		// Randomly recurse to let events propagate on the UI
		if(Math.random() < 0.0001) {
			var e = this;
			this.depth++;
			setTimeout(function() {
				e.run();
			}, 0);
			return;
		}
	}
	
	return this.ondone();
}

Executor.prototype.breakpoint = function() {
	this.check_recursion();
	this.handle_interrupts();
	
	if(!this.single_step) {
		return this.run();
	}
	
	var op = this.fetch_decode();
	
	write_console(this.frame.method.class_name+'.'+this.frame.method.getName()+':'+op.pc+'  '+op.mnemonic);
	for(i in op.operands) {
		write_console(' '+Int.fromByte(op.operands[i]).toString());
	}
	write_console('\n');

	write_console('  Stack:\n');
	for(var i=0 in this.frame.o_stack) {
		if(this.frame.o_stack[i] == NULL) {
			write_console('    NULL\n');
		} else {
			write_console('    '+this.frame.o_stack[i].toString()+'\n');
		}
	}
	write_console('\n');

	write_console('  Locals:\n');
	for(var i=0; i<this.frame.method.getNumLocals(); i++) {
		var s;
		if(i in this.frame.locals) {
			if(this.frame.locals[i] == NULL) {
				s = 'NULL';
			} else {
				s = this.frame.locals[i].toString();
			}
		} else {
			s = '<unassigned>';
		}
		
		write_console('    '+i+': '+s+'\n');
	}
	write_console('\n');

	write_console("  Press 'enter' to step or 'escape' to continue.\n\n");
	
	var e = this;
	var handler = function(c) {
		if(c.charCodeAt(0) == 13 || c.charCodeAt(0) == 27) {
			e.exec(op);
		
			if(e.frame == false) {
				return e.ondone();
			}
		
			if(Executor.single_step) {
				e.depth++;
				return e.breakpoint();
			} else {
				e.depth++;
				return e.run();
			}
		} else {
			read_stdin(handler);
		}
	};
	
	read_stdin(handler);
}
