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

module.exports = {
    checkArgCount,
    checkArgsAreNumbers,
    checkArgsAreInts,
    Color,
    Vertex,
    Face
};
