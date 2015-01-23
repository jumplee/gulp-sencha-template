# gulp-sencha-template
a great tool for somebody who don't like edit sencha template in javascript files.Just Enjoy it!

# setup
1. install node.js and npm
2. install gulp
3. cd the your project folder and copy the gulp.js and package.json to it.
4. run as 
```dash
npm install 
```
4. as normal user in china you may have to change you npm source to **taobao** use **nrm**
  [nrm](http://www.tuicool.com/articles/nYjqeu)
5. run as 
```dash
  gulp compile_template
```
:-D

6. Gulp will generate the tpl.js ,add it to the sencha app.json,or any way,make it loaded in the index.html.

#notices
1. I add a watch to make it auto compile ,it works fine in PC,but fails in Mac.
  just watch the code and find how to use it.
2. As the files grow ,you may find it will slow down ,because I concat all the files to the tpl.js.You can just **add another folder and gulp task** to compile a **tpl2.js**
