
var JAVASCRIPT_SUCKS = {
	toString: function() {
		return 'JAVASCRIPT_SUCKS';
	}
};

function Chomper(data) {
	this.data = data;
	if(data instanceof Array) {
		this.data = '';
		for(var i in data) {
			this.data += String.fromCharCode(data[i]);
		}
	}

	this.pos = 0;
}

Chomper.prototype.data = 'Data';
Chomper.prototype.pos = 0;

Chomper.prototype.chomp = function(width) {
	var result = 0;
	for(var i = 0; i < width; i++) {
		result *= 256;
		result += this.data.charCodeAt(this.pos);
		this.pos++;
	}
	return result;
}

Chomper.prototype.chompArray = function(width, count) {
	var result = [];
	for(var i = 0; i < count; i++) {
		result.push(this.chomp(width));
	}
	return result;
}

Chomper.prototype.chompString = function(length) {
	var result = '';
	for(var i = 0; i < length; i++) {
		result = result + String.fromCharCode(this.chomp(1));
	}
	return result;
}

function load_class(data) {

	var c = new Chomper(data);

	// check magic number
	var magic = c.chomp(4);
	if(magic.toString(16) != "cafebabe") {
		return false;
	}

	// Read and ignore the compiler's version info
	var minor_version = c.chomp(2);
	var major_version = c.chomp(2);

	// Get the number of constant pool entries
	var constant_pool_count = c.chomp(2);
	var constant_pool = [];

	// Push a dummy entry into the constant pool at index 0
	constant_pool.push(JAVASCRIPT_SUCKS);

	// Read the constant pool entries
	while(constant_pool.length < constant_pool_count) {
		var cp_entry = read_cp_info(constant_pool, c);
		if(cp_entry !== false) {
			constant_pool.push(cp_entry);

			if(cp_entry.type == CP_Info.Long || cp_entry.type == CP_Info.Double) {
				constant_pool.push('dummy');
			}
		}
	}

	// Read the class access flags
	var access_flags = parse_flags(c.chomp(2), Class_Access_Flags);

	// Read the class name
	var this_class_index = c.chomp(2);
	var this_class = constant_pool[this_class_index].toString();

	// Read the super class name
	var super_class_index = c.chomp(2);
	var super_class = constant_pool[super_class_index].toString();

	// Get the number of interfaces
	var interfaces_count = c.chomp(2);
	var interfaces = [];

	// Read the class interfaces
	while(interfaces.length < interfaces_count) {
		var interface_index = c.chomp(2);
		interfaces.push(constant_pool[interface_index].toString());
	}

	// Get the number of fields
	var fields_count = c.chomp(2);
	var fields = [];

	// Read the class fields
	for(var i = 0; i < fields_count; i++) {
		var field = read_field_info(c, constant_pool);
		fields.push(field);
	}

	// Get the number of methods
	var methods_count = c.chomp(2);
	var methods = [];

	// Read the class methods
	for(var i = 0; i < methods_count; i++) {
		var method = read_method_info(c, constant_pool, this_class);
		methods.push(method);
	}

	// Get the class attributes
	var attributes_count = c.chomp(2);
	var attributes = read_attributes(attributes_count, c, constant_pool);

	// Return the new class
	return new Class(this_class, super_class, access_flags, constant_pool, interfaces, fields, methods);
}

Class_Access_Flags = {
	Public: 	0x0001,
	Final: 		0x0002,
	Super: 		0x0020,
	Interface: 	0x0200,
	Abstract: 	0x0400
};

Field_Access_Flags = {
	Public: 	0x0001,
	Private: 	0x0002,
	Protected: 	0x0004,
	Static: 	0x0008,
	Final: 		0x0010,
	Volatile: 	0x0040,
	Transient: 	0x0080
};

Method_Access_Flags = {
	Public: 		0x0001,
	Private: 		0x0002,
	Protected: 		0x0004,
	Static: 		0x0008,
	Final: 			0x0010,
	Synchronized: 	0x0020,
	Native: 		0x0100,
	Abstract: 		0x0200,
	Strict: 		0x0400
};

function parse_flags(val, flags) {
	var result = {};

	for(var k in flags) {
		result[k] = (flags[k] & val) != 0;
	}

	return result;
}

CP_Info = {
	Class: 7,
	FieldRef: 9,
	MethodRef: 10,
	InterfaceMethodRef: 11,
	String: 8,
	Int: 3,
	Float: 4,
	Long: 5,
	Double: 6,
	NameAndType: 12,
	UTF8: 1
};

function read_cp_info(pool, c) {
	var tag = c.chomp(1);

	if(tag == CP_Info.Class) {
		var name_index = c.chomp(2);
		var c = undefined;

		return {
			type: tag,
			toString: function() {
				return pool[name_index].toString().split('/').join('.');
			},
			getValue: function() {
				if(c == undefined) {
					c = find_class(pool[name_index].toString().split('/').join('.'));
				}
				return c;
			}
		};

	} else if(tag == CP_Info.FieldRef) {
		var class_index = c.chomp(2);
		var name_and_type_index = c.chomp(2);

		return {
			type: tag,
			toString: function() {
				return pool[class_index].toString()+'.'+pool[name_and_type_index].toString();
			},
			getValue: function() {
				var name_and_type = pool[name_and_type_index].getValue();
				return {
					class_name: pool[class_index].toString(),
					field_name: name_and_type.name,
					field_type: ParseFieldDescriptor(name_and_type.descriptor)
				};
			}
		};

	} else if(tag == CP_Info.MethodRef || tag == CP_Info.InterfaceMethodRef) {
		var class_index = c.chomp(2);
		var name_and_type_index = c.chomp(2);

		return {
			type: tag,
			toString: function() {
				return pool[class_index].toString()+'.'+pool[name_and_type_index].toString();
			},
			getValue: function() {
				var name_and_type = pool[name_and_type_index].getValue();
				return {
					class_name: pool[class_index].toString(),
					method_name: name_and_type.name,
					method_type: ParseMethodDescriptor(name_and_type.descriptor)
				};
			}
		};

	} else if(tag == CP_Info.String) {
		var string_index = c.chomp(2);
		var string_class = undefined;

		return {
			type: tag,
			toString: function() {
				return '"'+pool[string_index].toString()+'"';
			},
			getValue: function() {
				if(string_class == undefined) {
					string_class = find_class('java.lang.String');
				}
				
				var instance = new Instance(string_class);
				
				var str = pool[string_index].toString();
				instance.put_field('value', new Value(new ArrayType(new CharType()), str));
				instance.put_field('count', new Value(new IntType(), Int.fromInt(str.length)));
				
				return new Value(new ObjectType('java.lang.String'), instance);
			}
		};

	} else if(tag == CP_Info.Int) {
		var val = Int.fromNumber(c.chomp(4));

		return {
			type: tag,
			toString: function() {
				return val.toString(16);
			},
			getValue: function() {
				return new Value(new IntType(), val);
			}
		};

	} else if(tag == CP_Info.Float) {
		var val = c.chomp(4);

		return {
			type: tag,
			toString: function() {
				return '(float)0x'+val.toString(16);
			},
			getValue: function() {
				return new Value(new FloatType(), val);
			}
		};

	} else if(tag == CP_Info.Long) {
		var hi_bits = c.chomp(4);
		var lo_bits = c.chomp(4);

		var val = Long.fromBits(lo_bits, hi_bits);

		return {
			type: tag,
			toString: function() {
				return val.toString(16);
			},
			getValue: function() {
				return new Value(new LongType(), val);
			}
		};

	} else if(tag == CP_Info.Double) {
		var hi_bytes = c.chomp(4);
		var lo_bytes = c.chomp(4);

		var val = 0;

		return {
			type: tag,
			toString: function() {
				return '(double)0x'+hi_bytes.toString(16)+lo_bytes.toString(16);
			},
			getValue: function() {
				return new Value(new DoubleType(), val);
			}
		};

	} else if(tag == CP_Info.NameAndType) {
		var name_index = c.chomp(2);
		var descriptor_index = c.chomp(2);

		return {
			type: tag,
			toString: function() {
				return pool[name_index].toString()+' :: '+pool[descriptor_index].toString();
			},
			getValue: function() {
				return {
					name: pool[name_index].toString(),
					descriptor: pool[descriptor_index].toString()
				};
			}
		};

	} else if(tag == CP_Info.UTF8) {
		var len = c.chomp(2);
		var val = c.chompString(len);

		return {
			type: tag,
			toString: function() {
				return val;
			},
			getValue: function() {
				return val;
			}
		};

	} else {
		return false;
	}
}

function read_attributes(count, c, constant_pool) {
	var result = {};

	for(var i = 0; i < count; i++) {
		var attribute_name_index = c.chomp(2);
		var attribute_name = constant_pool[attribute_name_index].toString();

		var attribute_length = c.chomp(4);

		result[attribute_name] = c.chompArray(1, attribute_length);
	}

	return result;
}

function read_field_info(c, constant_pool) {
	var access_flags = parse_flags(c.chomp(2), Field_Access_Flags);

	var name_index = c.chomp(2);
	var name = constant_pool[name_index].toString();

	var descriptor_index = c.chomp(2);
	var descriptor = constant_pool[descriptor_index].toString();

	var attributes_count = c.chomp(2);
	var attributes = read_attributes(attributes_count, c, constant_pool);

	return {
		access_flags: access_flags,
		name: name,
		type: ParseFieldDescriptor(descriptor),
		attributes: attributes
	};
}

function read_method_info(c, constant_pool, this_class) {
	var access_flags = parse_flags(c.chomp(2), Method_Access_Flags);

	var name_index = c.chomp(2);
	var name = constant_pool[name_index].toString();

	var descriptor_index = c.chomp(2);
	var descriptor = constant_pool[descriptor_index].toString();
	var type = ParseMethodDescriptor(descriptor);

	var attributes_count = c.chomp(2);
	var attributes = read_attributes(attributes_count, c, constant_pool);

	if('Code' in attributes) {
		code_info = read_code_attribute(new Chomper(attributes['Code']), constant_pool);
	}/* else if(!access_flags.Native) {
		write_console('WARNING: empty non-native method: '+this_class+'.'+name+'\n');
	}*/

	return new Method(this_class, name, type, access_flags, code_info.code, code_info.max_locals, code_info.local_variable_table, code_info.exception_table, constant_pool);
}

function read_code_attribute(c, constant_pool) {
	var max_stack = c.chomp(2);
	var max_locals = c.chomp(2);

	var code_length = c.chomp(4);

	var code = c.chompArray(1, code_length);

	var exception_table_length = c.chomp(2);

	var exception_table = [];
	for(var i=0; i<exception_table_length; i++) {
		exception_table.push(read_exception_table_entry(c, constant_pool));
	}

	var attributes_count = c.chomp(2);
	var attributes = read_attributes(attributes_count, c, constant_pool);

	var local_variable_table = []
	if('LocalVariableTable' in attributes) {
		local_variable_table = read_local_variable_table_attribute(new Chomper(attributes['LocalVariableTable']), constant_pool);
	}

	return {
		max_stack: max_stack,
		max_locals: max_locals,
		code: code,
		exception_table: exception_table,
		local_variable_table: local_variable_table,
		attributes: attributes
	};
}

function read_local_variable_table_attribute(c, constant_pool) {
	var lvt_length = c.chomp(2);
	var lvt = new Array();

	for(var i=0; i<lvt_length; i++) {
		var start_pc = c.chomp(2);
		var length = c.chomp(2);
		var name_index = c.chomp(2);
		var name = constant_pool[name_index].toString();

		var descriptor_index = c.chomp(2);
		var descriptor = constant_pool[descriptor_index].toString();
		var type = ParseFieldDescriptor(descriptor);

		var index = c.chomp(2);

		lvt[index] = {
			start_pc: start_pc,
			length: length,
			name: name,
			type: type,
		};
	}

	return lvt;
}

function read_exception_table_entry(c, constant_pool) {
	var start_pc = c.chomp(2);
	var end_pc = c.chomp(2);
	var handler_pc = c.chomp(2);
	var catch_type = c.chomp(2);

	return {
		start_pc: start_pc,
		end_pc: end_pc,
		handler_pc: handler_pc,
		catch_type: catch_type
	};
}
