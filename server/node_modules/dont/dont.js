#!/usr/bin/env node

function dont(){
	return (this instanceof dont) ? this : new dont();
};

// degrees to radians, with offset
dont.prototype.rad = function(degrees, offset) {
	return (((degrees+((!!offset)?offset:0))%360)*(Math.PI/180));
};

// create a donut segment
dont.prototype.segment = function(cx, cy, ri, ro, ds, de, offset) { // center x, center y, hole radius, edge radius, degree start, degree end, offset

	// intermediate step needed?
	var di = (de-ds > 180) ? this.rad(((de-ds)/2)+ds, offset) : null;

	// convert degrees to radians, with offset
	ds = this.rad(ds, offset);
	de = this.rad(de, offset);
		
	return [ 
		
		// move to first corner
		"M", (ri * Math.cos(ds) + cx), (ri * Math.sin(ds) + cy),
	
		// arc to intermediate corner
		((di) ? [ "A", ri, ri, 0, 0, 1, (ri * Math.cos(di) + cx), (ri * Math.sin((di)) + cy) ].join(" ") : null),
	
		// arc to second corner
		"A", ri, ri, 0, 0, 1, (ri * Math.cos(de) + cx), (ri * Math.sin(de) + cy),
	
		// line to third corner
		"L", (ro * Math.cos(de) + cx), (ro * Math.sin(de) + cy),

		// arc to intermediate corner
		((di) ? [ "A", ro, ro, 0, 0, 0, (ro * Math.cos((di)) + cx), (ro * Math.sin((di)) + cy) ].join(" ") : null),

		// arc to fourth corner
		"A", ro, ro, 0, 0, 0, (ro * Math.cos(ds) + cx), (ro * Math.sin(ds) + cy),
	
		// line to first corner
		"L", (ri * Math.cos(ds) + cx), (ri * Math.sin(ds) + cy),
	
	].filter(function(v){ return (v !== null); }).join(" ");
	
};

// get the radius for a percentage of the donut segment by area
dont.prototype.area = function(ri, ro, ra) { // hole radius, edge radius, ratio 0..1
	return Math.sqrt(((((ro*ro*Math.PI)-(ri*ri*Math.PI))*ra)+(ri*ri*Math.PI))/Math.PI);
};

// draw a donut
dont.prototype.draw = function(data, options) {
	return new Error("Not Implemented");
};

module.exports = dont;
