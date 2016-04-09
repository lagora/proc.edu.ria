/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	(function webpackMissingModule() { throw new Error("Cannot find module \"./src/es6/config.js\""); }());
	(function webpackMissingModule() { throw new Error("Cannot find module \"./src/es6/init.js\""); }());
	(function webpackMissingModule() { throw new Error("Cannot find module \"./src/es6/ProceduriaBuilder.js\""); }());
	(function webpackMissingModule() { throw new Error("Cannot find module \"./src/es6/main.js\""); }());
	module.exports = __webpack_require__(16);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var THREE = { REVISION: '75' };

	//

	if ( true ) {

		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (THREE), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

		module.exports = THREE;

	}

	//

	if ( Number.EPSILON === undefined ) {

		Number.EPSILON = Math.pow( 2, - 52 );

	}

	//

	if ( Math.sign === undefined ) {

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

		Math.sign = function ( x ) {

			return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;

		};

	}

	if ( Function.prototype.name === undefined && Object.defineProperty !== undefined ) {

		// Missing in IE9-11.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name

		Object.defineProperty( Function.prototype, 'name', {

			get: function () {

				return this.toString().match( /^\s*function\s*(\S*)\s*\(/ )[ 1 ];

			}

		} );

	}

	if ( Object.assign === undefined ) {

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

		Object.defineProperty( Object, 'assign', {

			writable: true,
			configurable: true,

			value: function ( target ) {

				'use strict';

				if ( target === undefined || target === null ) {

					throw new TypeError( "Cannot convert first argument to object" );

				}

				var to = Object( target );

				for ( var i = 1, n = arguments.length; i !== n; ++ i ) {

					var nextSource = arguments[ i ];

					if ( nextSource === undefined || nextSource === null ) continue;

					nextSource = Object( nextSource );

					var keysArray = Object.keys( nextSource );

					for ( var nextIndex = 0, len = keysArray.length; nextIndex !== len; ++ nextIndex ) {

						var nextKey = keysArray[ nextIndex ];
						var desc = Object.getOwnPropertyDescriptor( nextSource, nextKey );

						if ( desc !== undefined && desc.enumerable ) {

							to[ nextKey ] = nextSource[ nextKey ];

						}

					}

				}

				return to;

			}

		} );

	}

	// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button

	THREE.MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

	// GL STATE CONSTANTS

	THREE.CullFaceNone = 0;
	THREE.CullFaceBack = 1;
	THREE.CullFaceFront = 2;
	THREE.CullFaceFrontBack = 3;

	THREE.FrontFaceDirectionCW = 0;
	THREE.FrontFaceDirectionCCW = 1;

	// SHADOWING TYPES

	THREE.BasicShadowMap = 0;
	THREE.PCFShadowMap = 1;
	THREE.PCFSoftShadowMap = 2;

	// MATERIAL CONSTANTS

	// side

	THREE.FrontSide = 0;
	THREE.BackSide = 1;
	THREE.DoubleSide = 2;

	// shading

	THREE.FlatShading = 1;
	THREE.SmoothShading = 2;

	// colors

	THREE.NoColors = 0;
	THREE.FaceColors = 1;
	THREE.VertexColors = 2;

	// blending modes

	THREE.NoBlending = 0;
	THREE.NormalBlending = 1;
	THREE.AdditiveBlending = 2;
	THREE.SubtractiveBlending = 3;
	THREE.MultiplyBlending = 4;
	THREE.CustomBlending = 5;

	// custom blending equations
	// (numbers start from 100 not to clash with other
	// mappings to OpenGL constants defined in Texture.js)

	THREE.AddEquation = 100;
	THREE.SubtractEquation = 101;
	THREE.ReverseSubtractEquation = 102;
	THREE.MinEquation = 103;
	THREE.MaxEquation = 104;

	// custom blending destination factors

	THREE.ZeroFactor = 200;
	THREE.OneFactor = 201;
	THREE.SrcColorFactor = 202;
	THREE.OneMinusSrcColorFactor = 203;
	THREE.SrcAlphaFactor = 204;
	THREE.OneMinusSrcAlphaFactor = 205;
	THREE.DstAlphaFactor = 206;
	THREE.OneMinusDstAlphaFactor = 207;

	// custom blending source factors

	//THREE.ZeroFactor = 200;
	//THREE.OneFactor = 201;
	//THREE.SrcAlphaFactor = 204;
	//THREE.OneMinusSrcAlphaFactor = 205;
	//THREE.DstAlphaFactor = 206;
	//THREE.OneMinusDstAlphaFactor = 207;
	THREE.DstColorFactor = 208;
	THREE.OneMinusDstColorFactor = 209;
	THREE.SrcAlphaSaturateFactor = 210;

	// depth modes

	THREE.NeverDepth = 0;
	THREE.AlwaysDepth = 1;
	THREE.LessDepth = 2;
	THREE.LessEqualDepth = 3;
	THREE.EqualDepth = 4;
	THREE.GreaterEqualDepth = 5;
	THREE.GreaterDepth = 6;
	THREE.NotEqualDepth = 7;


	// TEXTURE CONSTANTS

	THREE.MultiplyOperation = 0;
	THREE.MixOperation = 1;
	THREE.AddOperation = 2;

	// Tone Mapping modes

	THREE.NoToneMapping = 0; // do not do any tone mapping, not even exposure (required for special purpose passes.)
	THREE.LinearToneMapping = 1; // only apply exposure.
	THREE.ReinhardToneMapping = 2;
	THREE.Uncharted2ToneMapping = 3; // John Hable
	THREE.CineonToneMapping = 4;  // optimized filmic operator by Jim Hejl and Richard Burgess-Dawson

	// Mapping modes

	THREE.UVMapping = 300;

	THREE.CubeReflectionMapping = 301;
	THREE.CubeRefractionMapping = 302;

	THREE.EquirectangularReflectionMapping = 303;
	THREE.EquirectangularRefractionMapping = 304;

	THREE.SphericalReflectionMapping = 305;
	THREE.CubeUVReflectionMapping = 306;
	THREE.CubeUVRefractionMapping = 307;

	// Wrapping modes

	THREE.RepeatWrapping = 1000;
	THREE.ClampToEdgeWrapping = 1001;
	THREE.MirroredRepeatWrapping = 1002;

	// Filters

	THREE.NearestFilter = 1003;
	THREE.NearestMipMapNearestFilter = 1004;
	THREE.NearestMipMapLinearFilter = 1005;
	THREE.LinearFilter = 1006;
	THREE.LinearMipMapNearestFilter = 1007;
	THREE.LinearMipMapLinearFilter = 1008;

	// Data types

	THREE.UnsignedByteType = 1009;
	THREE.ByteType = 1010;
	THREE.ShortType = 1011;
	THREE.UnsignedShortType = 1012;
	THREE.IntType = 1013;
	THREE.UnsignedIntType = 1014;
	THREE.FloatType = 1015;
	THREE.HalfFloatType = 1025;

	// Pixel types

	//THREE.UnsignedByteType = 1009;
	THREE.UnsignedShort4444Type = 1016;
	THREE.UnsignedShort5551Type = 1017;
	THREE.UnsignedShort565Type = 1018;

	// Pixel formats

	THREE.AlphaFormat = 1019;
	THREE.RGBFormat = 1020;
	THREE.RGBAFormat = 1021;
	THREE.LuminanceFormat = 1022;
	THREE.LuminanceAlphaFormat = 1023;
	// THREE.RGBEFormat handled as THREE.RGBAFormat in shaders
	THREE.RGBEFormat = THREE.RGBAFormat; //1024;

	// DDS / ST3C Compressed texture formats

	THREE.RGB_S3TC_DXT1_Format = 2001;
	THREE.RGBA_S3TC_DXT1_Format = 2002;
	THREE.RGBA_S3TC_DXT3_Format = 2003;
	THREE.RGBA_S3TC_DXT5_Format = 2004;


	// PVRTC compressed texture formats

	THREE.RGB_PVRTC_4BPPV1_Format = 2100;
	THREE.RGB_PVRTC_2BPPV1_Format = 2101;
	THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
	THREE.RGBA_PVRTC_2BPPV1_Format = 2103;

	// ETC compressed texture formats

	THREE.RGB_ETC1_Format = 2151;

	// Loop styles for AnimationAction

	THREE.LoopOnce = 2200;
	THREE.LoopRepeat = 2201;
	THREE.LoopPingPong = 2202;

	// Interpolation

	THREE.InterpolateDiscrete = 2300;
	THREE.InterpolateLinear = 2301;
	THREE.InterpolateSmooth = 2302;

	// Interpolant ending modes

	THREE.ZeroCurvatureEnding = 2400;
	THREE.ZeroSlopeEnding = 2401;
	THREE.WrapAroundEnding = 2402;

	// Triangle Draw modes

	THREE.TrianglesDrawMode = 0;
	THREE.TriangleStripDrawMode = 1;
	THREE.TriangleFanDrawMode = 2;

	// Texture Encodings

	THREE.LinearEncoding = 3000; // No encoding at all.
	THREE.sRGBEncoding = 3001;
	THREE.GammaEncoding = 3007; // uses GAMMA_FACTOR, for backwards compatibility with WebGLRenderer.gammaInput/gammaOutput

	// The following Texture Encodings are for RGB-only (no alpha) HDR light emission sources.
	// These encodings should not specified as output encodings except in rare situations.
	THREE.RGBEEncoding = 3002; // AKA Radiance.
	THREE.LogLuvEncoding = 3003;
	THREE.RGBM7Encoding = 3004;
	THREE.RGBM16Encoding = 3005;
	THREE.RGBDEncoding = 3006; // MaxRange is 256.


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * @author qiao / https://github.com/qiao
	 * @author mrdoob / http://mrdoob.com
	 * @author alteredq / http://alteredqualia.com/
	 * @author WestLangley / http://github.com/WestLangley
	 * @author erich666 / http://erichaines.com
	 */

	// This set of controls performs orbiting, dollying (zooming), and panning.
	// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
	//
	//    Orbit - left mouse / touch: one finger move
	//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
	//    Pan - right mouse, or arrow keys / touch: three finter swipe

	THREE.OrbitControls = function ( object, domElement ) {

		this.object = object;

		this.domElement = ( domElement !== undefined ) ? domElement : document;

		// Set to false to disable this control
		this.enabled = true;

		// "target" sets the location of focus, where the object orbits around
		this.target = new THREE.Vector3();

		// How far you can dolly in and out ( PerspectiveCamera only )
		this.minDistance = 0;
		this.maxDistance = Infinity;

		// How far you can zoom in and out ( OrthographicCamera only )
		this.minZoom = 0;
		this.maxZoom = Infinity;

		// How far you can orbit vertically, upper and lower limits.
		// Range is 0 to Math.PI radians.
		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians

		// How far you can orbit horizontally, upper and lower limits.
		// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
		this.minAzimuthAngle = - Infinity; // radians
		this.maxAzimuthAngle = Infinity; // radians

		// Set to true to enable damping (inertia)
		// If damping is enabled, you must call controls.update() in your animation loop
		this.enableDamping = false;
		this.dampingFactor = 0.25;

		// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
		// Set to false to disable zooming
		this.enableZoom = true;
		this.zoomSpeed = 1.0;

		// Set to false to disable rotating
		this.enableRotate = true;
		this.rotateSpeed = 1.0;

		// Set to false to disable panning
		this.enablePan = true;
		this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

		// Set to true to automatically rotate around the target
		// If auto-rotate is enabled, you must call controls.update() in your animation loop
		this.autoRotate = false;
		this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

		// Set to false to disable use of the keys
		this.enableKeys = true;

		// The four arrow keys
		this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

		// Mouse buttons
		this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

		// for reset
		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.zoom0 = this.object.zoom;

		//
		// public methods
		//

		this.getPolarAngle = function () {

			return phi;

		};

		this.getAzimuthalAngle = function () {

			return theta;

		};

		this.reset = function () {

			scope.target.copy( scope.target0 );
			scope.object.position.copy( scope.position0 );
			scope.object.zoom = scope.zoom0;

			scope.object.updateProjectionMatrix();
			scope.dispatchEvent( changeEvent );

			scope.update();

			state = STATE.NONE;

		};

		// this method is exposed, but perhaps it would be better if we can make it private...
		this.update = function() {

			var offset = new THREE.Vector3();

			// so camera.up is the orbit axis
			var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
			var quatInverse = quat.clone().inverse();

			var lastPosition = new THREE.Vector3();
			var lastQuaternion = new THREE.Quaternion();

			return function () {

				var position = scope.object.position;

				offset.copy( position ).sub( scope.target );

				// rotate offset to "y-axis-is-up" space
				offset.applyQuaternion( quat );

				// angle from z-axis around y-axis
				spherical.setFromVector3( offset );

				if ( scope.autoRotate && state === STATE.NONE ) {

					rotateLeft( getAutoRotationAngle() );

				}

				spherical.theta += sphericalDelta.theta;
				spherical.phi += sphericalDelta.phi;

				// restrict theta to be between desired limits
				spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

				// restrict phi to be between desired limits
				spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

				spherical.makeSafe();


				spherical.radius *= scale;

				// restrict radius to be between desired limits
				spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

				// move target to panned location
				scope.target.add( panOffset );

				offset.setFromSpherical( spherical );

				// rotate offset back to "camera-up-vector-is-up" space
				offset.applyQuaternion( quatInverse );

				position.copy( scope.target ).add( offset );

				scope.object.lookAt( scope.target );

				if ( scope.enableDamping === true ) {

					sphericalDelta.theta *= ( 1 - scope.dampingFactor );
					sphericalDelta.phi *= ( 1 - scope.dampingFactor );

				} else {

					sphericalDelta.set( 0, 0, 0 );

				}

				scale = 1;
				panOffset.set( 0, 0, 0 );

				// update condition is:
				// min(camera displacement, camera rotation in radians)^2 > EPS
				// using small-angle approximation cos(x/2) = 1 - x^2 / 8

				if ( zoomChanged ||
					lastPosition.distanceToSquared( scope.object.position ) > EPS ||
					8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

					scope.dispatchEvent( changeEvent );

					lastPosition.copy( scope.object.position );
					lastQuaternion.copy( scope.object.quaternion );
					zoomChanged = false;

					return true;

				}

				return false;

			};

		}();

		this.dispose = function() {

			scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
			scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
			scope.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
			scope.domElement.removeEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

			scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
			scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
			scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

			document.removeEventListener( 'mousemove', onMouseMove, false );
			document.removeEventListener( 'mouseup', onMouseUp, false );
			document.removeEventListener( 'mouseout', onMouseUp, false );

			window.removeEventListener( 'keydown', onKeyDown, false );

			//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

		};

		//
		// internals
		//

		var scope = this;

		var changeEvent = { type: 'change' };
		var startEvent = { type: 'start' };
		var endEvent = { type: 'end' };

		var STATE = { NONE : - 1, ROTATE : 0, DOLLY : 1, PAN : 2, TOUCH_ROTATE : 3, TOUCH_DOLLY : 4, TOUCH_PAN : 5 };

		var state = STATE.NONE;

		var EPS = 0.000001;

		// current position in spherical coordinates
		var spherical = new THREE.Spherical();
		var sphericalDelta = new THREE.Spherical();

		var scale = 1;
		var panOffset = new THREE.Vector3();
		var zoomChanged = false;

		var rotateStart = new THREE.Vector2();
		var rotateEnd = new THREE.Vector2();
		var rotateDelta = new THREE.Vector2();

		var panStart = new THREE.Vector2();
		var panEnd = new THREE.Vector2();
		var panDelta = new THREE.Vector2();

		var dollyStart = new THREE.Vector2();
		var dollyEnd = new THREE.Vector2();
		var dollyDelta = new THREE.Vector2();

		function getAutoRotationAngle() {

			return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

		}

		function getZoomScale() {

			return Math.pow( 0.95, scope.zoomSpeed );

		}

		function rotateLeft( angle ) {

			sphericalDelta.theta -= angle;

		}

		function rotateUp( angle ) {

			sphericalDelta.phi -= angle;

		}

		var panLeft = function() {

			var v = new THREE.Vector3();

			return function panLeft( distance, objectMatrix ) {

				v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
				v.multiplyScalar( - distance );

				panOffset.add( v );

			};

		}();

		var panUp = function() {

			var v = new THREE.Vector3();

			return function panUp( distance, objectMatrix ) {

				v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
				v.multiplyScalar( distance );

				panOffset.add( v );

			};

		}();

		// deltaX and deltaY are in pixels; right and down are positive
		var pan = function() {

			var offset = new THREE.Vector3();

			return function( deltaX, deltaY ) {

				var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

				if ( scope.object instanceof THREE.PerspectiveCamera ) {

					// perspective
					var position = scope.object.position;
					offset.copy( position ).sub( scope.target );
					var targetDistance = offset.length();

					// half of the fov is center to top of screen
					targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

					// we actually don't use screenWidth, since perspective camera is fixed to screen height
					panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
					panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

				} else if ( scope.object instanceof THREE.OrthographicCamera ) {

					// orthographic
					panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
					panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

				} else {

					// camera neither orthographic nor perspective
					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
					scope.enablePan = false;

				}

			};

		}();

		function dollyIn( dollyScale ) {

			if ( scope.object instanceof THREE.PerspectiveCamera ) {

				scale /= dollyScale;

			} else if ( scope.object instanceof THREE.OrthographicCamera ) {

				scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
				scope.object.updateProjectionMatrix();
				zoomChanged = true;

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
				scope.enableZoom = false;

			}

		}

		function dollyOut( dollyScale ) {

			if ( scope.object instanceof THREE.PerspectiveCamera ) {

				scale *= dollyScale;

			} else if ( scope.object instanceof THREE.OrthographicCamera ) {

				scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
				scope.object.updateProjectionMatrix();
				zoomChanged = true;

			} else {

				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
				scope.enableZoom = false;

			}

		}

		//
		// event callbacks - update the object state
		//

		function handleMouseDownRotate( event ) {

			//console.log( 'handleMouseDownRotate' );

			rotateStart.set( event.clientX, event.clientY );

		}

		function handleMouseDownDolly( event ) {

			//console.log( 'handleMouseDownDolly' );

			dollyStart.set( event.clientX, event.clientY );

		}

		function handleMouseDownPan( event ) {

			//console.log( 'handleMouseDownPan' );

			panStart.set( event.clientX, event.clientY );

		}

		function handleMouseMoveRotate( event ) {

			//console.log( 'handleMouseMoveRotate' );

			rotateEnd.set( event.clientX, event.clientY );
			rotateDelta.subVectors( rotateEnd, rotateStart );

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			// rotating across whole screen goes 360 degrees around
			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

			// rotating up and down along whole screen attempts to go 360, but limited to 180
			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

			rotateStart.copy( rotateEnd );

			scope.update();

		}

		function handleMouseMoveDolly( event ) {

			//console.log( 'handleMouseMoveDolly' );

			dollyEnd.set( event.clientX, event.clientY );

			dollyDelta.subVectors( dollyEnd, dollyStart );

			if ( dollyDelta.y > 0 ) {

				dollyIn( getZoomScale() );

			} else if ( dollyDelta.y < 0 ) {

				dollyOut( getZoomScale() );

			}

			dollyStart.copy( dollyEnd );

			scope.update();

		}

		function handleMouseMovePan( event ) {

			//console.log( 'handleMouseMovePan' );

			panEnd.set( event.clientX, event.clientY );

			panDelta.subVectors( panEnd, panStart );

			pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

			scope.update();

		}

		function handleMouseUp( event ) {

			//console.log( 'handleMouseUp' );

		}

		function handleMouseWheel( event ) {

			//console.log( 'handleMouseWheel' );

			var delta = 0;

			if ( event.wheelDelta !== undefined ) {

				// WebKit / Opera / Explorer 9

				delta = event.wheelDelta;

			} else if ( event.detail !== undefined ) {

				// Firefox

				delta = - event.detail;

			}

			if ( delta > 0 ) {

				dollyOut( getZoomScale() );

			} else if ( delta < 0 ) {

				dollyIn( getZoomScale() );

			}

			scope.update();

		}

		function handleKeyDown( event ) {

			//console.log( 'handleKeyDown' );

			switch ( event.keyCode ) {

				case scope.keys.UP:
					pan( 0, scope.keyPanSpeed );
					scope.update();
					break;

				case scope.keys.BOTTOM:
					pan( 0, - scope.keyPanSpeed );
					scope.update();
					break;

				case scope.keys.LEFT:
					pan( scope.keyPanSpeed, 0 );
					scope.update();
					break;

				case scope.keys.RIGHT:
					pan( - scope.keyPanSpeed, 0 );
					scope.update();
					break;

			}

		}

		function handleTouchStartRotate( event ) {

			//console.log( 'handleTouchStartRotate' );

			rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		}

		function handleTouchStartDolly( event ) {

			//console.log( 'handleTouchStartDolly' );

			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

			var distance = Math.sqrt( dx * dx + dy * dy );

			dollyStart.set( 0, distance );

		}

		function handleTouchStartPan( event ) {

			//console.log( 'handleTouchStartPan' );

			panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		}

		function handleTouchMoveRotate( event ) {

			//console.log( 'handleTouchMoveRotate' );

			rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
			rotateDelta.subVectors( rotateEnd, rotateStart );

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			// rotating across whole screen goes 360 degrees around
			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

			// rotating up and down along whole screen attempts to go 360, but limited to 180
			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

			rotateStart.copy( rotateEnd );

			scope.update();

		}

		function handleTouchMoveDolly( event ) {

			//console.log( 'handleTouchMoveDolly' );

			var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
			var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

			var distance = Math.sqrt( dx * dx + dy * dy );

			dollyEnd.set( 0, distance );

			dollyDelta.subVectors( dollyEnd, dollyStart );

			if ( dollyDelta.y > 0 ) {

				dollyOut( getZoomScale() );

			} else if ( dollyDelta.y < 0 ) {

				dollyIn( getZoomScale() );

			}

			dollyStart.copy( dollyEnd );

			scope.update();

		}

		function handleTouchMovePan( event ) {

			//console.log( 'handleTouchMovePan' );

			panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

			panDelta.subVectors( panEnd, panStart );

			pan( panDelta.x, panDelta.y );

			panStart.copy( panEnd );

			scope.update();

		}

		function handleTouchEnd( event ) {

			//console.log( 'handleTouchEnd' );

		}

		//
		// event handlers - FSM: listen for events and reset state
		//

		function onMouseDown( event ) {

			if ( scope.enabled === false ) return;

			event.preventDefault();

			if ( event.button === scope.mouseButtons.ORBIT ) {

				if ( scope.enableRotate === false ) return;

				handleMouseDownRotate( event );

				state = STATE.ROTATE;

			} else if ( event.button === scope.mouseButtons.ZOOM ) {

				if ( scope.enableZoom === false ) return;

				handleMouseDownDolly( event );

				state = STATE.DOLLY;

			} else if ( event.button === scope.mouseButtons.PAN ) {

				if ( scope.enablePan === false ) return;

				handleMouseDownPan( event );

				state = STATE.PAN;

			}

			if ( state !== STATE.NONE ) {

				document.addEventListener( 'mousemove', onMouseMove, false );
				document.addEventListener( 'mouseup', onMouseUp, false );
				document.addEventListener( 'mouseout', onMouseUp, false );

				scope.dispatchEvent( startEvent );

			}

		}

		function onMouseMove( event ) {

			if ( scope.enabled === false ) return;

			event.preventDefault();

			if ( state === STATE.ROTATE ) {

				if ( scope.enableRotate === false ) return;

				handleMouseMoveRotate( event );

			} else if ( state === STATE.DOLLY ) {

				if ( scope.enableZoom === false ) return;

				handleMouseMoveDolly( event );

			} else if ( state === STATE.PAN ) {

				if ( scope.enablePan === false ) return;

				handleMouseMovePan( event );

			}

		}

		function onMouseUp( event ) {

			if ( scope.enabled === false ) return;

			handleMouseUp( event );

			document.removeEventListener( 'mousemove', onMouseMove, false );
			document.removeEventListener( 'mouseup', onMouseUp, false );
			document.removeEventListener( 'mouseout', onMouseUp, false );

			scope.dispatchEvent( endEvent );

			state = STATE.NONE;

		}

		function onMouseWheel( event ) {

			if ( scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE ) return;

			event.preventDefault();
			event.stopPropagation();

			handleMouseWheel( event );

			scope.dispatchEvent( startEvent ); // not sure why these are here...
			scope.dispatchEvent( endEvent );

		}

		function onKeyDown( event ) {

			if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

			handleKeyDown( event );

		}

		function onTouchStart( event ) {

			if ( scope.enabled === false ) return;

			switch ( event.touches.length ) {

				case 1:	// one-fingered touch: rotate

					if ( scope.enableRotate === false ) return;

					handleTouchStartRotate( event );

					state = STATE.TOUCH_ROTATE;

					break;

				case 2:	// two-fingered touch: dolly

					if ( scope.enableZoom === false ) return;

					handleTouchStartDolly( event );

					state = STATE.TOUCH_DOLLY;

					break;

				case 3: // three-fingered touch: pan

					if ( scope.enablePan === false ) return;

					handleTouchStartPan( event );

					state = STATE.TOUCH_PAN;

					break;

				default:

					state = STATE.NONE;

			}

			if ( state !== STATE.NONE ) {

				scope.dispatchEvent( startEvent );

			}

		}

		function onTouchMove( event ) {

			if ( scope.enabled === false ) return;

			event.preventDefault();
			event.stopPropagation();

			switch ( event.touches.length ) {

				case 1: // one-fingered touch: rotate

					if ( scope.enableRotate === false ) return;
					if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...

					handleTouchMoveRotate( event );

					break;

				case 2: // two-fingered touch: dolly

					if ( scope.enableZoom === false ) return;
					if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...

					handleTouchMoveDolly( event );

					break;

				case 3: // three-fingered touch: pan

					if ( scope.enablePan === false ) return;
					if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...

					handleTouchMovePan( event );

					break;

				default:

					state = STATE.NONE;

			}

		}

		function onTouchEnd( event ) {

			if ( scope.enabled === false ) return;

			handleTouchEnd( event );

			scope.dispatchEvent( endEvent );

			state = STATE.NONE;

		}

		function onContextMenu( event ) {

			event.preventDefault();

		}

		//

		scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

		scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
		scope.domElement.addEventListener( 'MozMousePixelScroll', onMouseWheel, false ); // firefox

		scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

		window.addEventListener( 'keydown', onKeyDown, false );

		// force an update at start

		this.update();

	};

	THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
	THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

	Object.defineProperties( THREE.OrbitControls.prototype, {

		center: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
				return this.target;

			}

		},

		// backward compatibility

		noZoom: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
				return ! this.enableZoom;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
				this.enableZoom = ! value;

			}

		},

		noRotate: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
				return ! this.enableRotate;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
				this.enableRotate = ! value;

			}

		},

		noPan: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
				return ! this.enablePan;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
				this.enablePan = ! value;

			}

		},

		noKeys: {

			get: function () {

				console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
				return ! this.enableKeys;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
				this.enableKeys = ! value;

			}

		},

		staticMoving : {

			get: function () {

				console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
				return ! this.constraint.enableDamping;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
				this.constraint.enableDamping = ! value;

			}

		},

		dynamicDampingFactor : {

			get: function () {

				console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
				return this.constraint.dampingFactor;

			},

			set: function ( value ) {

				console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
				this.constraint.dampingFactor = value;

			}

		}

	} );


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	var Hasher = __webpack_require__(4).Hasher 

	var C_x64 = __webpack_require__(11)
	var X64Word = C_x64.Word;
	var X64WordArray = C_x64.WordArray;

	// Constants
	var K = [
	  X64Word(0x428a2f98, 0xd728ae22), X64Word(0x71374491, 0x23ef65cd),
	  X64Word(0xb5c0fbcf, 0xec4d3b2f), X64Word(0xe9b5dba5, 0x8189dbbc),
	  X64Word(0x3956c25b, 0xf348b538), X64Word(0x59f111f1, 0xb605d019),
	  X64Word(0x923f82a4, 0xaf194f9b), X64Word(0xab1c5ed5, 0xda6d8118),
	  X64Word(0xd807aa98, 0xa3030242), X64Word(0x12835b01, 0x45706fbe),
	  X64Word(0x243185be, 0x4ee4b28c), X64Word(0x550c7dc3, 0xd5ffb4e2),
	  X64Word(0x72be5d74, 0xf27b896f), X64Word(0x80deb1fe, 0x3b1696b1),
	  X64Word(0x9bdc06a7, 0x25c71235), X64Word(0xc19bf174, 0xcf692694),
	  X64Word(0xe49b69c1, 0x9ef14ad2), X64Word(0xefbe4786, 0x384f25e3),
	  X64Word(0x0fc19dc6, 0x8b8cd5b5), X64Word(0x240ca1cc, 0x77ac9c65),
	  X64Word(0x2de92c6f, 0x592b0275), X64Word(0x4a7484aa, 0x6ea6e483),
	  X64Word(0x5cb0a9dc, 0xbd41fbd4), X64Word(0x76f988da, 0x831153b5),
	  X64Word(0x983e5152, 0xee66dfab), X64Word(0xa831c66d, 0x2db43210),
	  X64Word(0xb00327c8, 0x98fb213f), X64Word(0xbf597fc7, 0xbeef0ee4),
	  X64Word(0xc6e00bf3, 0x3da88fc2), X64Word(0xd5a79147, 0x930aa725),
	  X64Word(0x06ca6351, 0xe003826f), X64Word(0x14292967, 0x0a0e6e70),
	  X64Word(0x27b70a85, 0x46d22ffc), X64Word(0x2e1b2138, 0x5c26c926),
	  X64Word(0x4d2c6dfc, 0x5ac42aed), X64Word(0x53380d13, 0x9d95b3df),
	  X64Word(0x650a7354, 0x8baf63de), X64Word(0x766a0abb, 0x3c77b2a8),
	  X64Word(0x81c2c92e, 0x47edaee6), X64Word(0x92722c85, 0x1482353b),
	  X64Word(0xa2bfe8a1, 0x4cf10364), X64Word(0xa81a664b, 0xbc423001),
	  X64Word(0xc24b8b70, 0xd0f89791), X64Word(0xc76c51a3, 0x0654be30),
	  X64Word(0xd192e819, 0xd6ef5218), X64Word(0xd6990624, 0x5565a910),
	  X64Word(0xf40e3585, 0x5771202a), X64Word(0x106aa070, 0x32bbd1b8),
	  X64Word(0x19a4c116, 0xb8d2d0c8), X64Word(0x1e376c08, 0x5141ab53),
	  X64Word(0x2748774c, 0xdf8eeb99), X64Word(0x34b0bcb5, 0xe19b48a8),
	  X64Word(0x391c0cb3, 0xc5c95a63), X64Word(0x4ed8aa4a, 0xe3418acb),
	  X64Word(0x5b9cca4f, 0x7763e373), X64Word(0x682e6ff3, 0xd6b2b8a3),
	  X64Word(0x748f82ee, 0x5defb2fc), X64Word(0x78a5636f, 0x43172f60),
	  X64Word(0x84c87814, 0xa1f0ab72), X64Word(0x8cc70208, 0x1a6439ec),
	  X64Word(0x90befffa, 0x23631e28), X64Word(0xa4506ceb, 0xde82bde9),
	  X64Word(0xbef9a3f7, 0xb2c67915), X64Word(0xc67178f2, 0xe372532b),
	  X64Word(0xca273ece, 0xea26619c), X64Word(0xd186b8c7, 0x21c0c207),
	  X64Word(0xeada7dd6, 0xcde0eb1e), X64Word(0xf57d4f7f, 0xee6ed178),
	  X64Word(0x06f067aa, 0x72176fba), X64Word(0x0a637dc5, 0xa2c898a6),
	  X64Word(0x113f9804, 0xbef90dae), X64Word(0x1b710b35, 0x131c471b),
	  X64Word(0x28db77f5, 0x23047d84), X64Word(0x32caab7b, 0x40c72493),
	  X64Word(0x3c9ebe0a, 0x15c9bebc), X64Word(0x431d67c4, 0x9c100d4c),
	  X64Word(0x4cc5d4be, 0xcb3e42b6), X64Word(0x597f299c, 0xfc657e2a),
	  X64Word(0x5fcb6fab, 0x3ad6faec), X64Word(0x6c44198c, 0x4a475817)
	];

	// Reusable objects
	var W = [];
	(function () {
	  for (var i = 0; i < 80; i++) {
	    W[i] = X64Word();
	  }
	}());

	/**
	 * SHA-512 hash algorithm.
	 */
	var SHA512 = Hasher.extend({
	  _doReset: function () {
	    this._hash = new X64WordArray([
	      X64Word(0x6a09e667, 0xf3bcc908), X64Word(0xbb67ae85, 0x84caa73b),
	      X64Word(0x3c6ef372, 0xfe94f82b), X64Word(0xa54ff53a, 0x5f1d36f1),
	      X64Word(0x510e527f, 0xade682d1), X64Word(0x9b05688c, 0x2b3e6c1f),
	      X64Word(0x1f83d9ab, 0xfb41bd6b), X64Word(0x5be0cd19, 0x137e2179)
	    ]);
	  },
<<<<<<< HEAD

	  _doProcessBlock: function (M, offset) {
	    // Shortcuts
	    var H = this._hash.words;

	    var H0 = H[0]; var H1 = H[1]; var H2 = H[2];
	    var H3 = H[3]; var H4 = H[4]; var H5 = H[5];
	    var H6 = H[6]; var H7 = H[7];

	    var H0h = H0.high; var H0l = H0.low;
	    var H1h = H1.high; var H1l = H1.low;
	    var H2h = H2.high; var H2l = H2.low;
	    var H3h = H3.high; var H3l = H3.low;
	    var H4h = H4.high; var H4l = H4.low;
	    var H5h = H5.high; var H5l = H5.low;
	    var H6h = H6.high; var H6l = H6.low;
	    var H7h = H7.high; var H7l = H7.low;

	    // Working variables
	    var ah = H0h; var al = H0l;
	    var bh = H1h; var bl = H1l;
	    var ch = H2h; var cl = H2l;
	    var dh = H3h; var dl = H3l;
	    var eh = H4h; var el = H4l;
	    var fh = H5h; var fl = H5l;
	    var gh = H6h; var gl = H6l;
	    var hh = H7h; var hl = H7l;

	    // Rounds
	    for (var i = 0; i < 80; i++) {
	      // Shortcut
	      var Wi = W[i];

	      // Extend message
	      if (i < 16) {
	        var Wih = Wi.high = M[offset + i * 2]     | 0;
	        var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	      } else {
	        // Gamma0
	        var gamma0x  = W[i - 15];
	        var gamma0xh = gamma0x.high;
	        var gamma0xl = gamma0x.low;
	        var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	        var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	        // Gamma1
	        var gamma1x  = W[i - 2];
	        var gamma1xh = gamma1x.high;
	        var gamma1xl = gamma1x.low;
	        var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	        var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[i - 7];
	        var Wi7h = Wi7.high;
	        var Wi7l = Wi7.low;

	        var Wi16  = W[i - 16];
	        var Wi16h = Wi16.high;
	        var Wi16l = Wi16.low;

	        var Wil = gamma0l + Wi7l;
	        var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	        var Wil = Wil + gamma1l;
	        var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	        var Wil = Wil + Wi16l;
	        var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	        Wi.high = Wih;
	        Wi.low  = Wil;
	      }

	      var chh  = (eh & fh) ^ (~eh & gh);
	      var chl  = (el & fl) ^ (~el & gl);
	      var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	      var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	      var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	      var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	      var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	      var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki  = K[i];
	      var Kih = Ki.high;
	      var Kil = Ki.low;

	      var t1l = hl + sigma1l;
	      var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	      var t1l = t1l + chl;
	      var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	      var t1l = t1l + Kil;
	      var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	      var t1l = t1l + Wil;
	      var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl;
	      var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	      // Update working variables
	      hh = gh; hl = gl;
	      gh = fh; gl = fl;
	      fh = eh; fl = el;
	      el = (dl + t1l) | 0;
	      eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	      dh = ch; dl = cl;
	      ch = bh; cl = bl;
	      bh = ah; bl = al;
	      al = (t1l + t2l) | 0;
	      ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	    }

	    // Intermediate hash value
	    H0l = H0.low  = (H0l + al);
	    H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	    H1l = H1.low  = (H1l + bl);
	    H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	    H2l = H2.low  = (H2l + cl);
	    H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	    H3l = H3.low  = (H3l + dl);
	    H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	    H4l = H4.low  = (H4l + el);
	    H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	    H5l = H5.low  = (H5l + fl);
	    H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	    H6l = H6.low  = (H6l + gl);
	    H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	    H7l = H7.low  = (H7l + hl);
	    H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	  },
=======

	  _doProcessBlock: function (M, offset) {
	    // Shortcuts
	    var H = this._hash.words;

	    var H0 = H[0]; var H1 = H[1]; var H2 = H[2];
	    var H3 = H[3]; var H4 = H[4]; var H5 = H[5];
	    var H6 = H[6]; var H7 = H[7];

	    var H0h = H0.high; var H0l = H0.low;
	    var H1h = H1.high; var H1l = H1.low;
	    var H2h = H2.high; var H2l = H2.low;
	    var H3h = H3.high; var H3l = H3.low;
	    var H4h = H4.high; var H4l = H4.low;
	    var H5h = H5.high; var H5l = H5.low;
	    var H6h = H6.high; var H6l = H6.low;
	    var H7h = H7.high; var H7l = H7.low;

	    // Working variables
	    var ah = H0h; var al = H0l;
	    var bh = H1h; var bl = H1l;
	    var ch = H2h; var cl = H2l;
	    var dh = H3h; var dl = H3l;
	    var eh = H4h; var el = H4l;
	    var fh = H5h; var fl = H5l;
	    var gh = H6h; var gl = H6l;
	    var hh = H7h; var hl = H7l;

	    // Rounds
	    for (var i = 0; i < 80; i++) {
	      // Shortcut
	      var Wi = W[i];

	      // Extend message
	      if (i < 16) {
	        var Wih = Wi.high = M[offset + i * 2]     | 0;
	        var Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	      } else {
	        // Gamma0
	        var gamma0x  = W[i - 15];
	        var gamma0xh = gamma0x.high;
	        var gamma0xl = gamma0x.low;
	        var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	        var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	        // Gamma1
	        var gamma1x  = W[i - 2];
	        var gamma1xh = gamma1x.high;
	        var gamma1xl = gamma1x.low;
	        var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	        var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	        // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	        var Wi7  = W[i - 7];
	        var Wi7h = Wi7.high;
	        var Wi7l = Wi7.low;

	        var Wi16  = W[i - 16];
	        var Wi16h = Wi16.high;
	        var Wi16l = Wi16.low;

	        var Wil = gamma0l + Wi7l;
	        var Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	        var Wil = Wil + gamma1l;
	        var Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	        var Wil = Wil + Wi16l;
	        var Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	        Wi.high = Wih;
	        Wi.low  = Wil;
	      }

	      var chh  = (eh & fh) ^ (~eh & gh);
	      var chl  = (el & fl) ^ (~el & gl);
	      var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	      var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	      var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	      var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	      var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	      var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	      // t1 = h + sigma1 + ch + K[i] + W[i]
	      var Ki  = K[i];
	      var Kih = Ki.high;
	      var Kil = Ki.low;

	      var t1l = hl + sigma1l;
	      var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	      var t1l = t1l + chl;
	      var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	      var t1l = t1l + Kil;
	      var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	      var t1l = t1l + Wil;
	      var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	      // t2 = sigma0 + maj
	      var t2l = sigma0l + majl;
	      var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	      // Update working variables
	      hh = gh; hl = gl;
	      gh = fh; gl = fl;
	      fh = eh; fl = el;
	      el = (dl + t1l) | 0;
	      eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	      dh = ch; dl = cl;
	      ch = bh; cl = bl;
	      bh = ah; bl = al;
	      al = (t1l + t2l) | 0;
	      ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	    }

	    // Intermediate hash value
	    H0l = H0.low  = (H0l + al);
	    H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	    H1l = H1.low  = (H1l + bl);
	    H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	    H2l = H2.low  = (H2l + cl);
	    H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	    H3l = H3.low  = (H3l + dl);
	    H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	    H4l = H4.low  = (H4l + el);
	    H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	    H5l = H5.low  = (H5l + fl);
	    H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	    H6l = H6.low  = (H6l + gl);
	    H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	    H7l = H7.low  = (H7l + hl);
	    H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	  },

	  _doFinalize: function () {
	    // Shortcuts
	    var data = this._data;
	    var dataWords = data.words;

	    var nBitsTotal = this._nDataBytes * 8;
	    var nBitsLeft = data.sigBytes * 8;

	    // Add padding
	    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	    dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	    dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	    data.sigBytes = dataWords.length * 4;

	    // Hash final blocks
	    this._process();

	    // Convert hash to 32-bit word array before returning
	    var hash = this._hash.toX32();

	    // Return final computed hash
	    return hash;
	  },

	  clone: function () {
	    var clone = Hasher.clone.call(this);
	    clone._hash = this._hash.clone();

	    return clone;
	  },

	  blockSize: 1024/32
	});


	module.exports = Hasher._createHelper(SHA512);
	module.exports.sha512 = SHA512
>>>>>>> 1e1458833bdbb19f3a160adb21393446cec303a2

	  _doFinalize: function () {
	    // Shortcuts
	    var data = this._data;
	    var dataWords = data.words;

<<<<<<< HEAD
	    var nBitsTotal = this._nDataBytes * 8;
	    var nBitsLeft = data.sigBytes * 8;

	    // Add padding
	    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	    dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	    dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	    data.sigBytes = dataWords.length * 4;

	    // Hash final blocks
	    this._process();

	    // Convert hash to 32-bit word array before returning
	    var hash = this._hash.toX32();

	    // Return final computed hash
	    return hash;
	  },

	  clone: function () {
	    var clone = Hasher.clone.call(this);
	    clone._hash = this._hash.clone();

	    return clone;
	  },

	  blockSize: 1024/32
	});


	module.exports = Hasher._createHelper(SHA512);
	module.exports.sha512 = SHA512



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var WordArray = __webpack_require__(9)

	var Base = (function () {
	  function F() {}

	  return {
	    /**
	     * Creates a new object that inherits from this object.
	     *
	     * @param {Object} overrides Properties to copy into the new object.
	     *
	     * @return {Object} The new object.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var MyType = CryptoJS.lib.Base.extend({
	     *         field: 'value',
	     *
	     *         method: function () {
	     *         }
	     *     });
	     */
	    extend: function (overrides) {
	      // Spawn
	      F.prototype = this;
	      var subtype = new F();

	      // Augment
	      if (overrides) {
	        subtype.mixIn(overrides);
	      }

	      // Create default initializer
	      if (!subtype.hasOwnProperty('init')) {
	        subtype.init = function () {
	          subtype.$super.init.apply(this, arguments);
	        };
	      }

	      // Initializer's prototype is the subtype object
	      subtype.init.prototype = subtype;

	      // Reference supertype
	      subtype.$super = this;

	      return subtype;
	    },

	    /**
	     * Extends this object and runs the init method.
	     * Arguments to create() will be passed to init().
	     *
	     * @return {Object} The new object.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var instance = MyType.create();
	     */
	    create: function () {
	      var instance = this.extend();
	      instance.init.apply(instance, arguments);

	      return instance;
	    },

	    /**
	     * Initializes a newly created object.
	     * Override this method to add some logic when your objects are created.
	     *
	     * @example
	     *
	     *     var MyType = CryptoJS.lib.Base.extend({
	     *         init: function () {
	     *             // ...
	     *         }
	     *     });
	     */
	      init: function () {
	    },


	    mixIn: function (properties) {
	      for (var propertyName in properties) {
	        if (properties.hasOwnProperty(propertyName)) {
	          this[propertyName] = properties[propertyName];
	        }
	      }

	      // IE won't copy toString using the loop above
	      if (properties.hasOwnProperty('toString')) {
	        this.toString = properties.toString;
	      }
	    },


	    clone: function () {
	      return this.init.prototype.extend(this);
	    }
	  };
	}());


<<<<<<< c15c3f83ec444638daf5060e93f28289a2afa32d
	/**
	 * Abstract buffered block algorithm template.
	 *
	 * The property blockSize must be implemented in a concrete subtype.
	 *
	 * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	 */
	var BufferedBlockAlgorithm = Base.extend({
	  /**
	   * Resets this block algorithm's data buffer to its initial state.
	   *
	   * @example
	   *
	   *     bufferedBlockAlgorithm.reset();
	   */
	    reset: function () {
	      // Initial values
	      this._data = new WordArray();
	      this._nDataBytes = 0;
	    },
=======
	var builder = new _ProceduriaBuilder2.default(_config2.default.seed, {
	  progress: function progress(percent) {
	    console.log('progress', percent);
	    document.getElementById('loading-info').textContent = percent + ' %';
	  }
	});
<<<<<<< HEAD
>>>>>>> wip: client/server
=======
>>>>>>> 8305e4782320ed37b67676f63bc469991766fb85

	    /**
	     * Adds new data to this block algorithm's buffer.
	     *
	     * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	     *
	     * @example
	     *
	     *     bufferedBlockAlgorithm._append('data');
	     *     bufferedBlockAlgorithm._append(wordArray);
	     */
	    _append: function (data) {
	      //console.dir(data)

	      if (Buffer.isBuffer(data)) {
	        data = WordArray.fromBuffer(data)
	      }

	      // Append
	      this._data.concat(data);
	      this._nDataBytes += data.sigBytes;
	    },

	    /**
	     * Processes available data blocks.
	     *
	     * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	     *
	     * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	     *
	     * @return {WordArray} The processed data.
	     *
	     * @example
	     *
	     *     var processedData = bufferedBlockAlgorithm._process();
	     *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	     */
	    _process: function (doFlush) {
	      // Shortcuts
	      var data = this._data;
	      var dataWords = data.words;
	      var dataSigBytes = data.sigBytes;
	      var blockSize = this.blockSize;
	      var blockSizeBytes = blockSize * 4;

	      // Count blocks ready
	      var nBlocksReady = dataSigBytes / blockSizeBytes;
	      if (doFlush) {
	          // Round up to include partial blocks
	          nBlocksReady = Math.ceil(nBlocksReady);
	      } else {
	          // Round down to include only full blocks,
	          // less the number of blocks that must remain in the buffer
	          nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	      }

	      // Count words ready
	      var nWordsReady = nBlocksReady * blockSize;

	      // Count bytes ready
	      var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	      // Process blocks
	      if (nWordsReady) {
	        for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	          // Perform concrete-algorithm logic
	          this._doProcessBlock(dataWords, offset);
	        }

	        // Remove processed words
	        var processedWords = dataWords.splice(0, nWordsReady);
	        data.sigBytes -= nBytesReady;
	      }

	      // Return processed words
	      return new WordArray(processedWords, nBytesReady);
	    },

	    /**
	     * Creates a copy of this object.
	     * @example
	     *
	     *     var clone = bufferedBlockAlgorithm.clone();
	     */
	    clone: function () {
	      var clone = Base.clone.call(this);
	      clone._data = this._data.clone();

	      return clone;
	    },

	      _minBufferSize: 0
	    });

	/**
	 * Abstract hasher template.
	 *
	 * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	 */
	var Hasher = BufferedBlockAlgorithm.extend({
	  /**
	   * Configuration options.
	   */
	  cfg: Base.extend(),

	  /**
	   * Initializes a newly created hasher.
	   * @example
	   *
	   *     var hasher = CryptoJS.algo.SHA256.create();
	   */
	  init: function (cfg) {
	    // Apply config defaults
	    this.cfg = this.cfg.extend(cfg);

<<<<<<< HEAD
<<<<<<< c15c3f83ec444638daf5060e93f28289a2afa32d
	    // Set initial values
	    this.reset();
	  },
=======
	// builder.make()
>>>>>>> wip: client/server
=======
	// builder.make()
>>>>>>> 8305e4782320ed37b67676f63bc469991766fb85

=======

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var WordArray = __webpack_require__(9)

	var Base = (function () {
	  function F() {}

	  return {
	    /**
	     * Creates a new object that inherits from this object.
	     *
	     * @param {Object} overrides Properties to copy into the new object.
	     *
	     * @return {Object} The new object.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var MyType = CryptoJS.lib.Base.extend({
	     *         field: 'value',
	     *
	     *         method: function () {
	     *         }
	     *     });
	     */
	    extend: function (overrides) {
	      // Spawn
	      F.prototype = this;
	      var subtype = new F();

	      // Augment
	      if (overrides) {
	        subtype.mixIn(overrides);
	      }

	      // Create default initializer
	      if (!subtype.hasOwnProperty('init')) {
	        subtype.init = function () {
	          subtype.$super.init.apply(this, arguments);
	        };
	      }

	      // Initializer's prototype is the subtype object
	      subtype.init.prototype = subtype;

	      // Reference supertype
	      subtype.$super = this;

	      return subtype;
	    },

	    /**
	     * Extends this object and runs the init method.
	     * Arguments to create() will be passed to init().
	     *
	     * @return {Object} The new object.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var instance = MyType.create();
	     */
	    create: function () {
	      var instance = this.extend();
	      instance.init.apply(instance, arguments);

	      return instance;
	    },

	    /**
	     * Initializes a newly created object.
	     * Override this method to add some logic when your objects are created.
	     *
	     * @example
	     *
	     *     var MyType = CryptoJS.lib.Base.extend({
	     *         init: function () {
	     *             // ...
	     *         }
	     *     });
	     */
	      init: function () {
	    },


	    mixIn: function (properties) {
	      for (var propertyName in properties) {
	        if (properties.hasOwnProperty(propertyName)) {
	          this[propertyName] = properties[propertyName];
	        }
	      }

	      // IE won't copy toString using the loop above
	      if (properties.hasOwnProperty('toString')) {
	        this.toString = properties.toString;
	      }
	    },


	    clone: function () {
	      return this.init.prototype.extend(this);
	    }
	  };
	}());


	/**
	 * Abstract buffered block algorithm template.
	 *
	 * The property blockSize must be implemented in a concrete subtype.
	 *
	 * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	 */
	var BufferedBlockAlgorithm = Base.extend({
	  /**
	   * Resets this block algorithm's data buffer to its initial state.
	   *
	   * @example
	   *
	   *     bufferedBlockAlgorithm.reset();
	   */
	    reset: function () {
	      // Initial values
	      this._data = new WordArray();
	      this._nDataBytes = 0;
	    },

	    /**
	     * Adds new data to this block algorithm's buffer.
	     *
	     * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	     *
	     * @example
	     *
	     *     bufferedBlockAlgorithm._append('data');
	     *     bufferedBlockAlgorithm._append(wordArray);
	     */
	    _append: function (data) {
	      //console.dir(data)

	      if (Buffer.isBuffer(data)) {
	        data = WordArray.fromBuffer(data)
	      }

	      // Append
	      this._data.concat(data);
	      this._nDataBytes += data.sigBytes;
	    },

	    /**
	     * Processes available data blocks.
	     *
	     * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	     *
	     * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	     *
	     * @return {WordArray} The processed data.
	     *
	     * @example
	     *
	     *     var processedData = bufferedBlockAlgorithm._process();
	     *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	     */
	    _process: function (doFlush) {
	      // Shortcuts
	      var data = this._data;
	      var dataWords = data.words;
	      var dataSigBytes = data.sigBytes;
	      var blockSize = this.blockSize;
	      var blockSizeBytes = blockSize * 4;

	      // Count blocks ready
	      var nBlocksReady = dataSigBytes / blockSizeBytes;
	      if (doFlush) {
	          // Round up to include partial blocks
	          nBlocksReady = Math.ceil(nBlocksReady);
	      } else {
	          // Round down to include only full blocks,
	          // less the number of blocks that must remain in the buffer
	          nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	      }

	      // Count words ready
	      var nWordsReady = nBlocksReady * blockSize;

	      // Count bytes ready
	      var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	      // Process blocks
	      if (nWordsReady) {
	        for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	          // Perform concrete-algorithm logic
	          this._doProcessBlock(dataWords, offset);
	        }

	        // Remove processed words
	        var processedWords = dataWords.splice(0, nWordsReady);
	        data.sigBytes -= nBytesReady;
	      }

	      // Return processed words
	      return new WordArray(processedWords, nBytesReady);
	    },

	    /**
	     * Creates a copy of this object.
	     * @example
	     *
	     *     var clone = bufferedBlockAlgorithm.clone();
	     */
	    clone: function () {
	      var clone = Base.clone.call(this);
	      clone._data = this._data.clone();

	      return clone;
	    },

	      _minBufferSize: 0
	    });

	/**
	 * Abstract hasher template.
	 *
	 * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	 */
	var Hasher = BufferedBlockAlgorithm.extend({
	  /**
	   * Configuration options.
	   */
	  cfg: Base.extend(),

	  /**
	   * Initializes a newly created hasher.
	   * @example
	   *
	   *     var hasher = CryptoJS.algo.SHA256.create();
	   */
	  init: function (cfg) {
	    // Apply config defaults
	    this.cfg = this.cfg.extend(cfg);

	    // Set initial values
	    this.reset();
	  },

>>>>>>> 1e1458833bdbb19f3a160adb21393446cec303a2
	  reset: function () {
	    // Reset data buffer
	    BufferedBlockAlgorithm.reset.call(this);

	    // Perform concrete-hasher logic
	    this._doReset();
	  },

	  update: function (messageUpdate) {
	    if (typeof messageUpdate == 'string')
	      messageUpdate = WordArray.fromBuffer(new Buffer(messageUpdate, 'utf8'))

	    if (Buffer.isBuffer(messageUpdate))
	      messageUpdate = WordArray.fromBuffer(messageUpdate)

	    // Append
	    this._append(messageUpdate);

	    // Update the hash
	    this._process();

	    // Chainable
	    return this;
	  },

	  finalize: function (messageUpdate) {
	    if (typeof messageUpdate == 'string')
	      messageUpdate = WordArray.fromBuffer(new Buffer(messageUpdate, 'utf8'))

	    if (Buffer.isBuffer(messageUpdate))
	      messageUpdate = WordArray.fromBuffer(messageUpdate)


	    // Final message update
	    if (messageUpdate) {
	      this._append(messageUpdate);
	    }

	    // Perform concrete-hasher logic
	    var hash = this._doFinalize();

	    return hash.toBuffer()
	  },

	  blockSize: 512/32,

	  /** TODO: DELETE
	   * Creates a shortcut function to a hasher's object interface.
	   * @example
	   *
	   *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	   */
	  _createHelper: function (hasher) {
	    return function (message, cfg) {
	      return new hasher.init(cfg).finalize(message);
	    };
	  }

	});

	module.exports.Hasher = Hasher



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(6)
	var ieee754 = __webpack_require__(7)
	var isArray = __webpack_require__(8)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 7 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, process) {module.exports = WordArray

	/** An array of 32-bit words. */
	function WordArray(words, sigBytes) {
	  this.words = words || [];

	  if (sigBytes != undefined) {
	      this.sigBytes = sigBytes;
	  } else {
	      this.sigBytes = this.words.length * 4;
	  }
	}

	/**
	 * Concatenates a word array to this word array.
	 *
	 * @param {WordArray} wordArray The word array to append.
	 *
	 * @return {WordArray} This word array.
	 *
	 * @example
	 *
	 *     wordArray1.concat(wordArray2);
	 */
	WordArray.prototype.concat = function (wordArray) {
	  if (Buffer.isBuffer(wordArray))
	    wordArray = WordArray.fromBuffer(wordArray)

	        // Shortcuts
	        var thisWords = this.words;
	        var thatWords = wordArray.words;
	        var thisSigBytes = this.sigBytes;
	        var thatSigBytes = wordArray.sigBytes;

	        // Clamp excess bits
	        this.clamp();

	        // Concat
	        if (thisSigBytes % 4) {
	            // Copy one byte at a time
	            for (var i = 0; i < thatSigBytes; i++) {
	                var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	            }
	        } else if (thatWords.length > 0xffff) {
	            // Copy one word at a time
	            for (var i = 0; i < thatSigBytes; i += 4) {
	                thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	            }
	        } else {
	            // Copy all words at once
	            thisWords.push.apply(thisWords, thatWords);
	        }
	        this.sigBytes += thatSigBytes;

	        // Chainable
	        return this;
	}

	/**
	 * Removes insignificant bits.
	 *
	 */
	WordArray.prototype.clamp = function () {
	  // Shortcuts
	  var words = this.words;
	  var sigBytes = this.sigBytes;

	  // Clamp
	  words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	  words.length = Math.ceil(sigBytes / 4);
	}

	WordArray.prototype.clone = function() {
	  var wa = new WordArray(this.words.slice(0))
	  return wa
	}

	WordArray.prototype.toBuffer = function() {
	  var buf = new Buffer(this.words.length * 4)
	  for (var i = 0; i < this.words.length; ++i) {
	    var w = this.words[i]
	    buf.writeUInt32BE(w, i*4, true)
	  }
	  return buf 
	}

	WordArray.fromBuffer = function(buf) {
	  var len = buf.length
	  var dif = len % 4
	  var w = []

	  if (!process.browser) {
	    for (var i = 0; i < len; i += 4) {
	      var n = buf.readUInt32BE(i, true) 
	      w.push(n)
	    }
	    return new WordArray(w, buf.length)
	  } else { //bug in browserify / buffer
	    for (var i = 0; i < len - dif; i += 4) {
	      var n = buf.readUInt32BE(i)
	      w.push(n)
	    }
	    var lw = 0x0
	    var off = len - dif
	    for (var j = 0; j < dif; j += 1) {
	      lw |=  (buf.readUInt8(off + j) << ((3-j)*8))
	    }
	    if (dif > 0)
	      w.push(lw)
	    return new WordArray(w, buf.length)
	  } 
	}



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).Buffer, __webpack_require__(10)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var X32WordArray = __webpack_require__(9)


	function X64Word(high, low) {
	  if (!(this instanceof X64Word)) return new X64Word(high, low)
	  this.high = high
	  this.low = low
	}

	function X64WordArray (words) {
	  this.words = words || [];
	}

	/**
	 * Converts this 64-bit word array to a 32-bit word array.
	 */
	X64WordArray.prototype.toX32 = function () {
	  // Shortcuts
	  var x64Words = this.words;
	  var x64WordsLength = x64Words.length;

	  // Convert
	  var x32Words = [];
	  for (var i = 0; i < x64WordsLength; i++) {
	      var x64Word = x64Words[i];
	      x32Words.push(x64Word.high);
	      x32Words.push(x64Word.low);
	  }

	  return new X32WordArray(x32Words, this.sigBytes);
	}


	module.exports.Word = X64Word
	module.exports.WordArray = X64WordArray



/***/ },
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(17);
	module.exports = {
	  entry: [
	    './src/generator.es6.js'
	  ],
	  output: {
	    path: 'dist/',
	    filename: 'generator.js'
	  },
	  module: {
	    loaders: [
	      {
	        test: /\.es6\.js$/,
	        loader: 'babel',
	        query: {
	          presets: ['es2015']
	        }
	      }
	    ]
	  }
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }
/******/ ]);