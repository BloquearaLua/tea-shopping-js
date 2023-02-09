function getTokenExp(exp) {  // exp 为时间戳
    const now = Math.floor(new Date().getTime()/1000);
    return now - exp > 0 ? true : false;  
}


module.exports = {
    getTokenExp,
}