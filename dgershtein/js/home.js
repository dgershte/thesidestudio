
function loadMenu() {
var menu = '<div id="headerelems"><div id="dalya"><a href="home.html"><strong>DALYA</strong> GERSHTEIN</a></div><div id="menu"><ul><li><a id="about" href="about.html">About</a></li><li><a href="Resume_DalyaGershtein.pdf" target="_blank">CV</a></li><li><a id="projects" href="projects.html">Projects</a></li><li><a id="drawings" href="drawings.html">Drawings</a></li><li><a id="animations" href="animations.html">Animations</a></li><li><a id="photography" href="photography.html">Photography</a></li></ul></div></div>';
$('#header').html(menu);

var style = '<style> #menu ul {list-style: none;margin-top: 0px;padding-left: 10px;}#dalya {font: 16px/1.3em "Helvetica","Arial","sans-serif";color:white;float:left;padding:1.5em 0;}#menu li {float: left;margin-left: 50px;} #menu {width: 680px;float: right;padding:1.5em 0 1.5em 1.5em;}#menu a:hover {color:#119AE2;}body#about a#about,body#projects a#projects,body#drawings a#drawings,body#animations a#animations,body#photography a#photography {color:#119AE2;}#header {height:70px;background-color:rgb(41, 41, 41);box-shadow: 0px 4px 5px black;z-index:100;position:fixed;width:100%;}#headerelems {width: 1000px;height: 100%;margin: auto;} </style>';
$('head').append(style);

}

