bby = {};
bby.config = {
	// sendpoint_url:"http://192.168.8.174/send"
};

bby.start = function(){
	document.addEventListener("click", function(e){
		var params = {};
		params.x = e.clientX;
		params.y = e.clientY;
        params.url = window.location.href;
		bby.jsonp(bby.config.sendpoint_url, params);
	});
}

bby.queryString = function(params){
	var query = [];
	for(var key in params){
		query.push(key + "=" + params[key]);
	}
	return query.join("&");
}

bby.jsonp = function(url, params){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url  + "?" + bby.queryString(params);
	document.head.appendChild(script);	
}

bby.init = function(options){
  url = options.url;
  if(url[url.length-1] != '/')
  {
    url += '/';
  }
  sendUrl = url + 'send';
  bby.config.sendpoint_url = sendUrl;
  bby.start();
}
