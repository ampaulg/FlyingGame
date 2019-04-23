const {
    checkArgCount,
    checkArgsAreNumbers,
    checkArgsAreInts,
    Color,
    Vertex,
    Face
} = require( "./myHelpers" );

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
    var color = new Color( 0.1, 0.2, 0.3, 0.4 );
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
    var vertex = new Vertex( 0.1, 0.2, 0.3 );
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
    var face = new Vertex( 0.1, 0.2, 0.3 );
    expect( face.x ).toBe( 0.1 );
    expect( face.y ).toBe( 0.2 );
    expect( face.z ).toBe( 0.3 );
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
