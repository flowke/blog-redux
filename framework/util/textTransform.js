
export default class CrazyLetter{
    constructor(doms){
        this.doms = doms;
    }
    init(){
        let doms = this.doms;
        for(let i=0, dom; dom = doms[i++];){
            this.bindHandle(dom);
        }
    }
    bindHandle(elem){
        var self = this;
        (function(html){
            elem.addEventListener('mouseover',function(){
                self.letterMutting(this, 'view this case', 5);
            });
            elem.addEventListener('mouseout' , function(){
                self.letterMutting(this, html, 5);
            });
        })(elem.innerHTML);
    }

    letterMutting(dom, endStr, count, reg){
        clearInterval(dom.timer);
        var reg1 = /[a-z]/gi;
        var reg2 = /[^\s]/gi;
        var text = dom.innerHTML;
        var i = 0,
            self = this;
        reg = reg1;
        dom.timer = setInterval(function(){
            if( i == count-3 ){
                reg = reg2;
            }

            dom.innerHTML = text = text.replace(reg, function(match){
                return self.getRandomLetter(97, 122);
            });

            if( i == count -2 ){
                if(text.length < endStr.length){
                    text = text.slice() + endStr.slice(text.length);
                }else{
                    text = text.slice(0, endStr.length);
                }
                dom.innerHTML = text;
            }
            if( ++i>=count ){
                clearInterval(dom.timer);
                setTimeout(function(){
                    dom.innerHTML = endStr;
                },200);
                // dom.innerHTML = endStr;
            }
        },80);
    }
    getRandomLetter(from, to){
        var at = getCode(from, to);
        return String.fromCharCode(at);
    }
}



/* toolMethod */
function getCode(from, to){
    return from + Math.floor(Math.random()*(to-from+1));
}
