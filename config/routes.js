/**
 * 路由文件
 */
var multer = require('multer');
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Member = require('../app/controllers/member');
module.exports = function(app){
    //预处理用户
    app.use(function(req,res,next){
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    })
    //首页
    app.get('/',Index.index);
    //用户
    app.post('/user/signup',User.signup);
    app.post('/user/signin',User.signin);
    app.get('/signin',User.showSignin);
    app.get('/signup',User.showSignup);
    app.get('/logout',User.logout);
    //个人信息创建
    app.get('/member/:id',Member.detail);
    app.get('/admin/member/new',User.signinRequired,Member.new);
    app.get('/admin/member/update/:id',User.signinRequired,Member.update);
    app.post('/admin/member',[multer({ dest: '../public/upload/'}),User.signinRequired,Member.save]);
    app.get('/admin/member/list',User.signinRequired,Member.list);
    app.post('/admin/member/list',User.signinRequired,Member.del);

}
