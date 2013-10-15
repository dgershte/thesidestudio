
function coor(x,y) {
	return new google.maps.LatLng(x,y);
}


NewZealandMarkers = new Array();
ThailandMarkers = new Array();
SingaporeMarkers = new Array();
MalaysiaMarkers = new Array();
CambodiaMarkers = new Array();
AustraliaMarkers = new Array();
IndonesiaMarkers = new Array();

AustraliaLocations = {
	melbourne: new coor(-37.791337,144.961638),
	apostles: new coor(-38.615395,142.995617),
	grampians: new coor(-37.133122,142.51837),
	sydney: new coor(-33.829357,151.260924),
	brisbane: new coor(-27.470239,153.023494),
	goldcoast: new coor(-27.9847,153.425231),
	whitsunday: new coor(-20.298266,148.979244),
	magnetic: new coor(-19.160735,146.831417),
	cairns: new coor(-16.911654,145.764486),
	torquay: new coor(-16.911654,145.764486),
	lorne: new coor(-38.536619,143.975433),
}

NewZealandLocations = {
	auckland: new coor(-36.848032,174.763271),
	paihia: new coor(-35.280555,174.090854),
	piha: new coor(-36.95291,174.468714),
	matamata: new coor(-37.86862,175.67614),
	waitomo: new coor(-38.260828,175.109496),
	tongariro: coor(-39.171062,175.399368),
	rotorua: coor(-38.136717,176.250701),
	tauranga: coor(-37.689254,176.16693),
	coromandel: coor(-36.837866,175.811248),
}

ThailandLocations = {
	bangkok: new coor(13.752725,100.472503),
	phiphi: new coor(7.750455,98.778221),
	railay: new coor(8.052431,98.821228),
}

SingaporeLocations = {
	gardens: new coor(1.286322,103.865063),
	marinabay: new coor(1.276347,103.854681),
}

MalaysiaLocations = {
	kualalumpur: new coor(3.146001,101.687683),
}

IndonesiaLocations = {
	bali: new coor(-8.388148,115.194182),
	bromo: new coor(-7.932075,112.955139),
	ijen: new coor(-8.057711,114.242039),
}

CambodiaLocations = {
	siem: new coor(13.412747,103.867008),
	phnompenh: new coor(11.565135,104.91938),
}

AustraliaImages = [
	"travel/Australia/sydney1.jpg",
	"travel/Australia/sydney2.jpg",
	"travel/Australia/sydney3.jpg",
	"travel/Australia/sydney4.jpg",
	"travel/Australia/sydney5.jpg",
	"travel/Australia/sydney6.jpg",
	"travel/Australia/sydney7.jpg",
	"travel/Australia/melbourne1.jpg",
	"travel/Australia/melbourne2.jpg",
	"travel/Australia/melbourne3.jpg",
	"travel/Australia/melbourne4.jpg",
	"travel/Australia/melbourne5.jpg",
	"travel/Australia/cairns1.jpg",
	"travel/Australia/cairns2.jpg",
	"travel/Australia/apostles1.jpg",
	"travel/Australia/apostles2.jpg",
	"travel/Australia/grampians.jpg",
]

NewZealandImages = [
	"travel/NewZealand/tongariro8.jpg",
	"travel/NewZealand/tongariro7.jpg",
	"travel/NewZealand/tongariro1.JPG",
	"travel/NewZealand/tongariro2.JPG",
	"travel/NewZealand/tongariro3.JPG",
	"travel/NewZealand/tongariro4.JPG",
	"travel/NewZealand/tongariro5.JPG",
	"travel/NewZealand/auckland1.JPG",
	"travel/NewZealand/auckland2.JPG",
	"travel/NewZealand/auckland3.JPG",
	"travel/NewZealand/coromandel1.JPG",
	"travel/NewZealand/coromandel2.JPG",
	"travel/NewZealand/matamata1.JPG",
	"travel/NewZealand/matamata2.JPG",
	"travel/NewZealand/matamata3.JPG",
	"travel/NewZealand/matamata4.JPG",
	"travel/NewZealand/paihia1.JPG",
	"travel/NewZealand/paihia2.JPG",
	"travel/NewZealand/paihia4.JPG",
	"travel/NewZealand/piha1.JPG",
	"travel/NewZealand/rotorua1.JPG",
	"travel/NewZealand/rotorua2.JPG",
	"travel/NewZealand/rotorua3.JPG",
	"travel/NewZealand/tauranga1.JPG",
	"travel/NewZealand/tauranga2.JPG",
];

ThailandImages = [
	"travel/Thailand/bangkok1.jpeg",
	"travel/Thailand/bangkok2.jpeg",
	"travel/Thailand/bangkok3.jpeg",
	"travel/Thailand/bangkok4.jpeg",
	"travel/Thailand/bangkok5.jpeg",
	"travel/Thailand/bangkok6.jpeg",
	"travel/Thailand/phiphi1.jpeg",
	"travel/Thailand/phiphi2.jpeg",
	"travel/Thailand/phiphi3.jpeg",
	"travel/Thailand/railay1.jpeg",
	"travel/Thailand/railay2.jpeg",
	"travel/Thailand/railay3.jpeg",
	"travel/Thailand/pan.jpeg",
];

SingaporeImages = [
	"travel/Singapore/singapore1.jpeg",
	"travel/Singapore/singapore3.jpeg",
	"travel/Singapore/singapore4.jpeg",
	"travel/Singapore/pan.jpeg",
];

MalaysiaImages = [
	"travel/Malaysia/kualalumpur1.JPG",
	"travel/Malaysia/kualalumpur2.JPG",
	"travel/Malaysia/kualalumpur3.JPG",
];

IndonesiaImages = [
	"travel/Indonesia/pan3.jpg",
	"travel/Indonesia/bali2.jpg",
	"travel/Indonesia/bali3.jpg",
	"travel/Indonesia/java1.jpg",
	"travel/Indonesia/java2.jpg",
	"travel/Indonesia/java3.jpg",
	"travel/Indonesia/java4.jpg",
	"travel/Indonesia/java5.jpg",
	"travel/Indonesia/java6.jpg",
	"travel/Indonesia/pan3.jpg",
];

CambodiaImages = [
	"travel/Cambodia/siem1.jpeg",
	"travel/Cambodia/siem2.jpeg",
	"travel/Cambodia/siem3.jpeg",
	"travel/Cambodia/siem4.jpeg",
	"travel/Cambodia/siem5.jpeg",
	"travel/Cambodia/siem6.jpeg",
	"travel/Cambodia/siem7.jpeg",
	"travel/Cambodia/siem8.jpeg",
	"travel/Cambodia/siem9.jpeg",
	"travel/Cambodia/siem10.jpeg",
	"travel/Cambodia/siem11.jpeg",
	"travel/Cambodia/siem12.jpeg",
	"travel/Cambodia/siem13.jpeg",
];
