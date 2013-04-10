
Method.natives['java.lang.System'] = {
	// private static void
	registerNatives: function(frame) {
		// Do Nothing
	},
	
	// public static long
	currentTimeMillis: function(frame) {
		var d = new Date();
		var ms = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
		
		frame.o_stack.push(new Value(new LongType(), Long.fromNumber(ms)));
	},
	
	arraycopy: function(frame, arguments) {
		var src = arguments[4];
		var src_pos = arguments[3];
		var dest = arguments[2];
		var dest_pos = arguments[1];
		var length = arguments[0];
		
		for(var i = 0; i < length; i++) {
			dest[dest_pos+i] = src[src_pos+i];
		}
	}
};