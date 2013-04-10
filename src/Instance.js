function Instance(classref) {
	this.classref = classref;
	this.fields = new Array();

	var c = this.classref;
	while(c != false) {
		for(f in c.fields) {
			this.fields[c.fields[f].name] = c.fields[f].type.getDefault();
		}
		
		if(c.super_class == JAVASCRIPT_SUCKS) {
			c = false;
		} else {
			c = find_class(c.super_class)
		}
	}
}

Instance.prototype.put_field = function(field_name, val) {
	this.fields[field_name] = val.copy();
}

Instance.prototype.get_field = function(field_name) {
	return this.fields[field_name];
}

Instance.prototype.toString = function() {
	return 'instance';
}
