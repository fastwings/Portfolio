var Scene = function () {
	var based = this;
	scene = new THREE.Scene();
	texture_placeholder = document.createElement( 'canvas' );
	texture_placeholder.width = 128;
	texture_placeholder.height = 128;
	texture_materials = [];
	based.ExtraData = {
		Target: new THREE.Vector3(),
		isFirstRender: true,
		isUserInteracting: false,
		onMouseDownMouseX: 0,
		onMouseDownMouseY: 0,
		lon: 0,
		lat: 0,
		phi: 0,
		theta: 0
	};

	based.LoadScene = function () {
		_loadTextures();
		_loadScene();
		_wireEvents();
	}
	function _loadTextures() {
		var context = texture_placeholder.getContext( '2d' );
		context.fillStyle = 'rgb( 200, 200, 200 )';
		context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );
		texture_materials = [
			window.Portfolio.Utills.LoadTexture(texture_placeholder, '3d/textures/sky/px.jpg' ), // right
			window.Portfolio.Utills.LoadTexture(texture_placeholder, '3d/textures/sky/nx.jpg' ), // left
			window.Portfolio.Utills.LoadTexture(texture_placeholder, '3d/textures/sky/py.jpg' ), // top
			window.Portfolio.Utills.LoadTexture(texture_placeholder, '3d/textures/sky/ny.jpg' ), // bottom
			window.Portfolio.Utills.LoadTexture(texture_placeholder, '3d/textures/sky/pz.jpg' ), // back
			window.Portfolio.Utills.LoadTexture( texture_placeholder,'3d/textures/sky/nz.jpg' ) // front
		];
	}
	function _loadScene() {
		mesh = new THREE.Mesh( new THREE.CubeGeometry( 300, 300, 300, 7, 7, 7, texture_materials ), new THREE.MeshFaceMaterial() );
		mesh.scale.x = - 1;
		scene.add( mesh );
		for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {
			var vertex = mesh.geometry.vertices[ i ];
			vertex.normalize();
			vertex.multiplyScalar( 550 );
		}
	}
	function _wireEvents() {

		Portfolio.Continers.Main.off("mousedown").on("mousedown",function (evt) {
			event.preventDefault();
			based.ExtraData.isUserInteracting = true;
			based.ExtraData.onPointerDownPointerX = event.clientX;
			based.ExtraData.onPointerDownPointerY = event.clientY;
			based.ExtraData.onPointerDownLon = based.ExtraData.lon;
			based.ExtraData.onPointerDownLat = based.ExtraData.lat;
		});

		Portfolio.Continers.Main.off("mousemove").on("mousemove",function (evt) {
				if (based.ExtraData.isUserInteracting ) {
					based.ExtraData.lon = ( based.ExtraData.onPointerDownPointerX - event.clientX ) * 0.1 + based.ExtraData.onPointerDownLon;
					based.ExtraData.lat = ( event.clientY - based.ExtraData.onPointerDownPointerY ) * 0.1 + based.ExtraData.onPointerDownLat;
					Portfolio.Continers.Main.trigger("render");
				}
		});

		Portfolio.Continers.Main.off("mouseup").on("mouseup",function (evt) {				
			based.ExtraData.isUserInteracting = false;
			Portfolio.Continers.Main.trigger("render");
		});

		//jquery event for scroll arnt so good so native will be used
		document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
		document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);
		//mobile events
		Portfolio.Continers.Main[0].addEventListener( 'touchstart', onDocumentTouchStart, false );
		Portfolio.Continers.Main[0].addEventListener( 'touchmove', onDocumentTouchMove, false );

		function onDocumentMouseWheel(event) {
				// WebKit
				if ( event.wheelDeltaY ) {
					Portfolio.Environment.World.MainCamera.CameraObject.fov -= event.wheelDeltaY * 0.05;
				// Opera / Explorer 9
				} else if ( event.wheelDelta ) {
					Portfolio.Environment.World.MainCamera.CameraObject.fov -= event.wheelDelta * 0.05;
				// Firefox
				} else if ( event.detail ) {
					Portfolio.Environment.World.MainCamera.CameraObject.fov -= event.detail * 0.05;
				}
				Portfolio.Environment.World.MainCamera.CameraObject.updateProjectionMatrix();
				Portfolio.Continers.Main.trigger("render");
		}
		
		function onDocumentTouchStart( event ) {
			if ( event.touches.length == 1 ) {
				event.preventDefault();
				based.ExtraData.onPointerDownPointerX = event.touches[ 0 ].pageX;
				based.ExtraData.onPointerDownPointerY = event.touches[ 0 ].pageY;
				based.ExtraData.onPointerDownLon = based.ExtraData.lon;
				based.ExtraData.onPointerDownLat = based.ExtraData.lat;
			}
		}

		function onDocumentTouchMove( event ) {
			if ( event.touches.length == 1 ) {
				event.preventDefault();
				based.ExtraData.lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
				based.ExtraData.lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;
				Portfolio.Continers.Main.trigger("render");
			}

		}
	}
	based.GetSceneCtx = function () { return scene; }
	based.GetTextureElement = function () { return texture_placeholder; }
	based.Render = function () {  
		if (!based.ExtraData.isFirstRender) { 
			based.ExtraData.lat = Math.max( - 85, Math.min( 85, based.ExtraData.lat ) );
			based.ExtraData.phi = ( 90 - based.ExtraData.lat ) * Math.PI / 180;
			based.ExtraData.theta = based.ExtraData.lon * Math.PI / 180;
			based.ExtraData.Target.x = 500 * Math.sin( based.ExtraData.phi ) * Math.cos( based.ExtraData.theta );
			based.ExtraData.Target.y = 500 * Math.cos( based.ExtraData.phi );
			based.ExtraData.Target.z = 500 * Math.sin( based.ExtraData.phi ) * Math.sin( based.ExtraData.theta );
			Portfolio.Environment.World.MainCamera.CameraObject.lookAt( based.ExtraData.Target );
		}
		else {
			based.ExtraData.isFirstRender = false;
		}
	}
}

