f = open( "OBJ Files/Arwing.obj", "r")

BLACK = 0
COLOUR1 = 1
COLOUR2 = 2
blackMaterials = [ "Material4",
                   "Material6",
                   "Material7",
                   "Material10",
                   "Material14",
                   "Material15" ]
color1Materials = [ "M_7CF8406C_c",
                   "Material1",
                   "Material2",
                   "Material3",
                   "Material5",
                   "Material8",
                   "Material9" ]
color2Materials = [ "Material11",
                    "Material12" ]

materials = [ blackMaterials,
              color1Materials,
              color2Materials ]

vertices = []
normals = []
colorIDs = []

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

currentColorId = None

for x in f:
    line = x.split()
    if len( line ) > 0:
        if line[ 0 ] == "usemtl":
            for i in range( 0, 3 ):
                if line[ 1 ] in materials[ i ]:
                    currentColorId = i
                    break
        elif line[ 0 ] == "f":
            vertexIDs = [ int( line[ 1 ].split( "/" )[ 0 ] ) - 1,
                          int( line[ 2 ].split( "/" )[ 0 ] ) - 1,
                          int( line[ 3 ].split( "/" )[ 0 ] ) - 1 ]
            normalIDs = [ int( line[ 1 ].split( "/" )[ 2 ] ) - 1,
                          int( line[ 2 ].split( "/" )[ 2 ] ) - 1,
                          int( line[ 3 ].split( "/" )[ 2 ] ) - 1 ]
            vertices.extend( [ vertexMap[ vertexIDs[ 0 ] ], vertexMap[ vertexIDs[ 1 ] ], vertexMap[ vertexIDs[ 2 ] ] ] )
            normals.extend( [ normalMap[ normalIDs[ 0 ] ], normalMap[ normalIDs[ 1 ] ], normalMap[ normalIDs[ 2 ] ] ] )
            colorIDs.extend( [ currentColorId, currentColorId, currentColorId ] )

# export vertices, normals, and color IDs

f2 = open( "Arwing.js", "w" )
f2.write( "import * as MyMath from '../MathHelpers.js';\n\n" );
f2.write( "const ARWING_VERTICES = [\n" )
for i, v in enumerate( vertices ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + v )
f2.write( "\n];\n\n" )
f2.write( "const ARWING_NORMALS = [\n" )
for i, n in enumerate( normals ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + n )
f2.write( "\n];\n\n" )
f2.write( "const ARWING_COLOR_IDS = [\n" )
for i, c in enumerate( colorIDs ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + str( c ) )
f2.write( "\n];\n\n" )
f2.write( "export {\n\tARWING_VERTICES,\n\tARWING_NORMALS,\n\tARWING_COLOR_IDS\n};" )

input( "press Enter" )
