function createInvestments(){
	var div = document.createElement("div");
	div.id = "investmentsContainer";
	var h3 = document.createElement("h3");
	h3.innerHTML = "To view content, hire applicant :)";
	div.appendChild(h3);
	$("#tiles").append(div);
	$("#investmentsContainer").hide();
}