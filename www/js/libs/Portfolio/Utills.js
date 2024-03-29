window.Portfolio.Utills = {
	LoadConfig: function (name,callback) {
		var based = this;
        $.ajax({
            url:based.Sprintf('js/libs/Portfolio/Configs/%s.json',name),
            dataType: "text", 
            contentType: "application/json; charset=utf-8",
            type: "GET",            
            data: {},
            success: function (response) {
                try {
                    data = $.parseJSON(response);
                }
                catch (err) {
                    throw Portfolio.ApplicationExcption(based.Sprintf('Config File: %s Not loaded!',name));
                }
                callback(data);
            },
            error: function (err) {
                throw Portfolio.ApplicationExcption(based.Sprintf('Config File: %s Not loaded!',name));
            }
        });
	},
	LoadSceneCompound: function (name,callback) {
		var based = this;
        $.ajax({
            url:based.Sprintf('js/libs/Portfolio/Evniermant/Scenes/%s.scene.js',name),
            dataType: "script", 
            contentType: "application/json; charset=utf-8",
            type: "GET",            
            data: {},
            success: function (response) {
                callback(response);
            },
            error: function () {
                throw Portfolio.SceneExcption(based.Sprintf('Scene File: %s Not loaded!',name))
            }
        });
	},

	LoadTexture: function ( texture_placeholder,path ) {
		var texture = new THREE.Texture( texture_placeholder );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );
		var image = new Image();
		image.onload = function () {
			texture.needsUpdate = true;
			material.map.image = this;
		};
		image.src = path;

		return material;

	},
    Sprintf: function () {
        if (!arguments || arguments.length < 1 || !RegExp) {
            return;
        }
        var str = arguments[0];
        var re = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/;
        var a = b = [], numSubstitutions = 0, numMatches = 0;
        while (a = re.exec(str)) {
            var leftpart = a[1], pPad = a[2], pJustify = a[3], pMinLength = a[4];
            var pPrecision = a[5], pType = a[6], rightPart = a[7];
            //alert(a + '\n' + [a[0], leftpart, pPad, pJustify, pMinLength, pPrecision);
            numMatches++;
            if (pType == '%') {
                subst = '%';
            }
            else {
                numSubstitutions++;
                if (numSubstitutions >= arguments.length) {
                    alert('Error! Not enough function arguments (' + (arguments.length - 1) + ', excluding the string)\nfor the number of substitution parameters in string (' + numSubstitutions + ' so far).');
                }
                var param = arguments[numSubstitutions];
                var pad = '';
                if (pPad && pPad.substr(0, 1) == "'") pad = leftpart.substr(1, 1);
                else if (pPad) pad = pPad;
                var justifyRight = true;
                if (pJustify && pJustify === "-") justifyRight = false;
                var minLength = -1;
                if (pMinLength) minLength = parseInt(pMinLength);
                var precision = -1;
                if (pPrecision && pType == 'f') precision = parseInt(pPrecision.substring(1));
                var subst = param;
                if (pType == 'b') subst = parseInt(param).toString(2);
                else if (pType == 'c') subst = String.fromCharCode(parseInt(param));
                else if (pType == 'd') subst = parseInt(param) ? parseInt(param) : 0;
                else if (pType == 'u') subst = Math.abs(param);
                else if (pType == 'f') subst = (precision > -1) ? Math.round(parseFloat(param) * Math.pow(10, precision)) / Math.pow(10, precision) : parseFloat(param);
                else if (pType == 'o') subst = parseInt(param).toString(8);
                else if (pType == 's') subst = param;
                else if (pType == 'x') subst = ('' + parseInt(param).toString(16)).toLowerCase();
                else if (pType == 'X') subst = ('' + parseInt(param).toString(16)).toUpperCase();
            }
            str = leftpart + subst + rightPart;
        }
        return str;
    }
}