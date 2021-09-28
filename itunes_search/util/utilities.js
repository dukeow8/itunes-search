module.exports = {
    //https://stackoverflow.com/questions/111529/how-to-create-query-parameters-in-javascript/44273682
    encodeQueryData: function(data){
        const ret = [];
        for (let d in data)
          ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
     }    
};
