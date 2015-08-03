from openerp.osv import fields, osv

class mail_message(osv.Model):
    _inherit = "mail.message"
    _description = "Complaint System"


    def log_complaint(self,cr,uid,ids,context=None):
        if context.get('default_subtype_complaint',False):
            self.write(cr,uid,ids,{'subtype_id':self._get_subtype_id(cr,uid)},context)
        return True
    
    def _get_subtype_id(self,cr,uid):
        id = self.pool.get('ir.model.data').get_object_reference(cr, uid, 'complaint_system', 'mt_comment_complaints')[1]
        return id
    # this is to make sure that if the complaint is logged from the "Log a complaint" wizard then the subtype chosen is complaint
    
    _columns = {
                'employee_id':fields.many2one('hr.employee','Related Emplyee',help="If this field is filled and the subtype of the message is"\
                                                                        "'complaint', then those messages can be filtered in the employee log menuitem in HR"),
                'complaint':fields.text('Employee Complaint',help="Visible only when employee is entered")
                }