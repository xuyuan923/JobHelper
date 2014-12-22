/**
 * 成员集合
 */
var mongoose = require('mongoose');
var Member = require('../models/member');
var _ = require('underscore');
//成员个人信息详情页
exports.detail = function (req, res) {
    var id = req.params.id;
    Member
        .findOne({_id: id})
        .exec(function (err, member) {
            if (err) console.log(err)
            res.render('memberDetail', {
                title: member.nickName,
                member: member
            })
        })
};

//业务线后台录入
exports.new = function (req, res) {
    res.render('member', {
        title: '新建成员信息页',
        member: {
            avator: '',
            nickName: '',
            grade: '',
            educational: '',
            zanNum: '',
            desc: '', //一句话介绍
            views: '',
            qq: '',
            weixin: '',
            tel: '',
            mail: '',
            college: '', //学院
            major: '', //专业
            company: '',
            job: '',
            sug: '', //大学生活及建议
            shares: ''
        }
    })
};

//成员信息更新
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Member.findById(id, function (err, member) {
                res.render('member', {
                    title: '更新个人信息',
                    member: member
                })
        })
    }
};

// admin post line
exports.save = function (req, res) {
    var id = req.body.member._id;
    var memberObj = req.body.member;
    var _member;
    //修改业务线
    if (id) {
        Member.findById(id, function (err, member) {
            if (err) {
                console.log(err)
            }
            _member = _.extend(member, memberObj);
            _member.save(function (err, member) {
                //Member.update({_id:id},{$set:{avator:avator}}).exec();
                if (err) {
                    console.log(err)
                }
                res.redirect('/member/' + _member.id)
            })
        })
    } else {
        var avator = req.files.avator.name;
        if(avator && done === true){
            console.log('avator:'+avator);
            //新建业务线
            _member = new Member({
                avator: avator,
                nickName: memberObj.nickName,
                grade: memberObj.grade,
                educational: memberObj.educational,
                zanNum: memberObj.zanNum,
                desc: memberObj.desc,
                views: memberObj.views,
                qq: memberObj.qq,
                weixin: memberObj.weixin,
                tel: memberObj.tel,
                mail: memberObj.mail,
                college: memberObj.college,
                major: memberObj.major,
                company: memberObj.company,
                job: memberObj.job,
                sug: memberObj.sug,
                shares: memberObj.shares
            });
            _member.save(function (err, member) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/member/' + _member.id)
            })
        }
    }
};

//成员列表页
exports.list = function (req, res) {
    Member.fetch(function (err, members) {
        if (err) {
            console.log(err)
        }
        res.render('memberList', {
            title: '业务线列表页',
            members: members
        })
    })
};

//删除该成员
//所有put/delete方法都可以使用post方法
exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        Member.remove({_id: id}, function (err, member) {
            if (err) {
                console.log(err)
            }
            else {
                res.json({success: 1})
            }
        })
    }
};


