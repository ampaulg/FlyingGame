import * as MyMath from './MathHelpers.js';
import * as Ar from './Assets/Arwing.js';
import * as Rn from './Assets/Ring.js';

const GameObjectType = {
    SHIP : 0,
    RING : 1
}

function getTimeDiff( time1 ) {
    return Date.now() - time1;
}

function shipUpdate( ship ) {
    var diff = ship.getTimeDiff( ship.timeStart );
    ship.setYRot( diff / 20 );
    ship.updateTransform();
}

function ringUpdate( ring ) {
    var diff = ring.getTimeDiff( ring.timeStart );
    ring.setZRot( diff / 20 );
    var scale = 1 + ( Math.sin( MyMath.degToRad( ( diff / 1000 )
                                       * ( 360 / ring.period ) ) ) ) / 3;
    ring.updateTransform();
}

function randomColors( length ) {
    var colors = [];
    for ( var i = 0; i < length; i++ ) {
        colors.push( MyMath.Color( Math.random(), Math.random(),
                                 Math.random(), 1.0 ) );
    }
    return colors;
}

const ARWING_BLACK = MyMath.Color( 0.1, 0.1, 0.1, 1.0 );
const ARWING_MAIN_COLOR = MyMath.Color( 0.8, 0.8, 0.8, 1.0 );
const ARWING_SECONDARY_COLOR = MyMath.Color( 0.24, 0.24, 0.63, 1.0 );

const ARWING_DEFAULT_COLORS = [
	ARWING_BLACK,
	ARWING_MAIN_COLOR,
	ARWING_SECONDARY_COLOR
];

function getArwingDefaultColors( ids ) {
    var colors = [];
    for ( var i = 0; i < ids.length; i++ ) {
        colors.push( ARWING_DEFAULT_COLORS[ ids[ i ] ] );
    }
    return colors
}

const RING_GOLD = MyMath.Color( 0.85, 0.65, 0.13, 1.0 );

function getRingColors( count ) {
    var colors = [];
    for ( var i = 0; i < count; i++ ) {
        colors.push( RING_GOLD );
    }
    return colors
}

function GameObject( type, x, y, z ) {
    this.xPos = x;
    this.yPos = y;
    this.zPos = z;
    this.vertices;
    this.normals;
    this.colors;

    this.timeStart = Date.now();
    this.getTimeDiff = getTimeDiff; // held in obj so I can use a mock to test
    this.transform;
    this.update;

    this.xScale = 1;
    this.yScale = 1;
    this.zScale = 1;

    this.xRot = 0;
    this.yRot = 0;
    this.zRot = 0;

    switch ( type ) {
        case GameObjectType.SHIP:
            this.vertices = Ar.ARWING_VERTICES;
            this.normals = Ar.ARWING_NORMALS;
            this.colors = getArwingDefaultColors( Ar.ARWING_COLOR_IDS );
            this.update = shipUpdate;
            this.xRot = 30;
            break;
        case GameObjectType.RING:
            this.vertices = Rn.RING_VERTICES;
            this.normals = Rn.RING_NORMALS;
            this.colors = getRingColors( this.vertices.length );
            this.update = ringUpdate;
            this.period = 3;
            break;
        default:
            throw new Error( "Can't handle that type" );
    }

    this.setX = function( newX ) {
        this.xPos = newX;
    }
    this.setXScale = function( newXScale ) {
        this.xScale = newXScale;
    }
    this.setYScale = function( newYScale ) {
        this.yScale = newYScale;
    }
    this.setZScale = function( newZScale ) {
        this.zScale = newZScale;
    }
    this.setXRot = function( newXRot ) {
        this.xRot = newXRot;
    }
    this.setYRot = function( newYRot ) {
        this.yRot = newYRot;
    }
    this.setZRot = function( newZRot ) {
        this.zRot = newZRot;
    }
    this.setTransform = function( newTransform ) {
        this.transform = newTransform;
    }

    this.updateTransform = function() {
        var extraMatrices = [];
        if ( ( this.xScale != 1 ) || ( this.yScale != 1 ) ||
             ( this.zScale != 1 ) ) {
            extraMatrices.push(
                MyMath.scaleMat( this.xScale, this.yScale, this.zScale ) );
        }
        if ( this.xRot != 0 ) {
            extraMatrices.push( MyMath.rotationXMat( this.xRot ) );
        }
        if ( this.yRot != 0 ) {
            extraMatrices.push( MyMath.rotationYMat( this.yRot ) );
        }
        if ( this.zRot != 0 ) {
            extraMatrices.push( MyMath.rotationZMat( this.zRot ) );
        }

        this.transform = MyMath.translationMat( this.xPos, this.yPos,
                                                this.zPos );

        for ( var i = 0; i < extraMatrices.length; i++ ) {
            this.transform = MyMath.matrixMult(
                this.transform,
                extraMatrices[ i ]
            );
        }
    }

    this.getRotMatrix = function() {
        var extraMatrices = [];
        if ( this.xRot != 0 ) {
            extraMatrices.push( MyMath.rotationXMat( this.xRot ) );
        }
        if ( this.yRot != 0 ) {
            extraMatrices.push( MyMath.rotationYMat( this.yRot ) );
        }
        if ( this.zRot != 0 ) {
            extraMatrices.push( MyMath.rotationZMat( this.zRot ) );
        }

        var rotMatrix = MyMath.IDENTITY_MAT;

        for ( var i = 0; i < extraMatrices.length; i++ ) {
            rotMatrix = MyMath.matrixMult( rotMatrix, extraMatrices[ i ] );
        }

        return rotMatrix;
    }
}

export {
    GameObjectType,
    GameObject
};
