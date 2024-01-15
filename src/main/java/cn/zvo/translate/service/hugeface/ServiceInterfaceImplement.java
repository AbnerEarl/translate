package cn.zvo.translate.service.hugeface;

import cn.core.LanguageEnum;
import cn.core.service.Language;
import cn.core.service.ServiceInterface;
import cn.core.vo.TranslateResultVO;
import cn.zvo.http.Http;
import cn.zvo.http.Response;
import cn.zvo.translate.service.core.util.JSONUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ServiceInterfaceImplement implements ServiceInterface {

    static Http http; //http请求工具类，使用参考 https://github.com/AbnerEarl/translate/http.java

    static {
        http = new Http();
    }

    private String domain = "http://127.0.0.1:8888/"; //格式如 http://192.168.31.29:5353/  部署 LibreTranslate 的域名


    public ServiceInterfaceImplement() {
        // TODO Auto-generated constructor stub
    }

    public ServiceInterfaceImplement(Map<String, String> config) {
        if (config == null) {
            return;
        }
        if (config.get("domain") == null) {
            return;
        }
        this.domain = config.get("domain");
    }


    public static void main(String[] args) {

//        Map<String, String> config = new HashMap<String, String>();
//        config.put("domain", "http://192.168.31.29:5353/");
        ServiceInterfaceImplement service = new ServiceInterfaceImplement(null);
        service.setLanguage();

        JSONArray array = new JSONArray();
        array.add("翻译");
        array.add("你好世界");

        TranslateResultVO vo = service.api("zh", "en", array);
        System.out.println(vo);
    }

    @Override
    public TranslateResultVO api(String from, String to, JSONArray array) {

        TranslateResultVO vo = new TranslateResultVO();
        vo.setText(new JSONArray());

        for (int n = 0; n < array.size(); n++) {
            JSONArray tempArray = new JSONArray();
            tempArray.add(array.get(n));
            List<JSONArray> list = JSONUtil.split(tempArray, 2000); //长度不能超过2000字符，所以针对2000进行截取
            for (int i = 0; i < list.size(); i++) {
                TranslateResultVO vf = requestApi(from, to, list.get(i));
                if (vf.getResult() - TranslateResultVO.FAILURE == 0) {
//                    return vf;
                    vo.getText().addAll(list.get(i));
                    continue;
                }

                vo.getText().addAll(vf.getText());
            }
        }

        vo.setFrom(from);
        vo.setTo(to);
        return vo;
    }


    @Override
    public void setLanguage() {
        Language lang = new Language("hugeface");
        /*
         * 向语种列表中追加支持的语种，以下注意只需要改第二个参数为对接的翻译服务中，人家的api语种标识即可
         */
        lang.append(LanguageEnum.CHINESE_SIMPLIFIED, "zh");
        lang.append(LanguageEnum.DEUTSCH, "de");
        lang.append(LanguageEnum.ENGLISH, "en");

    }


    private TranslateResultVO requestApi(String from, String to, JSONArray array) {
        TranslateResultVO vo = new TranslateResultVO();

        //要翻译的原字符串
        StringBuffer payload = new StringBuffer();
        payload.append(array.get(0));
        if (array.size() > 1) {
            for (int i = 1; i < array.size(); i++) {
                payload.append("\n" + array.get(i));
            }
        }
        String sourceText = payload.toString();

        try {
            Map<String, String> params = new HashMap<String, String>();
            params.put("mode", from + "2" + to);
            params.put("text", sourceText);
            System.out.println("from: " + from);
            System.out.println("to: " + to);
            System.out.println("text: " + sourceText);
            Map<String, String> header = new HashMap<String, String>();
            header.put("accept", "application/json");
            header.put("Content-Type", "application/x-www-form-urlencoded");

            Response response = http.post(domain + "translate", params, header);
//			Response response = http.post("http://192.168.31.29:5353/translate",params,header);


            if (response.getCode() == 200) {
                String content = response.getContent();
//                JSONObject fromObject = JSONObject.fromObject(content);
//                if (fromObject.get("translatedText") != null) {
                if (content != null) {
//                    String string = fromObject.getString("translatedText");
                    String[] texts = content.split("\n");
                    vo.setFrom(from);
                    vo.setTo(to);
                    vo.setText(JSONArray.fromObject(texts));
                    vo.setBaseVO(TranslateResultVO.SUCCESS, "SUCCESS");
                } else {
                    vo.setBaseVO(TranslateResultVO.FAILURE, "error : " + response.message);
                }
            } else {
                vo.setBaseVO(TranslateResultVO.FAILURE, "http code:" + response.getCode() + ", content:" + response.getContent());
            }

        } catch (IOException e) {
            e.printStackTrace();
            vo.setBaseVO(TranslateResultVO.FAILURE, e.getMessage());
        }

        return vo;
    }
}

