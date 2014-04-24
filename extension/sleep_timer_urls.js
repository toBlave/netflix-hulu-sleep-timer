var SleepTimerURLS = {
    matchURLS: [
        {
            urlMatch: "netflix\\.com",
            sleepTimerUrl: 'http://www.netflix.com'
        },
        {
            urlMatch: "hulu\\.com",
            sleepTimerUrl: 'http://www.hulu.com'
        }
    ],
    urlMatchExpressions: function(){
        return _.collect(SleepTimerURLS.matchURLS, function(urlData){
           return "(" + urlData.urlMatch + ")";
        }).join("|");
    }
}