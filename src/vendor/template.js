(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['list.template'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
            var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"data") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":38,"column":14}}})) != null ? stack1 : "");
        },"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
            var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "        <div class=\"info-card\">\n          <div class=\"card-title\"><a href=\""
                + alias4(((helper = (helper = lookupProperty(helpers,"html_url") || (depth0 != null ? lookupProperty(depth0,"html_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"html_url","hash":{},"data":data,"loc":{"start":{"line":4,"column":43},"end":{"line":4,"column":55}}}) : helper)))
                + "\" target=\"_blank\">"
                + alias4(((helper = (helper = lookupProperty(helpers,"owner") || (depth0 != null ? lookupProperty(depth0,"owner") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data,"loc":{"start":{"line":4,"column":73},"end":{"line":4,"column":82}}}) : helper)))
                + "/"
                + alias4(((helper = (helper = lookupProperty(helpers,"repo") || (depth0 != null ? lookupProperty(depth0,"repo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"repo","hash":{},"data":data,"loc":{"start":{"line":4,"column":83},"end":{"line":4,"column":91}}}) : helper)))
                + "</a></div>\n          <div class=\"card-subtitle\">\n            "
                + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":21}}}) : helper)))
                + "\n"
                + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"isIssue") : depths[1]),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":11,"column":19}}})) != null ? stack1 : "")
                + "          </div>\n"
                + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"isIssue") : depths[1]),{"name":"unless","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":10},"end":{"line":30,"column":21}}})) != null ? stack1 : "")
                + "          <div class=\"details\">\n            <div class=\"chat-count\"><img src=\"/assets/icons/chat.png\" />"
                + alias4(((helper = (helper = lookupProperty(helpers,"comments_count") || (depth0 != null ? lookupProperty(depth0,"comments_count") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments_count","hash":{},"data":data,"loc":{"start":{"line":32,"column":72},"end":{"line":32,"column":92}}}) : helper)))
                + "</div>\n            &nbsp; &#x2022; &nbsp;\n            <b>opened</b>&nbsp;"
                + alias4(((helper = (helper = lookupProperty(helpers,"created_at") || (depth0 != null ? lookupProperty(depth0,"created_at") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data,"loc":{"start":{"line":34,"column":31},"end":{"line":34,"column":45}}}) : helper)))
                + " &nbsp; &#x2022; &nbsp;\n            <b>last updated</b>&nbsp;"
                + alias4(((helper = (helper = lookupProperty(helpers,"created_at") || (depth0 != null ? lookupProperty(depth0,"created_at") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data,"loc":{"start":{"line":35,"column":37},"end":{"line":35,"column":51}}}) : helper)))
                + "\n          </div>\n        </div>";
        },"3":function(container,depth0,helpers,partials,data) {
            var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"labels") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":10,"column":26}}})) != null ? stack1 : "");
        },"4":function(container,depth0,helpers,partials,data) {
            var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "                    <span class=\"label\" style=\"border-color: #"
                + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":9,"column":62},"end":{"line":9,"column":71}}}) : helper)))
                + "; color: #"
                + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":9,"column":81},"end":{"line":9,"column":90}}}) : helper)))
                + "\">"
                + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":92},"end":{"line":9,"column":100}}}) : helper)))
                + "</span>";
        },"6":function(container,depth0,helpers,partials,data) {
            var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "              <div class=\"\">\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"reviewers_status") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":16},"end":{"line":25,"column":26}}})) != null ? stack1 : "")
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"requested_reviewers") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":16},"end":{"line":28,"column":26}}})) != null ? stack1 : "")
                + "              </div>\n";
        },"7":function(container,depth0,helpers,partials,data) {
            var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"state") : depth0),"APPROVED",{"name":"ifEquals","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":18},"end":{"line":18,"column":31}}})) != null ? stack1 : "")
                + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"state") : depth0),"COMMENTED",{"name":"ifEquals","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":18},"end":{"line":21,"column":31}}})) != null ? stack1 : "")
                + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"state") : depth0),"CHANGES_REQUESTED",{"name":"ifEquals","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":18},"end":{"line":24,"column":31}}})) != null ? stack1 : "");
        },"8":function(container,depth0,helpers,partials,data) {
            var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "                    <span class=\"label\" style=\"background-color: "
                + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":17,"column":65},"end":{"line":17,"column":74}}}) : helper)))
                + "\"><span class=\"dot red\"></span>"
                + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":17,"column":105},"end":{"line":17,"column":117}}}) : helper)))
                + "</span>\n";
        },"10":function(container,depth0,helpers,partials,data) {
            var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "                    <span class=\"label\" style=\"background-color: "
                + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":20,"column":65},"end":{"line":20,"column":74}}}) : helper)))
                + "\"><span class=\"dot yellow\"></span>"
                + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":20,"column":108},"end":{"line":20,"column":120}}}) : helper)))
                + ": "
                + ((stack1 = (lookupProperty(helpers,"trimString")||(depth0 && lookupProperty(depth0,"trimString"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"body") : depth0),{"name":"trimString","hash":{},"data":data,"loc":{"start":{"line":20,"column":122},"end":{"line":20,"column":143}}})) != null ? stack1 : "")
                + "</span>\n";
        },"12":function(container,depth0,helpers,partials,data) {
            var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "                    <span class=\"label\" style=\"background-color: "
                + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":23,"column":65},"end":{"line":23,"column":74}}}) : helper)))
                + "\"><span class=\"dot green\"></span>"
                + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":23,"column":107},"end":{"line":23,"column":119}}}) : helper)))
                + ": "
                + ((stack1 = (lookupProperty(helpers,"trimString")||(depth0 && lookupProperty(depth0,"trimString"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"body") : depth0),{"name":"trimString","hash":{},"data":data,"loc":{"start":{"line":23,"column":121},"end":{"line":23,"column":142}}})) != null ? stack1 : "")
                + "</span>\n";
        },"14":function(container,depth0,helpers,partials,data) {
            var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "                    <span class=\"label\" style=\"background-color: "
                + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":27,"column":65},"end":{"line":27,"column":74}}}) : helper)))
                + "\"><span class=\"dot yellow\"></span>"
                + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":27,"column":108},"end":{"line":27,"column":120}}}) : helper)))
                + "</span>";
        },"16":function(container,depth0,helpers,partials,data) {
            return "    <div style=\"\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 100%;\n        height: 100%;\">\n        <p>No content available, check other categories</p>\n    </div>\n";
        },"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
            var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"count") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(16, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":48,"column":7}}})) != null ? stack1 : "");
        },"useData":true,"useDepths":true});
})();