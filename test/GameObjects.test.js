import * as GameObj from '../GameObjects.js';

var TestObj;
const mockDiff = jest.fn( time => 1 );

beforeEach( () => {
    TestObj = new GameObj.GameObject( GameObj.GameObjectType.RING,
                                      1.5, 2.6, 3.7 );
    TestObj.getTimeDiff = mockDiff;
});

test( "Constructor sets values properly", () => {
    expect( TestObj.xPos ).toBe( 1.5 );
    expect( TestObj.yPos ).toBe( 2.6 );
    expect( TestObj.zPos ).toBe( 3.7 );
    expect( TestObj.xScale ).toBe( 2 );
    expect( TestObj.yScale ).toBe( 2 );
    expect( TestObj.zScale ).toBe( 0.5 );
    expect( TestObj.xRot ).toBe( 0.0 );
    expect( TestObj.yRot ).toBe( 0.0 );
    expect( TestObj.zRot ).toBe( 0.0 );
});

test( "Update changes values appropriately", () => {
    TestObj.update( TestObj );
    expect( mockDiff.mock.calls.length ).toBe( 1 );
    expect( TestObj.zRot ).toBeCloseTo( 1/20, 10 );
});
