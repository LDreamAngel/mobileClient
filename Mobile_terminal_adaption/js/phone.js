//(function(doc, win) {
//
//	var docEl = doc.documentElement, //根元素html
//
//		//判断窗口有没有orientationchange这个方法，有就赋值给一个变量，没有就返回resize方法。
//
//		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//
//		recalc = function() {
//
//			var clientWidth = docEl.clientWidth;
//
//			if(!clientWidth) return;
//
//			//把document的fontSize大小设置成跟窗口成一定比例的大小，从而实现响应式效果。　　　　　　
//			docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
//
//		};
//
//	//alert(docEl)
//
//	if(!doc.addEventListener) return;
//
//	win.addEventListener(resizeEvt, recalc, false); //addEventListener事件方法接受三个参数：第一个是事件名称比如点击事件onclick，第二个是要执行的函数，第三个是布尔值
//
//	doc.addEventListener('DOMContentLoaded', recalc, false) //绑定浏览器缩放与加载时间
//
//})(document, window);
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                    docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
//(function(){
//	 console.log(window.orientation)
//      if (window.orientation === 180 || window.orientation === 0) {
//          //alert('竖屏状态！');
//          var htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
//          document.getElementsByTagName('html')[0].style.fontSize = htmlwidth / 7.5 / 3 + 'px';
//          window.addEventListener('resize', function() {
//              var htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
//              document.getElementsByTagName('html')[0].style.fontSize = htmlwidth / 7.5 / 3 + 'px';
//          });
//      }
//      if (window.orientation === 90 || window.orientation === -90) {
//          //alert('横屏状态！');
//          var htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
//          document.getElementsByTagName('html')[0].style.fontSize = htmlwidth / 40 + 'px';
//          window.addEventListener('resize', function() {
//              var htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
//              document.getElementsByTagName('html')[0].style.fontSize = htmlwidth / 40 + 'px';
//          });
//      }
//})()
//(function(designWidth, maxWidth) {
//	var doc = document,
//		win = window,
//		docEl = doc.documentElement,
//		remStyle = document.createElement("style"),
//		tid;
//
//	function refreshRem() {
//		var width = docEl.getBoundingClientRect().width;
//		maxWidth = maxWidth || 540;
//		width > maxWidth && (width = maxWidth);
//		var rem = width * 100 / designWidth;
//		remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
//	}
//
//	if(docEl.firstElementChild) {
//		docEl.firstElementChild.appendChild(remStyle);
//	} else {
//		var wrap = doc.createElement("div");
//		wrap.appendChild(remStyle);
//		doc.write(wrap.innerHTML);
//		wrap = null;
//	}
//	//要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
//	refreshRem();
//
//	win.addEventListener("resize", function() {
//		clearTimeout(tid); //防止执行两次
//		tid = setTimeout(refreshRem, 300);
//	}, false);
//
//	win.addEventListener("pageshow", function(e) {
//		if(e.persisted) { // 浏览器后退的时候重新计算
//			clearTimeout(tid);
//			tid = setTimeout(refreshRem, 300);
//		}
//	}, false);
//
//	if(doc.readyState === "complete") {
//		doc.body.style.fontSize = "16px";
//	} else {
//		doc.addEventListener("DOMContentLoaded", function(e) {
//			doc.body.style.fontSize = "16px";
//		}, false);
//	}
//})(750, 750);