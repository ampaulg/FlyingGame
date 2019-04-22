var canvas;
var gl;
var program;

const RED = [ 1.0, 0.0, 0.0, 1.0 ];


const TEST_TRIANGLE_VERTICES = [
    0.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1.0, 0.0
];

const TEST_TRIANGLE_FACE = [
    0, 1, 2
];

const TEST_TRIANGLE_COLORS = [
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0
];

var vPosition, vColor;
var vBuffer, cBuffer, nBuffer, iBuffer;

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0, 0, 0, 1 );
    gl.enable( gl.DEPTH_TEST );

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( TEST_TRIANGLE_VERTICES ),
                   gl.STATIC_DRAW );
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER,
                   new Uint16Array( TEST_TRIANGLE_FACE ),
                   gl.STATIC_DRAW );

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( TEST_TRIANGLE_COLORS ),
                   gl.STATIC_DRAW );
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    console.log("asdf");
    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0 );
    //window.requestAnimFrame(render);
}
