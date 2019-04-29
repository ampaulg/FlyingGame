function floatArrayChecker( output, expected ) {
    for ( var i = 0; i < expected.length; i++ ) {
        for ( var j = 0; j < expected[ i ].length; j++ ) {
            expect( output[ i ][ j ] ).toBeCloseTo( expected[ i ][ j ], 10 );
        }
    }
}

export {
    floatArrayChecker
};
