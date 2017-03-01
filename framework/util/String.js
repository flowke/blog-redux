export function pre(){
    return Array.prototype.join.call(arguments,'_');
};
