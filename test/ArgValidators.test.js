import * as ArgVal from '../ArgValidators.js';

test( "checkArgCount has no error when count is correct", () => {
  expect(
      () => { ArgVal.checkArgCount( 3, 3, "test" ) }
  ).not.toThrow();
});

test( "checkArgCount throws error when count is wrong", () => {
    var error = "Invalid argument count for test\n"
        + "3 given, 2 expected";
    expect(
        () => { ArgVal.checkArgCount( 3, 2, "test" ) }
    ).toThrowError( error );
});

test( "checkArgsAreNumbers has no error when args are numbers", () => {
    expect(
        () => { ArgVal.checkArgsAreNumbers( [ 1, 2.2, 3 + 5 ], "test" ) }
    ).not.toThrow();
});

test( "checkArgsAreNumbers throws error when args aren't all numbers", () => {
    var error = "Invalid argument type for test\n"
            + "arg 2 ( true ) is not a number";
    expect(
        () => { ArgVal.checkArgsAreNumbers( [ 1, true, 3 + 5 ], "test" ) }
    ).toThrowError( error );
});

test( "checkArgsAreInts has no error when args are non negative ints", () => {
    expect(
        () => { ArgVal.checkArgsAreInts( [ 1, 0, 3 + 7 ], "test" ) }
    ).not.toThrow();
});

test( "checkArgsAreInts throws error with negative arg", () => {
    expect(
        () => { ArgVal.checkArgsAreInts( [ 1, -2, 3 ], "test" ) }
    ).toThrow();
});

test( "checkArgsAreInts throws error with non integer arg", () => {
    expect(
        () => { ArgVal.checkArgsAreInts( [ 1, 5.2, 3 ], "test" ) }
    ).toThrow();
});

test( "checkArgsAreInts throws correct error message", () => {
    var error = "Invalid argument type for test\n"
            + "arg 2 ( 5.2 ) is not a non-negative integer";
    expect(
        () => { ArgVal.checkArgsAreInts( [ 1, 5.2, 3 + 5 ], "test" ) }
    ).toThrowError( error );
});

test( "checkValidArray has no error on non-empty array", () => {
    expect(
        () => { ArgVal.checkValidArray( [ 1, 0, 3 ], "test" ) }
    ).not.toThrow();
});

test( "checkValidArray throws error for non-array", () => {
    var error = "test argument is not an array";
    expect(
        () => { ArgVal.checkValidArray( true, "test" ) }
    ).toThrowError( error );
});

test( "checkValidArray throws error for empty array", () => {
    var error = "test argument is an empty array";
    expect(
        () => { ArgVal.checkValidArray( [], "test" ) }
    ).toThrowError( error );
});

test( "checkArrayLength has no error for array with correct length", () => {
    expect(
        () => { ArgVal.checkArrayLength( [ 1, 0, 3 ], 3, "test" ) }
    ).not.toThrow();
});

test( "checkArrayLength throws error for array with incorrect length", () => {
    var error = "test argument is not an array of length 2";
    expect(
        () => { ArgVal.checkArrayLength( [ 1, 0, 3 ], 2, "test" ) }
    ).toThrowError( error );
});

test( "checkSquareMatrix has no error for a square matrix", () => {
    var input = [ [ 1, 0, 5 ],
                  [ 2, 3, 4 ],
                  [ 6, 7, 8 ] ];
    expect(
        () => { ArgVal.checkSquareMatrix( input, "test" ) }
    ).not.toThrow();
});

test( "checkSquareMatrix throws error for non-array", () => {
    var error = "test argument is not an array";
    expect(
        () => { ArgVal.checkSquareMatrix( 42, "test" ) }
    ).toThrowError();
});

test( "checkSquareMatrix throws error for empty array", () => {
    var error = "test argument is an empty array";
    expect(
        () => { ArgVal.checkSquareMatrix( [], "test" ) }
    ).toThrowError();
});

test( "checkSquareMatrix throws error for non-square array", () => {
    var error = "test argument is not a square matrix";
    var input = [ [ 1, 0, 5 ],
                  [ 2, 3 ],
                  [ 6, 7, 8 ] ];
    expect(
        () => { ArgVal.checkSquareMatrix( input, "test" ) }
    ).toThrowError();
});
