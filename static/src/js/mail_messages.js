openerp.complaint_system = function (instance) {
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;
    
    instance.web.complaint_system = instance.web.complaint_system || {};

    instance.web.views.add('tree_mail_message_quickadds', 'instance.web.complaint_system.filter_view_message');
    instance.web.complaint_system.filter_view_message = instance.web.ListView.extend({
        init: function() {
            this._super.apply(this, arguments);
            var self = this;
            this.employee_id = null;
            this.current_employee = null;
            self.employees = []
            self.from = null;
            self.subtype = null
            self.to = null;
            self.defs = [];
        },
        start:function(){
            var self = this;
            return this._super.apply(this, arguments).then(function(){
                if ('render_javascript' in self.dataset.context){
                    self.$el.parent().prepend(QWeb.render("MailMessageQuickAdd", {widget: this}));
                    self.$el.parent().find('.oe_select').change(function() {
                    		self.current_employee = this.value === '' ? null : parseInt(this.value);
        	                self.do_search(self.last_domain, self.last_context, self.last_group_by);
        	            });
                    self.$el.parent().find("input#from").change(function(){
                    	if (this.value !== "") 
                    		self.from = this.value;
                		else self.from = null
                    	self.do_search(self.last_domain, self.last_context, self.last_group_by);
                    });
                    self.$el.parent().find("input#to").change(function(){
                    	if (this.value !== "") 
                    		self.to = this.value;
                		else self.to = null            	
                    	self.do_search(self.last_domain, self.last_context, self.last_group_by);
                    });            
                    var mod = new instance.web.Model("hr.employee", self.dataset.context, self.dataset.domain);
                    self.defs.push(mod.call("list_employees", []).then(function(result) {
                    	self.employees = result;
                    }));
                    var view_id = new openerp.Model('ir.model.data');
                    self.defs.push(view_id.call("get_object_reference", ['complaint_system','mt_comment_complaints']).then(function(result) {
                    		self.subtype = result[1]
                    }));                        	
                }
                return $.when(self.defs);            	
            })
        },
        
        do_search:function(domain, context, group_by){
            var self = this;
            this.last_domain = domain;
            this.last_context = context;
            this.last_group_by = group_by;
            this.old_search = _.bind(this._super, this);
            var o;
            self.$el.parent().find('.oe_select').children().remove().end();
            self.$el.parent().find('.oe_select').append(new Option('', ''));
            return $.when(self.defs).then(function(){
                for (var i = 0;i < self.employees.length;i++){
                	o = new Option(self.employees[i][1], self.employees[i][0]);
                    self.$el.parent().find('.oe_select').append(o);
                }
                return self.search_by_employee_id();            	
            })
        },
        search_by_employee_id: function() {
            var self = this;
            var domain = [];
            console.log("===========================search_employee_by_id",self.subtype)
            if (self.current_employee !== null) domain.push(["employee_id", "=", self.current_employee]);
            domain.push(['subtype_id','=',self.subtype]);
            if (self.from !== null) domain.push(['create_date','>=',self.from])
        	if (self.to !== null) domain.push(['create_date','<=',self.to])
            self.last_context["employee_id"] = self.current_employee === null ? false : self.current_employee;
            var compound_domain = new instance.web.CompoundDomain(self.last_domain, domain);
            self.dataset.domain = compound_domain.eval();
            return self.old_search(compound_domain, self.last_context, self.last_group_by);            	
        },        
    });
};

