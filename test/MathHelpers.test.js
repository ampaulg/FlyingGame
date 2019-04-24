const {
    checkArgCount,
    checkArgsAreNumbers,
    checkArgsAreInts,
    Color,
    Vertex,
    Face,
    flatten
} = require( "../MathHelpers" );

test( "argCount has no error when count is correct", () => {
  expect(
      () => { checkArgCount( 3, 3, "test" ) }
  ).not.toThrow();
});

test( "argCount throws error when count is wrong", () => {
    expect(
        () => { checkArgCount( 3, 2, "test" ) }
    ).toThrow();
});

test( "argCount throws correct error message", () => {
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
    expect(
        () => { checkArgsAreNumbers( [ 1, true, 3 + 5 ], "test" ) }
    ).toThrow();
});

test( "checkArgsAreNumbers throws correct error message", () => {
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

test( "Flatten color works correctly on valid input", () => {
    var input = [
        Color( 1, 2.3, 3, 4 ),
        Color( 5, 6, 7.2, 8 )
    ];
    var output = new Float32Array( [ 1, 2.3, 3, 4, 5, 6, 7.2, 8 ] );
    expect( flatten( input ) ).toEqual( output );
});

test( "Flatten vertex works correctly on valid input", () => {
    var input = [
        Vertex( 1, 2.3, 3 ),
        Vertex( 5, 6, 7.2 )
    ];
    var output = new Float32Array( [ 1, 2.3, 3, 5, 6, 7.2 ] );
    expect( flatten( input ) ).toEqual( output );
});

test( "Flatten face works correctly on valid input", () => {
    var input = [
        Face( 1, 3, 5 ),
        Face( 7, 6, 2 )
    ];
    var output = new Uint16Array( [ 1, 3, 5, 7, 6, 2 ] );
    expect( flatten( input ) ).toEqual( output );
});

test( "Flatten rejects non-array", () => {
    var error = "flatten argument is not an array";
    expect(
        () => { flatten( "notAnArray" ) }
    ).toThrowError( error );
});

test( "Flatten rejects empty array", () => {
    var error = "flatten argument is an empty array";
    expect(
        () => { flatten( [] ) }
    ).toThrowError( error );
});

test( "Flatten rejects arrays of other types", () => {
    var error = "flatten argument is of unsupported type";
    expect(
        () => { flatten( [ 1, 2, 3 ] ) }
    ).toThrowError( error );
});
