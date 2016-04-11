var noise = require('../lib/noise')
class Line {
	constructor(scene, points) {
        this.points = points;
        var colors = [ 0x000000, 0xff0080, 0x8000ff, 0xffffff ];
        var geometry = new THREE.Geometry();
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 4000 - 2000;
        vertex.y = Math.random() * 4000 - 2000;
        vertex.z = Math.random() * 4000 - 2000;
        this.noise = new noise();
        this.noise.seed(Math.random());
        geometry.vertices.push( vertex );
        geometry.colors.push( new THREE.Color( colors[ Math.floor( Math.random() * colors.length ) ] ) );

        var material = new THREE.PointsMaterial( { size: Math.random()*3, vertexColors: THREE. VertexColors, depthTest: false, opacity: 0.5, sizeAttenuation: false, transparent: true } );
        this.mesh = new THREE.Points( geometry, material );
        scene.add( this.mesh );
        this.nx = this.nxx = 0;
        this.ny = this.nyy = 0;
        this.n = this.noise.perlin2(0,0);
        this.vector = new THREE.Vector3( 1, 0, 0 );
        this.yAxis = new THREE.Vector3( 0, 1, 0 );
        this.xAxis = new THREE.Vector3( 1, 0, 0 );
        this.zAxis = new THREE.Vector3( 0, 0, 1 );
        this.angle = 0.1;

    }
    toString() {
        return '('+this.points+')';
    }
    update() {
        var vec = new THREE.Vector3(this.x, 0, 1000)
        var time = Date.now() * 0.0005;
        
        var stepSize = 0.0003
        this.n += this.noise.perlin2(this.nx, this.ny) *360;
        this.nx += stepSize
        this.ny += stepSize
        this.mesh.position.y += this.vector.y
        this.mesh.position.x += this.vector.x
        
        this.vector.applyAxisAngle( this.yAxis, this.angle );
        this.vector.applyAxisAngle( this.xAxis, this.angle );
        this.vector.applyAxisAngle( this.zAxis, this.angle );

        // this.mesh.rotation.z = this.ny
       // this.mesh.rotation.z = this.n


    }
    draw() {
    	return 234234234234
    }
}

export default Line