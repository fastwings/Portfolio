window.Portfolio.Environment.LoaderScene = {
	CreateScene: function (name,callback) {
		var based = this;
		Portfolio.Utills.LoadSceneCompound(name,function (data, textStatus, jqxhr){
   			console.info(window.Portfolio.Utills.Sprintf("Scene %s is Loaded!",name)); //data returned
   			//run Scene
   			var scene = new Scene();
   			scene.LoadScene();
   			callback(scene);
		})
	}
}