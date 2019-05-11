f = open( "OBJ Files/Ring.obj", "r")

vertices = []
normals = []

# first pass, get the vertices and normals

normalMap = []
vertexMap = []

for x in f:
    line = x.split()
    if len( line ) > 0:
        if line[ 0 ] == "vn":
            normalMap.append( "MyMath.Normal( " + line[ 1 ] + ", " + line[ 2 ] + ", " + line[ 3 ] + " )" )
        if line[ 0 ] == "v":
            vertexMap.append( "MyMath.Vertex( " + line[ 1 ] + ", " + line[ 2 ] + ", " + line[ 3 ] + " )" )

# second pass, make the arrays that are gonna be sent

f.seek( 0 )

for x in f:
    line = x.split()
    if len( line ) > 0:
        if line[ 0 ] == "f":
            vertexIDs = [ int( line[ 1 ].split( "/" )[ 0 ] ) - 1,
                          int( line[ 2 ].split( "/" )[ 0 ] ) - 1,
                          int( line[ 3 ].split( "/" )[ 0 ] ) - 1 ]
            normalIDs = [ int( line[ 1 ].split( "/" )[ 2 ] ) - 1,
                          int( line[ 2 ].split( "/" )[ 2 ] ) - 1,
                          int( line[ 3 ].split( "/" )[ 2 ] ) - 1 ]
            vertices.extend( [ vertexMap[ vertexIDs[ 0 ] ], vertexMap[ vertexIDs[ 1 ] ], vertexMap[ vertexIDs[ 2 ] ] ] )
            normals.extend( [ normalMap[ normalIDs[ 0 ] ], normalMap[ normalIDs[ 1 ] ], normalMap[ normalIDs[ 2 ] ] ] )

# export vertices, faces
f2 = open( "Ring.js", "w" )
f2.write( "import * as MyMath from '../MathHelpers.js';\n\n" );
f2.write( "const RING_VERTICES = [\n" )
for i, v in enumerate( vertices ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + v )
f2.write( "\n];\n\n" )
f2.write( "const RING_NORMALS = [\n" )
for i, n in enumerate( normals ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + n )
f2.write( "\n];\n\n" )
f2.write( "export {\n\tRING_VERTICES,\n\tRING_NORMALS,\n};" )
