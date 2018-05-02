var express = require('express');
var router = express.Router();

// res.render('index', { title: 'Express' });

var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

// 设置APPID/AK/SK
var APP_ID = "11118849";
var API_KEY = "u7VAX66N1z5mxYYZoGeAp4yC";
var SECRET_KEY = "mIwXrMZZkjbfVqSZpkCx8GyhwB4nCo35";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

// var fs = require('fs');

/* 请求 */
router.all('/', function(req, res, next) {

    var parmObj = req.body;
    // var image = fs.readFileSync("src/assets/table_ex1.png").toString("base64");
    var image = parmObj.file;
    var type = parmObj.type;
    var fileName = parmObj.fileName;

    var typeFN = function() {};
    //16,17,18,19
    switch (type) {
    	//植物识别
        case 16:
            typeFN = client.plantDetect(image);
            break; 
        //动物识别
        case 17:
            typeFN = client.animalDetect(image);
            break; 
        //菜品识别
        case 18:
            typeFN = client.dishDetect(image);
            break; 
        //车识别
        case 19:
            typeFN = client.carDetect(image);
            break; 
        //调用通用物体识别
        default:
            typeFN = client.advancedGeneral(image);
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