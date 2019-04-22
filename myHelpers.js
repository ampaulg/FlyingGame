function checkArgCount( argCount, expected, name ) {
    if ( argCount != expected ) {
        throw "Invalid argument count for " + name + "\n"
            + arguments.length + " given, 4 expected";
    }
}

function checkArgsAreNumbers( args, name ) {
    for ( var i = 0; i < args.length; i++ ) {
        if ( isNaN( args[ i ] ) ) {
            throw "Invalid argument type for " + name + "\n"
                + "arg " + i + " ( " + args[ i ] + " )" + " is not a number";
        }
    }
}

function Color( r, g, b, a ) {
    checkArgCount( arguments.length, 4, "Color" );
    checkArgsAreNumbers( arguments, "Color" );
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

function Vertex( x, y, z ) {
    checkArgCount( arguments.length, 3, "Vertex" );
    checkArgsAreNumbers( arguments, "Vertex" );
    this.x = x;
    this.y = y;
    this.z = z;
}

function Face( v1, v2, v3 ) {
    checkArgCount( arguments.length, 3, "Face" );
    checkArgsAreNumbers( arguments, "Face" );
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
}
