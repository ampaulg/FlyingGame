const {
    checkArgCount,
    checkArgsAreNumbers,
    checkArgsAreInts,
    checkValidArray,
    Color,
    Vertex,
    Face,
    flattenObjArray,
    flattenMatrix,
    perspectiveViewMat
} = require( "../MathHelpers" );

test( "checkArgCount has no error when count is correct", () => {
  expect(
      () => { checkArgCount( 3, 3, "test" ) }
  ).not.toThrow();
});

test( "checkArgCount throws error when count is wrong", () => {
    var error = "Invalid argument count for test\n"
        + "3 given, 2 expected";
    expect(
        () => { checkArgCount( 3, 2, "test" ) }
    ).toThrowError( error );
});

test( "checkArgsAreNumbers has no error when args are numbers", () => {
    expect(
        () => { checkArgsAreNumbers( [ 1, 2.2, 3 + 5 ], "test" ) }
    ).not.toThrow();
});

test( "checkArgsAreNumbers throws error when args aren't all numbers", () => {
    var error = "Invalid argument type for test\n"
            + "arg 2 ( true ) is not a number"
    expect(
        () => { checkArgsAreNumbers( [ 1, true, 3 + 5 ], "test" ) }
    ).toThrowError( error );
});

test( "checkArgsAreInts has no error when args are non negative ints", () => {
    expect(
        () => { checkArgsAreInts( [ 1, 0, 3 + 7 ], "test" ) }
    ).not.toThrow();
});

test( "checkArgsAreInts throws error with negative arg", () => {
    expect(
        () => { checkArgsAreInts( [ 1, -2, 3 ], "test" ) }
    ).toThrow();
});

test( "checkArgsAreInts throws error with non integer arg", () => {
    expect(
        () => { checkArgsAreInts( [ 1, 5.2, 3 ], "test" ) }
    ).toThrow();
});

test( "checkArgsAreInts throws correct error message", () => {
    var error = "Invalid argument type for test\n"
            + "arg 2 ( 5.2 ) is not a non-negative integer"
    expect(
        () => { checkArgsAreInts( [ 1, 5.2, 3 + 5 ], "test" ) }
    ).toThrowError( error );
});

test( "checkValidArray has no error on non-empty array", () => {
    expect(
        () => { checkValidArray( [ 1, 0, 3 ], "test" ) }
    ).not.toThrow();
});

test( "checkValidArray throws error for non-array", () => {
    var error = "test argument is not an array"
    expect(
        () => { checkValidArray( true, "test" ) }
    ).toThrowError( error );
});

test( "checkValidArray throws error for empty array", () => {
    var error = "test argument is an empty array"
    expect(
        () => { checkValidArray( [], "test" ) }
    ).toThrowError( error );
});

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
        + "5 given, 4 expected";
    var error = "Invalid argument type for perspectiveViewMat\n"
        + "arg 3 ( false ) is not a number"
    expect(
        () => { perspectiveViewMat( 1, 2, false, 4 ) }
    ).toThrowError( error );
});
