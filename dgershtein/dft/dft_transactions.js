
function createTransactions(){
	var div = document.createElement("div");
	div.id = "transactionsContainer";
	var ul = document.createElement("ul");
	for(var j in TILES){
		for(var i in TILES[j].listOfItems){		
			var li = document.createElement("li");
			li.id = TILES[j].listOfItems[i];
			li.innerHTML = TILES[j].listOfItems[i];
			li.className = "textBarList";
			var price = document.createElement("span");
			li.appendChild(price);
			price.className = "dollars";
			price.innerHTML = "$" + TILES[j].listOfExpenses[li.id];
			ul.appendChild(li);
		}
	}
	div.appendChild(ul);
	$("#tiles").append(div);
	$("#transactionsContainer").hide();
}

function addTransaction(item,category,money){
	var li = document.createElement("li");
	li.id = item;
	li.classList.add(category);
	li.classList.add("textBarList");
	li.classList.add("transactionsList");
	var it = document.createElement("span");
	it.innerHTML = item;
	it.className = "item";
	li.appendChild(it);
	var cat = document.createElement("span");
	cat.className = "category";
	cat.innerHTML = category;
	li.appendChild(cat);
	var price = document.createElement("span");
	li.appendChild(price);
	price.className = "dollars";
	price.innerHTML = "$" + money;
	$("#transactionsContainer ul").prepend(li);
}
/*function createTransactions(){
	var div = document.createElement("div");
	div.id = "transactionsContainer";
	var UL = document.createElement("ul");
	for(var j in TILES){
		var LI = document.createElement("li");
		var ul = document.createElement("ul")
		for(var i in TILES[j].listOfItems){		
			var li = document.createElement("li");
			li.id = TILES[j].listOfItems[i];
			li.innerHTML = TILES[j].listOfItems[i];
			li.className = "textBarList";
			var price = document.createElement("span");
			li.appendChild(price);
			price.className = "dollars";
			price.innerHTML = "$" + TILES[j].listOfExpenses[li.id];
			ul.appendChild(li);
		}
		LI.appendChild(ul);
		UL.appendChild(LI);
	}
	div.appendChild(UL);
	$("#tiles").append(div);
	$("#transactionsContainer").hide();
}*/