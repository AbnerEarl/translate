/**
 * 淇℃伅鎻愰啋锛屼笉渚濊禆浠讳綍涔变竷鍏碂妗嗘灦鍙婂叾浠栨枃浠讹紝瀵煎叆 msg.js 锛宮sg.info('鍝堝搱鍝�') 涓€鍙ヤ唬鐮佷娇鐢紒
 * 浣滆€咃細绠￠浄楦�
 * 涓汉缃戠珯锛歸ww.guanleiming.com
 * 涓汉寰俊: xnx3com
 * 鍏徃锛氭綅鍧婇浄楦ｄ簯缃戠粶绉戞妧鏈夐檺鍏徃
 * 鍏徃瀹樼綉锛歸ww.leimingyun.com
 */
 var msg = {
	/*
	 * 褰撳墠msg鐨勭増鏈�
	 */
	version:1.10,
	/*
	 * 閿欒鐨勫浘
	 */
	errorIcon:'<svg style="width: 3rem; height:3rem; padding: 1.5rem; padding-bottom: 1.1rem; box-sizing: content-box;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6977"><path d="M696.832 326.656c-12.8-12.8-33.28-12.8-46.08 0L512 465.92 373.248 327.168c-12.8-12.8-33.28-12.8-46.08 0s-12.8 33.28 0 46.08L466.432 512l-139.264 139.264c-12.8 12.8-12.8 33.28 0 46.08s33.28 12.8 46.08 0L512 558.08l138.752 139.264c12.288 12.8 32.768 12.8 45.568 0.512l0.512-0.512c12.8-12.8 12.8-33.28 0-45.568L557.568 512l139.264-139.264c12.8-12.8 12.8-33.28 0-46.08 0 0.512 0 0 0 0zM512 51.2c-254.464 0-460.8 206.336-460.8 460.8s206.336 460.8 460.8 460.8 460.8-206.336 460.8-460.8-206.336-460.8-460.8-460.8z m280.064 740.864c-74.24 74.24-175.104 116.224-280.064 115.712-104.96 0-205.824-41.472-280.064-115.712S115.712 616.96 115.712 512s41.472-205.824 116.224-280.064C306.176 157.696 407.04 115.712 512 116.224c104.96 0 205.824 41.472 280.064 116.224 74.24 74.24 116.224 175.104 115.712 280.064 0.512 104.448-41.472 205.312-115.712 279.552z" fill="#ffffff" p-id="6978"></path></svg>',
	/*
	 * 褰撳墠寮瑰嚭绐楀彛鏄剧ず鐨刬d銆傛瘡娆″脊鍑虹獥鍙ｉ兘浼氱敓鎴愪竴涓殢鏈篿d
	 */
	currentWindowsId:0,	
	/*
	 * 寮瑰嚭灞傜殑div id鐩稿叧 
	 */
	id:{
		/*
		 * 寮瑰嚭灞� div id 鐨勯殢鏈哄懡鍚嶆暟缁勩€傝繖閲屽瓨鐨勬槸绮剧‘鍒版绉掔殑鏃堕棿鎴炽€� 姣斿鍛藉悕鏃朵細閲囩敤 wangmarket_loading + 姝ゅid鏃堕棿鎴� 鐨勬柟寮�
		 */
		idArray	: new Array(),
		/*
		 * 浠庢暟缁勪腑澧炲姞涓€涓€硷紝杩欎釜鍊煎鍔犲埌鏁扮粍鏈€鍚庯紝骞跺皢澧炲姞鐨勫€艰繑鍥�
		 */
		create:function(){
			//鍒涘缓涓€涓殢鏈篿d
			var thisId = new Date().getTime()+'';
			//灏嗛殢鏈篿d鍔犲叆寮圭獥id搴忓垪
			msg.id.idArray[msg.id.idArray.length] = thisId;
			
			return thisId;
		},
		/*
		 * 浠庢暟缁勪腑鍒犻櫎鍊笺€傚苟灏嗗垹闄ょ殑鍊艰繑鍥炪€�
		 * id 瑕佸垹闄ょ殑value銆傚鏋滀笉浼犲叆锛岄偅榛樿鍒犻櫎鏈€鍚庝竴涓�
		 */
		delete:function(id = ''){
			var thisId = '';
			if(id == ''){
				//鍙栧嚭鏁扮粍鏈€鍚庝竴涓€�
				thisId = msg.id.idArray[msg.id.idArray.length-1];
				//鍒犻櫎鏁扮粍鏈€鍚庝竴涓€�
				msg.id.idArray.pop();
			}else{
				thisId = id;
				
				//鍒犻櫎鎸囧畾鐨刬d
				for(var i = 0; i<msg.id.idArray.length; i++){ 
					if(msg.id.idArray[i] == id){
						msg.id.idArray.splice(i,1);	//鍒犻櫎杩欎釜鍏冪礌
						return id; 
					}
				}
			}
			
			return thisId;
		},
		/*
		 * 杩欓噷灏卞彧鏄崟绾瓨鏀� info\success\failure 杩欎笁涓紝鍏嶅緱鍚屾椂鐐逛簡鍑犱釜鍚庝笉鑷姩鍙栨秷鐨刡ug
		 */
		tishiIdArray: new Array()
	},
	
	/**
	 * 鎴愬姛鐨勬彁閱�
	 * @param text 鎻愮ず鏂囧瓧
	 * @param func 鍏抽棴鎻愮ず鍚庯紝瑕佹墽琛岀殑鏂规硶
	 */
	success:function(text,func){
		this.closeAllSimpleMsg();
		
		var thisId = this.show(text, '<svg style="width: 3rem; height:3rem; padding: 1.5rem; padding-bottom: 1.1rem; box-sizing: content-box;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2351"><path d="M384 887.456L25.6 529.056 145.056 409.6 384 648.544 878.944 153.6 998.4 273.056z" p-id="2352" fill="#ffffff"></path></svg>');
		msg.id.tishiIdArray[msg.id.tishiIdArray.length] = thisId;
		this.delayClose(1800, func, thisId);
		return thisId;
	},

	/**
	 * 鑾峰彇鍏冪礌璺濈body璺濈
	 * @param {*} element 
	 * @returns 
	 */
	getElementDistanceToTop: function (element) {
		var rect = element.getBoundingClientRect();
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return rect.top + scrollTop;
	},

	/**
	 * 鏄剧ずtips鎻愮ず绐楀彛
	 * @param options 鍙傛暟(id銆乼ext銆乼ip瀹藉害銆侀珮搴︺€佽儗鏅壊銆佸瓧浣撹壊銆佹樉绀烘柟鍚慸irection)
	 * @return 杩斿洖寮瑰嚭灞傜殑id銆傚彲浠ヤ娇鐢� msg.close(id) 鏉ュ叧闂寚瀹氱殑寮瑰嚭灞�
	 */
	showTips:function(options){
		// 鑾峰彇鍏冪礌
		var dom = document.getElementById(options.id);

		var rect=dom.getBoundingClientRect()
		// console.log(rect)

		// 鑾峰彇鍏冪礌璺濈涓婃柟鐨勮窛绂�
		var topDistance=this.getElementDistanceToTop(dom)
		// 鑾峰彇鍏冪礌璺濈宸︿晶鐨勮窛绂�
			, leftDistance =rect.x
		// 鑾峰彇鍏冪礌瀹藉害
		,widthDom = dom.offsetWidth
		// 鑾峰彇鍏冪礌楂樺害
		,heightDom = dom.offsetHeight
		// 鑾峰彇瑙嗗彛鐨勯珮搴﹀拰瀹藉害
		,windowHeight = window.innerHeight
		,windowWidth = window.innerWidth
		// 璁＄畻鍏冪礌璺濈涓嬫柟鐨勮窛绂�
		,bottomDistance = windowHeight - topDistance - dom.offsetHeight
		// 璁＄畻鍏冪礌璺濈鍙充晶鐨勮窛绂�
		,rightDistance = windowWidth - leftDistance - widthDom;

		// console.log("璺濈涓婃柟鐨勮窛绂伙細" + topDistance);
		// console.log("璺濈涓嬫柟鐨勮窛绂伙細" + bottomDistance);
		// console.log("璺濈宸︿晶鐨勮窛绂伙細" + leftDistance);
		// console.log("璺濈鍙充晶鐨勮窛绂伙細" + rightDistance);

		// 鎻愮ず妗嗙鍐呭鐨勮窛绂�
		const specd="20px"
		// 榛樿鑳屾櫙鑹�#10a6a8
		// const bg_color="rgba(46, 196, 182, 0.75)";
		,background="#10a6a8"
		// 榛樿棰滆壊
		,color="#FFFFFF"
		// 榛樿瀹藉害
		,width="200px"
		// 榛樿楂樺害
		,height="auto"
		//榛樿鏂瑰悜
		,direction="right";

		if(!options.background) options.background=background;
		if(!options.color) options.color=color;
		if(!options.width) options.width=width;
		if(!options.height) options.height=height;
		if(!options.direction) options.direction=direction;

		// console.log(options)

		if(options.direction!=="left" && options.direction!=="right"&&options.direction!=="top"&&options.direction!=="bottom") return console.log("璇疯緭鍏ユ纭殑tips鏂瑰悜")
	
		//鍒涘缓涓€涓殢鏈篿d
		var thisId = msg.id.create();
		
		/** 鏄剧ず鍓嶏紝濡傛灉杩樻湁鍏朵粬姝ｅ湪鏄剧ず鐨勶紝灏嗗叾閮藉叧鎺� **/
		//this.close();
		if(document.getElementsByTagName("body") != null && document.getElementsByTagName("body").length > 0 && dom instanceof Element){
			var div=document.createElement("div");
			div.id = 'wangmarket_popup_'+thisId;

			div.style = `position:absolute;padding:10px;border-radius:2px;
				${options.direction == "left" || options.direction == "right" ? `top: ${topDistance}px;`:""}
				${options.direction == "left" ? `right: calc(${rightDistance}px + ${widthDom}px + ${parseInt(specd)/2}px);`:""}
				${options.direction == "right" ? `left: calc(${leftDistance}px + ${widthDom}px + ${parseInt(specd) / 2}px);`:""}

				${options.direction == "top" || options.direction == "bottom" ? `left:${leftDistance}px;`:""}
				${options.direction == "top" ? `bottom: calc(${bottomDistance}px + ${heightDom}px + ${parseInt(specd) / 2}px);`:""}
				${options.direction == "bottom" ? `top: calc(${topDistance}px + ${heightDom}px + ${parseInt(specd) / 2}px);`:""}
				background:${options.background};
				z-index: 2147483647;width: ${options.width};
				box-shadow: 0px 3px 10px 0px rgba(143, 140, 140, 0.31);
				height:${options.height};box-sizing:border-box`;

			// 娣诲姞涓€涓垵濮嬫牱寮忥紝浣垮垱寤虹殑鍏冪礌鍦ㄥ垵濮嬫椂缂╂斁涓�0
			div.style.transform = "scale(0.8)";
			// 娣诲姞杩囨浮鏁堟灉
			div.style.transition = "transform 0.1s ease-in-out";
			div.innerHTML = ''
				+ `<div id="tip" style="font-size:12px;line-height:18px;text-align:left;color:${options.color};white-space: initial">`+
				options.text
				+'</div>';

			div.classList.add('_custom_deng');
			var pseudoElementStyle = `
				content: " ";
			    position: absolute;
				${options.direction=="left"||options.direction=="right"?"top: 13px;":""}
				${options.direction=="top"||options.direction=="bottom"?"left: 10%;":""}
			    ${options.direction}: 100%;
			    border: ${parseInt(specd)/4}px solid transparent;
				border-${options.direction}: ${parseInt(specd)/2}px solid ${options.background};
			`;
			// console.log(this.flag)
			var existingStyle = document.getElementById("_custom_deng_style");

			if (!existingStyle) {
				var styleSheet = document.createElement("style");
				styleSheet.type = "text/css";
				styleSheet.id = "_custom_deng_style";
				styleSheet.innerText = `._custom_deng::before { ${pseudoElementStyle} }`;
				document.head.appendChild(styleSheet);
			} else {
				existingStyle.innerText = `._custom_deng::before { ${pseudoElementStyle} }`;
			}
	
			// 瑙﹀彂缂╂斁鍔ㄧ敾鏁堟灉
			setTimeout(function () {
				div.style.transform = "scale(1)"; // 缂╂斁涓�1锛屾樉绀哄姩鐢绘晥鏋�
			}, 10);

			document.body.appendChild(div);
			
		}else{
			alert('鎻愮ず锛宐ody涓病鏈夊瓙鍏冪礌锛屾棤娉曟樉绀� msg.js 鐨勬彁绀�');
		}
		// 瑙﹀彂鍔ㄧ敾
		return thisId;
	},


	/**
	 * 榧犳爣璺熼殢鎻愮ず
	 * @param options 寮瑰嚭灞傜殑鍏朵粬灞炴€с€備紶鍏ュ锛� 
	 * 		<pre>
	 * 			{
	 * 				id:'鍏冪礌灞炴€d鍊�'銆�   //瑕佹樉绀烘枃瀛楁彁绀虹殑鍏冪礌灞炴€d銆�	****蹇呬紶椤�****
	 * 				text:'鎻愮ず鐨勬枃瀛楀唴瀹�',	//鏄剧ず鐨勫唴瀹癸紝鏀寔html銆�		****蹇呬紶椤�****
	 * 				direction:'right',	//寮瑰嚭灞傝鏄剧ず鐨勬柟浣嶃€備笉浼犻粯璁� right銆備紶鍏ュ left銆乺ight銆乼op銆乥ottom銆�
	 *				height:'auto',		//寮瑰嚭灞傛樉绀虹殑楂樺害銆備笉浼犻粯璁ゆ槸 auto銆� 浼犲叆濡� 100px 銆� 10rem 绛夈€備笉鑳戒娇鐢�%鐧惧垎姣斻€�
	 *				width:'200px',		//寮瑰嚭灞傛樉绀虹殑瀹藉害銆備笉浼犻粯璁ゆ槸 200px銆備紶鍏ュ 100px 銆� 10rem 銆� 50% 绛夈€�
	 *				background:'#10a6a8'//鑳屾櫙棰滆壊銆傚崄鍏繘鍒堕鑹茬紪鐮併€備笉浼犻粯璁ゆ槸 '#10a6a8'
	 *				color:'#FFFFFF'		//瀛椾綋棰滆壊銆傚崄鍏繘鍒堕鑹茬紪鐮併€備笉浼犻粯璁ゆ槸 '#FFFFFF'
	 *			}
	 * 		</pre>
	 * @return 杩斿洖寮瑰嚭灞傜殑id銆傚彲浠ヤ娇鐢� msg.close(id) 鏉ュ叧闂寚瀹氱殑寮瑰嚭灞�
	 */
	tip:function(options){
		if(!options||!options.id||!options.text) return console.log("msg.tip()鏂规硶涓浼犲叆鍩烘湰鐨勯€夐」(鍖呮嫭id鍜屾樉绀烘枃鏈�)")
		var dom=document.getElementById(options.id)
		if(!dom) return
		var thisId
		//mouseover mouseout
		//mouseenter mouseleave 闃叉鍐呴儴瀛愬厓绱犺Е鍙�
		dom.addEventListener("mouseenter",(event)=>{
			event.stopPropagation()
			this.closeAllSimpleMsg();
			thisId = this.showTips(options);
	  	msg.id.tishiIdArray[msg.id.tishiIdArray.length] = thisId;
		})
		dom.addEventListener("mouseleave",()=>{
			this.close(thisId)
		})
		return thisId;
	},


	/**
	 * 澶辫触銆侀敊璇殑鎻愰啋
	 * @param text 鎻愮ず鏂囧瓧
	 * @param func 鍏抽棴鎻愮ず鍚庯紝瑕佹墽琛岀殑鏂规硶
	 */
	failure:function(text, func){
		this.closeAllSimpleMsg();
		
		var thisId = this.show(text, this.errorIcon);
		msg.id.tishiIdArray[msg.id.tishiIdArray.length] = thisId;
		this.delayClose(1800, func, thisId);
		return thisId;
	},
	/**
	 * 鎻愮ず淇℃伅
	 * @param text 鎻愮ず鏂囧瓧
	 * @param func 鍏抽棴鎻愮ず鍚庯紝瑕佹墽琛岀殑鏂规硶
	 */
	info:function(text, func){
		this.closeAllSimpleMsg();
		
		var thisId = this.show(text, '<svg style="width: 3rem; height:3rem; padding: 1.5rem; padding-bottom: 1.1rem; box-sizing: content-box;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7996"><path d="M509.979 959.316c-247.308 0-447.794-200.486-447.794-447.794S262.671 63.728 509.979 63.728s447.794 200.486 447.794 447.794-200.485 447.794-447.794 447.794z m0-814.171c-202.346 0-366.377 164.031-366.377 366.377s164.031 366.377 366.377 366.377c202.342 0 366.377-164.031 366.377-366.377S712.321 145.145 509.979 145.145z m-40.708 610.628c-40.709 0-40.709-40.708-40.709-40.708l40.709-203.543s0-40.709-40.709-40.709c0 0-40.709 0-40.709-40.709h122.126s40.709 0 40.709 40.709-40.709 162.834-40.709 203.543 40.709 40.709 40.709 40.709h40.709c-0.001 0-0.001 40.708-122.126 40.708z m81.417-407.085c-22.483 0-40.709-18.225-40.709-40.709s18.225-40.709 40.709-40.709 40.709 18.225 40.709 40.709-18.226 40.709-40.709 40.709z" p-id="7997" fill="#ffffff"></path></svg>');
		msg.id.tishiIdArray[msg.id.tishiIdArray.length] = thisId;
		this.delayClose(1800, func, thisId);
		return thisId;
	},
	
	/**
	 * 鍏抽棴info銆乻uccess銆乫ailure 杩欏嚑涓殑鎵€鏈夋彁绀烘秷鎭�
	 */
	closeAllSimpleMsg:function(){
		for(var i = 0; i<msg.id.tishiIdArray.length; i++){
			msg.close(msg.id.tishiIdArray[i]);
		}
	},
	
	/**
	 * 寮瑰嚭璇㈤棶閫夋嫨妗嗭細纭畾銆佸彇娑�
	 */
	confirm:function(text){
		return confirm(text);
	},
	/**
	 * 鍔犺浇涓€佺瓑寰呬腑鐨勫姩鐢绘晥鏋�
	 * @param text 鎻愮ず鏂囧瓧
	 */
	loading:function(text){
		this.show(text, '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjlGOUY5Ij4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoNDUgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjEyNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoOTAgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjI1cyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgxMzUgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjM3NXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC41cyIga2V5U3BsaW5lcz0iMC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjgiIGNhbGNNb2RlPSJzcGxpbmUiIC8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSB0cmFuc2Zvcm09InJvdGF0ZSgyMjUgMTYgMTYpIiBjeD0iMTYiIGN5PSIzIiByPSIwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMDszOzA7MCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjYyNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMjcwIDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC43NXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgdHJhbnNmb3JtPSJyb3RhdGUoMzE1IDE2IDE2KSIgY3g9IjE2IiBjeT0iMyIgcj0iMCI+CiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjA7MzswOzAiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC44NzVzIiBrZXlTcGxpbmVzPSIwLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44OzAuMiAwLjIgMC40IDAuOCIgY2FsY01vZGU9InNwbGluZSIgLz4KICA8L2NpcmNsZT4KICA8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKDE4MCAxNiAxNikiIGN4PSIxNiIgY3k9IjMiIHI9IjAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIwOzM7MDswIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuNXMiIGtleVNwbGluZXM9IjAuMiAwLjIgMC40IDAuODswLjIgMC4yIDAuNCAwLjg7MC4yIDAuMiAwLjQgMC44IiBjYWxjTW9kZT0ic3BsaW5lIiAvPgogIDwvY2lyY2xlPgo8L3N2Zz4K" style="width: 3rem; height:3rem; padding: 1.5rem; padding-bottom: 1.1rem; box-sizing: content-box;" />');
	},
	/**
	 * 鍏抽棴鍚勭鎻愮ず锛屽寘鎷姞杞戒腑銆佹垚鍔熴€佸け璐ャ€佹彁绀轰俊鎭瓑锛岄兘鍙互鐢ㄦ寮哄埗鍏抽棴
	 * id 寮瑰嚭灞傜殑id銆傛甯镐娇鐢ㄦ棤闇€浼犲叆 銆傝繖閲屼紶鍏ョ殑鏄� msg.id.idArray 涓殑鏌愪釜鍊�
	 */
	close:function(id = ''){
		this.currentWindowsId = 0;	//褰撳墠娌℃湁浠讳綍绐楀彛
		//鍙栧嚭鏁扮粍鐨勫€�
		var thisId = msg.id.delete(id);
		
		var loadingDiv = document.getElementById('wangmarket_popup_'+thisId);
		if(loadingDiv != null){
			var loadingDivParent = loadingDiv.parentNode;
			if(loadingDivParent != null){
				loadingDivParent.removeChild(loadingDiv);
			}
		}
		
		//鍏抽棴pupups鐩稿叧
		//var popupsDiv = document.getElementById('wangmarket_popups')
		//if(popupsDiv != null){
		//	var popupsDivParent = popupsDiv.parentNode;
		//	if(popupsDivParent != null){
		//		popupsDivParent.removeChild(popupsDiv);
		//	}
		//}
	},
	/**
	 * 寤惰繜鍑犵鍚庡叧闂脊鍑烘彁绀�
	 * @param time 寤惰繜澶氶暱鏃堕棿锛屽崟浣嶆槸姣
	 * @param func 鍏抽棴鎻愮ず鍚庯紝瑕佹墽琛岀殑鏂规硶
	 * @param id 寮瑰嚭绐楀彛鐨刬d
	 */
	delayClose: function(time, func, id=''){
		var cid = parseInt(Math.random()*100000);
		this.currentWindowsId = cid;
		var that = this;
		setTimeout(function(){
			if(that.currentWindowsId == cid){
				/* 鑳藉搴旇捣鏉ワ紝鎵嶄細鍏抽棴銆傞伩鍏嶅叧闂埆鐨勫垰鏄剧ず鐨勭獥鍙� */
				msg.close(id);
			}
			if(func != null){
				func();
			}
		},time);
	},
	/**
	 * 鏄剧ず鎻愮ず绐楀彛锛岀鏈夋柟娉�
	 * text 鎻愮ず鏂囧瓧
	 * img 鏄剧ず鐨勫浘鐗囨垨鑰卻vg
	 * @return 杩斿洖寮瑰嚭灞傜殑id銆傚彲浠ヤ娇鐢� msg.close(id) 鏉ュ叧闂寚瀹氱殑寮瑰嚭灞�
	 */
	show:function(text, img){
		/** 鏄惁鏄í鍚戞樉绀� **/
		var wangmarket_loading_hengxiang = false;
		if(text != null && text.length > 10){
			wangmarket_loading_hengxiang = true;
		}
		
		//鍒涘缓涓€涓殢鏈篿d
		var thisId = msg.id.create();
		
		/** 鏄剧ず鍓嶏紝濡傛灉杩樻湁鍏朵粬姝ｅ湪鏄剧ず鐨勶紝灏嗗叾閮藉叧鎺� **/
		//this.close();
		if(document.getElementsByTagName("body") != null && document.getElementsByTagName("body").length > 0){
			var div=document.createElement("div");
			div.id = 'wangmarket_popup_'+thisId;
			div.style = 'position: fixed;z-index: 2147483647;margin: 0 auto;text-align: center;width: 100%;';
			div.innerHTML = ''
				+'<div id="loading" style="position: fixed;top: 30%;text-align: center;font-size: 1rem;color: #dedede;margin: 0px auto;left: 50%;margin-left: -'+(wangmarket_loading_hengxiang? '9':'3.5')+'rem;">'
				+'<div style="width: 7rem;background-color: #2e2d3c;border-radius: 0.3rem; filter: alpha(Opacity=80); -moz-opacity: 0.8; opacity: 0.8; min-height: 4.8rem;'+(wangmarket_loading_hengxiang? 'width: 18rem;':'')+'">'
				+'<div'+(wangmarket_loading_hengxiang? ' style="float:left;height: 20rem; margin-top: -0.6rem; position: fixed;"':'')+'>'+img+'</div>'
				+'<div style="width: 100%;padding-bottom: 1.4rem; font-size: 1.1rem; padding-left: 0.3rem;padding-right: 0.3rem; box-sizing: border-box;line-height: 1.2rem;color: white;'+(wangmarket_loading_hengxiang? 'padding: 1rem; text-align: left; padding-right: 0.3rem; line-height: 1.5rem;margin-left: 4.8rem; padding-right: 5.5rem; padding-top: 0.7rem;':'')+'">'+text+'</div>'
				+'</div>';
				+'</div>';
			document.getElementsByTagName("body")[0].appendChild(div);
		}else{
			alert('鎻愮ず锛宐ody涓病鏈夊瓙鍏冪礌锛屾棤娉曟樉绀� msg.js 鐨勬彁绀�');
		}
		
		return thisId;
	},
	/**
	 * 寮瑰嚭灞傦紝寮瑰嚭绐楀彛
	 * @param attribute 寮瑰嚭灞傜殑鍏朵粬灞炴€с€備紶鍏ュ锛� 
	 * 		<pre>
	 * 			{
	 * 				text:'寮圭獥鐨勫唴瀹�',	//寮瑰嚭绐楁樉绀虹殑鍐呭锛屾敮鎸乭tml
	 * 				url:'https://blog.csdn.net/u014374009?type=blog' //璁剧疆寮瑰嚭绐楀彛瑕佹墦寮€鐨勭綉鍧€锛屽鏋渦rl璺焧ext鍚屾椂璁剧疆锛岄偅涔堜紭鍏堥噰鐢╱rl锛� text璁剧疆灏嗘棤鏁�
	 *				top:'30%',			//寮瑰嚭灞傝窛绂婚《閮ㄧ殑璺濈锛屼笉浼犻粯璁ゆ槸30%銆� 鍙互浼犲叆濡� 30%銆� 5rem銆� 10px 绛�
	 *				left:'5%',			//寮瑰嚭灞傝窛绂绘祻瑙堝櫒宸︿晶鐨勮窛绂伙紝涓嶄紶榛樿鏄�5%
	 *				height:'100px',		//寮瑰嚭灞傛樉绀虹殑楂樺害銆備笉浼犻粯璁ゆ槸 auto銆� 浼犲叆濡� 100px 銆� 10rem 绛夈€備笉鑳戒娇鐢�%鐧惧垎姣斻€�
	 *				width:'90%',		//寮瑰嚭灞傛樉绀虹殑瀹藉害銆備笉浼犻粯璁ゆ槸 90%銆備紶鍏ュ 100px 銆� 10rem 銆� 50% 绛夈€�
	 *				bottom:'1rem',		//寮瑰嚭灞傝窛绂诲簳閮ㄧ殑璺濈銆備笉浼犻粯璁ゆ槸 auto 銆� height 璺� bottom 濡傛灉杩欎袱涓悓鏃惰缃簡锛岄偅涔坔eight鐢熸晥锛宐ottom鏄笉鐢熸晥鐨�
	 *				close:false			//鏄惁鏄剧ず鍙充笂瑙掔殑鍏抽棴鎸夐挳锛屼笉浼犻粯璁ゆ槸true锛屾樉绀哄叧闂寜閽�
	 *				background:'#2e2d3c'	//鑳屾櫙棰滆壊銆傚崄鍏繘鍒堕鑹茬紪鐮併€備笉浼犻粯璁ゆ槸 '#2e2d3c'
	 *				opacity:92			//寮瑰嚭灞傜殑閫忔槑搴︼紝榛樿鏄�92, 鍙栧€�0~100锛�0鏄笉閫忔槑锛�100鏄叏閮ㄩ€忔槑
	 *				padding:'10px'		//寮瑰嚭灞傚洓鍛ㄧ暀鐨勭┖闅欙紝榛樿鏄�1rem銆傚彲浼犲叆濡� 10px 銆� 1rem 绛�
	 *			}
	 * 		</pre>
	 * @return 杩斿洖寮瑰嚭灞傜殑id銆傚彲浠ヤ娇鐢� msg.close(id) 鏉ュ叧闂寚瀹氱殑寮瑰嚭灞�
	 */
	popups:function(attribute){
		var setLeftPosition = false; //鏄惁璁剧疆浜嗚窛绂诲乏渚ц窛绂�
		var setTopPosition = false; //鏄惁璁剧疆浜嗚窛绂婚《閮ㄨ窛绂�
		
		if(typeof(attribute) == 'undefined'){
			attribute = {};
		}else if(typeof(attribute) == 'string'){
			//鐩存帴浼犲叆浜� string 鏍煎紡鐨勬彁绀烘枃鏈�
			attribute = {text:attribute};
		}
		if(attribute == null){
			attribute = {}
		}
		
		if(attribute.left != null){
			setLeftPosition = true;
		}
		if(attribute.top != null || attribute.bottom != null){
			setTopPosition = true;
		}
		
		if(attribute.url != null){
			if(attribute.text != null){
				//鍙嬪ソ鎻愰啋
				console.log('鍙嬪ソ鎻愰啋锛氭偍宸茬粡璁剧疆浜� attribute.url 锛屼絾鏄偍鍙堣缃簡 attribute.text 锛屾牴鎹紭鍏堢骇锛� 灏嗛噰鐢� attribute.url 锛岃€� attribute.text 璁剧疆鏃犳晥銆� ');
			}
			
			var suiji_load_id = 'msg_popups_loading_'+new Date().getTime();
			attribute.text = '<iframe src="'+attribute.url+'" frameborder="0" style="width:100%;height:100%; display:none;" onload="document.getElementById(\''+suiji_load_id+'\').style.display=\'none\'; this.style.display=\'\';"></iframe><div id="'+suiji_load_id+'" style="width: 100%; height: 100%; text-align: center; padding-top: 30%; font-size: 1.4rem; box-sizing: border-box; overflow: hidden; ">鍔犺浇涓�...</div>';
		}
		
		//濡傛灉text涓虹┖锛岄偅涔堟彁绀轰竴涓�
		if(attribute.text == null){
			attribute.text = '鎮ㄦ湭璁剧疆text鐨勫€硷紝鎵€浠ヨ繖閲屽嚭鐜版彁閱掓枃瀛椼€傛偍鍙互杩欐牱鐢�: <pre>msg.popups(\'鎴戞槸鎻愮ず鏂囧瓧\');</pre>';
		}
		//鍒ゆ柇涓€涓� height 璺� bottom 鏄惁鍚屾椂璁剧疆浜嗭紝鍥犱负濡傛灉杩欎袱涓悓鏃惰缃簡锛宐ottom鏄笉鐢熸晥鐨�
		if(attribute.height != null && attribute.bottom != null){
			console.log('msg.js -- function popups() : 鍙嬫儏鎻愮ず:鎮ㄥ悓鏃惰缃簡height銆乥ottom涓や釜灞炴€э紝姝ゆ椂height灞炴€х敓鏁堬紝bottom灞炴€у皢浼氫笉璧蜂綔鐢�');
		}
		
		//璧嬩簣榛樿灞炴€�
		if(attribute.close == null){
			attribute.close = true;
		}
		if(attribute.top == null){
			attribute.top = 'auto';
		}
		if(attribute.bottom == null || attribute.bottom.length < 1){
			attribute.bottom = 'auto';
		}
		if(attribute.background == null){
			attribute.background = '#2e2d3c';
		}
		if(attribute.opacity == null){
			attribute.opacity = 92;
		}
		if(attribute.height == null){
			attribute.height = 'auto';
		}
		if(attribute.left == null){
			attribute.left = '5%';
		}
		if(attribute.width == null){
			attribute.width = '90%';
		}
		if(attribute.padding == null){
			attribute.padding = '1rem';
		}
		
		//鍒涘缓涓€涓殢鏈篿d
		var thisId = msg.id.create();
		
		var div=document.createElement("div");
		//div.id = 'wangmarket_popups';
		div.id = 'wangmarket_popup_'+thisId;
		div.style = 'position: fixed; z-index: 2147483647; margin: 0px auto; text-align: center; width: 100%; ';
		div.innerHTML = '<div style="position: fixed; top:'+attribute.top+'; bottom:'+attribute.bottom+'; text-align: center;font-size: 1rem;color: #dedede;margin: 0px auto;width: '+attribute.width+';left: '+attribute.left+'; height: '+attribute.height+'; overflow-y: initial; overflow-x: initial;">'+
							'<div style="padding:0rem">'+
								'<div style="width: 100%;background-color: '+attribute.background+';border-radius: 0.3rem;filter: alpha(Opacity='+attribute.opacity+');-moz-opacity: '+(attribute.opacity/100)+';opacity: '+(attribute.opacity/100)+';min-height: 4.8rem; height: 100%;">'+
									'<div style=" width: 100%; font-size: 1rem; box-sizing: border-box; line-height: 1.3rem; color: white; text-align: left; padding: '+attribute.padding+'; overflow-y: auto; height: '+attribute.height+'; display: flex; border-radius: 0.4rem;">'+
									attribute.text+
									'</div>'+
									(attribute.close? '<div class="msg_close" style="top: -0.8rem;position: absolute;right: -0.6rem;background-color: aliceblue;border-radius: 50%;height: 2rem;width: 2rem; z-index: 2147483647;" onclick="msg.close('+thisId+');"><svg style="width: 2rem; height:2rem; cursor: pointer;" t="1601801323865" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4482" width="48" height="48"><path d="M512.001 15.678C237.414 15.678 14.82 238.273 14.82 512.86S237.414 1010.04 512 1010.04s497.18-222.593 497.18-497.18S786.589 15.678 512.002 15.678z m213.211 645.937c17.798 17.803 17.798 46.657 0 64.456-17.798 17.797-46.658 17.797-64.456 0L512.001 577.315 363.241 726.07c-17.799 17.797-46.652 17.797-64.45 0-17.804-17.799-17.804-46.653 0-64.456L447.545 512.86 298.79 364.104c-17.803-17.798-17.803-46.657 0-64.455 17.799-17.798 46.652-17.798 64.45 0l148.761 148.755 148.755-148.755c17.798-17.798 46.658-17.798 64.456 0 17.798 17.798 17.798 46.657 0 64.455L576.456 512.86l148.756 148.755z m0 0" fill="'+attribute.background+'" p-id="4483"></path></svg></div>':'')+
								'</div>'+
							'</div>'+
						'</div>';
		
		//<div style="width: 100%;padding-bottom: 1rem;font-size: 1.1rem;padding-left: 0.3rem;padding-right: 2.0rem;box-sizing: border-box;line-height: 1.2rem;color: white;text-align: right;"> <button style=" border: aliceblue; padding: 0.4rem; padding-left: 1rem; padding-right: 1rem; font-size: 0.8rem; background-color: darkcyan; " onclick="close1();">纭畾</button> </div>
		if(document.getElementsByTagName("body") != null && document.getElementsByTagName("body").length > 0){
			document.getElementsByTagName("body")[0].appendChild(div);

			/** 璁＄畻浣嶇疆锛屽墽涓樉绀� **/
			
			//寮圭獥浣嶇疆鎺у埗鍏冪礌
			//var msgPositionDom = document.getElementById('wangmarket_popups').firstChild;
			var msgPositionDom = document.getElementById('wangmarket_popup_'+thisId).firstChild;
			
			if(!setLeftPosition){
				//濡傛灉娌℃湁璁剧疆left锛岄偅涔堣缃搴﹀眳涓�
				try {
					var htmlWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;   	//html鍙鍖哄煙瀹藉害
					var msgWidth = msgPositionDom.clientWidth||msgPositionDom.offsetWidth; //褰撳墠寮圭獥鐨勫搴�
					msgPositionDom.style.left = ((htmlWidth - msgWidth)/2) + 'px';
				} catch (e) {
					console.log(e);
				}
			}
			if(!setTopPosition){
				//濡傛灉娌℃湁璁剧疆top銆乥ottom锛岄偅涔堣缃珮搴﹀眳涓�
				try {
					var htmlHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;   	//html鍙鍖哄煙楂樺害
					var msgHeight = msgPositionDom.clientHeight||msgPositionDom.offsetHeight; //褰撳墠寮圭獥鐨勯珮搴�
					if(msgHeight > htmlHeight){
						//濡傛灉寮圭獥楂樺害姣攂ody杩橀珮锛岄偅涔堢洿鎺ュ氨鏄剧ず鍒伴《閮�
						msgPositionDom.style.top = '20px';
					}else{
						msgPositionDom.style.top = ((htmlHeight - msgHeight)/2) + 'px';
					}
				} catch (e) {
					console.log(e);
				}
			}
		}else{
			alert('鎻愮ず锛宐ody涓病鏈夊瓙鍏冪礌锛屾棤娉曟樉绀� msg.js 鐨勬彁绀�');
			return;
		}
		
		return thisId;
	},
	/**
	 * 纭寮瑰嚭鎻愮ず
	 * @param attribute 寮瑰嚭灞傜殑鍏朵粬灞炴€с€備紶鍏ュ锛� 
	 * 		<pre>
	 * 			{
	 * 				text:'寮圭獥鐨勫唴瀹�',	//寮瑰嚭绐楁樉绀虹殑鍐呭锛屾敮鎸乭tml
	 *				width:'17rem',		//寮瑰嚭灞傛樉绀虹殑瀹藉害銆備笉浼犻粯璁ゆ槸 17rem銆備紶鍏ュ 100px 銆� 17rem 銆� 50% 绛夈€�
	 *				close:false			//鏄惁鏄剧ず鍙充笂瑙掔殑鍏抽棴鎸夐挳锛屼笉浼犻粯璁ゆ槸false锛屼笉鏄剧ず鍏抽棴鎸夐挳
	 *				background:'#2e2d3c'	//鑳屾櫙棰滆壊銆傚崄鍏繘鍒堕鑹茬紪鐮併€備笉浼犻粯璁ゆ槸 '#2e2d3c'
	 *				opacity:92,			//寮瑰嚭灞傜殑閫忔槑搴︼紝榛樿鏄�92, 鍙栧€�0~100锛�0鏄笉閫忔槑锛�100鏄叏閮ㄩ€忔槑
	 *				padding:'10px',		//寮瑰嚭灞傚洓鍛ㄧ暀鐨勭┖闅欙紝榛樿鏄�1rem銆傚彲浼犲叆濡� 10px 銆� 1rem 绛�
	 *				buttons:{
	 *					'纭畾':function(){
	 *						console.log('鐐瑰嚮浜嗙‘瀹�');
	 *					},
	 *					'鍙栨秷':function(){
	 *						console.log('鐐瑰嚮浜嗗彇娑�');
	 *					}
	 *				},
	 *				buttonStyle:'padding-left:0.6rem; padding-right:0.6rem; font-size: 0.9rem;'		//寮瑰嚭鐨刢onfirm鍙充笅瑙掔殑鍑犱釜鎸夐挳鐨勬牱寮忥紝浼氱洿鎺ュ姞鍒� <button style="....杩欓噷"  涓嶄紶鍏ラ粯璁ゅ垯鏄痯adding-left:0.6rem; padding-right:0.6rem; font-size: 0.9rem;  
	 *			}
	 * 		</pre>
	 *  @param okFunc 濡傛灉涓婇潰attribute浣跨敤鐨勬槸鏈€绠€鍗曚娇鐢ㄦ柟寮忥紝attribute浼犲叆鐨勬槸 text鏄剧ず鐨勫唴瀹癸紝閭ｄ箞杩欓噷灏辨槸鐐逛簡纭畾鎸夐挳鍚庢墽琛岀殑鏂规硶
	 */
	confirm:function(attribute, okFunc){
		//杩欓噷瀛樺湪涓€绉嶆渶绠€鍗曠殑寮瑰嚭鏂瑰紡锛岀洿鎺ヤ紶鍏ユ彁绀哄唴瀹硅窡鐐瑰嚮纭畾鍚庢墽琛岀殑鏂规硶锛屾墍浠ヨ鍦ㄥ墠闈㈠垽鏂竴涓�
		if(typeof(attribute) == 'string'){
			//attribute 鏄� confirm寮瑰嚭鐨勫唴瀹�
			
			attribute = {text:attribute}
			attribute.buttons = {
				'纭畾':okFunc,
				'鍙栨秷':function(){}
			}
		}
		
		if(attribute.buttonStyle == null){
			attribute.buttonStyle = 'padding-left:0.6rem; padding-right:0.6rem; font-size: 0.9rem;';
		}
		
		//濡傛灉text涓虹┖锛岄偅涔堟彁绀轰竴涓�
		if(attribute.text == null){
			attribute.text = '鎮ㄦ湭璁剧疆text鐨勫€硷紝鎵€浠ヨ繖閲屽嚭鐜版彁閱掓枃瀛椼€傛偍鍙互杩欐牱鐢�: <pre>msg.popups(\'鎴戞槸鎻愮ず鏂囧瓧\');</pre>';
		}else{
			
			if(attribute.buttons == null){
				attribute.text = '鎮ㄨ繕鏈缃� buttons 灞炴€�';
			}
			//缁熻鑷畾涔変簡鍑犱釜button
			var i = 0;
			for(let key in attribute.buttons){
				i++;
			}
			//鍙栧嚭button鏉�
			var buttonsHtml = '';	//button鏄剧ず鐨刪tml
			for(let key in attribute.buttons){
				i--;
				//鏂板彇涓€涓嚱鏁板悕
				var name = ''+key+'_'+new Date().getTime();
				window.msg.confirm[name] = function(){ msg.close(); attribute.buttons[key](); };
				buttonsHtml = buttonsHtml+'<button onclick="window.msg.confirm[\''+name+'\']();" style="'+attribute.buttonStyle+'">'+key+'</button>'+(i>0? '&nbsp;&nbsp;':'');
			}
			
			attribute.text = '<div style="line-height: 1.4rem; width:100%; padding-right: 0.2rem;">'+attribute.text+'<div style=" display: inherit; width: 100%; text-align: right;margin-top: 1rem;">'+buttonsHtml+'</div></div>';
		}
		
		//璧嬩簣榛樿灞炴€�
		if(attribute.close == null){
			attribute.close = false;
		}
		if(attribute.width == null){
			attribute.width = '17rem';
		}
		
		
		return msg.popups(attribute);
	},
	//闇€瑕佺‘璁ょ殑寮瑰嚭鎻愮ず锛屾浛浠s鍘熸湰鐨刟lert寮圭獥
	alert:function(text){
		return msg.confirm({
		    text:text,
		    buttons:{
		        纭畾:function(){}
		    } 
		});
	},
	
	/**
	 * 寮瑰嚭 input 杈撳叆妗�
	 * text 鎻愮ず鏂囧瓧,蹇呭～
	 * okFunc 鐐瑰嚮浜嗙‘瀹氭寜閽墽琛岀殑鏂规硶銆�,蹇呭～锛� 杩欓噷浼犲叆 function(value){ //杩欓噷鎷垮埌鐨剉alue 灏辨槸鐢ㄦ埛鑷繁杈撳叆鐨� }
	 * defaultValue 杈撳叆妗嗕腑鐨勯粯璁ゅ€硷紝闈炲繀濉紝濡傛灉涓嶄紶姝ゅ弬鏁帮紝閭ｈ緭鍏ユ涓粯璁ゅ氨鏄病鏈変换浣曞€� 
	 * isTextarea 鏄惁鏄痶extarea杈撳叆妗嗭紝榛樿鏄痜alse锛屼笉鏄紝鍙槸鍗曠函鐨刬nput杈撳叆妗嗐€傝繖涓弬鏁伴粯璁や笉鐢ㄤ紶鍏ャ€�
	 */
	input:function(text, okFunc, defaultValue, isTextarea=false){
		if(typeof(okFunc) == 'undefined' || okFunc == null){
			msg.failure('璇蜂紶鍏ョ偣鍑荤‘瀹氭寜閽鎵ц鐨勬柟娉�');
			return;
		}
		
		if(typeof(defaultValue) == 'undefined' || defaultValue == null){
			defaultValue = '';
		}
		
		//榛樿鏄痠nput
		var inputHTML = '<input type="text" id="msg_input_id" style="width: 100%; line-height: 1.6rem; margin-right: 1rem; box-sizing: border-box;" value="'+defaultValue+'" >';
		if(isTextarea){
			//textarea杈撳叆妗�
			inputHTML = '<textarea rows="3" id="msg_input_id" style="width: 100%; line-height: 1.3rem; margin-right: 1rem; box-sizing: border-box;">'+defaultValue+'</textarea>';
		}
		
		var enterButtonId = 'msg_input_enterButtonId_'+new Date().getTime();	//纭鎸夐挳鐨刬d
		var text = ''+
			'<div style="width: 100%;">'+
				'<div style=" padding-bottom: 0.8rem; font-size: 1.2rem; line-height: 1.7rem;">'+text+'</div>'+
				'<div>'+inputHTML+'</div>'+
				'<div style=" display: inherit; width: 100%; text-align: right;margin-top: 1rem;"><button id='+enterButtonId+' style="padding-left:0.8rem; padding-right:0.8rem; font-size: 1rem;">纭畾</button></div>'+
			'</div>';
		var thisId = msg.popups({
		    text:text,
		    width:'20rem'
		});
		var enter = document.getElementById(enterButtonId);
		enter.onclick = function(){
			var msg_input_value = document.getElementById('msg_input_id').value; 
			msg.close();
			okFunc(msg_input_value); 
		}
		
		return thisId;
	},
	
	/**
	 * 寮瑰嚭 textarea 杈撳叆妗�
	 * text 鎻愮ず鏂囧瓧,蹇呭～
	 * okFunc 鐐瑰嚮浜嗙‘瀹氭寜閽墽琛岀殑鏂规硶銆�,蹇呭～锛� 杩欓噷浼犲叆 function(value){ //杩欓噷鎷垮埌鐨剉alue 灏辨槸鐢ㄦ埛鑷繁杈撳叆鐨� }
	 * defaultValue 杈撳叆妗嗕腑鐨勯粯璁ゅ€硷紝闈炲繀濉紝濡傛灉涓嶄紶姝ゅ弬鏁帮紝閭ｈ緭鍏ユ涓粯璁ゅ氨鏄病鏈変换浣曞€� 
	 */
	textarea:function(text, okFunc, defaultValue){
		return msg.input(text, okFunc, defaultValue, true);
	}
	
}
