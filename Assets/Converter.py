f = open( "OBJ Files/Arwing.obj", "r")

# this value can be found out with an initial pass to make it more dynamic
# but in this case it doesn't need to be dynamic
# might actually do the pass when importing the rings
VERTEX_COUNT = 123

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
faces = []
colorIDs = []
colorMap = [ [ None ] * VERTEX_COUNT,
             [ None ] * VERTEX_COUNT,
             [ None ] * VERTEX_COUNT ]

# first pass, populate the above

currentMapId = None
vertexCount = 0

for x in f:
    line = x.split()
    if len( line ) > 0:
        if line[ 0 ] == "usemtl":
            for i in range( 0, 3 ):
                if line[ 1 ] in materials[ i ]:
                    currentMapId = i
                    break
        elif line[ 0 ] == "v":
            vertices.append( "MyMath.Vertex( " + line[ 1 ] + ", " + line[ 2 ] + ", " + line[ 3 ] + " )" )
            colorMap[ currentMapId ][ vertexCount ] = vertexCount
            colorIDs.append( currentMapId )
            vertexCount += 1

# second pass, see if any more vertices need adding
# checks with the faces
count = 0

f = open( "OBJ Files/Arwing.obj", "r")

for x in f:
    line = x.split()
    if len( line ) > 0:
        if line[ 0 ] == "usemtl":
            for i in range( 0, 3 ):
                if line[ 1 ] in materials[ i ]:
                    currentMapId = i
                    break
        elif line[ 0 ] == "f":
            # check that all vertices belong to the current colour
            rawPoints = [ int( line[ 1 ].split( "/" )[ 0 ] ) - 1,
                       int( line[ 2 ].split( "/" )[ 0 ] ) - 1,
                       int( line[ 3 ].split( "/" )[ 0 ] ) - 1 ]
            facePoints = []
            for p in rawPoints:
                if colorMap[ currentMapId ][ p ] is None:
                    vertices.append( vertices[ p ] )
                    colorMap[ currentMapId ][ p ] = vertexCount
                    colorIDs.append( currentMapId )
                    facePoints.append( str( vertexCount ) )
                    vertexCount += 1
                else:
                    facePoints.append( str( colorMap[ currentMapId ][ p ] ) )
            faces.append( "MyMath.Face( " + facePoints[ 0 ] + ", " + facePoints[ 1 ] + ", " + facePoints[ 2 ] + " )" )
            count += 1

# export vertices, faces, and color IDs
f2 = open( "Arwing.js", "w" )
f2.write( "import * as MyMath from '../MathHelpers.js';\n\n" );
f2.write( "const ARWING_VERTICES = [\n" )
for i, v in enumerate( vertices ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + v )
f2.write( "\n];\n\n" )
f2.write( "const ARWING_FACES = [\n" )
for i, f in enumerate( faces ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + f )
f2.write( "\n];\n\n" )
f2.write( "const ARWING_COLOR_IDS = [\n" )
for i, c in enumerate( colorIDs ):
    if i > 0:
        f2.write( ",\n" )
    f2.write( "\t" + str( c ) )
f2.write( "\n];\n\n" )
f2.write( "export {\n\tARWING_VERTICES,\n\tARWING_FACES,\n\tARWING_COLOR_IDS\n};" )
