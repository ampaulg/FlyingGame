import * as MyMath from './MathHelpers.js';
import * as Ex from './ExampleObjects.js';

var canvas;
var gl;
var program;

var vPosition, vColor;
var vBuffer, cBuffer, nBuffer, iBuffer;

// constants for projection frustrum
const NEAR = 1;
const FAR = 10;
const N_WIDTH = 2;
const N_HEIGHT = 2;

var time1;

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
    gl.bufferData( gl.ARRAY_BUFFER, MyMath.flattenObjArray( Ex.CUBE_VERTICES ),
                   gl.STATIC_DRAW );
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER,
                   MyMath.flattenObjArray( Ex.CUBE_FACES ),
                   gl.STATIC_DRAW );

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, MyMath.flattenObjArray( Ex.CUBE_COLORS ),
                   gl.STATIC_DRAW );
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projMatrix"),
                         false,
                         MyMath.flattenMatrix(
                             MyMath.perspectiveViewMat(
                                 NEAR, FAR, N_WIDTH, N_HEIGHT )
                         ) );

    time1 = Date.now();
    requestAnimationFrame( render );
};

/*
*/
var animCounter = 0;
var yMoveTest = 0;

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    var tMatrix = [
        [ 1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          -0.5, 0.5, -2, 1 ],
        [ 1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0.5, 0.5, -3, 1 ],
        [ 1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          -0.5, -0.5, -4, 1 ],
        [ 1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0.5, -0.5, -5, 1 ]
    ];

    var time2 = Date.now();
    var diff = time2 - time1;
    animCounter += ( diff / 1000 ) * 360 / 2;
    time1 = time2;

    yMoveTest = Math.sin( MyMath.degToRad( animCounter ) ) / 2;
    gl.uniform1f( gl.getUniformLocation( program, "yMod" ), yMoveTest );

    for ( var i = 0; i < 4; i++ ) {
        gl.uniformMatrix4fv( gl.getUniformLocation(program, "transMatrix"),
                             false, new Float32Array( tMatrix[ i ] ) );
        gl.drawElements( gl.TRIANGLES, Ex.CUBE_FACES.length * 3,
                         gl.UNSIGNED_SHORT, 0 );
    }
    requestAnimationFrame( render );
}
