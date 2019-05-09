f = open( "OBJ Files/Ring.obj", "r")

vertices = []
faces = []

for x in f:
    line = x.split()
    if len( line ) > 0:
        if line[ 0 ] == "v":
            vertices.append( "MyMath.Vertex( " + line[ 1 ] + ", " + line[ 2 ] + ", " + line[ 3 ] + " )" )
        elif line[ 0 ] == "f":
            points = [ str( int( line[ 1 ].split( "/" )[ 0 ] ) - 1 ),
                       str( int( line[ 2 ].split( "/" )[ 0 ] ) - 1 ),
                       str( int( line[ 3 ].split( "/" )[ 0 ] ) - 1 ) ]
            faces.append( "MyMath.Face( " + points[ 0 ] + ", " + points[ 1 ] + ", " + points[ 2 ] + " )" )

# export vertices, faces
f2 = open( "Ring.js", "w" )
f2.write( "import * as MyMath from '../MathHelpers.js';\n\n" );
f2.write( "const RING_VERTICES = [\n" )
for i, v in enumerate( vertices ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + v )
f2.write( "\n];\n\n" )
f2.write( "const RING_FACES = [\n" )
for i, f in enumerate( faces ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + f )
f2.write( "\n];\n\n" )
f2.write( "export {\n\tRING_VERTICES,\n\tRING_FACES,\n};" )
