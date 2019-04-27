const {
    Color,
    Vertex,
    Face,
    flattenObjArray,
    flattenMatrix,
    perspectiveViewMat,
    dot,
    matrixMult
} = require( "../MathHelpers" );

test( "Color constructor works with correct args", () => {
    var color = Color( 0.1, 0.2, 0.3, 0.4 );
    expect( color.r ).toBe( 0.1 );
    expect( color.g ).toBe( 0.2 );
    expect( color.b ).toBe( 0.3 );
    expect( color.a ).toBe( 0.4 );
});

test( "Color constructor fails with wrong arg count", () => {
    expect(
        () => { Color( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Color constructor fails with wrong arg types", () => {
    expect(
        () => { Color( 1, 2, 3, true ) }
    ).toThrow();
});

test( "Vertex constructor works with correct args", () => {
    var vertex = Vertex( 0.1, 0.2, 0.3 );
    expect( vertex.x ).toBe( 0.1 );
    expect( vertex.y ).toBe( 0.2 );
    expect( vertex.z ).toBe( 0.3 );
});

test( "Vertex constructor fails with wrong arg count", () => {
    expect(
        () => { Vertex( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Vertex constructor fails with wrong arg types", () => {
    expect(
        () => { Vertex( 1, 2, 3, true ) }
    ).toThrow();
});

test( "Face constructor works with correct args", () => {
    var face = Face( 3, 4, 5 );
    expect( face.v1 ).toBe( 3 );
    expect( face.v2 ).toBe( 4 );
    expect( face.v3 ).toBe( 5 );
});

test( "Face constructor fails with wrong arg count", () => {
    expect(
        () => { Face( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Face constructor fails with wrong arg types", () => {
    expect(
        () => { Face( 1, 2, 3.5 ) }
    ).toThrow();
});

test( "flattenObjArray on color works correctly on valid input", () => {
    var input = [
        Color( 1, 2.3, 3, 4 ),
        Color( 5, 6, 7.2, 8 )
    ];
    var output = new Float32Array( [ 1, 2.3, 3, 4, 5, 6, 7.2, 8 ] );
    expect( flattenObjArray( input ) ).toEqual( output );
});

test( "flattenObjArray on vertex works correctly on valid input", () => {
    var input = [
        Vertex( 1, 2.3, 3 ),
        Vertex( 5, 6, 7.2 )
    ];
    var output = new Float32Array( [ 1, 2.3, 3, 5, 6, 7.2 ] );
    expect( flattenObjArray( input ) ).toEqual( output );
});

test( "flattenObjArray on face works correctly on valid input", () => {
    var input = [
        Face( 1, 3, 5 ),
        Face( 7, 6, 2 )
    ];
    var output = new Uint16Array( [ 1, 3, 5, 7, 6, 2 ] );
    expect( flattenObjArray( input ) ).toEqual( output );
});

test( "flattenObjArray rejects non-array", () => {
    var error = "flattenObjArray argument is not an array";
    expect(
        () => { flattenObjArray( "notAnArray" ) }
    ).toThrowError( error );
});

test( "flattenObjArray rejects empty array", () => {
    var error = "flattenObjArray argument is an empty array";
    expect(
        () => { flattenObjArray( [] ) }
    ).toThrowError( error );
});

test( "flattenObjArray rejects arrays of unsupported types", () => {
    var error = "flattenObjArray argument is of unsupported type";
    expect(
        () => { flattenObjArray( [ 1, 2, 3 ] ) }
    ).toThrowError( error );
});

test( "flattenMatrix correctly flattens valid input", () => {
    var input = [  [ 0, 4, 8, 12 ],
                   [ 1, 5, 9, 13 ],
                   [ 2, 6, 10, 14 ],
                   [ 3, 7, 11,15 ] ];
    var output = new Float32Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8,
                                     9, 10, 11, 12, 13, 14, 15] );
    expect( flattenMatrix( input ) ).toEqual( output );
});

test( "flattenMatrix rejects non-array", () => {
    var error = "flattenMatrix argument is not an array";
    expect(
        () => { flattenMatrix( "notAnArray" ) }
    ).toThrowError( error );
});

test( "flattenMatrix rejects empty array", () => {
    var error = "flattenMatrix argument is an empty array";
    expect(
        () => { flattenMatrix( [] ) }
    ).toThrowError( error );
});

test( "flattenMatrix rejects non-square matrix", () => {
    var error = "flattenMatrix argument is not a square matrix";
    expect(
        () => { flattenMatrix( [ [ 1, 2 ], [ 3 ] ] ) }
    ).toThrowError( error );
});

test( "perspectiveViewMat returns correct matrix", () => {
    var n = 2, f = 4, nearWidth = 1, nearHeight = 4;
    var output = [ [ 4, 0, 0, 0 ],
                   [ 0, 1, 0, 0 ],
                   [ 0, 0, -3, -8 ],
                   [ 0, 0, -1, 0 ] ];
    expect( perspectiveViewMat( n, f, nearWidth, nearHeight ) ).toEqual( output );
});


test( "perspectiveViewMat fails with incorrect arg count", () => {
    var error = "Invalid argument count for perspectiveViewMat\n"
        + "5 given, 4 expected";
    expect(
        () => { perspectiveViewMat( 1, 2, 3, 4, 5 ) }
    ).toThrowError( error );
});

test( "perspectiveViewMat fails with incorrect arg types", () => {
    var error = "Invalid argument type for perspectiveViewMat\n"
        + "arg 3 ( false ) is not a number";
    expect(
        () => { perspectiveViewMat( 1, 2, false, 4 ) }
    ).toThrowError( error );
});

test( "dot returns correct result for valid input", () => {
    var arr1 = [ 2, 3, 4 ];
    var arr2 = [ 10, 100, 1000 ];
    expect( dot( arr1, arr2 ) ).toBe( 4320 );
});

test( "dot throws errors for invalid arrays", () => {
    var arr1 = [ 2, 3, 4 ];
    var arr2 = [ 10, 100, 100 ];
    var empty = [];
    var invalid = 222;
    var differentLength = [ 2, 3 ];

    var nonArrayError = "dot argument is not an array";
    var emptyArrayError = "dot argument is an empty array";
    var lengthError = "dot function called on args with unequal lengths";

    expect(
        () => { dot( arr1, invalid ) }
    ).toThrowError( nonArrayError );
    expect(
        () => { dot( invalid, arr2 ) }
    ).toThrowError( nonArrayError );
    expect(
        () => { dot( arr1, empty ) }
    ).toThrowError( emptyArrayError );
    expect(
        () => { dot( empty, arr2 ) }
    ).toThrowError( emptyArrayError );
    expect(
        () => { dot( arr1, differentLength ) }
    ).toThrowError( lengthError );
});

test( "matrixMult returns correct result for valid input", () => {
    var mat1 = [ [ 5, 2, 6, 1 ],
                 [ 0, 6, 2, 0 ],
                 [ 3, 8, 1, 4 ],
                 [ 1, 8, 5, 6 ] ];
    var mat2 = [ [ 7, 5, 8, 0 ],
                 [ 1, 8, 2, 6 ],
                 [ 9, 4, 3, 8 ],
                 [ 5, 3, 7, 9 ] ];
    var output = [ [ 96, 68, 69, 69 ],
                   [ 24, 56, 18, 52 ],
                   [ 58, 95, 71, 92 ],
                   [ 90, 107, 81, 142 ] ];
    expect( matrixMult( mat1, mat2 ) ).toEqual( output );
});

test( "matrixMult throws errors for invalid arrays", () => {
    var mat1 = [ [ 5, 2, 6, 1 ],
                 [ 0, 6, 2, 0 ],
                 [ 3, 8, 1, 4 ],
                 [ 1, 8, 5, 6 ] ];
    var mat2 = [ [ 7, 5, 8, 0 ],
                 [ 1, 8, 2, 6 ],
                 [ 9, 4, 3, 8 ],
                 [ 5, 3, 7, 9 ] ];
    var empty = [];
    var invalid = 222;
    var notSquare = [ [ 7, 5, 8, 0 ],
                      [ 1, 8, 2, 6 ],
                      [ 9, 4, 8 ],
                      [ 5, 3, 7, 9 ] ];

    var nonArrayError = "matrixMult argument is not an array";
    var emptyArrayError = "matrixMult argument is an empty array";
    var squareError = "matrixMult argument is not a square matrix";

    expect(
        () => { matrixMult( mat1, invalid ) }
    ).toThrowError( nonArrayError );
    expect(
        () => { matrixMult( invalid, mat2 ) }
    ).toThrowError( nonArrayError );
    expect(
        () => { matrixMult( mat1, empty ) }
    ).toThrowError( emptyArrayError );
    expect(
        () => { matrixMult( empty, mat2 ) }
    ).toThrowError( emptyArrayError );
    expect(
        () => { matrixMult( mat1, notSquare ) }
    ).toThrowError( squareError );
    expect(
        () => { matrixMult( notSquare, mat2 ) }
    ).toThrowError( squareError );
});
