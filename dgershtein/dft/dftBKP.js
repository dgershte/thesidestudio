
TILES  = {};

function init() {
	tilesDiv = document.getElementById("tiles");
	var tileIDs = ["entertainment", "groceries", "movies", "paycheck", "rent", "restaurants", "shopping", "bills", "repair", "gifts", "gas"];
	for(var i = 0; i < tileIDs.length; ++i){
		TILES[tileIDs[i]] = new tileObject(tileIDs[i]);
		createTile(tileIDs[i]);
	}
	$("#create").hide();
	$("#itemName").hide();
	$("#leftBarOptions").hide();
}

function tileObject(tileID) {
	  this.imgSrc = "images/" + tileID + ".png";
	  this.id = tileID;
	  this.barLength = 100;
	  this.r = 0;
	  this.g = 255;
	  this.listOfItems = [];
	  this.listOfExpenses = [];
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

function createItem(tileID){
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

function tileClicked(tileID){
	$("#leftBarOptions").show();
	
	$("#create").slideUp("fast");
	$("#itemName").slideUp("fast");
	
	$("#addItem").click(function() {addItem(tileID);});
	
	//update bar
	TILES[tileID].g -= 10;
	TILES[tileID].r += 10;
	TILES[tileID].barLength -= 2;
	$("#bar"+TILES[tileID].id).css({'background-color': 'rgb('+ TILES[tileID].r + ',' + TILES[tileID].g + ',0)', 'width':TILES[tileID].barLength + 'px'});
	
	//update left bar section
	$("#tileTitle").text(TILES[tileID].id);
	
	$("#listOfItems").empty();
	
	for(var i = 0; i < TILES[tileID].listOfItems.length; ++i){		
		var li = document.createElement("li");
		li.id = TILES[tileID].listOfItems[i];
		li.innerHTML = TILES[tileID].listOfItems[i];
		if(TILES[tileID].listOfItems.length == 1) li.className = "textBar";
		else if(i==0) li.className = "textBarTop";
		else if(i==TILES[tileID].listOfItems.length-1) li.className = "textBarBottom";
		else li.className = "textBarList";
		li.onclick = function() {addExpense(TILES[tileID].id,i)};
		$("#listOfItems").append(li);
	}
	
}

function createTile (tileID){
	var tile = document.createElement("div");
	var link = document.createElement("a");
	var bar = document.createElement("div");
	bar.className = "bar";
	var temp = tileID;
	
	bar.id = "bar" + TILES[tileID].id;
	link.href = "#";
	tile.className = "tile";
	tile.id = TILES[tileID].id;
	var img = document.createElement("img");
	img.src = TILES[tileID].imgSrc;
	tile.appendChild(img);
	tile.appendChild(bar);
	tile.onclick = function() {tileClicked(tileID)};
	link.appendChild(tile);
	tilesDiv.appendChild(link);
}



