var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var MemberSchema = new Schema({
    avator: String,
    nickName: String,
    grade: String,
    isBachelor: Boolean,
    zanNum: Number,
    desc: String, //一句话介绍
    views: Number,
    qq: Number,
    weixin: String,
    tel: Number,
    mail: String,
    college: String, //学院
    major: String, //专业
    company: String,
    job: String,
    sug: String, //大学生活及建议
    shares: String, //面试分享
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

MemberSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
})

MemberSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports = MemberSchema;
