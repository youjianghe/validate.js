;"use strict";
var simpleTips = {
	/*
	@msg[string],提示信息
	@time[int],停留时长，默认为3秒,
	 */
	tips : function(msg,time){
		var simpleTips = document.createElement('div'),body = document.body;
		simpleTips.setAttribute("id","simpleTips");
		simpleTips.setAttribute('style','position:fixed;z-index:10000;top: 30%;width: 260px;left: 50%;margin-left: -130px;text-align: center; background-color: #484848;border-radius:4px;color: #ffffff;font-size: 18px;line-height:22px; word-break: break-all;font-family: "Microsoft Yahei",Arial, Verdana, Helvetica, sans-serif;');
		simpleTips.innerHTML = '<p style="margin: 10px;">'+msg+'</p>';
		if (!/^[1-9][0-9]*$/.test(time)) {time = 3000;}
		body.appendChild(simpleTips);
		setTimeout(function(){
			body.removeChild(simpleTips);
		},time);
	},
	/*
	@msg[string],提示信息，必须
	@title[string],提示标题，非必须，默认为'信息'
	@fun1[object],确定按钮函数,可以为空,没有返回值或为false则自动关闭,返回值为true则需手动关闭;
	@fun2[object],取消按钮函数,其余同上
	 */
	alert : function(msg,title,fun1,fun2){
		var simpleAlert = document.createElement('div'),
			body = document.body,
			cover = document.createElement('div'),
		    title = title||"信息";
		    simpleAlert.setAttribute("id","simpleTipsAlert");
		simpleAlert.setAttribute('style','position: fixed;z-index: 10000;top: 30%;width: 320px;left: 50%;margin-left: -160px;height: auto;background-color: #FFFFFF;');
		simpleAlert.innerHTML  = 
			'<div style="padding: 0 80px 0 20px;height:42px;line-height:42px;color: #333333;font-size: 14px; border-bottom:1px solid #EEE;background-color:#F8F8F8;text-align: left;">'+title+'</div>'+
			'<div style="padding: 20px;font-size: 16px;">'+msg+'</div>'+
			'<div style="padding: 0 10px 12px 10px;text-align: right;">'+
			'<button type="button" id="rh_confirm_button" style="background-color: #2e8ded;border: none;padding: 0;height: 28px;padding: 0 15px;margin: 0 6px;font-size: 14px;color: #ffffff;font-weight: 700;border-radius: 2px;cursor:pointer;">确认</button>'+
			'<button type="button" id="rh_cancel_button" style="background-color: #2e8ded;border: none;padding: 0;height: 28px;padding: 0 15px;margin: 0 6px;font-size: 14px;color: #ffffff;font-weight: 700;border-radius: 2px;cursor:pointer;">取消</button>'+
			'</div>';
		cover.setAttribute('style','position: fixed;z-index: 9990;top: 0;left: 0;right: 0;bottom: 0; background-color: rgba(0,0,0,.3);');
		cover.setAttribute("id","simpleTipsMask");
		body.appendChild(simpleAlert);
		body.appendChild(cover);
		document.getElementById('rh_confirm_button').onclick = function(){
			simpleAlertClose(fun1)
		}
		document.getElementById('rh_cancel_button').onclick = function(){
			simpleAlertClose(fun2)
		}
		function simpleAlertClose(fun){
			if(typeof fun !== 'function'||!fun()){
				simpleTips.closeAll('alert');
			}
		}
	},
	/*
	@关闭所有弹窗，包括tips;
	@type[string]可传如下值 "tips","alert","load”，表示关闭对应类型弹窗，不填或填写其他则全部关闭
	*/
	closeAll:function(type){
		var a = document.getElementById('simpleTipsAlert'),
			s = document.getElementById('simpleTipsMask'),
			t = document.getElementById('simpleTips'),
			l = document.getElementById('simpleLoad'),
			b = document.body;
			if(type == "tips"&&t){
				b.removeChild(t);
			}else if(type == "alert"&&a&&s){
				b.removeChild(a);
				b.removeChild(s);
			}else if(type == "load"&&l){
				b.removeChild(l)
			}else{
				if(a&&s){b.removeChild(a);b.removeChild(s);}
				if(t){b.removeChild(t);}
				if(l){b.removeChild(l);}
			}
	},
	/*
	@loading 
	@msg[string]提示语
	@time[number]等待关闭时间，不填或填写非数字，则需要手动关闭
	 */
	loading:function(msg,time){
		var load = document.createElement('div');
		var msg = msg||"加载中,请稍后";
		load.setAttribute("id","simpleLoad");
		load.setAttribute("style","position: fixed;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;z-index: 10000;");
		load.innerHTML = '<div style="position: absolute;top: 50%;left: 50%; -webkit-transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%);text-align: center; ">'
						+'<img src="img/simple_loading.gif" alt="loading">'
						+'<p style="color: #666666;">'+msg+'</p>'
						+'</div>';
		document.body.appendChild(load);
		if(/^[1-9][0-9]*$/.test(time)){
			setTimeout(function(){
				document.body.removeChild(load);
			},time);
		}

	}
}