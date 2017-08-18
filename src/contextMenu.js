/**
 * contextMenu v1.0
 * @author Yuri2(yuri2peter@qq.com)
 * @link https://github.com/yuri2peter/contextMenu
 * Enjoy! (●'◡'●)
 */
$(function () {
    var ContextMenu={
        setContextMenu:function (jq_dom, menu) {
            if(typeof (jq_dom)==='string'){
                jq_dom=$(jq_dom);
            }
            jq_dom.unbind('contextmenu');
            jq_dom.on('contextmenu', function(e) {
                if(menu){
                    ContextMenu._renderContextMenu(e.clientX,e.clientY,menu,this);
                    if (e.cancelable) {
                        // 判断默认行为是否已经被禁用
                        if (!e.defaultPrevented) {
                            e.preventDefault();
                        }
                    }
                    e.stopPropagation();
                }
            });
            jq_dom.on('touchstart', function(e) {
                ContextMenu._removeContextMenu();
                var dom=this;
                dom.Yuri2ContextMenuPressed=true;
                if(menu){
                    setTimeout(function () {
                        if(dom.Yuri2ContextMenuPressed)
                            ContextMenu._renderContextMenu(e.originalEvent.changedTouches[0].clientX,e.originalEvent.changedTouches[0].clientY,menu,dom);
                    },1000);
                    e.stopPropagation();
                    if (e.cancelable) {
                        // 判断默认行为是否已经被禁用
                        if (!e.defaultPrevented) {
                            e.preventDefault();
                        }
                    }
                }
            });
            jq_dom.on('touchend', function(e) {
                this.Yuri2ContextMenuPressed=false;
            });
        },
        _className:'yuri2-context-menu',
        _renderContextMenu:function (x,y,menu,trigger) {
            this._removeContextMenu();
            if(menu===true){return;}
            var dom = $("<div class='"+ContextMenu._className+"'><ul></ul></div>");
            $('body').append(dom);
            var ul=dom.find('ul');
            for(var i=0;i<menu.length;i++){
                var item=menu[i];
                if(item==='|'){
                    ul.append($('<hr/>'));
                    continue;
                }
                if(typeof(item)==='string'){
                    ul.append($('<li>'+item+'</li>'));
                    continue;
                }
                if(typeof(item)==='object'){
                    var sub=$('<li>'+item[0]+'</li>');
                    ul.append(sub);
                    sub.click(trigger,item[1]);
                    sub.on('touchstart',trigger,item[1]);
                    continue;
                }
            }
            //修正坐标
            if(x+150>document.body.clientWidth){x-=150}
            if(y+dom.height()>document.body.clientHeight && document.body.clientHeight>0){y-=dom.height()}
            dom.css({
                top:y,
                left:x,
            });
        },
        _removeContextMenu:function () {
            $('.'+ContextMenu._className).remove();
        },
    };
    $(document).click(function () {
        ContextMenu._removeContextMenu();
    });
    $(document).on('touchstart',function () {
        ContextMenu._removeContextMenu();
    });
    $(document).on('contextmenu','.'+ContextMenu._className,function (e) {
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        e.stopPropagation();
    });
    $.fn.extend({
        setContextMenu:function (menu){
            ContextMenu.setContextMenu($(this),menu);
        }
    });
});
