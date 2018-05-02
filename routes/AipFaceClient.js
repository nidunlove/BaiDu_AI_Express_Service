var express = require('express');
var router = express.Router();

// res.render('index', { title: 'Express' });

var AipFaceClient = require("baidu-aip-sdk").face;

// 设置APPID/AK/SK
var APP_ID = "11125054";
var API_KEY = "fHuQczGD4K6aCtCC4yrXZir7";
var SECRET_KEY = "5CKcY93jPQkNGD7BkGadjGAzYARmqg7T";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

// var fs = require('fs');

/* 请求 */
router.all('/', function(req, res, next) {

    var parmObj = req.body;
    // var image = fs.readFileSync("src/assets/table_ex1.png").toString("base64");
    var image = parmObj.file;
    var type = parmObj.type;
    var fileName = parmObj.fileName;

    var file1 = parmObj.file1;

    var typeFN = function() {};
    //
    switch (type) {
    	//人脸检测
        case 13:
            typeFN = client.detect(image);
            break; 
        //人脸对比
        case 14:
            typeFN = client.match([image,file1]);
            break; 
        //人脸搜索 (人脸识别接口)
        case 15:
            typeFN = client.identifyUser("group2",image);
            break; 
        //人脸检测
        default:
            typeFN = client.detect(image);
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