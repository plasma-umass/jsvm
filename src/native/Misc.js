
Method.natives['sun.reflect.Reflection'] = {
	getCallerClass: function(frame, args) {
		var skip = args[0];
		var f = frame.parent;
		for(var i = 0; i < skip; i++) {
			f = f.parent;
		}
		frame.o_stack.push(find_class(f.method.class_name));
	}
};