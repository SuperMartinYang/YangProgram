var express = require('express');

var app = express();

//set handlebar
var handlers = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlers',handlers.engine);
app.set('view engine','handlers');

//设置端口
app.set('port',process.env.PORT || 3000);

app.get('/',function(req,res){
  res.send('home');
})

app.get('/about',function(req,res){
  res.render('about');
})
//404 catch-all 处理器中间件
app.use(function(req,res,next){
  res.status(404);
  res.render('404');
})
//500 错误处理中间件
app.use(function(err,req,res,next){
  console.error(err.stack)
  res.status(500);
  res.render('500');
})

app.listen(app.get('port'),function(){
  console.log('Express started on http://localhost:'+app.get('port')+';press Ctrl-C to terminate.');
})

module.exports = app;