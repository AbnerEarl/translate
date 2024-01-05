/*
	鏋侀€熸祴璇曚綋楠岋紝鐢ㄤ簬瀹℃煡鍏冪礌鏃剁洿鎺ユ墽琛岀殑
	1. 闅忎究鎵撳紑涓€涓綉椤�
	2. 鍙抽敭-瀹℃煡鍏冪礌
	3. 绮樿创鍏ヤ竴涓嬩唬鐮侊細
		var head= document.getElementsByTagName('head')[0];  var script= document.createElement('script');  script.type= 'text/javascript';  script.src= 'http://localhost:8060/static/inspector.js';  head.appendChild(script); 
	4. Enter 鍥炶溅閿� 锛� 鎵ц
	5. 鍦ㄥ綋鍓嶇綉椤电殑宸︿笂瑙掞紝灏卞嚭鐜颁簡涓€涓ぇ澶х殑鍒囨崲璇█浜�	
	
	浣跨敤鐨勬槸 v2.x 鐗堟湰杩涜鐨勭炕璇�
 */
    var head= document.getElementsByTagName('head')[0]; 
    var script= document.createElement('script'); 
    script.type= 'text/javascript'; 
    script.src= 'http://localhost:8060/static/translate.js'; 

    script.onload = script.onreadystatechange = function() {
        translate.request.api.host='http://localhost:8060/';
        // translate.execute();
        translate.storage.set('to','');
        //璁剧疆浣跨敤v2.x 鐗堟湰
        translate.setUseVersion2(); 
    
        //SELECT 淇敼 onchange 浜嬩欢
        translate.selectLanguageTag.selectOnChange = function(event){
            //鍒ゆ柇鏄惁鏄涓€娆＄炕璇戯紝濡傛灉鏄紝閭ｅ氨涓嶇敤鍒锋柊椤甸潰浜嗐€� true鍒欐槸闇€瑕佸埛鏂帮紝涓嶆槸绗竴娆＄炕璇�
            var isReload = translate.to != null && translate.to.length > 0;
            if(isReload){
                //濡傛灉瑕佸埛鏂伴〉闈㈢殑璇濓紝寮瑰嚭鍙嬪ソ鎻愮ず
                alert('鎮ㄥソ锛屽揩閫熶綋楠屾殏鏃跺彧鑳藉垏鎹㈠叾涓竴绉嶈瑷€杩涜浣撻獙锛屽彧鏄彁渚涙晥鏋滃睍绀猴紝鎮ㄥ彲鍙傝€冩帴鍏ユ枃妗ｆ潵鎺ュ叆鎮ㄧ殑椤圭洰涓繘琛屽畬鏁翠綋楠屽強浣跨敤銆�');
            }else{
                var language = event.target.value;
                translate.changeLanguage(language);
            }			
        }
        
        translate.listener.start();	//寮€鍚痟tml椤甸潰鍙樺寲鐨勭洃鎺э紝瀵瑰彉鍖栭儴鍒嗕細杩涜鑷姩缈昏瘧銆傛敞鎰忥紝杩欓噷鍙樺寲鍖哄煙锛屾槸鎸囦娇鐢� translate.setDocuments(...) 璁剧疆鐨勫尯鍩熴€傚鏋滄湭璁剧疆锛岄偅涔堜负鐩戞帶鏁翠釜缃戦〉鐨勫彉鍖�
        translate.execute();
        document.getElementById('translate').style.position = 'fixed';
        document.getElementById('translate').style.color = 'red';
        document.getElementById('translate').style.left = '10px';
        document.getElementById('translate').style.top = '10px';
        document.getElementById('translate').style.zIndex = '9999999999999';
    
        setInterval(function() {
            try{
                if(document.getElementById('translateSelectLanguage') == null){
                    return;
                }
                document.getElementById('translateSelectLanguage').style.fontSize = '2rem';
                document.getElementById('translateSelectLanguage').style.borderWidth = '0.5rem';
                document.getElementById('translateSelectLanguage').style.borderColor = 'red';
            }catch(e){
                //select鏁版嵁鏄€氳繃鎺ュ彛杩斿洖鐨�
            }
        },1000);
    
    }
    head.appendChild(script); 
    