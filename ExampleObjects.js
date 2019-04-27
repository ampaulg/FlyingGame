import * as Math from './MathHelpers.js';

const CUBE_COLORS = [
    Math.Color( 0.5, 0.5, 0.5, 1.0 ),
    Math.Color( 1.0, 0.0, 0.0, 1.0 ),
    Math.Color( 0.0, 1.0, 0.0, 1.0 ),
    Math.Color( 1.0, 1.0, 0.0, 1.0 ),
    Math.Color( 0.0, 0.0, 1.0, 1.0 ),
    Math.Color( 1.0, 0.0, 1.0, 1.0 ),
    Math.Color( 0.0, 1.0, 1.0, 1.0 ),
    Math.Color( 1.0, 1.0, 1.0, 1.0 ),
];

const CUBE_VERTICES = [
    Math.Vertex( -0.3, -0.3, -0.3 ),
    Math.Vertex( -0.3, -0.3, 0.3 ),
    Math.Vertex( -0.3, 0.3, -0.3 ),
    Math.Vertex( -0.3, 0.3, 0.3 ),
    Math.Vertex( 0.3, -0.3, -0.3 ),
    Math.Vertex( 0.3, -0.3, 0.3 ),
    Math.Vertex( 0.3, 0.3, -0.3 ),
    Math.Vertex( 0.3, 0.3, 0.3 )
];

const CUBE_FACES = [
    // left face
    Math.Face( 0, 1, 2 ),
    Math.Face( 1, 2, 3 ),
    // bottom face
    Math.Face( 0, 1, 4 ),
    Math.Face( 1, 4, 5 ),
    // front face
    Math.Face( 1, 3, 5 ),
    Math.Face( 3, 5, 7 ),
    // back face
    Math.Face( 0, 2, 4 ),
    Math.Face( 2, 4, 6 ),
    // top face
    Math.Face( 2, 3, 6 ),
    Math.Face( 3, 6, 7 ),
    // right face
    Math.Face( 4, 5, 6 ),
    Math.Face( 5, 6, 7 )
];

export {
    CUBE_COLORS,
    CUBE_VERTICES,
    CUBE_FACES
};
