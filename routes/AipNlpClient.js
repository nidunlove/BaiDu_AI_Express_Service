var express = require('express');
var router = express.Router();

// res.render('index', { title: 'Express' });

var AipNlpClient = require("baidu-aip-sdk").nlp;

// 设置APPID/AK/SK
var APP_ID = "11122039";
var API_KEY = "RhDzkKocTAkHMg98M0d2Vv5l";
var SECRET_KEY = "IbCHYvRGfZDLPtU30QGMvGU400QopLDO";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipNlpClient(APP_ID, API_KEY, SECRET_KEY);

// var fs = require('fs');

/* 请求 */
router.all('/', function(req, res, next) {

    var parmObj = req.body;
  
    var type = parmObj.type;
    var jsonStr1 = parmObj.jsonStr1;
    var jsonStr2 = parmObj.jsonStr2;

    var typeFN = function() {};

    // 如果有可选参数
    var options = {};
    options["type"] = jsonStr2;

    switch (type) {
    	//词法分析
        case 1:
            typeFN = client.lexerCustom(jsonStr1);
            break; 
        //评论观点抽取
        case 2:
            typeFN = client.commentTag(jsonStr1, options);
            break; 
        //情感倾向分析
        case 3:
            typeFN = client.sentimentClassify(jsonStr1);
            break; 
        //文字标签
        case 4:
            typeFN = client.keyword(jsonStr1,jsonStr2);
            break; 
        //文章分类
        default:
            typeFN = client.topic(jsonStr1,jsonStr2);
            break; 
    }
    typeFN.then(function(result) {
        res.status(200).json(result);
    }).catch(function(err) {

        // 如果发生网络错误
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;