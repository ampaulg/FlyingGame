f = open( "OBJ Files/Arwing.obj", "r")

vertices = ""
faces = ""


for x in f:
    line = x.split()
    if len( line ) > 0:
        if line[ 0 ] == "v":
            if len( vertices ) > 0:
                vertices += ",\n"
            vertices += "\tMyMath.Vertex( " + line[ 1 ] + ", " + line[ 2 ] + ", " + line[ 3 ] + " )"
        if line[ 0 ] == "f":
            faceLine = x.split()
            v1 = str( int( faceLine[ 1 ].split( "/" )[ 0 ] ) - 1 )
            v2 = str( int( faceLine[ 2 ].split( "/" )[ 0 ] ) - 1 )
            v3 = str( int( faceLine[ 3 ].split( "/" )[ 0 ] ) - 1 )

            if len( faces ) > 0:
                faces += ",\n"
            faces += "\tMyMath.Face( " + v1 + ", " + v2 + ", " + v3 + " )"

vertices += " ];\n"
faces += " ];\n"

f2 = open( "Arwing.js", "a" )
f2.write( "import * as MyMath from '../MathHelpers.js';\n\n" );
f2.write( "const ARWING_VERTICES = [\n" )
f2.write( vertices )
f2.write( "\n" )
f2.write( "const ARWING_FACES = [\n" )
f2.write( faces )

f2.write( "\nexport {\n\tARWING_VERTICES,\n\tARWING_FACES\n};" );
