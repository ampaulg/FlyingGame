function indexFlatten( vec ) {
    var shorts = new Uint16Array( vec.length * 3 );
    for ( var i = 0; i < vec.length; i++ ) {
        shorts[ i*3 ] = vec[ i ][ 0 ];
        shorts[ i*3 + 1] = vec[ i ][ 1 ];
        shorts[ i*3 + 2] = vec[ i ][ 2 ];
    }
    return shorts;
}
