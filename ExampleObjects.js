import * as MyMath from './MathHelpers.js';

const CUBE_COLORS = [
    MyMath.Color( 0.5, 0.5, 0.5, 1.0 ),
    MyMath.Color( 1.0, 0.0, 0.0, 1.0 ),
    MyMath.Color( 0.0, 1.0, 0.0, 1.0 ),
    MyMath.Color( 1.0, 1.0, 0.0, 1.0 ),
    MyMath.Color( 0.0, 0.0, 1.0, 1.0 ),
    MyMath.Color( 1.0, 0.0, 1.0, 1.0 ),
    MyMath.Color( 0.0, 1.0, 1.0, 1.0 ),
    MyMath.Color( 1.0, 1.0, 1.0, 1.0 ),
];

const CUBE_VERTICES = [
    MyMath.Vertex( -0.3, -0.3, -0.3 ),
    MyMath.Vertex( -0.3, -0.3, 0.3 ),
    MyMath.Vertex( -0.3, 0.3, -0.3 ),
    MyMath.Vertex( -0.3, 0.3, 0.3 ),
    MyMath.Vertex( 0.3, -0.3, -0.3 ),
    MyMath.Vertex( 0.3, -0.3, 0.3 ),
    MyMath.Vertex( 0.3, 0.3, -0.3 ),
    MyMath.Vertex( 0.3, 0.3, 0.3 )
];

const CUBE_FACES = [
    // left face
    MyMath.Face( 0, 1, 2 ),
    MyMath.Face( 1, 2, 3 ),
    // bottom face
    MyMath.Face( 0, 1, 4 ),
    MyMath.Face( 1, 4, 5 ),
    // front face
    MyMath.Face( 1, 3, 5 ),
    MyMath.Face( 3, 5, 7 ),
    // back face
    MyMath.Face( 0, 2, 4 ),
    MyMath.Face( 2, 4, 6 ),
    // top face
    MyMath.Face( 2, 3, 6 ),
    MyMath.Face( 3, 6, 7 ),
    // right face
    MyMath.Face( 4, 5, 6 ),
    MyMath.Face( 5, 6, 7 )
];

export {
    CUBE_COLORS,
    CUBE_VERTICES,
    CUBE_FACES
};
