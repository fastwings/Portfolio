window.Portfolio.SceneExcption  = function (message,module,subModule) {
	this.message = message;
	_logat();
	function _logat() {
		console.info("Error Happend on Module: %s , On SubModule: %s");
		console.error(message);
	}
}
Portfolio.SceneExcption.prototype = new Error; 