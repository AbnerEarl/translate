/**
 * ajax璇锋眰 涓嶄緷璧栦换浣曟鏋跺強鍏朵粬鏂囦欢
 * 浣滆€咃細绠￠浄楦�
 * 涓汉缃戠珯锛歸ww.guanleiming.com
 * 涓汉寰俊: xnx3com
 * 鍏徃锛氭綅鍧婇浄楦ｄ簯缃戠粶绉戞妧鏈夐檺鍏徃
 * 鍏徃瀹樼綉锛歸ww.leimingyun.com
 */
var request = {
    /**
     * get璇锋眰
     * @param url 璇锋眰鐨勬帴鍙RL锛屼紶鍏ュ http://www.xxx.com/a.php
     * @param data 璇锋眰鐨勫弬鏁版暟鎹紝浼犲叆濡� {"goodsid":"1", "author":"绠￠浄楦�"}
     * @param func 璇锋眰瀹屾垚鐨勫洖璋冿紝浼犲叆濡� function(data){ console.log(data); }
     */
    get:function(url, data, func){
        var headers = {
            'content-type':'application/x-www-form-urlencoded'
        };
        this.send(url, data, func, 'get', true, headers, null);
    },
    /**
     * post璇锋眰
     * @param url 璇锋眰鐨勬帴鍙RL锛屼紶鍏ュ http://www.xxx.com/a.php
     * @param data 璇锋眰鐨勫弬鏁版暟鎹紝浼犲叆濡� {"goodsid":"1", "author":"绠￠浄楦�"}
     * @param func 璇锋眰瀹屾垚鐨勫洖璋冿紝浼犲叆濡� function(data){ console.log(data); }
     */
    post:function(url, data, func){
        var headers = {
            'content-type':'application/x-www-form-urlencoded'
        };
        this.send(url, data, func, 'post', true, headers, null);
    },
    /**
     * 鍙戦€佽姹�
     * url 璇锋眰鐨剈rl
     * data 璇锋眰鐨勬暟鎹紝濡� {"author":"绠￠浄楦�",'site':'www.guanleiming.com'}
     * func 璇锋眰瀹屾垚鐨勫洖璋冿紝浼犲叆濡� function(data){}
     * method 璇锋眰鏂瑰紡锛屽彲浼犲叆 post銆乬et
     * isAsynchronize 鏄惁鏄紓姝ヨ姹傦紝 浼犲叆 true 鏄紓姝ヨ姹傦紝浼犲叆false 鏄悓姝ヨ姹�
     * headers 璁剧疆璇锋眰鐨刪eader锛屼紶鍏ュ {'content-type':'application/x-www-form-urlencoded'};
     * abnormalFunc 鍝嶅簲寮傚父鎵€鎵ц鐨勬柟娉曪紝鍝嶅簲鐮佷笉鏄�200灏变細鎵ц杩欎釜鏂规硶 ,浼犲叆濡� function(xhr){}
     */
    send:function(url, data, func, method, isAsynchronize, headers, abnormalFunc){
        //post鎻愪氦鐨勫弬鏁�
        var params = '';
        if(data != null){
            for(var index in data){
                if(params.length > 0){
                    params = params + '&';
                }
                params = params + index + '=' + data[index];
            }
        }

        var xhr=null;
        try{
            xhr=new XMLHttpRequest();
        }catch(e){
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        //2.璋冪敤open鏂规硶锛坱rue----寮傛锛�
        xhr.open(method,url,isAsynchronize);
        //璁剧疆headers
        if(headers != null){
            for(var index in headers){
                xhr.setRequestHeader(index,headers[index]);
            }
        }
        xhr.send(params);
        //4.璇锋眰鐘舵€佹敼鍙樹簨浠�
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    //璇锋眰姝ｅ父锛屽搷搴旂爜 200
                    var json = null;
                    try{
                        json = JSON.parse(xhr.responseText);
                    }catch(e){
                        console.log(e);
                    }
                    if(json == null){
                        func(xhr.responseText);
                    }else{
                        func(json);
                    }
                }else{
                    if(abnormalFunc != null){
                        abnormalFunc(xhr);
                    }
                }
            }
        }
    },

    /**
     * 鏂囦欢涓婁紶
     * url 璇锋眰鐨剈rl
     * data 璇锋眰鐨勬暟鎹紝濡� {"author":"绠￠浄楦�",'site':'www.guanleiming.com'}
     * file 瑕佷笂浼犵殑鏂囦欢銆傚彲浠ラ€氳繃input鐨� e.srcElement.files[0] 鑾峰彇
     * successFunc 璇锋眰鎴愬姛鐨勫洖璋冿紝鍝嶅簲鐮佹槸200灏变細鎵ц杩欎釜銆備紶鍏ュ function(data){}
     * headers 璁剧疆璇锋眰鐨刪eader锛屼紶鍏ュ {'content-type':'application/x-www-form-urlencoded'};
     * abnormalFunc 鍝嶅簲寮傚父鎵€鎵ц鐨勬柟娉曪紝鍝嶅簲鐮佷笉鏄�200灏变細鎵ц杩欎釜鏂规硶 ,浼犲叆濡� function(xhr){}
     */
    upload:function(url,data, file, successFunc, headers, abnormalFunc){
        //post鎻愪氦鐨勫弬鏁�
        var fd = new FormData();
        fd.append('file', file);
        if(data != null){
            for(var index in data){
                fd.append(index, data[index]);
            }
        }

        var xhr=null;
        try{
            xhr=new XMLHttpRequest();
        }catch(e){
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        //2.璋冪敤open鏂规硶锛坱rue----寮傛锛�
        xhr.open('POST',url,true);
        //璁剧疆headers
        if(headers != null){
            for(var index in headers){
                xhr.setRequestHeader(index,headers[index]);
            }
        }
        xhr.send(fd);
        //4.璇锋眰鐘舵€佹敼鍙樹簨浠�
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    //璇锋眰姝ｅ父锛屽搷搴旂爜 200
                    var json = null;
                    try{
                        json = JSON.parse(xhr.responseText);
                    }catch(e){
                        console.log(e);
                    }
                    if(json == null){
                        successFunc(xhr.responseText);
                    }else{
                        successFunc(json);
                    }
                }else{
                    if(abnormalFunc != null){
                        abnormalFunc(xhr);
                    }
                }
            }
        }
    }
}