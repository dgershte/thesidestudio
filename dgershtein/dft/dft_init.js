TILES  = {};

function init() {
	tilesDiv = document.getElementById("tiles");
	tileIDs = ["entertainment", "groceries", "movies", "paycheck", "rent", "restaurants", "shopping", "bills", "repair", "gifts", "gas"];
	
	overview = document.createElement("div");
	overview.id = "overviewContainer";
	createBars();
	createMenu();
	createTransactions();
	createInvestments();
	bindItems();
	$("#create").hide();
	$("#itemName").hide();
	$("#leftBarOptions").hide();
	$(".tile").hover(function(){
	    $(this).stop(true,true).animate({marginTop: '+=50',}, 250);
	    $("#footer #"+ this.id).css({"color" : 'black', 'border-bottom':'3px solid black'});
	    },function(){
	    $(this).stop(true,true).animate({marginTop: '-=50',}, 250);
	    $("#footer #"+ this.id).css({"color" : '#c0c0c0', "border-bottom":"none"});
	  });
	
}

function bindItems(){
	$("#tileTitle").bind("click",function (event) {
		var tileID = event.srcElement.innerHTML;
		$("#totalSpent .dollars").html("$"+TILES[tileID].remaining);
		$("#budget .dollars").html("$"+TILES[tileID].budget);
		$("#totalSpent").slideToggle("fast");
		$("#budget").slideToggle("fast");
	});
	$("#addItem").bind("click",function() {
		$("#itemName").slideToggle("fast");
		$("#create").slideToggle("fast");
		var tileID = $("#tileTitle").html();
		$("#create").click(function(){createItem(tileID)});
		});
	$("form#createItem").bind("submit", function(event) {
		createItem();
		});
	$("#header #Overview").bind("click", function(){
		$("#header .selected").removeClass("selected");
		$("#header #Overview").addClass("selected");
		$("#tiles").children().hide();
		$("#overviewContainer").show();
	});
	$("#header #Transactions").bind("click", function(){
		$("#header .selected").removeClass("selected");
		$("#header #Transactions").addClass("selected");
		$("#tiles").children().hide();
		$("#transactionsContainer").show();
	});
	$("#header #Investments").bind("click", function(){
		$("#header .selected").removeClass("selected");
		$("#header #Investments").addClass("selected");
		$("#tiles").children().hide();
		$("#investmentsContainer").show();
	});
	$("#header #Budgets").bind("click", function(){
		$("#header .selected").removeClass("selected");
		$("#header #Budgets").addClass("selected");
		$("#tiles").children().hide();
		$("#investmentsContainer").show();
	});
	$("#header #Trends").bind("click", function(){
		$("#header .selected").removeClass("selected");
		$("#header #Trends").addClass("selected");
		$("#tiles").children().hide();
		$("#investmentsContainer").show();
	});
	for(var i = 0; i < tileIDs.length; ++i) $("#textNodes #"+tileIDs[i]).bind("click",function(event){
		tileClicked(event.currentTarget.id);
		});
}

function createBars(){
	for(var i = 0; i < tileIDs.length; ++i){
		TILES[tileIDs[i]] = new tileObject(tileIDs[i]);
		createTile(tileIDs[i]);
		var a = document.createElement("a");
		a.href="#";
		var text = document.createElement("h2");
		text.innerHTML = tileIDs[i];
		text.className = "slanted";
		text.id = tileIDs[i];
		a.appendChild(text);
		$("#textNodes").append(a);
	}
	$("#tiles").append(overview);
}
function createMenu(){
	var menuItems = ["Overview", "Transactions", "Budgets", "Trends", "Investments"];
	var ul = document.createElement("ul");
	for(var i = 0; i < menuItems.length; ++i){
		var a = document.createElement("a");
		a.href = "#";//menuItems[i] + ".html";
		var li = document.createElement("li");
		li.innerHTML = menuItems[i];
		li.id = menuItems[i];
		a.appendChild(li);
		ul.appendChild(a);
	}
	$("#header #Overview").addClass("selected");
	$("#header").append(ul);
}
function tileObject(tileID) {
	  this.imgSrc = "images/" + tileID + ".png";
	  this.id = tileID;
	  this.total = 0;
	  this.budget = 1000;
	  this.remaining = this.budget;
	  this.listOfItems = [];
	  this.listOfExpenses = [];
}