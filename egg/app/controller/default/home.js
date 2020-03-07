'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let reuslt = await this.app.mysql.get('blog_content',{});
    console.log(reuslt);  
    ctx.body = 'hi, egg';
  }
  async list() {
    const { ctx } = this;
    ctx.body = '<h1>jspang blog list</h1>';
  }

  async getArticleList(){
    let sql = 'SELECT article.id as id,'+
    'article.article_content as title,'+
    'article.introduce as introduce,'+
    'article.addTime as addTime,'+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.id'
    const reuslts = await this.app.mysql.query(sql);
    console.log(reuslts); 
    this.ctx.body = {
        data:reuslts
    }
  }
  async getArticleById(){  
      //先配置路由的动态传值，然后再接收值
      console.log('接受输出的传参');
      console.log(this.ctx.params); 
      let id = this.ctx.params.id;
      let sql = 'SELECT article.id as id,'+ 
      'article.introduce as introduce,'+
      'article.article_content as article_content,'+
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
      'article.view_count as view_count ,'+
      'type.typeName as typeName ,'+
      'type.id as typeId '+
      'FROM article LEFT JOIN type ON article.type_id = type.id '+
      'WHERE article.id='+id  
      const result = await this.app.mysql.query(sql);
      this.ctx.body={data:result}
  }
  async getTypeInfo(){
    const result = await this.app.mysql.select('type');
    this.ctx.body = { 
      data:result 
    }
  }
  //根据类别ID获得文章列表
  async getListById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    //'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.id '+
    'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
}

module.exports = HomeController;
