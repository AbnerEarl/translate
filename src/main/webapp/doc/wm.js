var wm = {
    token:{
        /**
         * 鑾峰彇token锛屼篃灏辨槸 session id銆傝幏鍙栫殑瀛楃涓插 f26e7b71-90e2-4913-8eb4-b32a92e43c00
         * 濡傛灉鐢ㄦ埛鏈櫥褰曪紝閭ｄ箞鑾峰彇鍒扮殑鏄�  youke_uuid銆� 杩欎釜浼氳缃垚layim 鐨�  mine.id
         */
        get:function(){
            return localStorage.getItem('token');
        },
        /**
         * 璁剧疆token锛屼篃灏辨槸session id
         * 鏍煎紡濡� f26e7b71-90e2-4913-8eb4-b32a92e43c00
         */
        set:function(t){
            localStorage.setItem('token',t);
        }
    },
    load:{
        /**
         * 鍚屾鍔犺浇JS锛屽姞杞借繃绋嬩腑浼氶樆濉烇紝鍔犺浇瀹屾瘯鍚庣户缁墽琛屽悗闈㈢殑銆�
         * url: 瑕佸姞杞界殑js鐨剈rl
         */
        synchronizesLoadJs:function(url){
            var  xmlHttp = null;
            if(window.ActiveXObject){//IE
                try {
                    //IE6浠ュ強浠ュ悗鐗堟湰涓彲浠ヤ娇鐢�
                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    //IE5.5浠ュ強浠ュ悗鐗堟湰鍙互浣跨敤
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
            }else if(window.XMLHttpRequest){
                //Firefox锛孫pera 8.0+锛孲afari锛孋hrome
                xmlHttp = new XMLHttpRequest();
            }
            //閲囩敤鍚屾鍔犺浇
            xmlHttp.open("GET",url,false);
            //鍙戦€佸悓姝ヨ姹傦紝濡傛灉娴忚鍣ㄤ负Chrome鎴朞pera锛屽繀椤诲彂甯冨悗鎵嶈兘杩愯锛屼笉鐒朵細鎶ラ敊
            xmlHttp.send(null);
            //4浠ｈ〃鏁版嵁鍙戦€佸畬姣�
            if( xmlHttp.readyState == 4 ){
                //0涓鸿闂殑鏈湴锛�200鍒�300浠ｈ〃璁块棶鏈嶅姟鍣ㄦ垚鍔燂紝304浠ｈ〃娌″仛淇敼璁块棶鐨勬槸缂撳瓨
                if((xmlHttp.status >= 200 && xmlHttp.status <300) || xmlHttp.status == 0 || xmlHttp.status == 304){
                    var myBody = document.getElementsByTagName("HTML")[0];
                    var myScript = document.createElement( "script" );
                    myScript.language = "javascript";
                    myScript.type = "text/javascript";
                    try{
                        //IE8浠ュ強浠ヤ笅涓嶆敮鎸佽繖绉嶆柟寮忥紝闇€瑕侀€氳繃text灞炴€ф潵璁剧疆
                        myScript.appendChild(document.createTextNode(xmlHttp.responseText));
                    }catch (ex){
                        myScript.text = xmlHttp.responseText;
                    }
                    myBody.appendChild(myScript);
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        //鍔犺浇css鏂囦欢锛岄€氳繃css鐨剈rl
        css: function(url){
            if(!url || url.length === 0){
                throw new Error('argument "url" is required !');
            }
            var head = document.getElementsByTagName('HTML')[0];
            var link = document.createElement('link');
            link.href = url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
    },
    /**
     * 缃戠粶璇锋眰锛岄兘鏄敤姝�
     * api 璇锋眰鐨刟pi鎺ュ彛锛屽彲浠ヤ紶鍏ュ api.login_token
     * data 璇锋眰鐨勬暟鎹紝濡� {"goodsid":"1"}
     * func 璇锋眰瀹屾垚鐨勫洖璋冿紝浼犲叆濡� function(data){}
     */
    post:function(api, data, func){
        if(typeof(request) == 'undefined'){
            var protocol = '';
            if(window.location.protocol == 'file:'){
                //鏄湪鏈湴杩愯鐨勶紝閭ｄ箞request.js 鐨勮姹� url 瑕佸姞涓� http:
                protocol = 'http:';
            }
            this.load.synchronizesLoadJs(protocol+'//res.weiunity.com/request/request.js')
        }
        if(this.token.get() != null && this.token.get().length > 0){
            data['token'] = this.token.get();
        }
        var headers = {'content-type':'application/x-www-form-urlencoded'};
        request.send(api, data, func, 'post', true, headers, function(xhr){
            console.log('request api,  status : '+xhr.status);
        });
    },
    /**
     * 鑾峰彇缃戝潃鐨刧et鍙傛暟銆�
     * @param name get鍙傛暟鍚�
     * @returns value
     */
    getUrlParams:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },


    /**
     * 鏃堕棿鎴宠浆鍖栦负骞� 鏈� 鏃� 鏃� 鍒� 绉�
     * number: 浼犲叆鏃堕棿鎴� 濡� 1587653254
     * format锛氳繑鍥炴牸寮忥紝濡� 'Y-M-D h:m:s'
     */
    formatTime:function(number,format) {
        var formateArr  = ['Y','M','D','h','m','s'];
        var returnArr   = [];
        var date = new Date(number * 1000);
        returnArr.push(date.getFullYear());
        returnArr.push(this.formatNumber(date.getMonth() + 1));
        returnArr.push(this.formatNumber(date.getDate()));
        returnArr.push(this.formatNumber(date.getHours()));
        returnArr.push(this.formatNumber(date.getMinutes()));
        returnArr.push(this.formatNumber(date.getSeconds()));
        for (var i in returnArr){
            format = format.replace(formateArr[i], returnArr[i]);
        }
        return format;
    },
    //鏃堕棿鎴宠浆鏃堕棿鐨勬暟鎹浆鍖栵紝姝ゆ柟娉曞彧鏄湇鍔′簬 formatTime
    formatNumber:function(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    //灏� a_b1_c2 杞寲涓洪┘宄板懡鍚嶆柟寮� aB1C2
    lineToHump:function(name){
        return name.replace(/\_(\w)/g, function(all, letter){
            return letter.toUpperCase();
        });
    },
    //鑾峰彇form鏍囩鍐呯殑鎵€鏈夋暟鎹€傝幏鍙栧埌鐨勬槸json瀵硅薄鐨勫舰鎬併€� 闇€瑕乯query鏀寔銆�
    getJsonObjectByForm:function(obj){
        var o = {};
        var a = obj.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }

            try{
                if(this.name != null && this.name.length > 0){
                    if(this.name.indexOf('_') > -1){
                        //鍑虹幇浜嗕笅鍒掔嚎锛岄偅鍙兘鏄┘宄板懡鍚嶏紝澧炲姞椹煎嘲浼犲弬
                        o[wm.lineToHump(this.name)] = o[this.name];
                    }
                }
            }catch(e){
                console.log(e);
            }
        });
        return o;
    },
    /**
     * 鑷姩濉厖form鏍囩鍐呯殑鏁版嵁銆� 闇€瑕乯query鏀寔銆�
     * @param obj 浼犲叆濡� $('#form') ,瑕佽嚜鍔ㄥ～鍏呭摢涓猣orm涓殑鏁版嵁锛屽氨浼犲叆鍝釜form
     * @param data json瀵硅薄鐨勬暟鎹€硷紝姣斿form涓湁涓猧nput锛宯ame鏄痑ge锛� 鑰� data.age 涔熸湁姝ｅ父鐨勫€硷紝閭ｄ箞 杩欎釜input灏变細姝ｅ父濉厖涓奷ata.age鐨勫€�
     */
    fillFormValues:function(obj, data){
        var a = obj.serializeArray();
        for(var i = 0; i<a.length; i++){
            var wm_fv_name = a[i].name;
            var wm_fv_value = data[a[i].name];
            if(wm_fv_value != null && typeof(wm_fv_value) != 'undefined'){
                //鏈夊€硷紝閭ｄ箞璧嬩簣杈撳叆妗嗗€�

                /***** 璧嬩簣鍊� ******/
                    //鑾峰彇褰撳墠杈撳叆妗嗙殑褰㈠紡锛屾槸input銆乼ext銆乻elect 鐨勫摢绉�
                var tag = document.getElementsByName(wm_fv_name)[0].nodeName.toLowerCase();

                //if(tag == 'input' || tag == 'select' || tag == 'text'){
                document.getElementsByName(wm_fv_name)[0].value = wm_fv_value;
                //}

                //鍒ゆ柇褰撳墠杈撳叆鏄惁鏄浘鐗囪緭鍏�
                var form_uploadImage_titlePicA = document.getElementById(wm_fv_name+'_titlePicA');
                if(form_uploadImage_titlePicA != null){
                    //涓嶆槸null锛岄偅杩欓」灏辨槸鍥剧墖涓婁紶椤逛簡
                    try{
                        document.getElementById(wm_fv_name+"_titlePicA").href = wm_fv_value;
                        document.getElementById(wm_fv_name+"_titlePicImg").src = wm_fv_value;
                        document.getElementById(wm_fv_name+"_titlePicImg").style.display='';
                    }catch(e){
                        console.log(e);
                    }
                }
                /***** 璧嬩簣鍊肩粨鏉� ******/
            }
        }

        //閲嶆柊娓叉煋 layui 鐨刦orm
        if(typeof(layui) != 'undefined'){
            layui.use(['form'], function(){
                var form = layui.form;
                form.render(); //鏇存柊鍏ㄩ儴
            });
        }
    }
};