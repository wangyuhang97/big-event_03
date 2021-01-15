var url1 = 'http://api-breakingnews-web.itheima.net'
$.ajaxPrefilter(function(a) {
    a.url = url1 + a.url

})