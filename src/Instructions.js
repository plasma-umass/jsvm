// a table of functions implementing
var opcodes = new Array();
var wide_opcodes = new Array();

// names for instructions
var mnemonics = new Array();
var wide_mnemonics = new Array();

// total length in bytes, including opcode
var codelen = new Array();
var wide_codelen = new Array();

mnemonics[0] = "nop";
opcodes[0] = function(frame, operands) {}
codelen[0] = 1;

mnemonics[1] = "aconst_null";
opcodes[1] = function(frame, operands) {
	frame.o_stack.push(NULL);
}
codelen[1] = 1;

mnemonics[2] = "iconst_m1";
opcodes[2] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(-1)));
}
codelen[2] = 1;

mnemonics[3] = "iconst_0";
opcodes[3] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(0)));
}
codelen[3] = 1;

mnemonics[4] = "iconst_1";
opcodes[4] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(1)));
}
codelen[4] = 1;

mnemonics[5] = "iconst_2";
opcodes[5] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(2)));
}
codelen[5] = 1;

mnemonics[6] = "iconst_3";
opcodes[6] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(3)));
}
codelen[6] = 1;

mnemonics[7] = "iconst_4";
opcodes[7] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(4)));
}
codelen[7] = 1;

mnemonics[8] = "iconst_5";
opcodes[8] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(5)));
}
codelen[8] = 1;

mnemonics[9] = "lconst_0";
opcodes[9] = function(frame, operands) {
	frame.o_stack.push(new Value(new LongType(), Long.fromInt(0)));
}
codelen[9] = 1;

mnemonics[10] = "lconst_1";
opcodes[10] = function(frame, operands) {
	frame.o_stack.push(new Value(new LongType(), Long.fromInt(1)));
}
codelen[10] = 1;

mnemonics[11] = "fconst_0";
opcodes[11] = function(frame, operands) {
	frame.o_stack.push(new Value(new FloatType(), 0.0));
}
codelen[11] = 1;

mnemonics[12] = "fconst_1";
opcodes[12] = function(frame, operands) {
	frame.o_stack.push(new Value(new FloatType(), 1.0));
}
codelen[12] = 1;

mnemonics[13] = "fconst_2";
opcodes[13] = function(frame, operands) {
	frame.o_stack.push(new Value(new FloatType(), 2.0));
}
codelen[13] = 1;

mnemonics[14] = "dconst_0";
opcodes[14] = function(frame, operands) {
	frame.o_stack.push(new Value(new DoubleType(), 0.0));
}
codelen[14] = 1;

mnemonics[15] = "dconst_1";
opcodes[15] = function(frame, operands) {
	frame.o_stack.push(new Value(new DoubleType(), 1.0));
}
codelen[15] = 1;

mnemonics[16] = "bipush";
opcodes[16] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromByte(operands.chomp(1))));
}
codelen[16] = 2;

mnemonics[17] = "sipush";
opcodes[17] = function(frame, operands) {
	frame.o_stack.push(new Value(new IntType(), Int.fromShort(operands.chomp(2))));
}
codelen[17] = 3;

mnemonics[18] = "ldc";
opcodes[18] = function(frame, operands) {
	constant = frame.method.getConstantPoolValueAtIdx(operands.chomp(1));
	frame.o_stack.push(constant);
}
codelen[18] = 2;

mnemonics[19] = "ldc_w";
opcodes[19] = function(frame, operands) {
	constant = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	frame.o_stack.push(constant);
}
codelen[19] = 3;

mnemonics[20] = "ldc2_w";
opcodes[20] = function(frame, operands) {
	constant = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	frame.o_stack.push(constant);
}
codelen[20] = 3;

mnemonics[21] = "iload";
opcodes[21] = function(frame, operands) {
	var ob1 = frame.locals[operands.chomp(1)];
	assert(ob1.isInt());
	frame.o_stack.push(ob1.copy());
}
codelen[21] = 2;

wide_mnemonics[21] = "wide iload";
wide_opcodes[21] = function(frame, operands) {
	var ob1 = frame.locals[operands.chomp(2)];
	assert(ob1.isInt());
	frame.o_stack.push(ob1.copy());
}
wide_codelen[21] = 3;

mnemonics[22] = "lload";
opcodes[22] = function(frame, operands) {
	var val1 = frame.locals[operands.chomp(1)];
	assert(val1.isLong());
	frame.o_stack.push(val1.copy());
}
codelen[22] = 2;

wide_mnemonics[22] = "wide lload";
wide_opcodes[22] = function(frame, operands) {
	var val1 = frame.locals[operands.chomp(2)];
	assert(val1.isLong());
	frame.o_stack.push(val1.copy());
}
wide_codelen[22] = 3;

mnemonics[23] = "fload";
opcodes[23] = function(frame, operands) {
	var val1 = frame.locals[operands.chomp(1)];
	assert(val1.isFloat());
	frame.o_stack.push(val1.copy());
}
codelen[23] = 2;

wide_mnemonics[23] = "wide fload";
wide_opcodes[23] = function(frame, operands) {
	var val1 = frame.locals[operands.chomp(2)];
	assert(val1.isFloat());
	frame.o_stack.push(val1.copy());
}
wide_codelen[23] = 3;

mnemonics[24] = "dload";
opcodes[24] = function(frame, operands) {
	var val1 = frame.locals[operands.chomp(1)];
	assert(val1.isDouble());
	frame.o_stack.push(val1.copy());
}
codelen[24] = 2;

wide_mnemonics[24] = "wide dload";
wide_opcodes[24] = function(frame, operands) {
	var val1 = frame.locals[operands.chomp(1)];
	assert(val1.isDouble());
	frame.o_stack.push(val1.copy());
}
wide_codelen[24] = 3;

mnemonics[25] = "aload";
opcodes[25] = function(frame, operands) {
	var val1 = frame.locals[operands.chomp(1)];
	assert(val1.isObject());
	frame.o_stack.push(val1.copy());
}
codelen[25] = 2;

wide_mnemonics[25] = "wide aload";
wide_opcodes[25] = function(frame, operands) {
	var val1 = frame.locals[operands.chomp(2)];
	assert(val1.isObject());
	frame.o_stack.push(val1.copy());
}
wide_codelen[25] = 3;

mnemonics[26] = "iload_0";
opcodes[26] = function(frame, operands) {
	var val1 = frame.locals[0];
	assert(val1.isInt());
	frame.o_stack.push(val1.copy());
}
codelen[26] = 1;

mnemonics[27] = "iload_1";
opcodes[27] = function(frame, operands) {
	var val1 = frame.locals[1];
	assert(val1.isInt());
	frame.o_stack.push(val1.copy());
}
codelen[27] = 1;

mnemonics[28] = "iload_2";
opcodes[28] = function(frame, operands) {
	var val1 = frame.locals[2];
	assert(val1.isInt());
	frame.o_stack.push(val1.copy());
}
codelen[28] = 1;

mnemonics[29] = "iload_3";
opcodes[29] = function(frame, operands) {
	var val1 = frame.locals[3];
	assert(val1.isInt());
	frame.o_stack.push(val1.copy());
}
codelen[29] = 1;

mnemonics[30] = "lload_0";
opcodes[30] = function(frame, operands) {
	var val1 = frame.locals[0];
	assert(val1.isLong());
	frame.o_stack.push(val1.copy());
}
codelen[30] = 1;

mnemonics[31] = "lload_1";
opcodes[31] = function(frame, operands) {
	var val1 = frame.locals[1];
	assert(val1.isLong());
	frame.o_stack.push(val1.copy());
}
codelen[31] = 1;

mnemonics[32] = "lload_2";
opcodes[32] = function(frame, operands) {
	var val1 = frame.locals[2];
	assert(val1.isLong());
	frame.o_stack.push(val1.copy());
}
codelen[32] = 1;

mnemonics[33] = "lload_3";
opcodes[33] = function(frame, operands) {
	var val1 = frame.locals[3];
	assert(val1.isLong());
	frame.o_stack.push(val1.copy());
}
codelen[33] = 1;

mnemonics[34] = "fload_0";
opcodes[34] = function(frame, operands) {
	var val1 = frame.locals[0];
	assert(val1.isFloat());
	frame.o_stack.push(val1.copy());
}
codelen[34] = 1;

mnemonics[35] = "fload_1";
opcodes[35] = function(frame, operands) {
	var val1 = frame.locals[1];
	assert(val1.isFloat());
	frame.o_stack.push(val1.copy());
}
codelen[35] = 1;

mnemonics[36] = "fload_2";
opcodes[36] = function(frame, operands) {
	var val1 = frame.locals[2];
	assert(val1.isFloat());
	frame.o_stack.push(val1.copy());
}
codelen[36] = 1;

mnemonics[37] = "fload_3";
opcodes[37] = function(frame, operands) {
	var val1 = frame.locals[3];
	assert(val1.isFloat());
	frame.o_stack.push(val1.copy());
}
codelen[37] = 1;

mnemonics[38] = "dload_0";
opcodes[38] = function(frame, operands) {
	var val1 = frame.locals[0];
	assert(val1.isDouble());
	frame.o_stack.push(val1.copy());
}
codelen[38] = 1;

mnemonics[39] = "dload_1";
opcodes[39] = function(frame, operands) {
	var val1 = frame.locals[1];
	assert(val1.isDouble());
	frame.o_stack.push(val1.copy());
}
codelen[39] = 1;

mnemonics[40] = "dload_2";
opcodes[40] = function(frame, operands) {
	var val1 = frame.locals[2];
	assert(val1.isDouble());
	frame.o_stack.push(val1.copy());
}
codelen[40] = 1;

mnemonics[41] = "dload_3";
opcodes[41] = function(frame, operands) {
	var val1 = frame.locals[3];
	assert(val1.isDouble());
	frame.o_stack.push(val1.copy());
}
codelen[41] = 1;

mnemonics[42] = "aload_0";
opcodes[42] = function(frame, operands) {
	var val1 = frame.locals[0];
	//assert(val1.isObject());
	frame.o_stack.push(val1.copy());
}
codelen[42] = 1;

mnemonics[43] = "aload_1";
opcodes[43] = function(frame, operands) {
	var val1 = frame.locals[1];
	//assert(val1.isObject());
	frame.o_stack.push(val1.copy());
}
codelen[43] = 1;

mnemonics[44] = "aload_2";
opcodes[44] = function(frame, operands) {
	var val1 = frame.locals[2];
	//assert(val1.isObject());
	frame.o_stack.push(val1.copy());
}
codelen[44] = 1;

mnemonics[45] = "aload_3";
opcodes[45] = function(frame, operands) {
	var val1 = frame.locals[3];
	//assert(val1.isObject());
	frame.o_stack.push(val1.copy());
}
codelen[45] = 1;

mnemonics[46] = "iaload";
opcodes[46] = function(frame, operands) {
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	var val = array.getValue()[index.getValue().toInt()];
	assert(val.isInt());
	
	frame.o_stack.push(val.copy());
}
codelen[46] = 1;

mnemonics[47] = "laload";
opcodes[47] = function(frame, operands) {
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	var val = array.getValue()[index.getValue().toInt()];
	assert(val.isLong());
	
	frame.o_stack.push(val.copy());
}
codelen[47] = 1;

mnemonics[48] = "faload";
opcodes[48] = function(frame, operands) {
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	var val = array.getValue()[index.getValue().toInt()];
	assert(val.isFloat());
	
	frame.o_stack.push(val.copy());
}
codelen[48] = 1;

mnemonics[49] = "daload";
opcodes[49] = function(frame, operands) {
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	var val = array.getValue()[index.getValue().toInt()];
	assert(val.isDouble());
	
	frame.o_stack.push(val.copy());
}
codelen[49] = 1;

mnemonics[50] = "aaload";
opcodes[50] = function(frame, operands) {
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	var val = array.getValue()[index.getValue().toInt()];
	assert(val.isObject());
	
	frame.o_stack.push(val.copy());
}
codelen[50] = 1;

mnemonics[51] = "baload";
opcodes[51] = function(frame, operands) {
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	var val = array.getValue()[index.getValue().toInt()];
	assert(val.isByte());
	
	frame.o_stack.push(val.copy());
}
codelen[51] = 1;

mnemonics[52] = "caload";
opcodes[52] = function(frame, operands) {
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	var val = array.getValue()[index.getValue()];
	assert(val.isChar());
	
	frame.o_stack.push(val.copy());
}
codelen[52] = 1;

mnemonics[53] = "saload";
opcodes[53] = function(frame, operands) {
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	var val = array.getValue()[index.getValue()];
	assert(val.isShort());
	
	frame.o_stack.push(val.copy());
}
codelen[53] = 1;

mnemonics[54] = "istore";
opcodes[54] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.locals[operands.chomp(1)] = val;
}
codelen[54] = 2;

wide_mnemonics[54] = "wide istore";
wide_opcodes[54] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.locals[operands.chomp(2)] = val;
}
wide_codelen[54] = 3;

mnemonics[55] = "lstore";
opcodes[55] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.locals[operands.chomp(1)] = val;
}
codelen[55] = 2;

wide_mnemonics[55] = "wide lstore";
wide_opcodes[55] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.locals[operands.chomp(2)] = val;
}
wide_codelen[55] = 3;

mnemonics[56] = "fstore";
opcodes[56] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.locals[operands.chomp(1)] = val;
}
codelen[56] = 2;

wide_mnemonics[56] = "wide fstore";
wide_opcodes[56] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.locals[operands.chomp(2)] = val;
}
wide_codelen[56] = 3;

mnemonics[57] = "dstore";
opcodes[57] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.locals[operands.chomp(1)] = val;
}
codelen[57] = 2;

wide_mnemonics[57] = "wide dstore";
wide_opcodes[57] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.locals[operands.chomp(2)] = val;
}
wide_codelen[57] = 3;

mnemonics[58] = "astore";
opcodes[58] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isObject());
	
	frame.locals[operands.chomp(1)] = val;
}
codelen[58] = 2;

wide_mnemonics[58] = "wide astore";
wide_opcodes[58] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isObject());
	
	frame.locals[operands.chomp(2)] = val;
}
wide_codelen[58] = 3;

mnemonics[59] = "istore_0";
opcodes[59] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.locals[0] = val;
}
codelen[59] = 1;

mnemonics[60] = "istore_1";
opcodes[60] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.locals[1] = val;
}
codelen[60] = 1;

mnemonics[61] = "istore_2";
opcodes[61] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.locals[2] = val;
}
codelen[61] = 1;

mnemonics[62] = "istore_3";
opcodes[62] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.locals[3] = val;
}
codelen[62] = 1;

mnemonics[63] = "lstore_0";
opcodes[63] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.locals[0] = val;
}
codelen[63] = 1;

mnemonics[64] = "lstore_1";
opcodes[64] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.locals[1] = val;
}
codelen[64] = 1;

mnemonics[65] = "lstore_2";
opcodes[65] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.locals[2] = val;
}
codelen[65] = 1;

mnemonics[66] = "lstore_3";
opcodes[66] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.locals[3] = val;
}
codelen[66] = 1;

mnemonics[67] = "fstore_0";
opcodes[67] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.locals[0] = val;
}
codelen[67] = 2;

mnemonics[68] = "fstore_1";
opcodes[68] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.locals[1] = val;
}
codelen[68] = 2;

mnemonics[69] = "fstore_2";
opcodes[69] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.locals[2] = val;
}
codelen[69] = 2;

mnemonics[70] = "fstore_3";
opcodes[70] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.locals[3] = val;
}
codelen[70] = 2;

mnemonics[71] = "dstore_0";
opcodes[71] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.locals[0] = val;
}
codelen[71] = 1;

mnemonics[72] = "dstore_1";
opcodes[72] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.locals[1] = val;
}
codelen[72] = 1;

mnemonics[73] = "dstore_2";
opcodes[73] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.locals[2] = val;
}
codelen[73] = 1;

mnemonics[74] = "dstore_3";
opcodes[74] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.locals[3] = val;
}
codelen[74] = 1;

mnemonics[75] = "astore_0";
opcodes[75] = function(frame, operands) {
	var val = frame.o_stack.pop();
	//assert(val.isObject());
	
	frame.locals[0] = val;
}
codelen[75] = 1;

mnemonics[76] = "astore_1";
opcodes[76] = function(frame, operands) {
	var val = frame.o_stack.pop();
	//assert(val.isObject());
	
	frame.locals[1] = val;
}
codelen[76] = 1;

mnemonics[77] = "astore_2";
opcodes[77] = function(frame, operands) {
	var val = frame.o_stack.pop();
	//assert(val.isObject());
	
	frame.locals[2] = val;
}
codelen[77] = 1;

mnemonics[78] = "astore_3";
opcodes[78] = function(frame, operands) {
	var val = frame.o_stack.pop();
	//assert(val.isObject());
	
	frame.locals[3] = val;
}
codelen[78] = 1;

mnemonics[79] = "iastore";
opcodes[79] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	array.getValue()[index.getValue().toInt()] = val.copy();
}
codelen[79] = 1;

mnemonics[80] = "lastore";
opcodes[80] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	array.getValue()[index.getValue().toInt()] = val.copy();
}
codelen[80] = 1;

mnemonics[81] = "fastore";
opcodes[81] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	array.getValue()[index.getValue().toInt()] = val.copy();
}
codelen[81] = 1;

mnemonics[82] = "dastore";
opcodes[82] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	array.getValue()[index.getValue().toInt()] = val.copy();
}
codelen[82] = 1;

mnemonics[83] = "aastore";
opcodes[83] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isReference());
	
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	array.getValue()[index.getValue().toInt()] = val.copy();
}
codelen[83] = 1;

mnemonics[84] = "bastore";
opcodes[84] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isByte());
	
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	array.getValue()[index.getValue().toInt()] = val.copy();
}
codelen[84] = 1;

mnemonics[85] = "castore";
opcodes[85] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isChar());
	
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	array.getValue()[index.getValue().toInt()] = val.copy();
}
codelen[85] = 1;

mnemonics[86] = "sastore";
opcodes[86] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isShort());
	
	var index = frame.o_stack.pop();
	assert(index.isInt());
	
	var array = frame.o_stack.pop();
	assert(array.isArray());
	
	array.getValue()[index.getValue().toInt()] = val.copy();
}
codelen[86] = 1;

mnemonics[87] = "pop";
opcodes[87] = function(frame, operands) {
	frame.o_stack.pop();
}
codelen[87] = 1;

mnemonics[88] = "pop2";
opcodes[88] = function(frame, operands) {
	frame.o_stack.pop(); // No need to pop twice, since we store doubles/longs as a single entry
}
codelen[88] = 1;

mnemonics[89] = "dup";
opcodes[89] = function(frame, operands) {
	var val = frame.o_stack.pop();
	
	frame.o_stack.push(val);
	frame.o_stack.push(val.copy());
}
codelen[89] = 1;

mnemonics[90] = "dup_x1";
opcodes[90] = function(frame, operands) {
	var v1 = frame.o_stack.pop();
	var v2 = frame.o_stack.pop();
	
	frame.o_stack.push(v1);
	frame.o_stack.push(v2);
	frame.o_stack.push(v1.copy());
}
codelen[90] = 1;

mnemonics[91] = "dup_x2";
opcodes[91] = function(frame, operands) {
	var v1 = frame.o_stack.pop();
	var v2 = frame.o_stack.pop();
	var v3 = frame.o_stack.pop();
	
	frame.o_stack.push(v1);
	frame.o_stack.push(v2);
	frame.o_stack.push(v3);
	frame.o_stack.push(v1.copy());
}
codelen[91] = 1;

mnemonics[92] = "dup2";
opcodes[92] = function(frame, operands) {
	var val = frame.o_stack.pop();
	
	frame.o_stack.push(val);
	frame.o_stack.push(val.copy());
}
codelen[92] = 1;

mnemonics[93] = "dup2_x1";
opcodes[93] = function(frame, operands) {
	var v1 = frame.o_stack.pop();
	var v2 = frame.o_stack.pop();
	
	frame.o_stack.push(v1);
	frame.o_stack.push(v2);
	frame.o_stack.push(v1.copy());
}
codelen[93] = 1;

mnemonics[94] = "dup2_x2";
opcodes[94] = function(frame, operands) {
	var v1 = frame.o_stack.pop();
	var v2 = frame.o_stack.pop();
	var v3 = frame.o_stack.pop();
	
	frame.o_stack.push(v1);
	frame.o_stack.push(v2);
	frame.o_stack.push(v3);
	frame.o_stack.push(v1.copy());
}
codelen[94] = 1;

mnemonics[95] = "swap";
opcodes[95] = function(frame, operands) {
	var v1 = frame.o_stack.pop();
	var v2 = frame.o_stack.pop();
	
	frame.o_stack.push(v1);
	frame.o_stack.push(v2);
}
codelen[95] = 1;

mnemonics[96] = "iadd";
opcodes[96] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isInt() && b.isInt());
	
	frame.o_stack.push(new Value(new IntType(), a.getValue().add(b.getValue())));
}
codelen[96] = 1;

mnemonics[97] = "ladd";
opcodes[97] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new LongType(), a.getValue().add(b.getValue())));
}
codelen[97] = 1;

mnemonics[98] = "fadd";
opcodes[98] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isFloat() && b.isFloat());
	
	frame.o_stack.push(new Value(new FloatType(), a.getValue() + b.getValue()));
}
codelen[98] = 1;

mnemonics[99] = "dadd";
opcodes[99] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isDouble() && b.isDouble());
	
	frame.o_stack.push(new Value(new DoubleType(), a.getValue() + b.getValue()));
}
codelen[99] = 1;

mnemonics[100] = "isub";
opcodes[100] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isInt() && b.isInt());
	
	frame.o_stack.push(new Value(new IntType(), a.getValue().subtract(b.getValue())));
}
codelen[100] = 1;

mnemonics[101] = "lsub";
opcodes[101] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new LongType(), a.getValue().subtract(b.getValue())));
}
codelen[101] = 1;

mnemonics[102] = "fsub";
opcodes[102] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isFloat() && b.isFloat());
	
	frame.o_stack.push(new Value(new FloatType(), a.getValue() - b.getValue()));
}
codelen[102] = 1;

mnemonics[103] = "dsub";
opcodes[103] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isDouble() && b.isDouble());
	
	frame.o_stack.push(new Value(new DoubleType(), a.getValue() - b.getValue()));
}
codelen[103] = 1;

mnemonics[104] = "imul";
opcodes[104] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isInt() && b.isInt());
	
	frame.o_stack.push(new Value(new IntType(), a.getValue().multiply(b.getValue())));
}
codelen[104] = 1;

mnemonics[105] = "lmul";
opcodes[105] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new LongType(), a.getValue().multiply(b.getValue())));
}
codelen[105] = 1;

mnemonics[106] = "fmul";
opcodes[106] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isFloat() && b.isFloat());
	
	frame.o_stack.push(new Value(new FloatType(), a.getValue() * b.getValue()));
}
codelen[106] = 1;

mnemonics[107] = "dmul";
opcodes[107] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isDouble() && b.isDouble());
	
	frame.o_stack.push(new Value(new DoubleType(), a.getValue() * b.getValue()));
}
codelen[107] = 1;

mnemonics[108] = "idiv";
opcodes[108] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isInt() && b.isInt());
	
	frame.o_stack.push(new Value(new IntType(), a.getValue().div(b.getValue())));
}
codelen[108] = 1;

mnemonics[109] = "ldiv";
opcodes[109] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new LongType(), a.getValue().div(b.getValue())));
}
codelen[109] = 1;

mnemonics[110] = "fdiv";
opcodes[110] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isFloat() && b.isFloat());
	
	frame.o_stack.push(new Value(new FloatType(), a.getValue() / b.getValue()));
}
codelen[110] = 1;

mnemonics[111] = "ddiv";
opcodes[111] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isDouble() && b.isDouble());
	
	frame.o_stack.push(new Value(new DoubleType(), a.getValue() / b.getValue()));
}
codelen[111] = 1;

mnemonics[112] = "irem";
opcodes[112] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isInt() && b.isInt());
	
	frame.o_stack.push(new Value(new IntType(), a.getValue().modulo(b.getValue())));
}
codelen[112] = 1;

mnemonics[113] = "lrem";
opcodes[113] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new LongType(), a.getValue().modulo(b.getValue())));
}
codelen[113] = 1;

mnemonics[114] = "frem";
opcodes[114] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isFloat() && b.isFloat());
	
	frame.o_stack.push(new Value(new FloatType(), a.getValue() % b.getValue()));
}
codelen[114] = 1;

mnemonics[115] = "drem";
opcodes[115] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	
	assert(a.isDouble() && b.isDouble());
	
	frame.o_stack.push(new Value(new DoubleType(), a.getValue() % b.getValue()));
}
codelen[115] = 1;

mnemonics[116] = "ineg";
opcodes[116] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.o_stack.push(new Value(new IntType(), val.getValue().negate()));
}
codelen[116] = 1;

mnemonics[117] = "lneg";
opcodes[117] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.o_stack.push(new Value(new LongType(), val.getValue().negate()));
}
codelen[117] = 1;

mnemonics[118] = "fneg";
opcodes[118] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.o_stack.push(new Value(new FloatType(), -val.getValue()));
}
codelen[118] = 1;

mnemonics[119] = "dneg";
opcodes[119] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.o_stack.push(new Value(new DoubleType(), -val.getValue()));
}
codelen[119] = 1;

mnemonics[120] = "ishl";
opcodes[120] = function(frame, operands) {
	var dist = frame.o_stack.pop();
	var val = frame.o_stack.pop();
	assert(val.isInt() && dist.isInt());
	
	frame.o_stack.push(new Value(new IntType(), val.getValue().shiftLeft(dist.getValue())));
}
codelen[120] = 1;

mnemonics[121] = "lshl";
opcodes[121] = function(frame, operands) {
	var dist = frame.o_stack.pop();
	var val = frame.o_stack.pop();
	assert(val.isLong() && dist.isInt());
	
	frame.o_stack.push(new Value(new LongType(), val.getValue().shiftLeft(dist.getValue())));
}
codelen[121] = 1;

mnemonics[122] = "ishr";
opcodes[122] = function(frame, operands) {
	var dist = frame.o_stack.pop();
	var val = frame.o_stack.pop();
	assert(val.isInt() && dist.isInt());
	
	frame.o_stack.push(new Value(new IntType(), val.getValue().shiftRight(dist.getValue())));
}
codelen[122] = 1;

mnemonics[123] = "lshr";
opcodes[123] = function(frame, operands) {
	var dist = frame.o_stack.pop();
	var val = frame.o_stack.pop();
	assert(val.isLong() && dist.isInt());
	
	frame.o_stack.push(new Value(new LongType(), val.getValue().shiftRight(dist.getValue())));
}
codelen[123] = 1;

mnemonics[124] = "iushr";
opcodes[124] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.o_stack.push(new Value(new IntType(), val.getValue().shiftRightUnsigned()));
}
codelen[124] = 1;

mnemonics[125] = "lushr";
opcodes[125] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.o_stack.push(new Value(new LongType(), val.getValue().shiftRightUnsigned()));
}
codelen[125] = 1;

mnemonics[126] = "iand";
opcodes[126] = function(frame, operands) {
	var a = frame.o_stack.pop();
	var b = frame.o_stack.pop();
	
	assert(a.isInt() && b.isInt());
	
	frame.o_stack.push(new Value(new IntType(), a.getValue().and(b.getValue())));
}
codelen[123] = 1;

mnemonics[127] = "land";
opcodes[127] = function(frame, operands) {
	var a = frame.o_stack.pop();
	var b = frame.o_stack.pop();
	
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new LongType(), a.getValue().and(b.getValue())));
}
codelen[127] = 1;

mnemonics[128] = "ior";
opcodes[128] = function(frame, operands) {
	var a = frame.o_stack.pop();
	var b = frame.o_stack.pop();
	
	assert(a.isInt() && b.isInt());
	
	frame.o_stack.push(new Value(new IntType(), a.getValue().or(b.getValue())));
}
codelen[128] = 1;

mnemonics[129] = "lor";
opcodes[129] = function(frame, operands) {
	var a = frame.o_stack.pop();
	var b = frame.o_stack.pop();
	
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new LongType(), a.getValue().or(b.getValue())));
}
codelen[129] = 1;

mnemonics[130] = "ixor";
opcodes[130] = function(frame, operands) {
	var a = frame.o_stack.pop();
	var b = frame.o_stack.pop();
	
	assert(a.isInt() && b.isInt());
	
	frame.o_stack.push(new Value(new IntType(), a.getValue().xor(b.getValue())));
}
codelen[130] = 1;

mnemonics[131] = "lxor";
opcodes[131] = function(frame, operands) {
	var a = frame.o_stack.pop();
	var b = frame.o_stack.pop();
	
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new LongType(), a.getValue().xor(b.getValue())));
}
codelen[131] = 1;

mnemonics[132] = "iinc";
opcodes[132] = function(frame, operands) {
	var index = operands.chomp(1);
	
	var val = frame.locals[index];
	assert(val.isInt());
	
	val.value = val.getValue().add(Int.fromByte(operands.chomp(1)));
}
codelen[132] = 3;

wide_mnemonics[132] = "wide iinc";
wide_opcodes[132] = function(frame, operands) {
	var index = operands.chomp(2);
	
	var val = frame.locals[index];
	assert(val.isInt());
	
	val.value = val.getValue().add(Int.fromShort(operands.chomp(2)));
}
wide_codelen[132] = 5;

mnemonics[133] = "i2l";
opcodes[133] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.o_stack.push(new Value(new LongType(), val.getValue().toLong()));
}
codelen[133] = 1;

mnemonics[134] = "i2f";
opcodes[134] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.o_stack.push(new Value(new FloatType(), val.getValue().toFloat()));
}
codelen[134] = 1;

mnemonics[135] = "i2d";
opcodes[135] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.o_stack.push(new Value(new DoubleType(), val.getValue().toDouble()));
}
codelen[135] = 1;

mnemonics[136] = "l2i";
opcodes[136] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.o_stack.push(new Value(new IntType(), val.getValue().toInt()));
}
codelen[136] = 1;

mnemonics[137] = "l2f";
opcodes[137] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.o_stack.push(new Value(new FloatType(), val.getValue().toFloat()));
}
codelen[137] = 1;

mnemonics[138] = "l2d";
opcodes[138] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isLong());
	
	frame.o_stack.push(new Value(new DoubleType(), val.getValue().toDouble()));
}
codelen[138] = 1;

mnemonics[139] = "f2i";
opcodes[139] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.o_stack.push(new Value(new IntType(), Int.fromNumber(val.getValue())));
}
codelen[139] = 1;

mnemonics[140] = "f2l";
opcodes[140] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isFloat());
	
	frame.o_stack.push(new Value(new LongType(), Long.fromNumber(val.getValue())));
}
codelen[140] = 1;

mnemonics[141] = "f2d";
opcodes[141] = function(frame, operands) {
	// No need, since we store floats and doubles as the same thing
}
codelen[141] = 1;

mnemonics[142] = "d2i";
opcodes[142] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.o_stack.push(new Value(new IntType(), Int.fromNumber(val.getValue())));
}
codelen[142] = 1;

mnemonics[143] = "d2l";
opcodes[143] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isDouble());
	
	frame.o_stack.push(new Value(new LongType(), Long.fromNumber(val.getValue())));
}
codelen[143] = 1;

mnemonics[144] = "d2f";
opcodes[144] = function(frame, operands) {
	// No need
}
codelen[144] = 1;

mnemonics[145] = "i2b";
opcodes[145] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.o_stack.push(new Value(new ByteType(), val.getValue().toByte()));
}
codelen[145] = 1;

mnemonics[146] = "i2c";
opcodes[146] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.o_stack.push(new Value(new ByteType(), val.getValue().toChar()));
}
codelen[146] = 1;

mnemonics[147] = "i2s";
opcodes[147] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	frame.o_stack.push(new Value(new ByteType(), val.getValue().toShort()));
}
codelen[147] = 1;

mnemonics[148] = "lcmp";
opcodes[148] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	assert(a.isLong() && b.isLong());
	
	frame.o_stack.push(new Value(new IntType(), new Int(a.getValue().compare(b.getValue()))));
}
codelen[148] = 1;

mnemonics[149] = "fcmpl";
opcodes[149] = function(frame, operands) {
	var val1 = frame.o_stack.pop();
	var val2 = frame.o_stack.pop();
	var result = -1;
	if(val1 === val2)
		result = 0;
	else if (val1 > val2)
		result = -1;
	else
		result = 1;
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(result)));
}
codelen[149] = 1;

mnemonics[150] = "fcmpg";
opcodes[150] = function(frame, operands) {
	var val1 = frame.o_stack.pop();
	var val2 = frame.o_stack.pop();
	var result = 1;
	if(val1 === val2)
		result = 0;
	else if (val1 > val2)
		result = -1;
	else
		result = 1;
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(result)));
}
codelen[150] = 1;

mnemonics[151] = "dcmpl";
opcodes[151] = function(frame, operands) {
	var val1 = frame.o_stack.pop();
	var val2 = frame.o_stack.pop();
	var result = -1;
	if(val1 === val2)
		result = 0;
	else if (val1 > val2)
		result = -1;
	else
		result = 1;
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(result)))

}
codelen[151] = 1;

mnemonics[152] = "dcmpg";
opcodes[152] = function(frame, operands) {
	var val1 = frame.o_stack.pop();
	var val2 = frame.o_stack.pop();
	var result = 1;
	if(val1 === val2)
		result = 0;
	else if (val1 > val2)
		result = -1;
	else
		result = 1;
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(result)));
}
codelen[152] = 1;

mnemonics[153] = "ifeq";
opcodes[153] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	if(val.getValue().toInt() == 0) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[153] = 3;

mnemonics[154] = "ifne";
opcodes[154] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	if(val.getValue() != 0) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[154] = 3;

mnemonics[155] = "iflt";
opcodes[155] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	if(val.getValue().toInt() < 0) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[155] = 3;

mnemonics[156] = "ifge";
opcodes[156] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	if(val.getValue().toInt() >= 0) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[156] = 3;

mnemonics[157] = "ifgt";
opcodes[157] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	if(val.getValue().toInt() > 0) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[157] = 3;

mnemonics[158] = "ifle";
opcodes[158] = function(frame, operands) {
	var val = frame.o_stack.pop();
	assert(val.isInt());
	
	if(val.getValue().toInt() <= 0) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[158] = 3;

mnemonics[159] = "if_icmpeq";
opcodes[159] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	assert(a.isInt() && b.isInt());
	
	if(a.getValue().equals(b.getValue())) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[159] = 3;

mnemonics[160] = "if_icmpne";
opcodes[160] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	assert(a.isInt() && b.isInt());
	
	if(!a.getValue().equals(b.getValue())) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[160] = 3;

mnemonics[161] = "if_icmplt";
opcodes[161] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	assert(a.isInt() && b.isInt());
	
	if(a.getValue().lessThan(b.getValue())) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[161] = 3;

mnemonics[162] = "if_icmpge";
opcodes[162] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	assert(a.isInt() && b.isInt());
	
	if(a.getValue().greaterThanOrEqual(b.getValue())) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[162] = 3;

mnemonics[163] = "if_icmpgt";
opcodes[163] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	assert(a.isInt() && b.isInt());
	
	if(a.getValue().greaterThan(b.getValue())) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[163] = 3;

mnemonics[164] = "if_icmple";
opcodes[164] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	assert(a.isInt() && b.isInt());
	
	if(a.getValue().lessThanOrEqual(b.getValue())) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[164] = 3;

mnemonics[165] = "if_acmpeq";
opcodes[165] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	//assert(a.isReference() && b.isReference());
	
	if(a.getValue() == b.getValue()) {
		frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
	}
}
codelen[165] = 3;

mnemonics[166] = "if_acmpne";
opcodes[166] = function(frame, operands) {
	var b = frame.o_stack.pop();
	var a = frame.o_stack.pop();
	assert(a.isReference() && b.isReference());
	
	if(a.getValue() != b.getValue()) {
		frame.pc += frame.pc + Int.fromShort(operands.chomp(2)).toInt();
	}
}
codelen[166] = 3;

mnemonics[167] = "goto";
opcodes[167] = function(frame, operands) {
	frame.pc += Int.fromShort(operands.chomp(2)).toInt() - 3;
}
codelen[167] = 3;

mnemonics[168] = "jsr";
opcodes[168] = function(frame, operands) {
	frame.o_stack.push(frame.pc);
	frame.pc = frame.pc - 3 + Int.fromInt(operands.chomp(2)).toInt();
}
codelen[168] = 3;

mnemonics[169] = "ret";
opcodes[169] = function(frame, operands) {
	var addr = frame.locals[operands.chomp(1)];
	frame.pc = addr;	
}
codelen[169] = 2;

wide_mnemonics[169] = "wide ret";
wide_opcodes[169] = function(frame, operands) {
	var addr = frame.locals[operands.chomp(2)];
	frame.pc = addr;
}
wide_codelen[169] = 3;

mnemonics[170] = "tableswitch";
opcodes[170] = function(frame, operands) {
	alert("Opcode 170 not implemented: tableswitch.");
}
codelen[170] = 1;

mnemonics[171] = "lookupswitch";
opcodes[171] = function(frame, operands) {
	alert("Opcode 171 not implemented: lookupswitch.");
}
codelen[171] = 1;

mnemonics[172] = "ireturn";
opcodes[172] = function(frame, operands) {
	var ret = frame.o_stack.pop();
	var ret_frame = frame.getParentFrame();
	ret_frame.o_stack.push(ret);
	
	return ret_frame;
}
codelen[172] = 1;

mnemonics[173] = "lreturn";
opcodes[173] = function(frame, operands) {
	var ret = frame.o_stack.pop();
	var ret_frame = frame.getParentFrame();
	ret_frame.o_stack.push(ret);
	
	return ret_frame;
}
codelen[173] = 1;

mnemonics[174] = "freturn";
opcodes[174] = function(frame, operands) {
	var ret = frame.o_stack.pop();
	var ret_frame = frame.getParentFrame();
	ret_frame.o_stack.push(ret);
	
	return ret_frame;
}
codelen[174] = 1;

mnemonics[175] = "dreturn";
opcodes[175] = function(frame, operands) {
	var ret = frame.o_stack.pop();
	var ret_frame = frame.getParentFrame();
	ret_frame.o_stack.push(ret);
	
	return ret_frame;
}
codelen[175] = 1;

mnemonics[176] = "areturn";
opcodes[176] = function(frame, operands) {
	var ret = frame.o_stack.pop();
	var ret_frame = frame.getParentFrame();
	ret_frame.o_stack.push(ret);
	
	return ret_frame;
}
codelen[176] = 1;

mnemonics[177] = "return";
opcodes[177] = function(frame, operands) {
	return frame.getParentFrame();
}
codelen[177] = 1;

mnemonics[178] = "getstatic";
opcodes[178] = function(frame, operands) {
	cp_fieldref = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	static_field = frame.executor.get_static_field(178, cp_fieldref);
	if (static_field == false) {
		// if undefined, this means that we need to abort and rerun,
		// because we altered our frame "stack"
		return;
	}
	frame.o_stack.push(static_field);
}
codelen[178] = 3;

mnemonics[179] = "putstatic";
opcodes[179] = function(frame, operands) {
	cp_fieldref = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	var val = frame.o_stack.pop();
	if(!frame.executor.put_static_field(178, cp_fieldref, val)) {
		frame.o_stack.push(val);
	}
}
codelen[179] = 3;

mnemonics[180] = "getfield";
opcodes[180] = function(frame, operands) {
	var instance = frame.o_stack.pop();
	var cp_fieldref = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	var field_value = instance.value.get_field(cp_fieldref.field_name);
	
	//write_console('Get field '+cp_fieldref.class_name+'.'+cp_fieldref.field_name+'\n');
	
	assert(field_value != undefined, "Field '"+cp_fieldref.field_name+"' is undefined");
	
	frame.o_stack.push(field_value.copy());
}
codelen[180] = 3;

mnemonics[181] = "putfield";
opcodes[181] = function(frame, operands) {
	var val = frame.o_stack.pop();
	var instance = frame.o_stack.pop();
	var cp_fieldref = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	
	//write_console('Set field '+cp_fieldref.class_name+'.'+cp_fieldref.field_name+' = '+val+'\n');
	
	instance.value.put_field(cp_fieldref.field_name, val);
}
codelen[181] = 3;

mnemonics[182] = "invokevirtual";
opcodes[182] = function(frame, operands) {
	// get method_info from constant pool
	var method_info = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
		
	// push method arguments
	var arguments = new Array();
	var param_count = method_info.method_type.parameter_types.length
	for (var i = 0; i < param_count; i++) {
		arguments.push(frame.o_stack.pop());
	}
		
	// get reference to instance from operand stack
	var instance = frame.o_stack.pop();
	
	var the_class;
	
	if(instance instanceof Class) {
		write_console("Invoking a method on java.lang.Class!\n");
		the_class = find_class('java.lang.Class');
	} else {
		the_class = find_class(instance.value.classref.this_class);
	}
	
	// fetch the instance's runtime class (type)
	var the_method = the_class.getMethod(method_info.method_name, method_info.method_type);
	
	// create new frame and return it, unless method marked Native
	if (the_method.access_flags.Native) {
		// native methods manipulate the stack directly; no need to return a frame;
		// the following code() method looks the method up in Method.natives and calls
		// the corresponding JavaScript implementation if defined.
		the_method.code(frame, instance, arguments);
	} else {
		return the_method.createFrame(instance, arguments.reverse(), frame, frame.executor);
	}
}
codelen[182] = 3;

mnemonics[183] = "invokespecial";
opcodes[183] = function(frame, operands) {
	// get class and method info
	var method_info = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	
	// pop arguments & put in argument array
	var arguments = new Array();
	var param_count = method_info.method_type.parameter_types.length
	for (var i = 0; i < param_count; i++) {
		arguments.push(frame.o_stack.pop());
	}
	
	// pop objectref off stack
	var instance = frame.o_stack.pop();
	
	// find objectref's class, create new frame and return it
	var the_method = find_class(method_info.class_name).getMethod(method_info.method_name, method_info.method_type);
	if (the_method.access_flags.Native) {
		// native methods manipulate the stack directly; no need to return a frame;
		// the following code() method looks the method up in Method.natives and calls
		// the corresponding JavaScript implementation if defined.
		the_method.code(frame, instance, arguments);
	} else {
		return the_method.createFrame(instance, arguments.reverse(), frame, frame.executor);
	}
}
codelen[183] = 3;

mnemonics[184] = "invokestatic";
opcodes[184] = function(frame, operands) {
	var method_info = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	
	var arguments = new Array();
	var param_count = method_info.method_type.parameter_types.length
	for (var i = 0; i < param_count; i++) {
		arguments.push(frame.o_stack.pop());
	}
	
	var the_class = find_class(method_info.class_name);
	var the_method = the_class.getMethod(method_info.method_name, method_info.method_type);
	if (the_method.getAccessFlags().Native) {
		the_method.code(frame, arguments);
	} else {
		return the_method.createStaticFrame(arguments.reverse(), frame, frame.executor);
	}
}
codelen[184] = 3;

mnemonics[185] = "invokeinterface";
opcodes[185] = function(frame, operands) {
	// get interface and method info
	var imethod_info = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	
	// get # of arguments on stack
	var num_args = operands.chomp(1);
	
	// make sure last chomped byte is 0
	if (operands.chomp(1) != 0) {
		write_console("Error: malformed invokeinterface call; last byte not zero.");
	}
	
	// pop arguments & put in argument array
	var arguments = new Array();
	var param_count = imethod_info.method_type.parameter_types.length;
	for (var i = 0; i < param_count; i++) {
		arguments.push(frame.o_stack.pop());
	}
	
	// pop objectref off stack
	var instance = frame.o_stack.pop();
}
codelen[185] = 5;

var JSVM_HOOK_OPCODE = 186;
mnemonics[186] = "jsvm_hook";
opcodes[186] = function(frame, operands) {
	var class_name = frame.method.class_name;
	var method_name = frame.method.name;
	
	return hooks[class_name][method_name](frame.executor);
}
codelen[186] = 1;

mnemonics[187] = "new";
opcodes[187] = function(frame, operands) {
	var cp_class_info = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	var instance = new Instance(cp_class_info);
	frame.o_stack.push(new Value(new ObjectType(cp_class_info.this_class), instance));
}
codelen[187] = 3;

mnemonics[188] = "newarray";
opcodes[188] = function(frame, operands) {
	// the actual array_size is irrelevant in Javascript
	// but it needs to be removed from operand stack anyway
	var array_type_num = operands.chomp(1);
	var array_size = frame.o_stack.pop();
	var array_type;

	switch(array_type_num) {
		case 4:
			array_type = new BooleanType();
			break;
		case 5:
			array_type = new CharType();
			break;
		case 6:
			array_type = new FloatType();
			break;
		case 7:
			array_type = new DoubleType();
			break;
		case 8:
			array_type = new ByteType();
			break;
		case 9:
			array_type = new ShortType();
			break;
		case 10:
			array_type = new IntType();
			break;
		case 11:
			array_type = new LongType();
			break;
		default:
			throw new Error("Invalid array type "+array_type);
	}
	frame.o_stack.push(new Value(new ArrayType(array_type), new Array()));
}
codelen[188] = 2;

mnemonics[189] = "anewarray";
opcodes[189] = function(frame, operands) {
	var array_size = frame.o_stack.pop();
	var cp_classref = frame.method.getConstantPoolValueAtIdx(operands.chomp(2));
	frame.o_stack.push(new Value(new ArrayType(cp_classref.this_class), new Array()));
}
codelen[189] = 3;

mnemonics[190] = "arraylength";
opcodes[190] = function(frame, operands) {
	var arrayRef = frame.o_stack.pop();
	frame.o_stack.push(new Value(new IntType(), Int.fromInt(arrayRef.getValue().length)));
}
codelen[190] = 1;

mnemonics[191] = "athrow";
opcodes[191] = function(frame, operands) {
	alert("Opcode 191 not implemented: athrow.");
}
codelen[191] = 1;

mnemonics[192] = "checkcast";
opcodes[192] = function(frame, operands) {
	write_console("Checking of casts is not supported.");
}
codelen[192] = 3;

mnemonics[193] = "instanceof";
opcodes[193] = function(frame, operands) {
	//This one is difficult.
	alert("Opcode 193 not implemented: instanceof.");
}
codelen[193] = 3;

mnemonics[194] = "monitorenter";
opcodes[194] = function(frame, operands) {
	//Related to threads
	write_console("Opcode 194 (monitorenter) not implemented.");
}
codelen[194] = 1;

mnemonics[195] = "monitorexit";
opcodes[195] = function(frame, operands) {
	//Related to threads
	write_console("Opcode 195 (monitorexit) not implemented.");
}
codelen[195] = 1;

mnemonics[196] = "wide";
opcodes[196] = function(frame, operands) {

}
codelen[196] = 1;

mnemonics[197] = "multianewarray";
function MakeArray(arrayref, dim_list){
	if (dim_list.length==0){ 
		return; 
	}
	var width = dim_list.pop();
	if (width == 0){
		return; 
	}
	for(var i in width){
		arrayref[i] = new Array();
		makeArray(arrayref[i], dim_list.slice(0, dim_list.length));
	}
}
opcodes[197] = function(frame, operands) {
	var type = ParseArrayDescriptor(frame.method.getConstantPoolValueAtIdx(operands.chomp(2)));
	var num_dimensions = operands.chomp(1);
	var a = new Array();
	var dim_list = new Array();
	for (var i = 0; i < num_dimensions; i++) {
		dim_list[i] = frame.o_stack.pop();
	}
	makeArray(a, dim_list.slice(0, dim_list.length).reverse());
	
	frame.o_stack.push(new Value(type, a));
}
codelen[197] = 4;

mnemonics[198] = "ifnull";
opcodes[198] = function(frame, operands) {
	if(frame.o_stack.pop() == NULL){
		frame.pc += operands.chomp(2) - 3;
	}
}
codelen[198] = 3;

mnemonics[199] = "ifnonnull";
opcodes[199] = function(frame, operands) {
	if(frame.o_stack.pop() != NULL){
		frame.pc += operands.chomp(2) - 3;
	}
}
codelen[199] = 3;

mnemonics[200] = "gochev_w";
opcodes[200] = function(frame, operands) {
	frame.pc += Int.fromInt(operands.chomp(4)).toInt();
}
codelen[200] = 5;

mnemonics[201] = "jsr_w";
opcodes[201] = function(frame, operands) {
	frame.o_stack.push(frame.pc);
	frame.pc = frame.pc - 5 + Int.fromInt(operands.chomp(4)).toInt();
}
codelen[201] = 5;

mnemonics[202] = "breakpoint";
opcodes[202] = function(frame, operands) {
	alert("Reserved opcode 202 not implemented: breakpoint.");
}
codelen[202] = 1;

mnemonics[203] = "ldc_quick";
opcodes[203] = function(frame, operands) {

}
codelen[203] = 1;

mnemonics[204] = "ldc_w_quick";
opcodes[204] = function(frame, operands) {

}
codelen[204] = 1;

mnemonics[205] = "ldc2_w_quick";
opcodes[205] = function(frame, operands) {

}
codelen[205] = 1;

mnemonics[206] = "getfield_quick";
opcodes[206] = function(frame, operands) {

}
codelen[206] = 1;

mnemonics[207] = "putfield_quick";
opcodes[207] = function(frame, operands) {

}
codelen[207] = 1;

mnemonics[208] = "getfield2_quick";
opcodes[208] = function(frame, operands) {

}
codelen[208] = 1;

mnemonics[209] = "putfield2_quick";
opcodes[209] = function(frame, operands) {

}
codelen[209] = 1;

mnemonics[210] = "getstatic_quick";
opcodes[210] = function(frame, operands) {

}
codelen[210] = 1;

mnemonics[211] = "putstatic_quick";
opcodes[211] = function(frame, operands) {

}
codelen[211] = 1;

mnemonics[212] = "getstatic2_quick";
opcodes[212] = function(frame, operands) {

}
codelen[212] = 1;

mnemonics[213] = "putstatic2_quick";
opcodes[213] = function(frame, operands) {

}
codelen[213] = 1;

mnemonics[214] = "invokevirtual_quick";
opcodes[214] = function(frame, operands) {

}
codelen[214] = 1;

mnemonics[215] = "invokenonvirtual_quick";
opcodes[215] = function(frame, operands) {

}
codelen[215] = 1;

mnemonics[216] = "invokesuper_quick";
opcodes[216] = function(frame, operands) {

}
codelen[216] = 1;

mnemonics[217] = "invokestatic_quick";
opcodes[217] = function(frame, operands) {

}
codelen[217] = 1;

mnemonics[218] = "invokeinterface_quick";
opcodes[218] = function(frame, operands) {

}
codelen[218] = 1;

mnemonics[219] = "invokevirtualobject_quick";
opcodes[219] = function(frame, operands) {

}
codelen[219] = 1;

mnemonics[221] = "new_quick";
opcodes[221] = function(frame, operands) {

}
codelen[221] = 1;

mnemonics[222] = "anewarray_quick";
opcodes[222] = function(frame, operands) {

}
codelen[222] = 1;

mnemonics[223] = "multianewarray_quick";
opcodes[223] = function(frame, operands) {

}
codelen[223] = 1;

mnemonics[224] = "checkcast_quick";
opcodes[224] = function(frame, operands) {

}
codelen[224] = 1;

mnemonics[225] = "instanceof_quick";
opcodes[225] = function(frame, operands) {

}
codelen[225] = 1;

mnemonics[226] = "invokevirtual_quick_w";
opcodes[226] = function(frame, operands) {

}
codelen[226] = 1;

mnemonics[227] = "getfield_quick_w";
opcodes[227] = function(frame, operands) {

}
codelen[227] = 1;

mnemonics[228] = "putfield_quick_w";
opcodes[228] = function(frame, operands) {

}
codelen[228] = 1;

mnemonics[254] = "impdep1";
opcodes[254] = function(frame, operands) {
	alert("Reserved opcode 254 not implemented: impdep1.");
}
codelen[254] = 1;

mnemonics[255] = "impdep2";
opcodes[255] = function(frame, operands) {
	alert("Reserved opcode 255 not implemented: impdep2.");
}
codelen[255] = 1;

mnemonics[undefined] = "Ran off end of array";
opcodes[undefined] = function(frame, operands) {
	alert("Ran off end of array!");
	throw "ohShit";
}
codelen[undefined] = 1;