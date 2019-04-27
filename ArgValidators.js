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

function checkValidArray( arr, name ) {
    if ( !Array.isArray( arr ) ) {
        throw new Error( name + " argument is not an array" );
    } else if ( arr.length == 0 ) {
        throw new Error( name + " argument is an empty array" );
    }
}

function checkArrayLength( arr, length, name ) {
    if ( arr.length != ( length ) ) {
        throw new Error( name + " argument is not an array of length " + length );
    }
}

function checkSquareMatrix( mat, name ) {
    checkValidArray( mat, name );
    for ( var i = 0; i < mat.length; i++ ) {
        if ( mat[ i ].length != mat.length ) {
            throw new Error( name + " argument is not a square matrix" );
        }
    }
}

export {
    checkArgCount,
    checkArgsAreNumbers,
    checkArgsAreInts,
    checkValidArray,
    checkArrayLength,
    checkSquareMatrix
};
