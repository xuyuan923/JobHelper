/**
 * 用户注册登录模块
 */
var User = require('../models/user');
exports.showSignup = function(req,res){
    res.render('signup',{
        title: '注册页面'
    })
};

exports.showSignin = function(req,res){
    res.render('signin',{
        title: '登录页面'
    })
};


//注册
exports.signup = function(req,res){
    var _user = req.body.user;
    //注意这里是findOne,不是find(),findOne()查找最近的一条数据
    User.findOne({name:_user.name},function(err,user){
        if(err) console.log(err);
        if(user){
            return res.redirect('/signin');
        }
        else{
            var user = new User(_user);
            user.save(function(err,user){
                if(err) console.log(err);
                res.redirect('/');
            })
        }
    })
};

//登陆
exports.signin = function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    User.findOne({name:name},function(err,user){
        if(err) console.log(err);
        if(!user) return res.redirect('/signup');
        //调用实例方法
        user.comparePassword(password,function(err,isMatch){
            if(err) console.log(err);
            if(isMatch) {
                console.log('password match');
                req.session.user = user;
                return res.redirect('/');
            }else{
                return res.redirect('/signin')
            }
        })
    })
};

//登出
exports.logout = function(req,res){
    delete req.session.user;
    //delete app.locals.user;;
    res.redirect('/');
};


////midware for user
exports.signinRequired = function(req,res,next){
    var user = req.session.user;
    if(!user){
        return res.redirect('/signin')
    }
    next();
}
////管理员权限认证
////从上面走下面，则已经登录了，无需判断是否登录
//exports.adminRequired = function(req,res,next){
//    var user = req.session.user;
//    if(user.role <= 10){
//        return res.redirect('/')
//    }
//    next()
//}