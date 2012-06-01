window.Portfolio = {
	ConfigObject: {},
	Continers: {},
	Init: function (element) {
		var based = this;
		based.Continers.Main = element;
		Portfolio.Utills.LoadConfig("main",function(response) {
			based.ConfigObject.Main = response;
			based._initRes(
				function () {
					based._initWorld();
				}
			);
		});
	},
	Run: function (callback) {
		//will trigger render event into the object scene
		Portfolio.Continers.Main.trigger("render");
	},
	_initWorld: function () {
		var based = this;
		Portfolio.Environment.World.Init();
		Portfolio.Continers.Main.on("readyPortfolio" ,function(evt) {
			based.Run();
		})
	},
	_initRes: function (callback) {
		var based = this;
		//based._loadImages();
		//based._loadObjects();
		callback();
	}
}