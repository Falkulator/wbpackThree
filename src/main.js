require("script!three");
var hilbert3D = require('../lib/hilbert3D')
import Line from './Line'

var dots = [];
var mouseX = 0, mouseY = 0,
windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
camera, scene, renderer, material;
init();
animate();

function init() {
	var i, n_sub, container;
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 700;
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.autoClearColor = false;
	container.appendChild( renderer.domElement );
	var geometry = new THREE.Geometry(),
		geometry2 = new THREE.Geometry(),
		geometry3 = new THREE.Geometry(),
		points = hilbert3D( new THREE.Vector3( 0,0,0 ), 100.0, 3, 0, 1, 2, 3, 4, 5, 6, 7 ),
		colors = [], colors2 = [], colors3 = [];

	for (let i = 0;i<1000;i++) {
		let line = new Line(scene, points);
		dots.push(line);
	}
	
	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.top = '0px';
	//container.appendChild(stats.domElement);
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	//
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
	if ( event.touches.length > 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}
function onDocumentTouchMove( event ) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}
//
function animate() {
	requestAnimationFrame( animate );
	for (let d in dots) {
		dots[d].update()
	}
	
	render();
}
function render() {
	// camera.position.x += ( mouseX - camera.position.x ) * .05;
	// camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
	camera.lookAt( scene.position );

	renderer.render( scene, camera );
}