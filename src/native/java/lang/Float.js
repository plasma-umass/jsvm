
Method.natives['java.lang.Float'] = {
	floatToRawIntBits: function(frame, arguments) {
		f32 = new Float64Array(arguments[0]);
		i32 = new Int32Array(f32.buffer);
        frame.o_stack.push(new Value(new IntType(), Int.fromInt(i32[0])));
	}
};