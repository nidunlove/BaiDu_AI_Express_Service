var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
// res.render('index', { title: 'Express' });

var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "11125452";
var API_KEY = "EYSwxh8FkxsgXl6xcSuZiUv8";
var SECRET_KEY = "3BCagc9QkiMxjPHv6fC5DYWLmx4ndKBn";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);



/* 请求 */
router.all('/', function(req, res, next) {

    var parmObj = req.body;
    // var image = fs.readFileSync("src/assets/table_ex1.png").toString("base64");
    var text = parmObj.text;
    var per = parmObj.per;

    var options = {per: per};

    var type = 1;

    var typeFN = function() {};
    //
    switch (type) {
    	//语音合成
        case 1:
            typeFN = client.text2audio(text,options);
            break;
        //语音合成
        default:
            typeFN = client.text2audio(text,options);
            break; 
    }
    typeFN.then(function(result) {
        var randomName = new Date().getTime();
        // console.log(process.execPath)
        // console.log(__dirname)
        // console.log(process.cwd())
        var voicePath = 'voice\/'+randomName+'.mp3';
        var randomNameAll = process.cwd()+"\/public\/" + voicePath;
        // var randomNameAll = path.join(process.cwd(), '/voice/'+randomName+'.mp3')
        console.log(randomNameAll);
        fs.writeFileSync(randomNameAll, result.data,function(err){
            if(err){
                res.status(500).json(err);
            }            
        });
        res.status(200).json({"fileName":voicePath,"success":true});
        
    }).catch(function(err) {
        // 如果发生网络错误
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;