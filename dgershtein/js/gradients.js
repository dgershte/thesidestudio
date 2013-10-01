

$(document).ready(function () {
	var element = document.getElementById('gradient');
	gradient = new Gradient(element, [0, 255]);
	gradient.push(0,255);
	gradient.shift();
	gradient.map(function(stop){
	    return Math.min(255, stop + 100);
	});
	gradient.unshift(0);
	gradient.pop();
});

function Gradient(element,  arr){

    this.arr = arr;
    this.element = element;
    
    // draws/redraws the gradient
    this.draw = function() {
	
	this.clearDivs();
	
	var diameter = this.element.clientHeight;
	var numStops = this.arr.length;
	
	if(numStops == 0){
		this.clear();
	} else {
		var sectionLength = numStops>1 ? (diameter/2)/(numStops-1) : 1;
		
		var width = diameter;
		
		for(var i = 0; i < numStops-1; i++){
		    
			var increment = (this.arr[i+1] - this.arr[i])/(2*sectionLength);
		    
		    var k = this.arr[i];
		    
		    var renderK = k;
		    
		    //draw divs, decreasing height/width by 1px every time
		    for(var j = 0; j < sectionLength*2; ++j){
			var div = document.createElement('div');
			div.style.width = diameter + "px";
			div.style.height = diameter + "px";
			div.style.top = (width-diameter)/2;
			div.style.left = (width-diameter)/2;
			div.style.borderRadius = diameter/2;
			div.style.MozBorderRadius = diameter/2;
			div.style.WebkitBorderRadius = diameter/2;
			div.style.position = "absolute";
			div.style.backgroundColor = 'rgb('+renderK+','+renderK+','+renderK+')';
			k += increment;
			renderK = Math.floor(k);
			diameter-=1;
			this.element.appendChild(div);
		    }
		}
	}    
    }    
    
    //clear divs
    this.clearDivs = function () {
	while( this.element.hasChildNodes() ){
		this.element.removeChild(this.element.lastChild);
	}
    }
    
    //clears the gradient
    this.clear = function () {
	this.clearDivs();
	this.arr = [];
    }
    
    //removes and returns the last stop
    this.pop = function () {
	var temp = this.arr.pop();
	this.draw();
	return temp;
    }
    
    //removes and returns the first stop
    this.shift = function() {
	var temp = this.arr.shift();
	this.draw();
	return temp;
    }
    
    //appends given stops to the beginning of the gradient
    this.unshift = function(){
	for(var i = 0; i < arguments.length; ++i){
		this.arr.unshift(arguments[i]);
	}
	this.draw();
    }
    
    //appends given stops to the end of the gradient
    this.push = function () {
	for(var i = 0; i < arguments.length; ++i){
	    this.arr.push(arguments[i]);
	}
	this.draw();
    }
    
    //reverse the order of all stops
    this.reverse = function() {
	this.arr.reverse();
	this.draw();
    }
    
    //modifies the gradient by calling the callback for every stop
    this.map = function(callback) {
	for(var i = 0; i < this.arr.length; ++i){
		this.arr[i] = callback(this.arr[i]);
	}
	this.draw();
    }
    
    //sorts the stops (via an optional comparison callback)
    this.sort = function(callback) {
	this.arr.sort(callback);
	this.draw();
    }
    
    return this.draw();
    
}

$("form#push").submit(function() {
	alert("yeah");
});
