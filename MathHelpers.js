import * as ArgVal from './ArgValidators.js';

function Color( r, g, b, a ) {
    ArgVal.checkArgCount( arguments.length, 4, "Color" );
    if ( !( this instanceof Color ) ){
        return new Color( r, g, b, a );
    }
    ArgVal.checkArgsAreNumbers( arguments, "Color" );
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

function Vertex( x, y, z ) {
    ArgVal.checkArgCount( arguments.length, 3, "Vertex" );
    if ( !( this instanceof Vertex ) ){
        return new Vertex( x, y, z );
    }
    ArgVal.checkArgsAreNumbers( arguments, "Vertex" );
    this.x = x;
    this.y = y;
    this.z = z;
}

function Normal( x, y, z ) {
    ArgVal.checkArgCount( arguments.length, 3, "Normal" );
    if ( !( this instanceof Normal ) ){
        return new Normal( x, y, z );
    }
    ArgVal.checkArgsAreNumbers( arguments, "Normal" );
    this.x = x;
    this.y = y;
    this.z = z;
}

function flattenObjArray( arr ) {
    ArgVal.checkValidArray( arr, "flattenObjArray" );

    var output = [];

    switch ( arr[0].constructor.name ) {
        case "Color":
            for ( var i = 0; i < arr.length; i++ ) {
                output.push( arr[ i ].r );
                output.push( arr[ i ].g );
                output.push( arr[ i ].b );
                output.push( arr[ i ].a );
            }
            output = new Float32Array( output );
            break;
        case "Vertex":
            for ( var i = 0; i < arr.length; i++ ) {
                output.push( arr[ i ].x );
                output.push( arr[ i ].y );
                output.push( arr[ i ].z );
            }
            output = new Float32Array( output );
            break;
        case "Normal":
            for ( var i = 0; i < arr.length; i++ ) {
                output.push( arr[ i ].x );
                output.push( arr[ i ].y );
                output.push( arr[ i ].z );
            }
            output = new Float32Array( output );
            break;
        default:
            throw new Error( "flattenObjArray argument is of unsupported type" );
    }

    return output;
}

function flattenMatrix( mat ) {
    ArgVal.checkValidArray( mat, "flattenMatrix" );
    ArgVal.checkSquareMatrix( mat, "flattenMatrix" );

    var output = [];
    for ( var col = 0; col < mat.length; col++ ) {
        for ( var row = 0; row < mat.length; row++ ) {
            output.push( mat[ row ][ col ] );
        }
    }
    return new Float32Array( output );
}

function perspectiveViewMat( near, far, nearWidth, nearHeight ) {
    ArgVal.checkArgCount( arguments.length, 4, "perspectiveViewMat" );
    ArgVal.checkArgsAreNumbers( arguments, "perspectiveViewMat" );

    return [
            [(2*near)/(nearWidth), 0, 0, 0],
            [0, (2*near)/(nearHeight), 0, 0],
            [0, 0, -(far+near)/(far-near), -(2*far*near)/(far-near)],
            [0, 0, -1, 0]
        ];
}

function dot( arr1, arr2 ) {
    ArgVal.checkValidArray( arr1, "dot" );
    ArgVal.checkValidArray( arr2, "dot" );
    if ( arr1.length != arr2.length ) {
        throw new Error( "dot function called on args with unequal lengths" );
    }

    var total = 0;
    for ( var i = 0; i < arr1.length; i++ ) {
        total += ( arr1[ i ] * arr2[ i ] );
    }
    return total;
}

function matrixMult( mat1, mat2 ) {
    ArgVal.checkValidArray( mat1, "matrixMult" );
    ArgVal.checkValidArray( mat2, "matrixMult" );
    ArgVal.checkArrayLength( mat1, 4, "matrixMult" );
    ArgVal.checkArrayLength( mat2, 4, "matrixMult" );
    ArgVal.checkSquareMatrix( mat1, "matrixMult" );
    ArgVal.checkSquareMatrix( mat2, "matrixMult" );

    var output = [];
    for ( var row = 0; row < 4; row++ ) {
        var newRow = [];
        for ( var col = 0; col < 4; col++ ) {
            var arr2 = [ mat2[ 0 ][ col ],
                         mat2[ 1 ][ col ],
                         mat2[ 2 ][ col ],
                         mat2[ 3 ][ col ] ];
            var result = dot( mat1[ row ], arr2 );
            newRow.push( result );
        }
        output.push( newRow );
    }
    return output;
}

const IDENTITY_MAT = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

function translationMat( x, y, z ) {
    ArgVal.checkArgCount( arguments.length, 3, "translationMat" );
    ArgVal.checkArgsAreNumbers( arguments, "translationMat" );
    return [
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1]
        ];
}


function scaleMat( x, y, z ) {
    ArgVal.checkArgCount( arguments.length, 3, "scaleMat" );
    ArgVal.checkArgsAreNumbers( arguments, "scaleMat" );
    return [
            [x, 0, 0, 0],
            [0, y, 0, 0],
            [0, 0, z, 0],
            [0, 0, 0, 1]
        ];
}

function degToRad( degrees ) {
    ArgVal.checkArgCount( arguments.length, 1, "degToRad" );
    ArgVal.checkArgsAreNumbers( arguments, "degToRad" );
    return degrees * Math.PI / 180;
}

function rotationXMat( angle ) {
    ArgVal.checkArgCount( arguments.length, 1, "rotationXMat" );
    ArgVal.checkArgsAreNumbers( arguments, "rotationXMat" );

    angle = degToRad( angle );
    return [ [1, 0, 0, 0],
             [0, Math.cos( angle ), -Math.sin( angle ), 0],
             [0, Math.sin( angle ), Math.cos( angle ), 0],
             [0, 0, 0, 1] ];
}

function rotationYMat( angle ) {
    ArgVal.checkArgCount( arguments.length, 1, "rotationYMat" );
    ArgVal.checkArgsAreNumbers( arguments, "rotationYMat" );

    angle = degToRad( angle );
    return [ [Math.cos( angle ), 0, Math.sin( angle ), 0],
             [0, 1, 0, 0],
             [-Math.sin( angle ), 0, Math.cos( angle ), 0],
             [0, 0, 0, 1] ];
}

function rotationZMat( angle ) {
    ArgVal.checkArgCount( arguments.length, 1, "rotationZMat" );
    ArgVal.checkArgsAreNumbers( arguments, "rotationZMat" );

    angle = degToRad( angle );
    return [ [Math.cos( angle ), -Math.sin( angle ), 0, 0],
             [Math.sin( angle ), Math.cos( angle ), 0, 0],
             [0, 0, 1, 0],
             [0, 0, 0, 1] ];
}

export {
    Color,
    Vertex,
    Normal,
    flattenObjArray,
    flattenMatrix,
    perspectiveViewMat,
    dot,
    matrixMult,
    IDENTITY_MAT,
    translationMat,
    scaleMat,
    degToRad,
    rotationXMat,
    rotationYMat,
    rotationZMat
};
