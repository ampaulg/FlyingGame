import * as Math from '../MathHelpers.js';

test( "Color constructor works with correct args", () => {
    var color = Math.Color( 0.1, 0.2, 0.3, 0.4 );
    expect( color.r ).toBe( 0.1 );
    expect( color.g ).toBe( 0.2 );
    expect( color.b ).toBe( 0.3 );
    expect( color.a ).toBe( 0.4 );
});

test( "Color constructor fails with wrong arg count", () => {
    expect(
        () => { Math.Color( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Color constructor fails with wrong arg types", () => {
    expect(
        () => { Math.Color( 1, 2, 3, true ) }
    ).toThrow();
});

test( "Vertex constructor works with correct args", () => {
    var vertex = Math.Vertex( 0.1, 0.2, 0.3 );
    expect( vertex.x ).toBe( 0.1 );
    expect( vertex.y ).toBe( 0.2 );
    expect( vertex.z ).toBe( 0.3 );
});

test( "Vertex constructor fails with wrong arg count", () => {
    expect(
        () => { Math.Vertex( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Vertex constructor fails with wrong arg types", () => {
    expect(
        () => { Math.Vertex( 1, 2, 3, true ) }
    ).toThrow();
});

test( "Face constructor works with correct args", () => {
    var face = Math.Face( 3, 4, 5 );
    expect( face.v1 ).toBe( 3 );
    expect( face.v2 ).toBe( 4 );
    expect( face.v3 ).toBe( 5 );
});

test( "Face constructor fails with wrong arg count", () => {
    expect(
        () => { Math.Face( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Face constructor fails with wrong arg types", () => {
    expect(
        () => { Math.Face( 1, 2, 3.5 ) }
    ).toThrow();
});

test( "flattenObjArray on color works correctly on valid input", () => {
    var input = [
        Math.Color( 1, 2.3, 3, 4 ),
        Math.Color( 5, 6, 7.2, 8 )
    ];
    var output = new Float32Array( [ 1, 2.3, 3, 4, 5, 6, 7.2, 8 ] );
    expect( Math.flattenObjArray( input ) ).toEqual( output );
});

test( "flattenObjArray on vertex works correctly on valid input", () => {
    var input = [
        Math.Vertex( 1, 2.3, 3 ),
        Math.Vertex( 5, 6, 7.2 )
    ];
    var output = new Float32Array( [ 1, 2.3, 3, 5, 6, 7.2 ] );
    expect( Math.flattenObjArray( input ) ).toEqual( output );
});

test( "flattenObjArray on face works correctly on valid input", () => {
    var input = [
        Math.Face( 1, 3, 5 ),
        Math.Face( 7, 6, 2 )
    ];
    var output = new Uint16Array( [ 1, 3, 5, 7, 6, 2 ] );
    expect( Math.flattenObjArray( input ) ).toEqual( output );
});

test( "flattenObjArray rejects non-array", () => {
    var error = "flattenObjArray argument is not an array";
    expect(
        () => { Math.flattenObjArray( "notAnArray" ) }
    ).toThrowError( error );
});

test( "flattenObjArray rejects empty array", () => {
    var error = "flattenObjArray argument is an empty array";
    expect(
        () => { Math.flattenObjArray( [] ) }
    ).toThrowError( error );
});

test( "flattenObjArray rejects arrays of unsupported types", () => {
    var error = "flattenObjArray argument is of unsupported type";
    expect(
        () => { Math.flattenObjArray( [ 1, 2, 3 ] ) }
    ).toThrowError( error );
});

test( "flattenMatrix correctly flattens valid input", () => {
    var input = [  [ 0, 4, 8, 12 ],
                   [ 1, 5, 9, 13 ],
                   [ 2, 6, 10, 14 ],
                   [ 3, 7, 11,15 ] ];
    var output = new Float32Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8,
                                     9, 10, 11, 12, 13, 14, 15] );
    expect( Math.flattenMatrix( input ) ).toEqual( output );
});

test( "flattenMatrix rejects non-array", () => {
    var error = "flattenMatrix argument is not an array";
    expect(
        () => { Math.flattenMatrix( "notAnArray" ) }
    ).toThrowError( error );
});

test( "flattenMatrix rejects empty array", () => {
    var error = "flattenMatrix argument is an empty array";
    expect(
        () => { Math.flattenMatrix( [] ) }
    ).toThrowError( error );
});

test( "flattenMatrix rejects non-square matrix", () => {
    var error = "flattenMatrix argument is not a square matrix";
    expect(
        () => { Math.flattenMatrix( [ [ 1, 2 ], [ 3 ] ] ) }
    ).toThrowError( error );
});

test( "perspectiveViewMat returns correct matrix", () => {
    var n = 2, f = 4, nearWidth = 1, nearHeight = 4;
    var output = [ [ 4, 0, 0, 0 ],
                   [ 0, 1, 0, 0 ],
                   [ 0, 0, -3, -8 ],
                   [ 0, 0, -1, 0 ] ];
    expect( Math.perspectiveViewMat( n, f, nearWidth, nearHeight ) ).toEqual( output );
});


test( "perspectiveViewMat fails with incorrect arg count", () => {
    var error = "Invalid argument count for perspectiveViewMat\n"
        + "5 given, 4 expected";
    expect(
        () => { Math.perspectiveViewMat( 1, 2, 3, 4, 5 ) }
    ).toThrowError( error );
});

test( "perspectiveViewMat fails with incorrect arg types", () => {
        + "5 given, 4 expected";
    var error = "Invalid argument type for perspectiveViewMat\n"
        + "arg 3 ( false ) is not a number";
    expect(
        () => { Math.perspectiveViewMat( 1, 2, false, 4 ) }
    ).toThrowError( error );
});
