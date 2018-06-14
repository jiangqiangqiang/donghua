var utils=(function () {
    function listToAry(arg) {
        var ary=[];
        try {
            ary=[].slice.call(arg)
        }catch (e) {
            for (var i = 0; i < arg.length; i++) {
                ary[i]=arg[i];
            }
        }
        return ary
    }
    function toJson(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr):eval("("+jsonStr+")")
    }
    function offset(curEle) {
        var parent=curEle.offsetParent;
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        while (parent){
            l+=parent.offsetLeft+parent.clientLeft;
            t+=parent.offsetTop+parent.clientTop;
            parent=parent.offsetParent;
        }
        return{
            t:t,
            l:l
        }
    }
    function getCss(ele,attr) {
        var res=null;
        if(window.getComputedStyle){
            res=window.getComputedStyle(ele)[attr]
        }else{
            res=els.currentStyle[attr];
        }
        var reg=/^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|rem|em)?$/;
        return reg.test(res)?parseFloat(res):res
    }
    function setCss(ele,attr,value) {
        var reg=/^(width|height|lineHeight|fontSize|(margin|padding)?(left|top|right|bottom)?)$/i;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value+="px"
            }
        }
        ele.style[attr]=value;
    }
    function setGroup(ele,obj) {
        if(!Object.prototype.toString.call(obj)=="[object Object]") return;
        for (var attr in obj){
            if(obj.hasOwnProperty(attr)){
                this.setCss(ele,attr,obj[attr])
            }
        }
    }
    //根据传参的不同，调用不同的方法
    function css() {
        var args=arguments;
        var fn=getCss;
        if(args.length==3) fn=setCss;
        if(args.length==2 && args[1] instanceof Object) fn =setGroup;
        return fn.apply(null, args)
    }
    function win(attr,value) {
        if(typeof value=="undefined"){
            return document.documentElement[attr]||document.body[attr]
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }
    function random(n,m) {
        n=Number(n);
        m=Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random()//返回默认的一个0-1随机数
        }
        if(n>m){//交换值
            n=n+m;
            m=n-m;
            n=n-m;
        }
        return Math.round(Math.random()*(m-n)+n)
    }

    function getElesByClass(strClass,context){
        context = context ||document;
        var eles = context.getElementsByTagName("*");
        var aClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
        for(var i = 0;i<aClass.length;i++){
            var curClass = aClass[i];
            var ary = [];
            var reg = new RegExp("(^| +)"+curClass+"( +|$)");
            for(var k = 0;k<eles.length;k++){
                if(reg.test(eles[k].className)){
                    ary.push(eles[k]);
                }
            }
            eles = ary;
        }
        return ary;
    }



    /**
     * @param ele 当前元素
     * @param strClass  单个类名
     * @return true|false
     */
    function hasClass(ele,strClass){
        var reg = new RegExp("(^| +)"+strClass+"( +|$)");
        return reg.test(ele.className)
    }

    /**
     * 添加类名
     * @param ele  当前的元素
     * @param strClass 一个类名或多个类名
     */
    function addClass(ele,strClass){
        var aryClass =  strClass.replace(/(^\s+|\s+$)/g,"").split(/\s+/g);
        for(var i = 0;i<aryClass.length;i++){
            var curClass =aryClass[i];
            if(!hasClass(ele,curClass)){
                ele.className += " "+curClass;
            }
        }
    }

    /**
     * 删除类名
     * @param ele  当前元素
     * @param strClass 一个类名或多个类名
     */
    function removeClass(ele,strClass){

        var aryClass = strClass.replace(/^ +| +$/g,"").split(/ +/g);
        for(var i = 0;i<aryClass.length;i++){
            var curClass =aryClass[i];
            var reg = new RegExp("(^| +)"+curClass+"( +|$)","g");
            if(hasClass(ele,curClass)){
                ele.className = ele.className.replace(reg," ");
            }
        }

    }
    function children(ele,tagName) {
        var nodeList = ele.childNodes;
        var ary = [];
        for(var i = 0; i < nodeList.length; i++){
            var temp = nodeList[i];
            if(typeof tagName === 'undefined'){
                if(temp.nodeType === 1){
                    ary.push(temp);
                }
            }else {
                if(temp.nodeType === 1 && temp.nodeName.toLowerCase() === tagName.toLowerCase()){
                    ary.push(temp);
                }
            }
        }
        return ary;
    }
    return {
        listToAry:listToAry,
        toJson:toJson,
        offset:offset,
        getCss:getCss,
        setCss:setCss,
        setGroup:setGroup,
        css:css,
        win:win,
        random:random,
        getElesByClass,
        children,
        removeClass,
        addClass,
        hasClass
    }
})();
