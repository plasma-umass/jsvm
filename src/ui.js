var stdin_waiters = [];
var cursor = String.fromCharCode(888);

document.onkeydown = special_key_pressed;
document.onkeypress = key_pressed;

function load_file(form) {
	var files = form.selected_files.files;

	for(var i = 0; i < files.length; i++) {
		var f = files[i];
		var reader = new FileReader();

		reader.onload = function(e) {
			var obj = load_class(e.target.result);
			if(obj) {
				if(register_class(obj)) {
					write_console('Loaded class '+obj.getFullyQualifiedName()+'\n');
					update_classpath_table();
				} else {
					alert("Could not register class "+obj.getName());
				}
			} else {
				alert("Error when loading class "+class_name);
			}
		};

		reader.onerror = function(e) {
			alert("Unable to read file");
			alert(reader.error.code);
		};

		reader.readAsBinaryString(f);
	}
}

function htmlEncode(value) {
	var div = document.createElement('div');
	var text = document.createTextNode(value);
	div.appendChild(text);
	return div.innerHTML;
}

function dispatch_stdin(c) {
	if(stdin_waiters.length > 0) {
		var waiter = stdin_waiters.pop();
		waiter(c);
	}
}

function read_stdin(handler) {
	stdin_waiters.push(handler);
}

function special_key_pressed(e) {
	if(e.keyCode == 8) {	// Backspace
		dispatch_stdin('\b');
		return false;
		
	} else if(e.keyCode == 27) {	// Escape
		Executor.interrupt(function(e) {
			if(e.single_step) {
				e.single_step = false;
				write_console("Resuming normal execution.\n");
			} else {
				e.single_step = true;
				write_console("Switching to single-step mode.\n");
			}
		});
		
		dispatch_stdin(String.fromCharCode(e.keyCode));
		return false;
	}
}

function key_pressed(e) {
	dispatch_stdin(String.fromCharCode(e.keyCode));

	return false;
}

function write_console(s) {
	var console_body = document.getElementById("console_body");
	var console = document.getElementById("console");

	var text = console_body.innerHTML;

	if(text[text.length-1] == cursor) {
		text = text.substring(0, text.length-1);
	}
	s += cursor;

	console_body.innerHTML = text + htmlEncode(s);

	window.setTimeout(function() {
		console.scrollTop = console.scrollHeight;
	}, 0);
}

function run_class(class_name) {
	var c = find_class(class_name);

	if(c) {
		var main = c.getMethod('main', new MethodType(new VoidType(), [new ArrayType(new ObjectType('java.lang.String'))]));
		
		write_console("running "+c.getFullyQualifiedName()+".main\n");
		
		var frame = main.createStaticFrame([], false, null);
		
		var executor = new Executor(frame, function() {
			write_console("program terminated normally\n");
		},
		function(err) {
			write_console("program aborted with error \""+err+"\"\n");
		});
		
		frame.executor = executor;
		
		executor.run();

	} else {
		alert("Could not locate class "+class_name);
	}
}

function update_classpath_table() {
	var table = document.getElementById("classpath");

	var depth = Classpath.getDepth();

	var html = "";

	// add the header row
	html += "<tr><th colspan="+depth+">Loaded Classes</th></tr>";

	var output = build_classpath_table(Classpath, depth);

	for(r in output) {
		html += "<tr>"+output[r]+"</tr>";
	}

	table.innerHTML = html;
}

function build_classpath_table(p, max_depth) {
	var rows = [];

	var classes = p.getClasses();
	var packages = p.getPackages();

	classes.sort();
	packages.sort();

	for(i in classes) {
		var class_name = classes[i];
		var obj = p.getClass(class_name);

		if(obj.isRunnable()) {
			rows.push("<td colspan="+max_depth+"><a href=\"javascript:run_class(\'"+obj.getFullyQualifiedName()+"\')\">"+class_name+"</a></td>");
		} else {
			rows.push("<td colspan="+max_depth+">"+class_name+"</td>");
		}
	}

	for(i in packages) {
		var package_name = packages[i];
		var obj = p.getPackage(package_name);
		var sub_rows = build_classpath_table(obj, max_depth-1);

		var first = true;
		for(i in sub_rows) {
			if(first) {
				rows.push("<td rowspan="+sub_rows.length+">"+package_name+"</td>"+sub_rows[i]);
				first = false;
			} else {
				rows.push(sub_rows[i]);
			}
		}
	}

	return rows;
}

var DEBUG_LEVEL = 3;

function assert(cond, msg, level) {
	if(level == undefined) {
		level = 1;
	}
	
	if(level <= DEBUG_LEVEL && !cond) {
		if(msg == undefined) {
			msg = 'Swedish fish by zero!  Am fool?';
		}
		write_console('ASSERT FAILED: '+msg+'\n');
		throw 'ohshit';
	}
}

function getBinary(file){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", file, false);  
	xhr.overrideMimeType("text/plain; charset=x-user-defined");  
	xhr.send(null);
	
	var data = xhr.responseText;
	var result = '';
	
	for(var i = 0; i < data.length-1; i++) {
		result += String.fromCharCode(data.charCodeAt(i)&0xff);
	}
	
	return result;
}

function get_jre_class(name) {
	class_path = document.URL.split('/');
	class_path.pop();
	class_path = class_path.join('/') + '/jre/' + name.split('.').join('/') + '.class';
	
	var data = getBinary(class_path);
	
	var obj = load_class(data);
	if(obj) {
		if(register_class(obj)) {
			update_classpath_table();
			return obj;
		}
	} else {
		return false;
	}
}

function find_class(full_name) {
	var path = full_name.split('.');
	var classname = path.pop();
	
	var p = find_package(path);

	var c = p.getClass(classname);
		
	if(c) {
		return c;
	}
		
	c = get_jre_class(full_name);
	if(c) {
		return c;
	}
	
	throw 'Missing class: '+full_name;
}

function missing_class(shtrue, class_name) {
	if (shtrue) {
		alert(class_name + " appears not to be loaded.");
	}
}

function dump_console(obj) {
	write_console(dump(obj));
}

// stolen from http://www.openjs.com/scripts/others/dump_function_php_print_r.php
function dump(arr,level) {
	var dumped_text = "\n";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "  ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text+'\n';
}
