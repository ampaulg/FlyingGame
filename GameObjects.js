import * as MyMath from './MathHelpers.js';
import * as Ex from './ExampleObjects.js';
import * as Ar from './Assets/Arwing.js';

const GameObjectType = {
    SHIP : 0,
    RING : 1,
    CUBE_1 : 2,
    CUBE_2 : 3,
    CUBE_3 : 4
}

function getTimeDiff( time1 ) {
    return Date.now() - time1;
}

function cubeUpdate_1( cube ) {
    var diff = cube.getTimeDiff( cube.timeStart );
    cube.setX( Math.sin( MyMath.degToRad( ( diff / 1000 )
                         * ( 360 / cube.period ) ) ) );
    cube.setXRot( diff / 10 );
    cube.updateTransform();
}

function cubeUpdate_2( cube ) {
    var diff = cube.getTimeDiff( cube.timeStart );
    cube.setYScale( ( 1.5  + Math.sin( MyMath.degToRad( ( diff / 1000 )
                                       * ( 360 / cube.period ) ) ) ) );
    cube.updateTransform();
}

function cubeUpdate_3( cube ) {
    var diff = cube.getTimeDiff( cube.timeStart );
    cube.setYRot( diff / 10 );
    cube.updateTransform();
}

function shipUpdate( ship ) {
    var diff = ship.getTimeDiff( ship.timeStart );
    ship.setZRot( diff / 10 );
    ship.updateTransform();
}

function randomColors( length ) {
    var colors = [];
    for ( var i = 0; i < length; i++ ) {
        colors.push( MyMath.Color( Math.random(), Math.random(),
                                 Math.random(), 1.0 ) );
    }
    return colors;
}

function GameObject( type, x, y, z ) {
    this.xPos = x;
    this.yPos = y;
    this.zPos = z;
    this.vertices;
    this.faces;
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

    if ( type > 1 ) {
        this.vertices = Ex.CUBE_VERTICES;
        this.faces = Ex.CUBE_FACES;
        this.colors = Ex.CUBE_COLORS;
        switch ( type ) {
            case GameObjectType.CUBE_1:
                this.update = cubeUpdate_1;
                this.period = 3;
                break;
            case GameObjectType.CUBE_2:
                this.update = cubeUpdate_2;
                this.period = 2;
                break;
            case GameObjectType.CUBE_3:
                this.update = cubeUpdate_3;
                break;
            default:
                throw new Error( "Can't handle that type yet" );
        }
    } else if ( type == GameObjectType.SHIP ) {
        this.vertices = Ar.ARWING_VERTICES;
        this.faces = Ar.ARWING_FACES;
        this.colors = randomColors( this.vertices.length );
        this.update = shipUpdate;
        this.xScale = 0.5;
        this.yScale = 0.5;
        this.ZScale = 0.5;
    } else {
        throw new Error( "Can't handle that type yet" );
    }

    this.setX = function( newX ) {
        this.xPos = newX;
    }
    this.setYScale = function( newYScale ) {
        this.yScale = newYScale;
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
}

export {
    GameObjectType,
    GameObject
};