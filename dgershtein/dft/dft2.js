


function createItem(){
	tileID = $("#tileTitle").html();
	var val = $("#createItem input:first").val();
    $("#createItem input:first").val('');
	if(val == "" || TILES[tileID].listOfItems.indexOf(val) > -1) return;
	TILES[tileID].listOfItems.push(val);
	TILES[tileID].listOfExpenses[val] = 0;
	
	var li = document.createElement("li");
	li.innerHTML = val;
	li.classList.add("liName");
	li.classList.add("textBarList");
	li.id = val;
	
	var price = document.createElement("span");
	li.appendChild(price);
	price.className = "dollars";
	price.innerHTML = "$0.00";
	
	$("#listOfItems").prepend(li);
	$("textarea#textarea").val("");
	$('#listOfItems li').bind('click', function(event) {
		if(event.currentTarget.id != "expense"){
		  $(".selectedItem").removeClass("selectedItem");
		  this.classList.add("selectedItem");
		  $("#expense").slideDown("fast");
		}  
		});
}

function submitExpense(event){
	var input = $("input:first").val();
	if(!Number(input)) alert("Please enter a valid number");
	else {
		var selected = $(".selectedItem")[0];
		var curTile = $("#tileTitle").html();
		TILES[curTile].listOfExpenses[selected.id] += Number(input);
		TILES[curTile].total += Number(input);
		TILES[curTile].remaining -= Number(input);
		$("#totalSpent .dollars").html("$"+TILES[curTile].remaining);
		$("#listOfItems #"+selected.id + " .dollars").html("$"+TILES[curTile].listOfExpenses[selected.id]);
		$("#" + curTile + " h4").html("$"+TILES[curTile].total);
		//update bar
		//Math for the bar
		var budget = TILES[curTile].budget;
		var total = TILES[curTile].total;
		h = 100*(budget-total)/budget;
		var h = h <= 15 ? 15 : h;		
		var x = (h > 15) ? 255*h/100 : 0;		
		var temp = 'rgb('+ Math.round(255-x) + ',' + Math.round(x) + ',0)';		
		$("#" + curTile + " h4").css('color','rgb('+ Math.round(255-x) + ',' + Math.round(x) + ',0)');
		$("#" + curTile).css({'margin-top': ((100-h)/2 + 3) + '%','height': h + '%'});
		$("#" + curTile).css('background-image','-webkit-gradient(linear, 0 bottom, 0 '+h/2+', from(rgb('+ Math.round(255-x) + ',' + Math.round(x) + ',0)), to(white))');	
		
		//add to transactions
		addTransaction(selected.id,curTile,Number(input));
	}
	
	$("#expense").slideUp("fast");
}
function tileClicked(tileID){
	if(tileID != $("#tileTitle").html()){
		$("#leftBarOptions").hide();
		$("#leftBarOptions").animate({'width':'toggle'},250);
	}	

	$("#transactionsContainer .SELECTED").removeClass("SELECTED");
	$("#transactionsContainer ." + event.currentTarget.id).addClass("SELECTED");
	//update left bar section
	$("#tileTitle").text(TILES[tileID].id);
	
	$("#listOfItems").empty();
	
	for(var i = 0; i < TILES[tileID].listOfItems.length; ++i){		
		var li = document.createElement("li");
		li.id = TILES[tileID].listOfItems[i];
		li.innerHTML = TILES[tileID].listOfItems[i];
		li.className = "textBarList";
		var price = document.createElement("span");
		li.appendChild(price);
		price.className = "dollars";
		price.innerHTML = "$" + TILES[tileID].listOfExpenses[li.id];
		$("#listOfItems").append(li);
	}
	
	$("#total .dollars").html(TILES[tileID].remaining);
	var liExpense = document.createElement("li");
	liExpense.classList.add("textBarList");
	liExpense.id = "expense";
	liExpense.style.display = "none";
	liExpense.style.backgroundColor ="#fcffc4";
	
	var form = document.createElement("form");
	form.id = "expense";
	
	var label = document.createElement("label");
	
	form.appendChild(label);
	label.innerHTML = "Add expense:";
	var input = document.createElement("input");
	label.appendChild(input);
	liExpense.appendChild(form);
	$("#listOfItems").append(liExpense);
	
	$("form#expense").bind("submit", function(event) {
		submitExpense(event);
		});
}

function createTile (tileID){
	var tile = document.createElement("div");
	var link = document.createElement("a");
	var dollars = document.createElement("h4");
	dollars.innerHTML = "$" + TILES[tileID].total;
	dollars.className = "dollars";
	link.href = "#";
	tile.className = "tile";
	tile.id = TILES[tileID].id;
	var img = document.createElement("img");
	img.src = TILES[tileID].imgSrc;
	tile.appendChild(dollars);
	tile.appendChild(img);
	tile.onclick = function() {tileClicked(tileID)};
	link.appendChild(tile);	
	overview.appendChild(link);
}
