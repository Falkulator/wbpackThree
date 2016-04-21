var noise = require('../lib/noise')
class Line {
	constructor(scene, x, y) {

        var colors = [ 0x000000, 0xff0080, 0x8000ff, 0xffffff ];
        var geometry = new THREE.Geometry();
        var vertex = new THREE.Vector3();
        vertex.x = x;
        vertex.y = y;
        vertex.z = 100;
        this.tNoise = new noise();
        this.pNoise = new noise();
        this.tNoise.seed(Math.random());
        this.pNoise.seed(Math.random());

        geometry.vertices.push( vertex );
        geometry.colors.push( new THREE.Color( colors[ Math.floor( Math.random() * colors.length ) ] ) );

        var material = new THREE.PointsMaterial( { size: Math.random()*3, vertexColors: THREE. VertexColors, depthTest: false, opacity: 0.5, sizeAttenuation: false, transparent: true } );
        this.mesh = new THREE.Points( geometry, material );
        scene.add( this.mesh );
        this.nx = this.nxx = 0;
        this.ny = this.nyy = 0;
        this.tn = this.tNoise.perlin2(10,5);
        this.pn = this.pNoise.perlin2(10,5);

        this.r = new THREE.Vector3( Math.random() -0.5, Math.random()-0.5, Math.random()-0.5 );
        this.phi = new THREE.Vector3( 0, Math.random(), Math.random() );
        this.theta = new THREE.Vector3( Math.random(), Math.random(), 0 );
        this.vector = new THREE.Vector3(0,0,0);
        this.vector.addVectors(this.phi, this.r)
        this.yAxis = new THREE.Vector3( 0, 1, 0 );
        this.xAxis = new THREE.Vector3( 1, 0, 0 );
        this.zAxis = new THREE.Vector3( 0, 0, 1 );

    }
    toString() {
        return '('+this.points+')';
    }
    update() {
        var vec = new THREE.Vector3(this.x, 0, 1000)
        var time = Date.now() * 0.0005;
        
        var stepSize = 0.00003;
        this.pn = this.pNoise.perlin2(this.nx, this.ny) ;
        this.tn = this.tNoise.perlin2(this.nx, this.ny) ;

        this.nx += stepSize
        this.ny += stepSize
        this.mesh.position.y += this.r.y 
        this.mesh.position.x += this.r.x
        this.mesh.position.z += this.r.z
        console.log('x', this.mesh.position.x, ' ', 'rx ', this.r.x)

        this.vector.applyAxisAngle(this.yAxis, Math.PI)
        // this.mesh.rotation.z = this.ny
       // this.mesh.rotation.z = this.n


    }
    draw() {
    	return 234234234234
    }
}

export default Line