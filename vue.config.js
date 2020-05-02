/**
 *该模块使用node将请求转发到后端的tomcat,最后部署到nginx的时候这部分可以不用
 */
//定义代理对象
let proxyObject={}
proxyObject['/']={
    ws:false,
    //定义请求转发目标地址（后端api地址）
    target:"http://localhost:8088",
    changeOrigin:true,
    //修改请求路径
    pathRewrite:{
        //对于请求的路径不做修改，要修改可以在''中定义
        '^/':''
    }
}

//导出配置信息
module.exports={
    devServer: {
        host:'localhost',
        //前端项目启动端口
        port:'8089',
        proxy:proxyObject
    }
}


