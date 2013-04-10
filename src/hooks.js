hooks = {};

hooks['java.lang.System'] = {
	'<clinit>': function(executor) {
		var c = find_class('java.lang.System');
		var m = c.getMethod('initializeSystemClass', new MethodType(new VoidType(), []));
	
		var frame = m.createStaticFrame([], executor.frame, executor);
		return frame;
	}
}
