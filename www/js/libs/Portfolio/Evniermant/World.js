window.Portfolio.Environment || (window.Portfolio.Environment = {});
window.Portfolio.Environment.World = {
	MainCamera: null,
	Scene: null,
	RenderCtx: null,
	Init: function () {
		var based = this;
		Portfolio.Environment.LoaderScene.CreateScene('Main',function (sceneCtx) {
			based.MainCamera = new Portfolio.Environment.Camera (
				"MainCam", 
				(Portfolio.ConfigObject.Main.Canvas.World.CameraMain.Width != -1)?Portfolio.ConfigObject.Main.Canvas.World.CameraMain.Width:window.innerWidth/2, 
				(Portfolio.ConfigObject.Main.Canvas.World.CameraMain.Height != -1)?Portfolio.ConfigObject.Main.Canvas.World.CameraMain.Height:window.innerHeight/2, 
				Portfolio.ConfigObject.Main.Canvas.World.CameraMain.Fov,
				Portfolio.ConfigObject.Main.Canvas.World.CameraMain.MinZoom,
				Portfolio.ConfigObject.Main.Canvas.World.CameraMain.MaxZoom
			);
			based.Scene = sceneCtx;
			var worldWidth = (Portfolio.ConfigObject.Main.Canvas.World.Width != -1)?Portfolio.ConfigObject.Main.Canvas.World.Width:window.innerWidth;
			var worldHeight = (Portfolio.ConfigObject.Main.Canvas.World.Height != -1)?Portfolio.ConfigObject.Main.Canvas.World.Height:window.innerHeight;
			//based.MainCamera.CameraObject.aspect =worldWidth /worldHeight
			based.Scene.GetSceneCtx().add(based.MainCamera.CameraObject);
			based.RenderCtx = new THREE.WebGLRenderer( { antialias: true } );
			based.RenderCtx.setSize(
				worldWidth,
				worldHeight
			);
			based.MainCamera.CameraObject.updateProjectionMatrix();
			based.LoadWorld();
		});
	},
	LoadWorld: function () {
		var based = this;
		Portfolio.Continers.Main.html(based.RenderCtx.domElement);
		Portfolio.Continers.Main.on("render" , function (evt) { 
			based.Render(); 
		});
		Portfolio.Continers.Main.trigger("readyPortfolio");
	},
	Render: function () {
		var based = this;
		based.Scene.Render();
		based.RenderCtx.render( based.Scene.GetSceneCtx(), based.MainCamera.CameraObject );
	}
}