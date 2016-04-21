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

	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.top = '0px';
	//container.appendChild(stats.domElement);
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
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
	mouseX = ( event.clientX / window.innerWidth ) ;
	mouseY =  ( event.clientY / window.innerHeight ) * 2 + 1;
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
function onDocumentMouseDown( event ) {

	let line = new Line(scene, event.clientX, event.clientY);
	dots.push(line);

	

}
function animate() {
	requestAnimationFrame( animate );
	for (let d in dots) {
		dots[d].update()
	}
	
	render();
}
function render() {
	var r = Date.now() * 0.0005;
	camera.position.x += ( mouseX - camera.position.x ) * .08;
	camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
	// camera.fov = 35 + 30 * Math.sin( 0.5 * r );
	camera.lookAt( mouseX, mouseY, 0 );

	renderer.render( scene, camera );
}