import * as MyMath from '../MathHelpers.js';

const ARWING_VERTICES = [
	MyMath.Vertex( -0.157674, 0.658789, 0.636509 ),
	MyMath.Vertex( 0.157282, 1.19168, -0.64882 ),
	MyMath.Vertex( -0.157674, 1.19168, -0.64882 ),
	MyMath.Vertex( 0.157282, 0.658789, 0.63651 ),
	MyMath.Vertex( 0.354133, 0.7358, -0.273302 ),
	MyMath.Vertex( -0.354524, 0.7358, -0.273302 ),
	MyMath.Vertex( -1.22067, 0.477053, -0.584587 ),
	MyMath.Vertex( -0.866336, 0.089177, -0.448857 ),
	MyMath.Vertex( -1.88996, -0.0307165, -0.482857 ),
	MyMath.Vertex( -0.630116, 0.4804, -0.506169 ),
	MyMath.Vertex( -0.354524, 0.00868859, -0.484527 ),
	MyMath.Vertex( -0.000195773, 0.11069, -0.844209 ),
	MyMath.Vertex( -0.000195815, 0.244741, -0.495345 ),
	MyMath.Vertex( 0.629724, 0.4804, -0.506169 ),
	MyMath.Vertex( -0.000195811, 0.75586, -0.518657 ),
	MyMath.Vertex( -0.000195624, 0.804545, -2.0578 ),
	MyMath.Vertex( -0.354524, 0.727271, -0.280933 ),
	MyMath.Vertex( -0.157282, 0.687595, 0.588189 ),
	MyMath.Vertex( 0.157677, 0.687601, 0.587795 ),
	MyMath.Vertex( 0.000197441, 0.687598, 3.18898 ),
	MyMath.Vertex( -0.275391, 0.517739, 2.05394 ),
	MyMath.Vertex( -0.157283, 0.321096, 2.06269 ),
	MyMath.Vertex( -0.354133, 0.0121655, 0.460955 ),
	MyMath.Vertex( -0.550983, 0.167731, 0.414467 ),
	MyMath.Vertex( -0.866335, 1.4049, -1.84841 ),
	MyMath.Vertex( -1.22027, 0.167731, 0.414467 ),
	MyMath.Vertex( -0.865944, 0.237261, 1.9486 ),
	MyMath.Vertex( 0.354133, 0.0086955, -0.484921 ),
	MyMath.Vertex( 0.865944, 0.089177, -0.448856 ),
	MyMath.Vertex( 1.22027, 0.47706, -0.58498 ),
	MyMath.Vertex( 0.865944, 1.40491, -1.8488 ),
	MyMath.Vertex( 0.550985, 0.167731, 0.414467 ),
	MyMath.Vertex( 0.866338, 0.237268, 1.94821 ),
	MyMath.Vertex( 1.22067, 0.167731, 0.414467 ),
	MyMath.Vertex( 0.354527, 0.0121655, 0.460955 ),
	MyMath.Vertex( -0.078541, 0.16012, 1.99135 ),
	MyMath.Vertex( 0.0789372, 0.16012, 1.99135 ),
	MyMath.Vertex( 0.157676, 0.321096, 2.06269 ),
	MyMath.Vertex( 0.275787, 0.517739, 2.05394 ),
	MyMath.Vertex( 0.354133, 0.727271, -0.280933 ),
	MyMath.Vertex( 0.157282, 1.22255, -0.658122 ),
	MyMath.Vertex( -0.157674, 1.22255, -0.658122 ),
	MyMath.Vertex( 1.88957, -0.0307096, -0.48325 ),
	MyMath.Vertex( 0.846655, -0.240109, 0.117496 ),
	MyMath.Vertex( 1.20098, -0.161432, 1.84828 ),
	MyMath.Vertex( 1.51555, -0.240109, 0.117496 ),
	MyMath.Vertex( 1.20059, -0.643821, -0.10065 ),
	MyMath.Vertex( 1.20059, -0.3005, -1.2196 ),
	MyMath.Vertex( 1.12185, 0.173013, -0.334768 ),
	MyMath.Vertex( 1.23996, -0.220274, -0.316868 ),
	MyMath.Vertex( 1.12185, -0.220274, -0.316868 ),
	MyMath.Vertex( 1.23996, 0.173013, -0.334768 ),
	MyMath.Vertex( 1.23996, 0.190914, 0.0585201 ),
	MyMath.Vertex( 1.23996, -0.191557, 0.312473 ),
	MyMath.Vertex( 1.12185, -0.191557, 0.312473 ),
	MyMath.Vertex( 1.12185, 0.190914, 0.0585201 ),
	MyMath.Vertex( 0.839568, -0.0834101, -1.2717 ),
	MyMath.Vertex( 1.36988, 0.0463139, -0.945355 ),
	MyMath.Vertex( 1.06595, -0.450375, -1.94557 ),
	MyMath.Vertex( 1.36791, -0.0698241, -0.924162 ),
	MyMath.Vertex( 1.49232, -0.406907, -1.66287 ),
	MyMath.Vertex( 1.4935, -0.329482, -1.67687 ),
	MyMath.Vertex( 0.845866, -0.09343, -1.28408 ),
	MyMath.Vertex( 1.37894, -0.0812873, -0.944052 ),
	MyMath.Vertex( 1.06476, -0.45752, -1.94215 ),
	MyMath.Vertex( 1.35413, -0.152573, -0.898446 ),
	MyMath.Vertex( 1.50098, -0.495096, -1.66363 ),
	MyMath.Vertex( 1.50256, -0.417671, -1.67763 ),
	MyMath.Vertex( 1.35768, 0.0308721, -0.962951 ),
	MyMath.Vertex( 1.80413, 0.130054, -0.153211 ),
	MyMath.Vertex( 1.49705, -0.342761, -1.68301 ),
	MyMath.Vertex( 1.33996, 0.425713, -0.553593 ),
	MyMath.Vertex( 0.901772, 0.303041, -0.832956 ),
	MyMath.Vertex( 1.33366, 0.0773056, -0.49041 ),
	MyMath.Vertex( 1.35413, -0.162688, -0.927762 ),
	MyMath.Vertex( 1.02618, -0.0772801, -1.14992 ),
	MyMath.Vertex( 1.49429, -0.498002, -1.65502 ),
	MyMath.Vertex( 1.09232, -0.458329, -1.91854 ),
	MyMath.Vertex( 1.37343, -0.52054, -2.23267 ),
	MyMath.Vertex( 1.60768, -0.519131, -2.20075 ),
	MyMath.Vertex( 1.76791, -0.457576, -1.62517 ),
	MyMath.Vertex( 1.89075, -0.636746, -1.9386 ),
	MyMath.Vertex( 1.7624, -0.742832, -3.63325 ),
	MyMath.Vertex( -1.51594, -0.239722, 0.117897 ),
	MyMath.Vertex( -1.20059, -0.161432, 1.84828 ),
	MyMath.Vertex( -0.846652, -0.239722, 0.117897 ),
	MyMath.Vertex( -1.20098, -0.643828, -0.100256 ),
	MyMath.Vertex( -1.20098, -0.3005, -1.2196 ),
	MyMath.Vertex( -1.24035, 0.173006, -0.334375 ),
	MyMath.Vertex( -1.12224, -0.220281, -0.316475 ),
	MyMath.Vertex( -1.24035, -0.220281, -0.316475 ),
	MyMath.Vertex( -1.12224, 0.173006, -0.334375 ),
	MyMath.Vertex( -1.12224, 0.190907, 0.0589135 ),
	MyMath.Vertex( -1.12224, -0.191557, 0.312473 ),
	MyMath.Vertex( -1.24035, 0.190907, 0.0589135 ),
	MyMath.Vertex( -1.24035, -0.191557, 0.312473 ),
	MyMath.Vertex( -1.50295, -0.417284, -1.67723 ),
	MyMath.Vertex( -1.37894, -0.0812942, -0.943658 ),
	MyMath.Vertex( -0.845863, -0.0934369, -1.28369 ),
	MyMath.Vertex( -1.35453, -0.152972, -0.89806 ),
	MyMath.Vertex( -1.06476, -0.45752, -1.94215 ),
	MyMath.Vertex( -1.50138, -0.494709, -1.66323 ),
	MyMath.Vertex( -1.49389, -0.329489, -1.67648 ),
	MyMath.Vertex( -1.37027, 0.046307, -0.944961 ),
	MyMath.Vertex( -0.839565, -0.083417, -1.27131 ),
	MyMath.Vertex( -1.36791, -0.0698241, -0.924163 ),
	MyMath.Vertex( -1.06634, -0.450382, -1.94518 ),
	MyMath.Vertex( -1.49232, -0.406914, -1.66248 ),
	MyMath.Vertex( -1.80452, 0.130047, -0.152818 ),
	MyMath.Vertex( -1.49704, -0.342768, -1.68262 ),
	MyMath.Vertex( -1.76791, -0.457583, -1.62478 ),
	MyMath.Vertex( -1.35807, 0.0308721, -0.962952 ),
	MyMath.Vertex( -1.33996, 0.425713, -0.553593 ),
	MyMath.Vertex( -1.33366, 0.0772987, -0.490016 ),
	MyMath.Vertex( -1.35453, -0.162688, -0.927762 ),
	MyMath.Vertex( -1.49429, -0.498009, -1.65463 ),
	MyMath.Vertex( -1.89114, -0.636746, -1.9386 ),
	MyMath.Vertex( -1.37382, -0.520547, -2.23228 ),
	MyMath.Vertex( -1.76279, -0.742839, -3.63285 ),
	MyMath.Vertex( -1.60767, -0.519131, -2.20075 ),
	MyMath.Vertex( -1.09271, -0.458329, -1.91854 ),
	MyMath.Vertex( -1.02618, -0.077287, -1.14953 ),
	MyMath.Vertex( -0.90177, 0.303041, -0.832956 ),
	MyMath.Vertex( -0.630116, 0.4804, -0.506169 ),
	MyMath.Vertex( -0.000195773, 0.11069, -0.844209 ),
	MyMath.Vertex( -0.000195624, 0.804545, -2.0578 ),
	MyMath.Vertex( -0.354524, 0.727271, -0.280933 ),
	MyMath.Vertex( -0.157282, 0.687595, 0.588189 ),
	MyMath.Vertex( 0.157677, 0.687601, 0.587795 ),
	MyMath.Vertex( -0.550983, 0.167731, 0.414467 ),
	MyMath.Vertex( -0.630116, 0.4804, -0.506169 ),
	MyMath.Vertex( -1.22067, 0.477053, -0.584587 ),
	MyMath.Vertex( -1.22027, 0.167731, 0.414467 ),
	MyMath.Vertex( -0.866336, 0.089177, -0.448857 ),
	MyMath.Vertex( -0.550983, 0.167731, 0.414467 ),
	MyMath.Vertex( -1.22027, 0.167731, 0.414467 ),
	MyMath.Vertex( 0.629724, 0.4804, -0.506169 ),
	MyMath.Vertex( 0.629724, 0.4804, -0.506169 ),
	MyMath.Vertex( 1.22027, 0.47706, -0.58498 ),
	MyMath.Vertex( 0.550985, 0.167731, 0.414467 ),
	MyMath.Vertex( 0.865944, 0.089177, -0.448856 ),
	MyMath.Vertex( 1.22067, 0.167731, 0.414467 ),
	MyMath.Vertex( 0.550985, 0.167731, 0.414467 ),
	MyMath.Vertex( 0.157676, 0.321096, 2.06269 ),
	MyMath.Vertex( -0.078541, 0.16012, 1.99135 ),
	MyMath.Vertex( 0.0789372, 0.16012, 1.99135 ),
	MyMath.Vertex( -0.157283, 0.321096, 2.06269 ),
	MyMath.Vertex( 0.157282, 1.22255, -0.658122 ),
	MyMath.Vertex( -0.157674, 1.22255, -0.658122 ),
	MyMath.Vertex( 0.354133, 0.727271, -0.280933 ),
	MyMath.Vertex( 1.22067, 0.167731, 0.414467 ),
	MyMath.Vertex( 0.846655, -0.240109, 0.117496 ),
	MyMath.Vertex( 1.20098, -0.161432, 1.84828 ),
	MyMath.Vertex( 1.20059, -0.3005, -1.2196 ),
	MyMath.Vertex( 1.51555, -0.240109, 0.117496 ),
	MyMath.Vertex( -1.20059, -0.161432, 1.84828 ),
	MyMath.Vertex( -1.51594, -0.239722, 0.117897 ),
	MyMath.Vertex( -1.20098, -0.3005, -1.2196 ),
	MyMath.Vertex( -0.846652, -0.239722, 0.117897 )
];

const ARWING_FACES = [
	MyMath.Face( 0, 1, 2 ),
	MyMath.Face( 0, 3, 1 ),
	MyMath.Face( 3, 4, 1 ),
	MyMath.Face( 0, 2, 5 ),
	MyMath.Face( 6, 7, 8 ),
	MyMath.Face( 9, 7, 6 ),
	MyMath.Face( 9, 10, 7 ),
	MyMath.Face( 9, 11, 10 ),
	MyMath.Face( 123, 12, 124 ),
	MyMath.Face( 123, 13, 12 ),
	MyMath.Face( 13, 123, 14 ),
	MyMath.Face( 123, 15, 14 ),
	MyMath.Face( 9, 16, 125 ),
	MyMath.Face( 17, 16, 9 ),
	MyMath.Face( 126, 127, 18 ),
	MyMath.Face( 17, 19, 128 ),
	MyMath.Face( 20, 19, 17 ),
	MyMath.Face( 19, 20, 21 ),
	MyMath.Face( 21, 20, 9 ),
	MyMath.Face( 9, 20, 17 ),
	MyMath.Face( 21, 9, 22 ),
	MyMath.Face( 9, 23, 22 ),
	MyMath.Face( 129, 130, 24 ),
	MyMath.Face( 131, 24, 130 ),
	MyMath.Face( 25, 24, 131 ),
	MyMath.Face( 26, 24, 25 ),
	MyMath.Face( 26, 129, 24 ),
	MyMath.Face( 25, 129, 26 ),
	MyMath.Face( 132, 133, 134 ),
	MyMath.Face( 8, 7, 135 ),
	MyMath.Face( 8, 135, 6 ),
	MyMath.Face( 7, 22, 23 ),
	MyMath.Face( 7, 10, 22 ),
	MyMath.Face( 10, 27, 22 ),
	MyMath.Face( 10, 11, 27 ),
	MyMath.Face( 136, 27, 11 ),
	MyMath.Face( 136, 28, 27 ),
	MyMath.Face( 136, 29, 28 ),
	MyMath.Face( 137, 30, 138 ),
	MyMath.Face( 31, 30, 137 ),
	MyMath.Face( 32, 30, 31 ),
	MyMath.Face( 32, 33, 30 ),
	MyMath.Face( 31, 33, 32 ),
	MyMath.Face( 139, 140, 141 ),
	MyMath.Face( 34, 28, 142 ),
	MyMath.Face( 27, 28, 34 ),
	MyMath.Face( 22, 27, 34 ),
	MyMath.Face( 22, 34, 35 ),
	MyMath.Face( 35, 34, 36 ),
	MyMath.Face( 37, 36, 34 ),
	MyMath.Face( 143, 144, 145 ),
	MyMath.Face( 144, 143, 146 ),
	MyMath.Face( 21, 37, 19 ),
	MyMath.Face( 19, 37, 38 ),
	MyMath.Face( 37, 136, 38 ),
	MyMath.Face( 37, 34, 136 ),
	MyMath.Face( 34, 142, 136 ),
	MyMath.Face( 128, 38, 136 ),
	MyMath.Face( 19, 38, 128 ),
	MyMath.Face( 128, 136, 39 ),
	MyMath.Face( 125, 39, 136 ),
	MyMath.Face( 39, 125, 40 ),
	MyMath.Face( 41, 40, 125 ),
	MyMath.Face( 147, 148, 126 ),
	MyMath.Face( 16, 41, 125 ),
	MyMath.Face( 147, 126, 149 ),
	MyMath.Face( 126, 18, 149 ),
	MyMath.Face( 15, 13, 14 ),
	MyMath.Face( 21, 22, 35 ),
	MyMath.Face( 28, 42, 150 ),
	MyMath.Face( 29, 42, 28 ),
	MyMath.Face( 29, 150, 42 ),
	MyMath.Face( 33, 138, 30 ),
	MyMath.Face( 12, 13, 124 ),
	MyMath.Face( 43, 44, 45 ),
	MyMath.Face( 151, 46, 152 ),
	MyMath.Face( 151, 47, 46 ),
	MyMath.Face( 43, 45, 153 ),
	MyMath.Face( 154, 46, 47 ),
	MyMath.Face( 152, 46, 154 ),
	MyMath.Face( 48, 49, 50 ),
	MyMath.Face( 49, 48, 51 ),
	MyMath.Face( 52, 49, 51 ),
	MyMath.Face( 53, 49, 52 ),
	MyMath.Face( 52, 54, 53 ),
	MyMath.Face( 54, 52, 55 ),
	MyMath.Face( 54, 55, 48 ),
	MyMath.Face( 54, 48, 50 ),
	MyMath.Face( 56, 57, 58 ),
	MyMath.Face( 57, 56, 59 ),
	MyMath.Face( 56, 60, 59 ),
	MyMath.Face( 56, 58, 60 ),
	MyMath.Face( 61, 60, 58 ),
	MyMath.Face( 58, 57, 61 ),
	MyMath.Face( 62, 63, 64 ),
	MyMath.Face( 63, 62, 65 ),
	MyMath.Face( 62, 66, 65 ),
	MyMath.Face( 62, 64, 66 ),
	MyMath.Face( 67, 66, 64 ),
	MyMath.Face( 64, 63, 67 ),
	MyMath.Face( 68, 69, 70 ),
	MyMath.Face( 69, 68, 71 ),
	MyMath.Face( 72, 71, 68 ),
	MyMath.Face( 71, 72, 73 ),
	MyMath.Face( 72, 74, 73 ),
	MyMath.Face( 72, 75, 74 ),
	MyMath.Face( 72, 68, 75 ),
	MyMath.Face( 68, 74, 75 ),
	MyMath.Face( 74, 68, 70 ),
	MyMath.Face( 74, 70, 76 ),
	MyMath.Face( 70, 77, 76 ),
	MyMath.Face( 77, 70, 78 ),
	MyMath.Face( 78, 70, 79 ),
	MyMath.Face( 70, 80, 79 ),
	MyMath.Face( 70, 69, 80 ),
	MyMath.Face( 74, 80, 69 ),
	MyMath.Face( 74, 76, 80 ),
	MyMath.Face( 76, 81, 80 ),
	MyMath.Face( 78, 81, 76 ),
	MyMath.Face( 78, 82, 81 ),
	MyMath.Face( 78, 79, 82 ),
	MyMath.Face( 79, 81, 82 ),
	MyMath.Face( 79, 80, 81 ),
	MyMath.Face( 77, 78, 76 ),
	MyMath.Face( 73, 74, 69 ),
	MyMath.Face( 71, 73, 69 ),
	MyMath.Face( 83, 84, 85 ),
	MyMath.Face( 155, 156, 86 ),
	MyMath.Face( 156, 87, 86 ),
	MyMath.Face( 83, 85, 157 ),
	MyMath.Face( 158, 86, 87 ),
	MyMath.Face( 86, 158, 155 ),
	MyMath.Face( 88, 89, 90 ),
	MyMath.Face( 89, 88, 91 ),
	MyMath.Face( 92, 89, 91 ),
	MyMath.Face( 93, 89, 92 ),
	MyMath.Face( 94, 93, 92 ),
	MyMath.Face( 93, 94, 95 ),
	MyMath.Face( 95, 94, 88 ),
	MyMath.Face( 95, 88, 90 ),
	MyMath.Face( 96, 97, 98 ),
	MyMath.Face( 97, 99, 98 ),
	MyMath.Face( 99, 100, 98 ),
	MyMath.Face( 101, 100, 99 ),
	MyMath.Face( 96, 100, 101 ),
	MyMath.Face( 96, 98, 100 ),
	MyMath.Face( 102, 103, 104 ),
	MyMath.Face( 103, 105, 104 ),
	MyMath.Face( 105, 106, 104 ),
	MyMath.Face( 107, 106, 105 ),
	MyMath.Face( 102, 106, 107 ),
	MyMath.Face( 102, 104, 106 ),
	MyMath.Face( 108, 109, 110 ),
	MyMath.Face( 108, 111, 109 ),
	MyMath.Face( 108, 112, 111 ),
	MyMath.Face( 112, 108, 113 ),
	MyMath.Face( 108, 114, 113 ),
	MyMath.Face( 108, 110, 114 ),
	MyMath.Face( 110, 115, 114 ),
	MyMath.Face( 116, 115, 110 ),
	MyMath.Face( 116, 117, 115 ),
	MyMath.Face( 116, 118, 117 ),
	MyMath.Face( 116, 119, 118 ),
	MyMath.Face( 116, 110, 119 ),
	MyMath.Face( 110, 109, 119 ),
	MyMath.Face( 119, 109, 117 ),
	MyMath.Face( 109, 120, 117 ),
	MyMath.Face( 109, 115, 120 ),
	MyMath.Face( 111, 115, 109 ),
	MyMath.Face( 114, 115, 111 ),
	MyMath.Face( 111, 121, 114 ),
	MyMath.Face( 122, 121, 111 ),
	MyMath.Face( 114, 121, 122 ),
	MyMath.Face( 114, 122, 113 ),
	MyMath.Face( 112, 113, 122 ),
	MyMath.Face( 111, 112, 122 ),
	MyMath.Face( 115, 117, 120 ),
	MyMath.Face( 118, 119, 117 )
];

const ARWING_COLOR_IDS = [
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	0,
	0,
	0,
	0,
	1,
	1,
	0,
	1,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	0,
	0,
	0,
	2,
	2,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	0,
	0,
	0,
	2,
	2,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	0,
	0,
	1,
	0,
	0,
	1,
	2,
	2,
	2,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	2,
	2,
	0,
	2,
	2,
	2,
	0,
	2
];

export {
	ARWING_VERTICES,
	ARWING_FACES,
	ARWING_COLOR_IDS
};