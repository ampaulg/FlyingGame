const EX_TRIANGLE_VERTICES = [
    Vertex( 0.0, 1.0, 0.0 ),
    Vertex( 1.0, -1.0, 0.0 ),
    Vertex( -1.0, -1.0, 0.0 )
];

const EX_TRIANGLE_FACE = [
    Face( 0, 1, 2 )
];

const EX_RED = Color( 0.8, 0.2, 0.2, 1.0 );

const EX_TRIANGLE_COLORS = [
    EX_RED,
    EX_RED,
    EX_RED
];

const EX_CUBE_COLORS = [
    Color( 0.5, 0.5, 0.5, 1.0 ),
    Color( 1.0, 0.0, 0.0, 1.0 ),
    Color( 0.0, 1.0, 0.0, 1.0 ),
    Color( 1.0, 1.0, 0.0, 1.0 ),
    Color( 0.0, 0.0, 1.0, 1.0 ),
    Color( 1.0, 0.0, 1.0, 1.0 ),
    Color( 0.0, 1.0, 1.0, 1.0 ),
    Color( 1.0, 1.0, 1.0, 1.0 ),
];

const EX_CUBE_VERTICES = [
    Vertex( -0.3, -0.3, -0.3 ),
    Vertex( -0.3, -0.3, 0.3 ),
    Vertex( -0.3, 0.3, -0.3 ),
    Vertex( -0.3, 0.3, 0.3 ),
    Vertex( 0.3, -0.3, -0.3 ),
    Vertex( 0.3, -0.3, 0.3 ),
    Vertex( 0.3, 0.3, -0.3 ),
    Vertex( 0.3, 0.3, 0.3 )
];

const EX_CUBE_FACES = [
    // left face
    Face( 0, 1, 2 ),
    Face( 1, 2, 3 ),
    // bottom face
    Face( 0, 1, 4 ),
    Face( 1, 4, 5 ),
    // front face
    Face( 1, 3, 5 ),
    Face( 3, 5, 7 ),
    // back face
    Face( 0, 2, 4 ),
    Face( 2, 4, 6 ),
    // top face
    Face( 2, 3, 6 ),
    Face( 3, 6, 7 ),
    // right face
    Face( 4, 5, 6 ),
    Face( 5, 6, 7 )
];
