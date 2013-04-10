
function Package() {
	this.classes = {};
	this.subpackages = {};
}

Package.prototype.classes = 'Package classes';
Package.prototype.subpackages = 'Package subpackages';

Package.prototype.addClass = function(obj) {
	if(!(obj instanceof Class)) {
		return false;
	} else if(obj.getName() in this.classes) {
		return false;
	}

	this.classes[obj.getName()] = obj;
	return true;
}

Package.prototype.getClass = function(name) {
	if(!(name in this.classes)) {
		return false;
	}

	return this.classes[name];
}

Package.prototype.getPackage = function(name) {
	if(!(name in this.subpackages)) {
		this.subpackages[name] = new Package();
	}

	return this.subpackages[name];
}

Package.prototype.getDepth = function() {
	var max_depth = 0;
	for(p in this.subpackages) {
		var subp = this.getPackage(p);
		var d = subp.getDepth();
		if(d > max_depth) {
			max_depth = d;
		}
	}

	for(c in this.classes) {
		return max_depth+1;
	}

	if(max_depth == 0) {
		return 0;
	} else {
		return 1+max_depth;
	}
}

Package.prototype.getClasses = function() {
	keys = [];

	for(c in this.classes) {
		keys.push(c);
	}

	return keys;
}

Package.prototype.getPackages = function() {
	keys = [];

	for(p in this.subpackages) {
		keys.push(p);
	}

	return keys;
}

Classpath = new Package();

function find_package(path) {
	var i = 0;
	var p = Classpath;
	while(i < path.length) {
		if(path[i].length > 0) {
			p = p.getPackage(path[i]);
		}
		i++;
	}

	return p;
}

function register_class(obj) {
	var p = find_package(obj.getPackage().split('.'));
	return p.addClass(obj);
}
