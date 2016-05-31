var Cookie = {
    TOKEN: 'cookie.token',
    USERNAME: 'cookie.username',
    THEME: 'cookie.theme'
};

var RequestHeader = {
    TOKEN: 'X-Token',
    USERNAME: 'X-Username'
};

var Ajax = {
    get: function (options) {
        $.ajax({
            url: options.url,
            type: 'GET',
            contentType : 'application/json',
            success: options.success,
            error: options.error
        });
    },
    post: function (options) {
        $.ajax({
            url: options.url,
            type: 'POST',
            contentType : 'application/json',
            data: JSON.stringify(options.data),
            beforeSend: options.beforeSend,
            success: options.success,
            error: options.error
        });
    },
    postForm: function (options) {
        $.ajax({
            url: options.url,
            type: 'POST',
            contentType : 'application/x-www-form-urlencoded',
            data: options.data,
            beforeSend: options.beforeSend,
            success: options.success,
            error: options.error
        });
    },
    put: function (options) {
        $.ajax({
            url: options.url,
            type: 'PUT',
            contentType : 'application/json',
            data: JSON.stringify(options.data),
            beforeSend: options.beforeSend,
            success: options.success,
            error: options.error
        });
    },
    delete: function (options) {
        $.ajax({
            url: options.url,
            type: 'DELETE',
            contentType : 'application/json',
            beforeSend: options.beforeSend,
            success: options.success,
            error: options.error
        });
    }
};

var init = {
	//初始化所有的data-source-url
	setupUrl:function(api){
		var doms = $('[data-source-url]');
		$.each(doms,function(i,v){
			var url =api+$(v).attr('data-source-url')+'&_='+new Date().getTime()+i;
			$(v).attr('src',url);
			$(v).on('click',function(){
				var url =api+$(this).attr('data-source-url')+'&_='+new Date().getTime()+i;
				$(this).attr('src',url);
			});
		})
	}
}

;(function(w,$){
	//
})(window,jQuery)