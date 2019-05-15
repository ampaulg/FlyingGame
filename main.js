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
const N_WIDTH = 5;
const N_HEIGHT = 5;

const AMBIENT_LIGHT = 0.3;
const DIFFUSE_RANGE = 0.7;

const SHIP_Z = -6;
var ship = new GameObj.GameObject( GameObj.GameObjectType.SHIP, 0, 0, SHIP_Z );
var gameObjects = [
    ship
];

var LIGHT_POS = [ -20, 20, -8 ];

var upKey = "ArrowUp"
var downKey = "ArrowDown"
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var lastNewRingTime;
const RING_START_Z = -30;
const INITIAL_RING_SPAWN_TIME = 2500;
const RING_SPAWN_TIME_MODIFIER = 50;
const FASTEST_RING_SPAWN_TIME = 1000;
var currentRingSpawnTime = INITIAL_RING_SPAWN_TIME;

var currentStreak = 0;
var longestStreak = 0;
var streakText;
var highScoreText;

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
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projMatrix" ),
                         false,
                         MyMath.flattenMatrix(
                             MyMath.perspectiveViewMat(
                                 NEAR, FAR, N_WIDTH, N_HEIGHT )
                         ) );

    gl.uniform3fv( gl.getUniformLocation( program, "lightPos" ),
                   LIGHT_POS );

    gl.uniform1f( gl.getUniformLocation( program, "ambientLight" ),
                   AMBIENT_LIGHT );
    gl.uniform1f( gl.getUniformLocation( program, "diffuseRange" ),
                   DIFFUSE_RANGE );

    document.getElementById( "yCheckbox" ).addEventListener( "change", invertY,
                                                             false );
    document.getElementById( "useWolfen" ).addEventListener( "change",
                                                             toggleShipColor,
                                                             false );
    streakText = document.getElementById( "streakC" );
    highScoreText = document.getElementById( "streakL" );

    makeNewRing();
    lastNewRingTime = Date.now();
    requestAnimationFrame( gameUpdate );
};

function gameUpdate() {

    if ( Date.now() - lastNewRingTime > currentRingSpawnTime ) {
        makeNewRing();
    }

    updateGameObjects();
    drawGameObjects();

    requestAnimationFrame( gameUpdate );
}

function makeNewRing() {
    var x = ( Math.random() * 20 ) - 10;
    var y = ( Math.random() * 20 ) - 10;
    gameObjects.push( new GameObj.GameObject( GameObj.GameObjectType.RING,
                                              x, y, RING_START_Z ) );
    lastNewRingTime = Date.now();
}

function updateGameObjects() {
    ship.control( ship, upPressed, downPressed, leftPressed, rightPressed );
    ship.update( ship )

    // remove the oldest ring when it's out of the game field
    if ( gameObjects[ 1 ].zPos > 0 ) {
        gameObjects.splice( 1, 1 );
    }

    for ( var i = 1; i < gameObjects.length; i++ ) {
        if ( !gameObjects[ i ].passedShip
             && ( gameObjects[ i ].zPos > SHIP_Z ) ) {
            if ( ( Math.sqrt(
                    Math.pow( ( gameObjects[ i ].xPos - ship.xPos ), 2 ) +
                    Math.pow( ( gameObjects[ i ].yPos - ship.yPos ), 2 ) ) )
                 < gameObjects[ i ].radius ) {
                     gameObjects[ i ].setSuccess();
                     currentStreak++;
                     if ( currentStreak > longestStreak ) {
                         longestStreak = currentStreak;
                         highScoreText.innerHTML = longestStreak;
                     }
                     if ( currentRingSpawnTime > FASTEST_RING_SPAWN_TIME ) {
                         currentRingSpawnTime -= RING_SPAWN_TIME_MODIFIER;
                     }

            } else {
                gameObjects[ i ].setFail();
                currentStreak = 0;
                currentRingSpawnTime = INITIAL_RING_SPAWN_TIME;
            }
            gameObjects[ i ].passedShip = true;
            streakText.innerHTML = currentStreak;
        }

        gameObjects[ i ].update( gameObjects[ i ] );
    }
}

function drawGameObjects() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    for ( var i = 0; i < gameObjects.length; i++ ) {
        drawObject( gameObjects[ i ] );
    }
}

function drawObject( obj ) {
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER,
                   MyMath.flattenObjArray( obj.vertices ),
                   gl.STATIC_DRAW );
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER,
                   MyMath.flattenObjArray( obj.normals ),
                   gl.STATIC_DRAW );

    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER,
                   MyMath.flattenObjArray( obj.colors ),
                   gl.STATIC_DRAW );
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "transMatrix"),
                         false,
                         MyMath.flattenMatrix( obj.transform ) );
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "rotMatrix"),
                         false,
                         MyMath.flattenMatrix( obj.getRotMatrix() ) );
    gl.drawArrays( gl.TRIANGLES, 0, obj.vertices.length );
}

function toggleShipColor() {
    ship.toggleColors();
}

var yInverted = false;
function invertY() {
    if ( yInverted ) {
        upKey = "ArrowUp";
        downKey = "ArrowDown";
        yInverted = false;
        flipUpDownPressed();
    }
    else {
        yInverted = true;
        upKey = "ArrowDown";
        downKey = "ArrowUp";
        flipUpDownPressed();
    }
}

function flipUpDownPressed() {
    var temp = upPressed;
    upPressed = downPressed;
    downPressed = temp;
}

window.addEventListener( "keydown", getKeyDown, false );
function getKeyDown( key ) {
    switch( key.key ) {
        case downKey:
            downPressed = true;
            break;
        case upKey:
            upPressed = true;
            break;
        case "ArrowLeft":
            leftPressed = true;
            break;
        case "ArrowRight":
            rightPressed = true;
            break;
        case "r":
            //restartGame();
            break;
        case "s":
            //startGame();
            break;
    }
}

window.addEventListener( "keyup", getKeyUp, false );
function getKeyUp( key ) {
    switch( key.key ) {
        case downKey:
            downPressed = false;
            break;
        case upKey:
            upPressed = false;
            break;
        case "ArrowLeft":
            leftPressed = false;
            break;
        case "ArrowRight":
            rightPressed = false;
            break;
    }
}
