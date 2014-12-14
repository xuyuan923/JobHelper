var express = require('express');
var path = require('path');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser'); //session需要cookie-parser中间件
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var logger = require('morgan'); //在vim里打印开发环境日志
var fs = require('fs');
var multer = require('multer');
//node富文本编辑器
var ueditor = require("ueditor");
var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost/job';
mongoose.connect(dbUrl);
app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//ueditor上传图片
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;

        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/' ;
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));
//上传头像
app.use(multer({
    dest: "./public/upload",
    rename: function (fieldname, filename) {
        return filename + Date.now()
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        done=true;
    }
}))

app.use(cookieParser());
//session中配置secret
app.use(session({
    secret: 'job',
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions',
        auto_reconnect:true
    })
}));

//判断线上环境和开发环境是否一致,打印数据库操作日志
if("development" === app.get("env")){
    app.set("showStackError",true);
    app.use(logger(":method :url :status"));
    app.locals.pretty = true;
    mongoose.set("debug",true);
}
require('./config/routes')(app);
app.locals.moment = require('moment');
app.listen(port);
console.log('jobhelper started on port ' + port);







