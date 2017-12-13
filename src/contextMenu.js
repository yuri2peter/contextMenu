/**
 * contextMenu v2.0
 * @author Yuri2(yuri2peter@qq.com)
 * @link https://github.com/yuri2peter/contextMenu
 * Enjoy! (●'◡'●)
 */
/**
 * 基于jq的右键菜单（动态绑定）
 * @author Yuri2
 */

window.ContextMenu={
    _className:'yuri2-context-menu',
    render:function (e, menu, trigger) {
        // return;//TODO for test
        var x=e.clientX,y=e.clientY;
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        e.stopPropagation();
        this._removeContextMenu();
        if(menu===true){return;}
        if(typeof menu === 'object' && menu.length===0){menu=[['...']]}
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