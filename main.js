import * as MyMath from './MathHelpers.js';
import * as GameObj from './GameObjects.js';

var canvas;
var gl;
var program;

var vPosition, vNormal, vColor;
var vBuffer, cBuffer, nBuffer;

// constants for projection frustrum
const NEAR = 1;
const FAR = 100;
const N_WIDTH = 2;
const N_HEIGHT = 2;

var time1;
var gameObjects = [
    new GameObj.GameObject( GameObj.GameObjectType.SHIP, 0, 0, -8 ),
    new GameObj.GameObject( GameObj.GameObjectType.RING, -3, -3, -8 )
];

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
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vColor );

    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projMatrix"),
                         false,
                         MyMath.flattenMatrix(
                             MyMath.perspectiveViewMat(
                                 NEAR, FAR, N_WIDTH, N_HEIGHT )
                         ) );

    requestAnimationFrame( render );
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    drawGameObjects();
    requestAnimationFrame( render );
}

function drawGameObjects() {
    for ( var i = 0; i < gameObjects.length; i++ ) {
        gameObjects[ i ].update( gameObjects[ i ] );
        gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData( gl.ARRAY_BUFFER,
                       MyMath.flattenObjArray( gameObjects[ i ].vertices ),
                       gl.STATIC_DRAW );
        gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
        gl.bufferData( gl.ARRAY_BUFFER,
                       MyMath.flattenObjArray( gameObjects[ i ].normals ),
                       gl.STATIC_DRAW );

        gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData( gl.ARRAY_BUFFER,
                       MyMath.flattenObjArray( gameObjects[ i ].colors ),
                       gl.STATIC_DRAW );
        gl.uniformMatrix4fv( gl.getUniformLocation(program, "transMatrix"),
                             false,
                             MyMath.flattenMatrix( gameObjects[ i ].transform ) );
        gl.uniformMatrix4fv( gl.getUniformLocation(program, "rotMatrix"),
                             false,
                             MyMath.flattenMatrix( gameObjects[ i ].getRotMatrix() ) );
        gl.drawArrays( gl.TRIANGLES, 0, gameObjects[ i ].vertices.length );
    }
}
