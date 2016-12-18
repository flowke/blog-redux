
module.exports = {
    set: function(key, val, timeout){
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) { return false; }
        timeout = timeout ? '; max-age='+60*60*24*timeout : '';
        document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(val) + timeout;
    },
    get: function(key){
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    remove: function(key){
        if (!key || !this.hasIt(key)) { return false; }
        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        return true;
    },
    hasIt: function(key){
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
};
