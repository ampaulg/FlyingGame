import * as MyMath from './MathHelpers.js';
import * as Game from './GameHelpers.js';
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
var gameObjects = [
    new Game.GameObject( Game.GameObjectType.CUBE_1, 0, 0, -3.5 ),
    new Game.GameObject( Game.GameObjectType.CUBE_2, -2, -2, -3.5 ),
    new Game.GameObject( Game.GameObjectType.CUBE_3, -2, 2, -3.5 )
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

    iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

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
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData( gl.ARRAY_BUFFER,
                       MyMath.flattenObjArray( gameObjects[ i ].vertices ),
                       gl.STATIC_DRAW );
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER,
                       MyMath.flattenObjArray( gameObjects[ i ].faces ),
                       gl.STATIC_DRAW );
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData( gl.ARRAY_BUFFER,
                       MyMath.flattenObjArray( gameObjects[ i ].colors ),
                       gl.STATIC_DRAW );
        gl.uniformMatrix4fv( gl.getUniformLocation(program, "transMatrix"),
                             false,
                             MyMath.flattenMatrix( gameObjects[ i ].transform ) );
        gl.drawElements( gl.TRIANGLES, gameObjects[ i ].faces.length * 3,
                         gl.UNSIGNED_SHORT, 0 );
    }
}
