
function ParseFieldDescriptor(s) {
	var e;
	if(e = ParseFieldType(s)) {
		return e;
	}

	return false;
}

function ParseMethodDescriptor(s) {
	if(s[0] == '(') {
		var split = 1;
		var depth = 1;
		while(split < s.length && depth > 0) {
			if(s[split] == '(') {
				depth++;
			} else if(s[split] == ')') {
				depth--;
			}
			split++;
		}

		if(depth > 0) {
			return false;
		}

		var params = ParseParameterDescriptorList(s.substring(1, split-1));
		var ret = ParseReturnDescriptor(s.substring(split));

		if(params !== false && ret !== false) {
			return new MethodType(ret, params);
		}
	}

	return false;
}

function ParseParameterDescriptorList(s) {
	if(s.length == 0) {
		return [];
	}

	for(var split = 0; split <= s.length; split++) {
		var first = ParseParameterDescriptor(s.substring(0, split));

		if(first !== false) {
			var rest = ParseParameterDescriptorList(s.substring(split));

			if(rest !== false) {
				var result = [];
				result.push(first);
				for(var i in rest) {
					result.push(rest[i]);
				}

				return result;
			}
		}
	}

	return false;
}

function ParseParameterDescriptor(s) {
	var e;
	if(e = ParseFieldType(s)) {
		return e;
	}

	return false;
}

function ParseReturnDescriptor(s) {
	var e;
	if(e = ParseFieldType(s)) {
		return e;
	} else if(s == 'V') {
		return new VoidType();
	}

	return false;
}

function ParseComponentType(s) {
	var e;
	if(e = ParseFieldType(s)) {
		return e;
	}

	return false;
}

function ParseFieldType(s) {
	var e;
	if(e = ParseBaseType(s)) {
		return e;
	} else if(e = ParseObjectType(s)) {
		return e;
	} else if(e = ParseArrayType(s)) {
		return e;
	}

	return false;
}

function ParseBaseType(s) {
	if(s == 'B') {
		return new ByteType();
	} else if(s == 'C') {
		return new CharType();
	} else if(s == 'D') {
		return new DoubleType();
	} else if(s == 'F') {
		return new FloatType();
	} else if(s == 'I') {
		return new IntType();
	} else if(s == 'J') {
		return new LongType();
	} else if(s == 'S') {
		return new ShortType();
	} else if(s == 'Z') {
		return new BooleanType();
	}

	return false;
}

function ParseObjectType(s) {
	if(s[0] == 'L' && s[s.length-1] == ';') {
		var class_name = s.substring(1, s.length-1);
		return new ObjectType(class_name.split('/').join('.'));
	}

	return false;
}

function ParseArrayType(s) {
	var e;
	if(s[0] == '[' && (e = ParseComponentType(s.substring(1)))) {
		return new ArrayType(e);
	}

	return false;
}
