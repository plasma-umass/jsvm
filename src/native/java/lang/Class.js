
Method.natives['java.lang.Class'] = {
	// public static bool
	desiredAssertionStatus: function(frame) {
		frame.o_stack.push(new Value(new BoolType(), false));
	},
	
	getClassLoader0: function(frame) {
		frame.o_stack.push(NULL);
	}
};