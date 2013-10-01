
TILES  = {};

function init() {
	tilesDiv = document.getElementById("tiles");
	var tileIDs = ["entertainment", "groceries", "movies", "paycheck", "rent", "restaurants", "shopping", "bills", "repair", "gifts", "gas"];
	for(var i = 0; i < tileIDs.length; ++i){
		TILES[tileIDs[i]] = new createTile(tileIDs[i]);
	}
	$("#create").hide();
	$("#itemName").hide();
	$("#leftBarOptions").hide();
}

function tileObject(tileID) {
	  
}

function addItem(tileID){
	if( $("#itemName:first").is(":hidden") ){
		$("#itemName").slideDown("fast");
		$("#create").slideDown("fast");
	} else {
	//	$("#itemName").slideUp("fast");
	//	$("#create").slideUp("fast");
	}
	$("#create").click(function(){createItem(tileID)});
	$("textarea#textarea").submit(function(){alert("BLAH")});
}

function addExpense(tileID,itemNum){
	if( $("#expense"+TILES[tileID].listOfItems[itemNum] + ":first").is(":hidden") )
		$("#expense"+TILES[tileID].listOfItems[itemNum]).slideDown("fast");
	else $("#expense"+TILES[tileID].listOfItems[itemNum]).slideUp("fast");
}

function createItem(obj){
	var val = $("textarea#textarea").val();
	if(val == "") return;
	if(TILES[tileID].listOfItems.length == 1 ){
		var temp = $("#listOfItems .liName").first();
		$("#listOfItems .liName").first().removeClass("textBarCenter").addClass("textBarTop");
	} else if (TILES[tileID].listOfItems.length > 1){
		$("#listOfItems .liName").last().removeClass("textBarBottom").addClass("textBarList");
	}
	TILES[tileID].listOfItems.push(val);
	var li = document.createElement("li");
	li.innerHTML = val;
	li.classList.add("liName");
	if(TILES[tileID].listOfItems.length == 1) li.classList.add("textBarCenter");
	else li.classList.add("textBarBottom");
	li.id = val;
	var liExpense = document.createElement("li");
	liExpense.classList.add("textBarList");
	liExpense.classList.add("expense");
	liExpense.id = "expense"+val;
	
	var label = document.createElement("label");
	label.innerHTML = "Add expense:";
	var textarea = document.createElement("textarea");
	label.appendChild(textarea);
	liExpense.appendChild(label);
	
	li.onclick = function() {addExpense(TILES[tileID],TILES[tileID].listOfItems.length-1)};
	$("#listOfItems").append(li);
	$("#listOfItems").append(liExpense);
	$("textarea#textarea").val("");
}

function tileClicked(obj){
	$("#leftBarOptions").show();
	
	$("#create").slideUp("fast");
	$("#itemName").slideUp("fast");
	
	$("#addItem").click(function() {addItem(obj);});
	
	//update bar
	obj.g -= 10;
	obj.r += 10;
	obj.barLength -= 2;
	$("#bar"+obj.id).css({'background-color': 'rgb('+ obj.r + ',' + obj.g + ',0)', 'width':obj.barLength + 'px'});
	
	//update left bar section
	$("#tileTitle").text(obj.id);
	
	$("#listOfItems").empty();
	
	for(var i = 0; i < obj.listOfItems.length; ++i){		
		var li = document.createElement("li");
		li.id = obj.listOfItems[i];
		li.innerHTML = obj.listOfItems[i];
		if(obj.listOfItems.length == 1) li.className = "textBar";
		else if(i==0) li.className = "textBarTop";
		else if(i==obj.listOfItems.length-1) li.className = "textBarBottom";
		else li.className = "textBarList";
		li.onclick = function() {addExpense(obj.id,i)};
		$("#listOfItems").append(li);
	}
	
}

function createTile (tileID){
	this.imgSrc = "images/" + tileID + ".png";
	this.id = tileID;
	this.barLength = 100;
	this.r = 0;
	this.g = 255;
	this.listOfItems = [];
	this.listOfExpenses = [];
	
	this.tile = document.createElement("div");
	this.link = document.createElement("a");
	this.bar = document.createElement("div");
	this.bar.className = "bar";
	
	this.bar.id = "bar" + tileID;
	this.link.href = "#";
	this.tile.className = "tile";
	this.tile.id = tileID;
	this.img = document.createElement("img");
	this.img.src = this.imgSrc;
	this.tile.appendChild(img);
	this.tile.appendChild(bar);
	this.onclick = function() {tileClicked(this)};
	this.link.appendChild(tile);
	tilesDiv.appendChild(link);
}



