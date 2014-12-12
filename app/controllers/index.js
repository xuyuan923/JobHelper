/**
 * 首页路由模块
 */
var Member = require('../models/member');
exports.index = function(req,res){
    console.log('user in session');
    console.log(req.session.user);
    Member.fetch(function (err, members) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: '学长学姐帮忙找工作',
            members: members
        })
    })
}
