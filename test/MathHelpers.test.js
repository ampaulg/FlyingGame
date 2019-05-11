import * as MyMath from '../MathHelpers.js';
import * as TestHelpers from './TestHelpers.js';

test( "Color constructor works with correct args", () => {
    var color = MyMath.Color( 0.1, 0.2, 0.3, 0.4 );
    expect( color.r ).toBe( 0.1 );
    expect( color.g ).toBe( 0.2 );
    expect( color.b ).toBe( 0.3 );
    expect( color.a ).toBe( 0.4 );
});

test( "Color constructor fails with wrong arg count", () => {
    expect(
        () => { MyMath.Color( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Color constructor fails with wrong arg types", () => {
    expect(
        () => { MyMath.Color( 1, 2, 3, true ) }
    ).toThrow();
});

test( "Vertex constructor works with correct args", () => {
    var vertex = MyMath.Vertex( 0.1, 0.2, 0.3 );
    expect( vertex.x ).toBe( 0.1 );
    expect( vertex.y ).toBe( 0.2 );
    expect( vertex.z ).toBe( 0.3 );
});

test( "Vertex constructor fails with wrong arg count", () => {
    expect(
        () => { MyMath.Vertex( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Vertex constructor fails with wrong arg types", () => {
    expect(
        () => { MyMath.Vertex( 1, 2, 3, true ) }
    ).toThrow();
});

test( "Normal constructor works with correct args", () => {
    var normal = MyMath.Normal( 3, 4, 5 );
    expect( normal.x ).toBe( 3 );
    expect( normal.y ).toBe( 4 );
    expect( normal.z ).toBe( 5 );
});

test( "Normal constructor fails with wrong arg count", () => {
    expect(
        () => { MyMath.Normal( 1, 2, 3, 4, 5 ) }
    ).toThrow();
});

test( "Nomral constructor fails with wrong arg types", () => {
    expect(
        () => { MyMath.Normal( 1, true, 3 ) }
    ).toThrow();
});

test( "flattenObjArray on color works correctly on valid input", () => {
    var input = [
        MyMath.Color( 1, 2.3, 3, 4 ),
        MyMath.Color( 5, 6, 7.2, 8 )
    ];
    var expected = new Float32Array( [ 1, 2.3, 3, 4, 5, 6, 7.2, 8 ] );
    expect( MyMath.flattenObjArray( input ) ).toEqual( expected );
});

test( "flattenObjArray on vertex works correctly on valid input", () => {
    var input = [
        MyMath.Vertex( 1, 2.3, 3 ),
        MyMath.Vertex( 5, 6, 7.2 )
    ];
    var expected = new Float32Array( [ 1, 2.3, 3, 5, 6, 7.2 ] );
    expect( MyMath.flattenObjArray( input ) ).toEqual( expected );
});

test( "flattenObjArray on normal works correctly on valid input", () => {
    var input = [
        MyMath.Normal( 1, 2.3, 5.78 ),
        MyMath.Normal( 7.2, 6.4, 2.77 )
    ];
    var expected = new Float32Array( [ 1, 2.3, 5.78, 7.2, 6.4, 2.77 ] );
    expect( MyMath.flattenObjArray( input ) ).toEqual( expected );
});

test( "flattenObjArray rejects non-array", () => {
    var error = "flattenObjArray argument is not an array";
    expect(
        () => { MyMath.flattenObjArray( "notAnArray" ) }
    ).toThrowError( error );
});

test( "flattenObjArray rejects empty array", () => {
    var error = "flattenObjArray argument is an empty array";
    expect(
        () => { MyMath.flattenObjArray( [] ) }
    ).toThrowError( error );
});

test( "flattenObjArray rejects arrays of unsupported types", () => {
    var error = "flattenObjArray argument is of unsupported type";
    expect(
        () => { MyMath.flattenObjArray( [ 1, 2, 3 ] ) }
    ).toThrowError( error );
});

test( "flattenMatrix correctly flattens valid input", () => {
    var input = [  [ 0, 4, 8, 12 ],
                   [ 1, 5, 9, 13 ],
                   [ 2, 6, 10, 14 ],
                   [ 3, 7, 11,15 ] ];
    var expected = new Float32Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8,
                                     9, 10, 11, 12, 13, 14, 15] );
    expect( MyMath.flattenMatrix( input ) ).toEqual( expected );
});

test( "flattenMatrix rejects non-array", () => {
    var error = "flattenMatrix argument is not an array";
    expect(
        () => { MyMath.flattenMatrix( "notAnArray" ) }
    ).toThrowError( error );
});

test( "flattenMatrix rejects empty array", () => {
    var error = "flattenMatrix argument is an empty array";
    expect(
        () => { MyMath.flattenMatrix( [] ) }
    ).toThrowError( error );
});

test( "flattenMatrix rejects non-square matrix", () => {
    var error = "flattenMatrix argument is not a square matrix";
    expect(
        () => { MyMath.flattenMatrix( [ [ 1, 2 ], [ 3 ] ] ) }
    ).toThrowError( error );
});

test( "perspectiveViewMat returns correct matrix", () => {
    var n = 2, f = 4, nearWidth = 1, nearHeight = 4;
    var expected = [ [ 4, 0, 0, 0 ],
                   [ 0, 1, 0, 0 ],
                   [ 0, 0, -3, -8 ],
                   [ 0, 0, -1, 0 ] ];
    expect( MyMath.perspectiveViewMat( n, f, nearWidth, nearHeight )
        ).toEqual( expected );
});


test( "perspectiveViewMat fails with incorrect arg count", () => {
    var error = "Invalid argument count for perspectiveViewMat\n"
        + "5 given, 4 expected";
    expect(
        () => { MyMath.perspectiveViewMat( 1, 2, 3, 4, 5 ) }
    ).toThrowError( error );
});

test( "perspectiveViewMat fails with incorrect arg types", () => {
    var error = "Invalid argument type for perspectiveViewMat\n"
        + "arg 3 ( false ) is not a number";
    expect(
        () => { MyMath.perspectiveViewMat( 1, 2, false, 4 ) }
    ).toThrowError( error );
});

test( "dot returns correct result for valid input", () => {
    var arr1 = [ 2, 3, 4 ];
    var arr2 = [ 10, 100, 1000 ];
    expect( MyMath.dot( arr1, arr2 ) ).toBe( 4320 );
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
        () => { MyMath.dot( arr1, invalid ) }
    ).toThrowError( nonArrayError );
    expect(
        () => { MyMath.dot( invalid, arr2 ) }
    ).toThrowError( nonArrayError );
    expect(
        () => { MyMath.dot( arr1, empty ) }
    ).toThrowError( emptyArrayError );
    expect(
        () => { MyMath.dot( empty, arr2 ) }
    ).toThrowError( emptyArrayError );
    expect(
        () => { MyMath.dot( arr1, differentLength ) }
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
    var expected = [ [ 96, 68, 69, 69 ],
                   [ 24, 56, 18, 52 ],
                   [ 58, 95, 71, 92 ],
                   [ 90, 107, 81, 142 ] ];
    expect( MyMath.matrixMult( mat1, mat2 ) ).toEqual( expected );
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
        () => { MyMath.matrixMult( mat1, invalid ) }
    ).toThrowError( nonArrayError );
    expect(
        () => { MyMath.matrixMult( invalid, mat2 ) }
    ).toThrowError( nonArrayError );
    expect(
        () => { MyMath.matrixMult( mat1, empty ) }
    ).toThrowError( emptyArrayError );
    expect(
        () => { MyMath.matrixMult( empty, mat2 ) }
    ).toThrowError( emptyArrayError );
    expect(
        () => { MyMath.matrixMult( mat1, notSquare ) }
    ).toThrowError( squareError );
    expect(
        () => { MyMath.matrixMult( notSquare, mat2 ) }
    ).toThrowError( squareError );
});

test( "translationMat returns correct result for valid input", () => {
    var expected = [ [ 1, 0, 0, 2.5 ],
                   [ 0, 1, 0, 3.6 ],
                   [ 0, 0, 1, 4.7 ],
                   [ 0, 0, 0, 1 ] ];
    expect( MyMath.translationMat( 2.5, 3.6, 4.7 ) ).toEqual( expected );
});

test( "translationMat throws errors for invalid arguments", () => {
    var argCountError = "Invalid argument count for translationMat\n"
       + "4 given, 3 expected";
    var nonNumberError = "Invalid argument type for translationMat\n"
        + "arg 2 ( true ) is not a number";

    expect(
        () => { MyMath.translationMat( 1, 2, 3, 4 ) }
    ).toThrowError( argCountError );
    expect(
        () => { MyMath.translationMat( 1, true, 3 ) }
    ).toThrowError( nonNumberError );
});

test( "scaleMat returns correct result for valid input", () => {
    var expected = [ [ 0.5, 0, 0, 0 ],
                   [ 0, 2.5, 0, 0 ],
                   [ 0, 0, -3.4, 0 ],
                   [ 0, 0, 0, 1 ] ];
    expect( MyMath.scaleMat( 0.5, 2.5, -3.4 ) ).toEqual( expected );
});

test( "scaleMat throws errors for invalid arguments", () => {
    var argCountError = "Invalid argument count for scaleMat\n"
       + "4 given, 3 expected";
    var nonNumberError = "Invalid argument type for scaleMat\n"
        + "arg 2 ( true ) is not a number";

    expect(
        () => { MyMath.scaleMat( 1, 2, 3, 4 ) }
    ).toThrowError( argCountError );
    expect(
        () => { MyMath.scaleMat( 1, true, 3 ) }
    ).toThrowError( nonNumberError );
});

test( "degToRad returns correct result for valid input", () => {
    var expected = 2 * Math.PI;
    expect( MyMath.degToRad( 360 ) ).toBe( expected );
});

test( "degToRad throws errors for invalid arrays", () => {
    var argCountError = "Invalid argument count for degToRad\n"
       + "2 given, 1 expected";
    var nonNumberError = "Invalid argument type for degToRad\n"
        + "arg 1 ( true ) is not a number";

    expect(
        () => { MyMath.degToRad( 1, 2 ) }
    ).toThrowError( argCountError );
    expect(
        () => { MyMath.degToRad( true ) }
    ).toThrowError( nonNumberError );
});

test( "rotationXMat works correctly with valid input", () => {
    var expected90 = [ [ 1, 0, 0, 0 ],
                       [ 0, 0, -1, 0 ],
                       [ 0, 1, 0, 0 ],
                       [ 0, 0, 0, 1 ] ];
    var expected180 = [ [ 1, 0, 0, 0 ],
                        [ 0, -1, 0, 0 ],
                        [ 0, 0, -1, 0 ],
                        [ 0, 0, 0, 1 ] ];

    var output90 = MyMath.rotationXMat( 90 );
    var output180 = MyMath.rotationXMat( 180 );

    TestHelpers.floatArrayChecker( output90, expected90 );
    TestHelpers.floatArrayChecker( output180, expected180 );
});

test( "rotationXMat throws errors for invalid arrays", () => {
    var argCountError = "Invalid argument count for rotationXMat\n"
       + "2 given, 1 expected";
    var nonNumberError = "Invalid argument type for rotationXMat\n"
        + "arg 1 ( true ) is not a number";

    expect(
        () => { MyMath.rotationXMat( 1, 2 ) }
    ).toThrowError( argCountError );
    expect(
        () => { MyMath.rotationXMat( true ) }
    ).toThrowError( nonNumberError );
});

test( "rotationYMat works correctly with valid input", () => {
    var expected90 = [ [ 0, 0, 1, 0 ],
                       [ 0, 1, 0, 0 ],
                       [ -1, 0, 0, 0 ],
                       [ 0, 0, 0, 1 ] ];
    var expected180 = [ [ -1, 0, 0, 0 ],
                        [ 0, 1, 0, 0 ],
                        [ 0, 0, -1, 0 ],
                        [ 0, 0, 0, 1 ] ];

    var output90 = MyMath.rotationYMat( 90 );
    var output180 = MyMath.rotationYMat( 180 );

    TestHelpers.floatArrayChecker( output90, expected90 );
    TestHelpers.floatArrayChecker( output180, expected180 );
});

test( "rotationYMat throws errors for invalid arrays", () => {
    var argCountError = "Invalid argument count for rotationYMat\n"
       + "2 given, 1 expected";
    var nonNumberError = "Invalid argument type for rotationYMat\n"
        + "arg 1 ( true ) is not a number";

    expect(
        () => { MyMath.rotationYMat( 1, 2 ) }
    ).toThrowError( argCountError );
    expect(
        () => { MyMath.rotationYMat( true ) }
    ).toThrowError( nonNumberError );
});

test( "rotationZMat works correctly with valid input", () => {
    var expected90 = [ [ 0, -1, 0, 0 ],
                       [ 1, 0, 0, 0 ],
                       [ 0, 0, 1, 0 ],
                       [ 0, 0, 0, 1 ] ];
    var expected180 = [ [ -1, 0, 0, 0 ],
                        [ 0, -1, 0, 0 ],
                        [ 0, 0, 1, 0 ],
                        [ 0, 0, 0, 1 ] ];

    var output90 = MyMath.rotationZMat( 90 );
    var output180 = MyMath.rotationZMat( 180 );

    TestHelpers.floatArrayChecker( output90, expected90 );
    TestHelpers.floatArrayChecker( output180, expected180 );
});

test( "rotationZMat throws errors for invalid arrays", () => {
    var argCountError = "Invalid argument count for rotationZMat\n"
       + "2 given, 1 expected";
    var nonNumberError = "Invalid argument type for rotationZMat\n"
        + "arg 1 ( true ) is not a number";

    expect(
        () => { MyMath.rotationZMat( 1, 2 ) }
    ).toThrowError( argCountError );
    expect(
        () => { MyMath.rotationZMat( true ) }
    ).toThrowError( nonNumberError );
});
