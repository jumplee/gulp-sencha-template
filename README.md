# gulp-sencha-template
a great tool for somebody who don't like edit sencha template in javascript files.Just Enjoy it!

(中文说明)[https://github.com/jumplee/gulp-sencha-template/blob/master/%E8%AF%B4%E6%98%8E.md]

# setup
1. install node.js and npm
2. install gulp
3. cd the your project folder and copy the gulp.js and package.json to it.
4. run as 
```dash
npm install 
```
mac or linux user
```dash
sudo npm install
```
4. 天朝屌丝记得把 npm源改为 **taobao** use **nrm**
  [nrm](http://www.tuicool.com/articles/nYjqeu)
5. run as 
```dash
  gulp compile_template
```


6. Gulp will generate the tpl.js ,add it to the sencha app.json,or any way,make it loaded in the index.html.
7. you can add watch for the html files to auto compile
```dash
gulp watch
//just enjoy it
//:-D
```

#usage

###You can use with a variable.


```javascript

{
    xtype:'panel',
    tpl:_.tpl.name.Info
}
```
### I recommend you to use this way for DI.

1.override component class

```javascript
//修改Ext的模板功能，可以通过变量配置html来实现
Ext.Component.override({
applyTpl: function(config) {
//看是不是类似 name.info 这样的单词
if(typeof config=='string'&&/^\w*(\.\w*)*$/.test(config)){
//var tpl_ar=tpl.split('.');
//for(var i=0;i<tpl_ar.length;i++){
//	_.tpl[tpl[i]]
//}
//获取变量
eval('var realTpl=_.tpl.'+config);
//如果数组中有这个变量就说明 tpl解析正确
if(realTpl){
//用真实的模板覆盖config
config=realTpl;
}
}
//其他情况说明，这个配置是普通的tpl就直接走老的逻辑
return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
}
});
//修改DataView的itemTpl功能，可以通过变量配置html来实现
Ext.DataView.override({
applyItemTpl: function(config) {
//看是不是类似 name.info 这样的单词
if(typeof config=='string'&&/^\w*(\.\w*)*$/.test(config)){
//var tpl_ar=tpl.split('.');
//for(var i=0;i<tpl_ar.length;i++){
//	_.tpl[tpl[i]]
//}
//获取变量
eval('var realTpl=_.tpl.'+config);
//如果数组中有这个变量就说明 tpl解析正确
if(realTpl){
//用真实的模板覆盖config
config=realTpl;
}
}
//其他情况说明，这个配置是普通的tpl就直接走老的逻辑
return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
}
})

```
I'm chinese ,so enjoy the beauty of Chinese. ⊙﹏⊙b汗

2.use like that:

```javascript
{
xtype:'panel',
tpl:'name.info'
}

```

3.with [gulp-html-include](https://www.npmjs.com/package/gulp-html-tag-include) you  can use **<inlcude> tag** to save your life .

```html
<div class="info">
<include src="user.html"></inlcude>
</div>
```

#notices&tips
1. As the files grow ,you may find it will slow down ,because I concat all the files to the tpl.js.You can just **add another folder and gulp task** to compile a **tpl2.js**
