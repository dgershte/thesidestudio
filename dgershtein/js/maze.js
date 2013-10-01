
//Box object to hold data for all drawn rects
function Box() {
  this.x = 1;
  this.y = 1;
  this.vadj = 0;
  this.hadj = 0;
  this.w = 1; 
  this.h = 1;
  this.fill = 'black';
}

//Initialize a new Box, add it, and invalidate the canvas
function addRect(x, y, w, h, fill) {
  var rect = new Box;
  rect.x = x;
  rect.y = y;
  rect.w = w
  rect.h = h;
  rect.fill = fill;
  boxes.push(rect);
  invalidate();
}

// holds all squares
var boxes = []; 

var canvas;
var ctx;
var WIDTH;
var HEIGHT;
var INTERVAL = 20; 
var NUM;
var BOXSIZE;
var SCALE;
var Adj;

var isDrag = false;
var mx, my; // mouse coordinates

var canvasValid = false;

var mySel; 

var mySelColor = '#CC0000';
var mySelWidth = 2;

var ghostcanvas;
var gctx; 

var pathcanvas;
var pctx;

var sidecanvas;
var sidectx;

var gridcanvas;

var offsetx, offsety;

var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;


function reset() {
  clear(ctx);
  clear(pctx);
  clear(gctx);
  ctx = null;
  pct = null
  gctx = null;
  Adj = new Array(NUM*NUM);

  boxes = []; 
}	  



// initialize our canvas, add a ghost canvas, set draw loop
// then add everything
function init() {
  NUM = 5;
  
  Adj = new Array(NUM*NUM);
  canvas = document.getElementById('canvas');
  HEIGHT = canvas.height;
  WIDTH = canvas.width;
  SCALE = WIDTH/NUM;
  SPACE = SCALE/10;
  BOXSIZE = SCALE-SPACE;
  ctx = canvas.getContext('2d');
  
  ghostcanvas = document.createElement('canvas');
  ghostcanvas.height = HEIGHT;
  ghostcanvas.width = WIDTH;
  gctx = ghostcanvas.getContext('2d');
  
  pathcanvas = document.createElement('canvas');
  pathcanvas.height = HEIGHT;
  pathcanvas.width = WIDTH;
  pctx = pathcanvas.getContext('2d');
  
  clear(pctx);
  clear(ctx);
  clear(gctx);

  boxes = []; 
  // fixes mouse co-ordinate problems when there's a border or padding
  
  if (document.defaultView && document.defaultView.getComputedStyle) {
    stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  

    
    
  // make draw() go every INTERVAL milliseconds
  setInterval(draw, INTERVAL);

    
    
  canvas.onmousedown = myDown;
  
  clear(pctx);
  clear(ctx);
  clear(gctx);
  // add squares
  for(var i = 0; i < NUM; i++){
	  for(var j = 0; j < NUM; j++){
 	  	addRect(j*(BOXSIZE+SPACE), i*(BOXSIZE+SPACE), BOXSIZE, BOXSIZE, 'black');
	  }
  }
}

//wipes the canvas context
function clear(c) {
  c.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
  if (canvasValid == false) {
    clear(ctx);
    
    // draw all boxes
    var l = boxes.length;
    
    ctx.beginPath();
    ctx.strokeStyle = "#a0a0a0";
    ctx.lineWidth = 1;
    
    for(var i = 47.5; i < 480; i+=50){
        ctx.moveTo(i,0);
        ctx.lineTo(i,HEIGHT);
        ctx.moveTo(0,i);
        ctx.lineTo(WIDTH,i);
    }
    
    ctx.stroke();
    
    for (var i = 0; i < NUM*NUM; i++) {
        drawshape(ctx, boxes[i], boxes[i].fill);
    }
    
    canvasValid = true;
  }
}

function drawshape(context, shape, fill) {
  context.fillStyle = fill;
  context.fillRect(shape.x,shape.y,shape.w,shape.h);
  //context.drawArc(shape.x, shape.y, pi/2, 1);
}

var START = null;
var prevSel = null;

// mouse is clicked
function myDown(e){
  getMouse(e);
  clear(gctx);
  var l = boxes.length;
  for (var i = l-1; i >= 0; i--) {
    // draw shape onto ghost context
    drawshape(gctx, boxes[i], 'black');
    
    // get image data at the mouse x,y pixel
    var imageData = gctx.getImageData(mx, my, 1, 1);
    var index = (mx + my * imageData.width) * 4;

    // if the mouse pixel exists, select and break
    if (imageData.data[3] > 0) {
      mySel = boxes[i];
	  if(START==null) START=mySel;
	  if(prevSel!=null) {
		  //make sure this is adjacent square
		  if(is_adjacent(mySel,prevSel,Adj,i)) {
			  			  
			  ctx.beginPath();
			  ctx.strokeStyle = "black";
			  ctx.lineWidth = BOXSIZE;
			  ctx.moveTo(mySel.x+(BOXSIZE/2),mySel.y+(BOXSIZE/2));
			  ctx.lineTo(prevSel.x+(BOXSIZE/2),prevSel.y+(BOXSIZE/2));
			  ctx.closePath();
			  ctx.stroke();
			  
			  if(i==boxes.length-1){
				   //print();		
				   start = START.x/SCALE + (START.y/SCALE)*NUM;

				   findShortestPath(Adj,start,boxes.length-1);
			  }
		  }
	  }
	  
	  prevSel = mySel;
      offsetx = mx - mySel.x;
      offsety = my - mySel.y;
      mySel.x = mx - offsetx;
      mySel.y = my - offsety;
      return;
    }

    
  }
  // havent returned means we have selected nothing
  mySel = null;
  prevSel = null;

  
  //clear(gctx);
  //invalidate();
}

function get_boxnumber(point){
    return point.x/SCALE + (point.y/SCALE)*NUM;
}

function is_adjacent(mySel,prevSel,Adj,curBox){
    var min = get_boxnumber(prevSel);
    var max = curBox;
    if(min>curBox){
        max = min;
        min = curBox;
    }

    if(mySel.y == prevSel.y){ //same row, add all elements between prevSel and mySel to eachother's adj list
        for(min ; min < max; min++){
            if(Adj[min]==null){
                Adj[min] = new Array();
            }	
            if(Adj[min+1]==null){
                Adj[min+1] = new Array();
            }		  
            if(Adj[min].indexOf(min+1)<0) Adj[min].push(min+1); //make sure there's no repeats!
            if(Adj[min+1].indexOf(min)<0) Adj[min+1].push(min);
        }
        return true;
    }
    else if(mySel.x == prevSel.x){ // same column... more math :(
        var nextMin=0;  
        while(min!=max){
            nextMin = (min+(NUM*1)); //treats this as string... why?!
            
            if(Adj[min]==null) Adj[min] = new Array();
            if(Adj[nextMin]==null) Adj[nextMin] = new Array();	  
            if(Adj[nextMin].indexOf(min)<0) Adj[nextMin].push(min);
            
            if(Adj[min].indexOf(nextMin)<0) Adj[min].push(nextMin); //make sure there's no repeats!
            min=nextMin;
        }
        return true;
    }
    return false;
}
	
function invalidate() {
  canvasValid = false;
}

function getMouse(e) {
      var element = canvas, offsetX = 0, offsetY = 0;

      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }

      // Add padding and border style widths to offset
      offsetX += stylePaddingLeft;
      offsetY += stylePaddingTop;

      offsetX += styleBorderLeft;
      offsetY += styleBorderTop;

      mx = e.pageX - offsetX;
      my = e.pageY - offsetY
}


var d = new Array(boxes.length);
var c = new Array(boxes.length);
var p = new Array(boxes.length);

function findShortestPath(Board,start,end){
	
	var Q = new Array();
	
	for(var i =0; i < boxes.length; i++){
		 d[i] = 0;
		 c[i] = 'w';
	}
	
	c[start] = 'g'; 
	Q.push(start);
	
	var u, v;
	while(Q.length!=0){
		u = Q.shift();
		for(var i =0; i < Board[u].length; i++){
			v = Board[u][i] ;
			if(c[v] == 'w'){
				c[v] = 'g';
				d[v] = d[u] +1;
				p[v] = u;
				Q.push(v);
			}
		}
		c[u] ='b';
	}
	
	//start = START.x/BOXSIZE + (START.y/BOXSIZE)*NUM;
    start = get_boxnumber(START);
	printPath(start,boxes.length-1);
}


function printPath(start,end){
	var k = d[end];
	var A = new Array(k);
	var i = end;
	
	
	A[0] = start;
	while(k > 0){
		A[k] = i;
		i = p[i];
		k--;
	}
	ctx.beginPath();
	ctx.strokeStyle = "#119ae2";
	ctx.lineWidth = SPACE;

	ctx.moveTo(START.x+(SCALE-SPACE)/2,START.y+(SCALE-SPACE)/2);
	
	i = 1;
	setInterval( function() {
		drawPath(i);
		i++;
	} ,20);	
	function drawPath(i){
		col = (A[i])%NUM +1;
		row = Math.floor((A[i])/NUM) +1;
		ctx.lineTo(col*SCALE-(SCALE+SPACE)/2,row*SCALE-(SCALE+SPACE)/2);
		ctx.stroke();
	}
}


function print() {
	for(var i = 0; i < Adj.length-1; i++) {
		if(Adj[i]){
			document.write("{");
			for(var j = 0; j < Adj[i].length-1; j++) {
				document.write(Adj[i]+",");
			}
			document.write("},");
		}
	}
}


MAZE1 = [ [],[],[1,3],[2,4],[3,5],[4,15],[16,7],[6,8],[7,18],[],[0,20],[21,12],[11,13],[12,14],[13,24],[5,16],[15,6],[18,27],[8,17],[9,29],[10,30],[11,31],[],[33,24],[14,34,23,25,14,34,23,25,14,34,23,25],[26,24],[25,27],[17,26],[29,38],[19,28],[20,31],[30,21],[22,33],[32,23],[24,44],[45,36],[35,37],[36,38],[37,48,28,37,48,28],[],[],[40,51],[43,52],[42,44],[34,43],[35,55],[56,47],[46,57],[38,58],[39,59],[],[41,61],[42,62],[],[],[45,65],[46,66],[47,67],[48,68],[49,69],[61,50],[51,60],[52,63],[62,64],[63,65],[64,55],[],[57,68],[58,78,67,58,78,67],[59,79],[],[70,72],[71,82],[74,83],[73,75],[74,76],[75,77],[76,78],[68,77],[69,89],[81,90],[80,82],[72,81],[73,84],[83,85],[84,86],[85,96],[],[87,89],[79,88],[80,91],[90,92],[91,93],[92,94],[93,95],[],[86,97],[96,98],[97,99] ]
