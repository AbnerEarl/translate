// document.write("<script language=javascript src='http://localhost:8060/static/language.js'></script>");
// translate.request.api.host='http://localhost:8060/';
// translate.execute();


var script = document.createElement("script");

script.type = "text/javascript";

// Firefox，Opera，Chrome，Safari 3+

script.onload = function () {
    translate.request.api.host = 'http://localhost:8060/';
    translate.execute();
    translate.execute();
}

script.src = "http://localhost:8060/static/language.js";

document.getElementsByTagName("head")[0].appendChild(script);


function ajax1(url) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject("服务器错误");
            }
        };
        xhr.open("get", url, true);
        xhr.send(null);
    });
}

function ajax2(url, text, text2) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject("服务器错误");
            }
        };
        xhr.open("post", url, true);
        var arr = text;
        var formData = new FormData();
        defaultLang = window.localStorage.getItem('local_language')
        formData.append("text", JSON.stringify(arr));
        formData.append("from", defaultLang ? defaultLang : "english");
        formData.append("to", text2 ? text2 : "chinese_simplified"); //to是下拉
        xhr.send(formData);
    });
}

ajax1("http://localhost:8060/language.json").then(
    res => {
        let resValue = JSON.parse(res);
        var selectElement = document.createElement("select"); // 创建一个新的 <select> 元素
        selectElement.setAttribute("id", "selectid"); //给select添加id
        document.body.appendChild(selectElement); // 将该元素添加到页面上
        selectElement.style.cssText = "margin:0px 20px; position: fixed;top:20px;right:20px;width:100px;z-index:9999";
        defaultLang = window.localStorage.getItem('local_language')
        // JavaScript部分
        for (let i = 1; i <= resValue.list.length; i++) {
            // 遍历数字从1到5
            var optionElement = document.createElement("option"); // 创建一个新的选项元素
            optionElement.textContent = resValue.list[i - 1].name; // 设置选项文本内容为"Option X"（X表示当前循环变
            optionElement.value = resValue.list[i - 1].id;
            if (optionElement.value === defaultLang) {
                optionElement.selected = true;
            }
            selectElement.appendChild(optionElement); // 将选项元素添加到 <select> 元素中
        }
        let changeKey = "";
        selectElement.addEventListener("change", function ({target}) {
            changeKey = target.value;
            ajax2("http://localhost:8060/translate.json", sl, changeKey).then(
                res => {
                    let resValue = JSON.parse(res);
                    tl = resValue.text;

                    tl.forEach((item, index) => {
                        data[index]["node"].origText = data[index]["node"].nodeValue;
                        data[index]["node"].nodeValue = item; //更改文本
                    });
                },
                function (err) {
                    reject(err);
                },
            );
        });
    },
    function (err) {
        reject(err);
    },
);


// window.localStorage.setItem("local_language", "chinese_simplified");

function listen(callback) {
    // 获取 HTML 文档中的所有元素，但不包括 下列 选择器的元素

    var exclude = ["head", "pre", "script", "textarea", "select", "option", "h1"]; //排除名单
    var selectors = [];
    exclude.forEach((item, index) => {
        selectors.push(item); //排除该元素
        selectors.push(item + " *"); //排除该元素后代
    });
    get(document.querySelectorAll("*:not(" + selectors.join(",") + ")")); //*:not(pre,pre *)
    // 创建 MutationObserver 对象

    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // 遍历新添加的节点
            for (let i = 0; i < mutation.addedNodes.length; i++) {
                let node = mutation.addedNodes[i];

                // 如果节点是元素节点，就调用 get 函数

                if (node.nodeType === 1) {
                    callMyFunction(node);

                    function callMyFunction(param1) {
                        setTimeout(function () {
                            get([...param1.querySelectorAll("*"), param1]);
                        }, 300);
                    }
                }
            }
        });
    });

    // 设置 MutationObserver 的参数，表示监听所有元素的变化
    let config = {
        childList: true,
        subtree: true,
    };

    // 启动 MutationObserver
    observer.observe(document, config);

    function get(elements) {
        // 遍历所有元素
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            // 遍历元素的 childNodes
            for (let j = 0; j < element.childNodes.length; j++) {
                let node = element.childNodes[j];
                // 如果当前节点是一个文本节点（nodeType 为 3）且不包含子节点（nodeName 为 '#text'），就将文本添加到数组中
                if (node.nodeType === 3 && node.nodeName.toLowerCase() === "#text") {
                    // 过滤掉文本中的换行符

                    let text = node.nodeValue;

                    var v = {a: false, b: false};

                    text.slice(0, 1) == " " ? (v.a = true) : (v.a = false);

                    text.slice(-1) == " " ? (v.b = true) : (v.b = false);

                    text = text.replace(/[\n\t\r]/g, "").trim();

                    // 如果文本不仅包含空白字符，就将它添加到数组中
                    if (/\S/.test(text)) {
                        //不处理只有数字和符号的文本
                        if (!/^[0-9\+\-\*\/\=><&\!@#\$%\^\*\\(\)\[\]\{\}_,.;'，。、；’、]{1,}$/.test(text)) {
                            //---------------处理
                            //翻译text
                            //text = "$" + text
                            //---------------处理结束--显示
                            v.a == true ? (text = " " + text) : text;

                            v.b == true ? (text = text + " ") : text;

                            if (!element.matches("script,textarea")) {
                                //单元素阻断,白名单
                                node.nodeValue = text;
                                callback.call({text: text, node: node, element: element});
                            } else {
                                //console.log("位于排除标签列表", element);
                            }
                        } else {
                            //console.log("只有数字和符号的文本", text);
                        }
                    }
                }
            }
        }
    }
}

let time = null;
var data = [];
var sl = [];
var tl = [];

listen(function () {
    if (time !== null) {
        clearTimeout(time);
    }
    time = setTimeout(async () => {
        data.forEach((item, index) => {
            if (item.element.nodeName != "OPTION") {
                sl.push(item["text"]);
            }
        });
        // var tl = await translation_arr(sl) //返回一个数组[[翻译结果,源语言类型],...*]//使用的谷歌批量翻译API,这里就不提供了
        // sl传入数组
        // ajax2("http://localhost:8060/translate.json", sl,window.localStorage.getItem('local_language')).then(
        //   res => {
        //     let resValue = JSON.parse(res);
        //     tl = resValue.text;
        //     tl.forEach((item, index) => {
        //       data[index]["node"].origText = data[index]["node"].nodeValue;
        //       data[index]["node"].nodeValue = item; //更改文本
        //     });
        //   },
        //   function (err) {
        //     reject(err);
        //   },
        // );

        //这里的this指向的是input
    }, 500);

    data.push(this);
});
