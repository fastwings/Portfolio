window.Portfolio.Environment.Camera = function (name,width, hegiht,fov,minZoom,maxZoom) {
	var based = this;
	//its hold this data the combined camera  fov, aspect, near, far
	var aspect = width/hegiht;
	based.CameraObject = new THREE.PerspectiveCamera(
		fov,  
		aspect,
		minZoom,
		maxZoom
	);
	based.Name = name;
	based.setFov = function ( fov ) {
		based.CameraObject.setFov( fov );
	}

	based.setLens = function ( lens ) {
		based.CameraObject.setLens( lens );
	}

	based.setSize = function (width, hegiht) {
		based.CameraObject.setLens( width, hegiht );

	}
}