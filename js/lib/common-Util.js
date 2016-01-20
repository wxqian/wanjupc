/**
 * Created by wanglei on 2016/1/6.
 */

var Util = {};

/**
 * ɾ���ַ����ո�
 * @param str       �����ַ�
 * @returns {*}
 */
Util.trim = function(str){
    if(Util.getType(str) == "string" && str.length != 0){
        return str.replace(/\s+/g,"")
    }else{
        return str;
    }
};
/**
 * ��ȡ��������
 * @param obj       ��Ҫ�жϵĶ���
 * @returns {*}
 */
Util.getType = function(obj){
    return Object.prototype.toString.call(obj).toLowerCase().replace(/\[|\]/g, "").split(" ")[1];
};

/**
 * �ϲ��������󵽵�һ������
 * @param obj1
 * @param obj2
 */
Util.merge =  function (obj1, obj2) {
    var mergeRes;
    if (this.getType(obj1) == "object" && this.getType(obj2) == "object") {
        for (var i in obj2) {
            obj1[i] = obj2[i];
        }
        mergeRes = obj1;
    } else {
        mergeRes = obj1 || obj2;
    }
    return mergeRes;
};

/**
 * ʱ���ʽ������
 * @param date
 */
Util.dateHandle = function (date){
    this.d = new Date(date);
    this.year = this.d.getFullYear();
    this.month = this.d.getMonth();
    this.day = this.d.getDate();
    this._return = function(){
        return (this.year +"-"+ this.month +"-"+ this.day);
    }
};

/**
 * 去除像素单位中的px
 * @param str
 */
Util.removePx = function(str){
    var _str;
    if(Util.getType(str) == "string" && str.length != 0){
        var _length = str.length - 2;
        _str = str.substr(0,_length);
    }
    return Number(_str);
};
