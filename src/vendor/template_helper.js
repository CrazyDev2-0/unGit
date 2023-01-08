Handlebars.registerHelper('trimString', function(passedString) {
    if(passedString === "") return  "";
    var theString = passedString.substring(0,50);
    theString = ": "+theString;
    return new Handlebars.SafeString(theString)
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('fromNow', function(date) {
    let str = date;
    try {
        str = moment(date).fromNow();
    }catch (e) {
        console.log(e);
    }
    return str;
})