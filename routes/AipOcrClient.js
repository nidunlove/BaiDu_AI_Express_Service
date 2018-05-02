var express = require('express');
var router = express.Router();

// res.render('index', { title: 'Express' });

var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "11122214";
var API_KEY = "ZnOOt1mke12pGsW1izX7lLTr";
var SECRET_KEY = "PITwoKKUE8AgCxjQLmK69fGSYT6Xlsqh";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

// var fs = require('fs');

/* 请求 */
router.all('/', function(req, res, next) {

    var parmObj = req.body;
    // var image = fs.readFileSync("src/assets/table_ex1.png").toString("base64");
    var image = parmObj.file;
    var type = parmObj.type;
    var fileName = parmObj.fileName;

    var request_id = image;
    // var result_type = "";

    // 如果有可选参数
    // var options = {};
    // options["result_type"] = "json";

    var typeFN = function() {};
    //
    switch (type) {
        //表格文字识别(EXCEL 详细数据)
        case 21:
            typeFN = client.tableGetresult(request_id,{"result_type":"json"});
            break;
        //表格文字识别(EXCEL 链接)
        case 12:
            typeFN = client.tableGetresult(request_id,{"result_type":"excel"});
            break;
        //表格文字识别 （ruquestID）
        case 11:
            typeFN = client.tableBegin(image);
            break;
        //网络图片识别
        case 3:
            typeFN = client.webImage(image);
            break;
        //营业执照识别
        case 9:
            typeFN = client.businessLicense(image);
            break;
        //通用文字识别
        case 2:
            typeFN = client.generalBasic(image);
            break;
        //车牌识别
        case 8:
            typeFN = client.licensePlate(image);
            break;
        //名片识别（百度无此项，用通用图片）
        // case 2:
        //     typeFN = client.generalBasic(image);
        //     break;
        //银行卡识别
        case 5:
            typeFN = client.bankcard(image);
            break;
    	//行驶证识别
        case 7:
            typeFN = client.vehicleLicense(image);
            break; 
        //驾驶证识别
        case 6:
            typeFN = client.drivingLicense(image);
            break; 
        //身份证识别
        case 4:
            typeFN = client.idcard(image,'front');
            break; 
        //通用票据识别
        case 10:
            typeFN = client.receipt(image);
            break; 
        //通用文字识别
        default:
            typeFN = client.generalBasic(image);
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