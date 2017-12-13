# contextMenu
A free  way to customize the context menu.自由定制页面元素的右键菜单。
![demo](http://ojp71nnay.bkt.clouddn.com/contextMenu-demo.png)
## Prepare

1. clone and star the repository
2. import jquery
3. import contextMenu.css
4. import contextMenu.js

## Usage

~~~js
            $('div.demo').contextmenu(function (e) {
                var menu=[
                    'menu1', //html code
                    'menu2',
                    '|', //delimiter
                    [
                        'click me', //title
                        function (e) {alert($(e.data).attr('id'))} // onclick
                    ],
                ];
                ContextMenu.render(e,menu,this)
            });
            $('body').contextmenu(function (e) {
                ContextMenu.render(e,true,this)
            }); //disable default menu
~~~

## More Subjects.
[Yuri2](https://github.com/yuri2peter/)