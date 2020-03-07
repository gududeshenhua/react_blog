module.exports = options =>{
    return async function adminauth(ctx,next){
        console.log('进入验证登录中间件'); 
        console.log(ctx.session);
        console.log(ctx.session.openId.openId); 
        if(ctx.session.openId.openId){
            await next() 
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}  