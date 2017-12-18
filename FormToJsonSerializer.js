function serializeFormToJsonString(form) {
	var obj = {};
	var elements = $(form).find("input, select, textarea");
	for (var i = 0; i < elements.length; ++i) {
		var element = elements[i];
		var name = element.name;
		var value = element.value;

		if (name) {
			if (name.indexOf(".id") === -1) {
				obj[name] = value;
			} else {
				var names = name.split(".");
				var childObject = {};
				childObject["id"] = value;
				obj[names[0]] = childObject;
			}

		}
	}

	return JSON.stringify(obj);
}

function deserializeJsonStringToForm(jsonString, form) {
	var jsonData = JSON.parse(jsonString);

	for ( var key in jsonData) {
		if (typeof jsonData[key] === 'object') {
			$(form).find('[name="' + key + '.id"]').val(jsonData[key].id);
		} else {
			$(form).find('[name="' + key + '"]').val(jsonData[key]);
		}
	}
}