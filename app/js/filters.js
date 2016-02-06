var appFilters = angular.module('appFilters', []);

appFilters.filter('filterProfiles', function($sce) {
	return function(text) {
		var str = "";
		for(var x in text) {
			if(text[x] == '@') {
				var index1 = x;
			}
			else if(index1 && text[x] == ' ') {
				str = str + "<a href='https://github.com/" + text.substring(index1, x).substring(1, text.substring(index1, x).length) + "'>" + text.substring(index1, x) +"</a> ";
				var index1 = undefined;
			}
			else if(!index1){
				str = str + text[x];
			}
		}
		return $sce.trustAsHtml(str); /** .match(/@\S+/) */
	}
})

appFilters.filter('unsafe', function($sce) { return $sce.trustAsHtml; });