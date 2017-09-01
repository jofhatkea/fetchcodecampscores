class FetchGoogleJSON {
    constructor(url, callback, prettify=true){
        let re = /^https:/;
        if(!re.test(url)){
            url="https://spreadsheets.google.com/feeds/list/"+url+"/od6/public/values?alt=json";
        }
        fetch(url).then(e=>e.json()).then(d=>{
            if(prettify){
                callback(new PrettifyGoogleJSON(d).get());
            } else {
                callback(d);
            }
        })
    }
}
