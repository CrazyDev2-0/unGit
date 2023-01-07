Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,50);
    return new Handlebars.SafeString(theString)
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
