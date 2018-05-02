# 启动 安装
    ``此只为后端服务
    ``前端调用参考

    ``npm install
    ``npm start


# express && 百度AI开放平台 nodejs SDK包 练习

1. 安装express, npm install, npm start
        参考：
                http://www.runoob.com/nodejs/nodejs-install-setup.html
                http://ourjs.com/detail/56b2a6f088feaf2d031d2468

2. npm install baidu-aip-sdk      
        http://ai.baidu.com/sdk 
        将百度开放平台sdk加入， npm install baidu-aip-sdk 。package.json 合并(此项不合并应该也可以)

3. routers中加入具体接口调用，app.js 加入请求路由路径

4. 跨域
        参考：https://blog.csdn.net/veloi/article/details/53836527 等，百度
        跨域访问要在路由请求调用前
        
5. 前端传编码码后的base64图片，
        post图片数据量过大，服务器413
        用bodyParse
        参考：
                https://www.jianshu.com/p/ea0122ad1ac0 等，百度

6. 成功

7. 语音等存放到服务器路径，public为静态目录，语音等输出到此目录返回路径给前端调用

## 前端调用

    调用路径

    baseURL = "http://127.0.0.1:3000";

    wordsUrl:"/AipOcrClient",//文字识别

    languageUrl:"/AipNlpClient",//语言处理

    faceUrl:"/AipFaceClient",//人脸识别

    imgSerUrl:'/AipImageClassify',//图像识别

    voiceUrl:"/AipSpeechClient",//语音合成

    voicePlayUrl: baseURL+"/", //语音合成，播放地址

    详细请求查看routers文件夹下传参方式
    百度 APPID/AK/SK 请换成自己的。



