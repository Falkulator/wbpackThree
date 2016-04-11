var THREE = require('three')
var hilbert3D = require('./lib/hilbert3D')

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
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	var geometry = new THREE.Geometry(),
		geometry2 = new THREE.Geometry(),
		geometry3 = new THREE.Geometry(),
		points = hilbert3D( new THREE.Vector3( 0,0,0 ), 100.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 ),
		colors = [], colors2 = [], colors3 = [];
	n_sub = 6;
	var position, index;
	var spline = new THREE.Spline( points );
	for ( i = 0; i < points.length * n_sub; i ++ ) {
		index = i / ( points.length * n_sub );
		position = spline.getPoint( index );
		geometry.vertices[ i ] = new THREE.Vector3( position.x, position.y, position.z );
		colors[ i ] = new THREE.Color( 0xffffff );
		colors[ i ].setHSL( 0.6, 1.0, Math.max( 0, - position.x / 200 ) + 0.5 );
		colors2[ i ] = new THREE.Color( 0xffffff );
		colors2[ i ].setHSL( 0.9, 1.0, Math.max( 0, - position.y / 200 ) + 0.5 );
		colors3[ i ] = new THREE.Color( 0xffffff );
		colors3[ i ].setHSL( i / ( points.length * n_sub ), 1.0, 0.5 );
	}
	geometry2.vertices = geometry3.vertices = geometry.vertices;
	geometry.colors = colors;
	geometry2.colors = colors2;
	geometry3.colors = colors3;
	// lines
	material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1, linewidth: 3, vertexColors: THREE.VertexColors } );
	var line, p, scale = 0.3, d = 225;
	var parameters =  [
		[ material, scale*1.5, [-d,0,0],  geometry ],
		[ material, scale*1.5, [0,0,0],  geometry2 ],
		[ material, scale*1.5, [d,0,0],  geometry3 ]
	];
	for ( i = 0; i < parameters.length; ++ i ) {
		p = parameters[ i ];
		line = new THREE.Line( p[ 3 ],  p[ 0 ] );
		line.scale.x = line.scale.y = line.scale.z =  p[ 1 ];
		line.position.x = p[ 2 ][ 0 ];
		line.position.y = p[ 2 ][ 1 ];
		line.position.z = p[ 2 ][ 2 ];
		scene.add( line );
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
	render();
}
function render() {
	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
	camera.lookAt( scene.position );
	var time = Date.now() * 0.0005;
	for ( var i = 0; i < scene.children.length; i ++ ) {
		var object = scene.children[ i ];
		if ( object instanceof THREE.Line ) {
			object.rotation.y = time * ( i % 2 ? 1 : -1 );
		}
	}
	renderer.render( scene, camera );
}