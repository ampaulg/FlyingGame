function checkArgCount( argCount, expected, name ) {
    if ( argCount != expected ) {
        throw new Error( "Invalid argument count for " + name + "\n"
           + argCount + " given, " + expected + " expected" );
    }
}

function checkArgsAreNumbers( args, name ) {
    for ( var i = 0; i < args.length; i++ ) {
        if ( ( typeof args[ i ] ) != "number" ) {
            throw new Error("Invalid argument type for " + name + "\n"
                + "arg " + ( i + 1 ) + " ( " + args[ i ] + " ) is not a number" );
        }
    }
}

function checkArgsAreInts( args, name ) {
    for ( var i = 0; i < args.length; i++ ) {
        if ( !( Number.isInteger( args[ i ] ) )
        || ( args[ i ] < 0 ) ) {
            throw new Error("Invalid argument type for " + name + "\n"
                + "arg " + ( i + 1 ) + " ( " + args[ i ] + " ) is not a "
                + "non-negative integer" );
        }
    }
}

function Color( r, g, b, a ) {
    checkArgCount( arguments.length, 4, "Color" );
    if ( !( this instanceof Color ) ){
        return new Color( r, g, b, a );
    }
    checkArgsAreNumbers( arguments, "Color" );
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

function Vertex( x, y, z ) {
    checkArgCount( arguments.length, 3, "Vertex" );
    if ( !( this instanceof Vertex ) ){
        return new Vertex( x, y, z );
    }
    checkArgsAreNumbers( arguments, "Vertex" );
    this.x = x;
    this.y = y;
    this.z = z;
}

function Face( v1, v2, v3 ) {
    checkArgCount( arguments.length, 3, "Face" );
    if ( !( this instanceof Face ) ){
        return new Face( v1, v2, v3 );
    }
    checkArgsAreInts( arguments, "Face" );
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
}

function flatten( arr ) {
    if ( !Array.isArray( arr ) ) {
        throw new Error( "flatten argument is not an array" );
    } else if ( arr.length == 0 ) {
        throw new Error( "flatten argument is an empty array" );
    }

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
        case "Face":
            for ( var i = 0; i < arr.length; i++ ) {
                output.push( arr[ i ].v1 );
                output.push( arr[ i ].v2 );
                output.push( arr[ i ].v3 );
            }
            output = new Uint16Array( output );
            break;
        default:
            throw new Error( "flatten argument is of unsupported type" );
    }

    return output;
}

function perspectiveViewMat( near, far, nearWidth, nearHeight ) {
    checkArgCount( arguments.length, 4, "perspectiveViewMat" );
    checkArgsAreNumbers( arguments, "perspectiveViewMat" );

    return new Float32Array(
        [
            (2*near)/(nearWidth), 0, 0, 0,
            0, (2*near)/(nearHeight), 0, 0,
            0, 0, -(far+near)/(far-near), -1,
            0, 0, -(2*far*near)/(far-near), 0
        ]
    );
}

module.exports = {
    checkArgCount,
    checkArgsAreNumbers,
    checkArgsAreInts,
    Color,
    Vertex,
    Face,
    flatten,
    perspectiveViewMat
};