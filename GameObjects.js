import * as MyMath from './MathHelpers.js';
import * as Ar from './Assets/Arwing.js';
import * as Rn from './Assets/Ring.js';

const GameObjectType = {
    SHIP : 0,
    RING : 1
}

const ARWING_BLACK = MyMath.Color( 0.1, 0.1, 0.1, 1.0 );
const ARWING_MAIN_COLOR = MyMath.Color( 0.8, 0.8, 0.8, 1.0 );
const ARWING_SECONDARY_COLOR = MyMath.Color( 0.24, 0.24, 0.63, 1.0 );

const ARWING_DEFAULT_COLORS = [
	ARWING_BLACK,
	ARWING_MAIN_COLOR,
	ARWING_SECONDARY_COLOR
];

const RingColor = {
    DEFAULT : MyMath.Color( 0.85, 0.65, 0.13, 1.0 ),
    SUCCESS : MyMath.Color( 0.0, 1.0, 0.0, 1.0 ),
    FAIL : MyMath.Color( 1.0, 0.0, 0.0, 1.0 )
}

function getTimeDiff( obj ) {
    var now = Date.now();
    var diff = now - obj.timeStart;
    obj.timeStart = now;
    return diff;
}

function shipControl( ship, up, down, left, right ) {
    ship.up = up;
    ship.down = down;
    ship.left = left;
    ship.right = right;
}

function shipUpdate( ship ) {
    var diff = ship.getTimeDiff( ship );
    var speedConst = 50;
    if ( ship.up ) {
        ship.setY( ship.yPos + ( diff / speedConst ) );
        if ( ship.yPos > 15 ) {
            ship.setY( 15 );
        }
    }
    if ( ship.down ) {
        ship.setY( ship.yPos - ( diff / speedConst ) );
        if ( ship.yPos < -15 ) {
            ship.setY( -15 );
        }
    }
    if ( ship.left ) {
        ship.setX( ship.xPos - ( diff / speedConst ) );
        if ( ship.xPos < -15 ) {
            ship.setX( -15 );
        }
    }
    if ( ship.right ) {
        ship.setX( ship.xPos + ( diff / speedConst ) );
        if ( ship.xPos > 15 ) {
            ship.setX( 15 );
        }
    }
    ship.updateTransform();
}

function ringUpdate( ring ) {
    var diff = ring.getTimeDiff( ring );
    ring.setZRot( ring.zRot + ( diff / 20 ) );
    var speedConst = 150;
    ring.setZ( ring.zPos + ( diff / speedConst ) );
    ring.updateTransform();
}

function getArwingDefaultColors( ids ) {
    var colors = [];
    for ( var i = 0; i < ids.length; i++ ) {
        colors.push( ARWING_DEFAULT_COLORS[ ids[ i ] ] );
    }
    return colors;
}

function setRingColor( ring, color ) {
    var colors = [];
    for ( var i = 0; i < ring.vertices.length; i++ ) {
        colors.push( color );
    }
    ring.colors = colors;
}

function GameObject( type, x, y, z ) {
    this.type = type;
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
            this.control = shipControl;
            this.yRot = 180;
            this.zScale = 0.3;
            this.up = false;
            this.down = false;
            this.left = false;
            this.right = false;
            break;
        case GameObjectType.RING:
            this.vertices = Rn.RING_VERTICES;
            this.normals = Rn.RING_NORMALS;
            setRingColor( this, RingColor.DEFAULT );
            this.update = ringUpdate;
            this.period = 3;
            this.XYscale = 2;
            this.radius = 1.5 * this.XYscale;
            this.zScale = 0.5;
            this.xScale = this.XYscale;
            this.yScale = this.XYscale;
            this.passedShip = false;
            this.setSuccess = function() {
                setRingColor( this, RingColor.SUCCESS );
            }
            this.setFail = function() {
                setRingColor( this, RingColor.FAIL );
            }
            break;
        default:
            throw new Error( "Can't handle that type" );
    }

    this.setX = function( newX ) {
        this.xPos = newX;
    }
    this.setY = function( newY ) {
        this.yPos = newY;
    }
    this.setZ = function( newZ ) {
        this.zPos = newZ;
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
