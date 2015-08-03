from openerp.osv import fields, osv

class hr(osv.Model):
    _inherit = "hr.employee"
    _description = "Customer Complaint"

    def list_employees(self, cr, uid, context=None):
        ng = dict(self.pool.get('hr.employee').name_search(cr,uid,'',[]))
        ids = ng.keys()
        result = []
        for employee in self.pool.get('hr.employee').browse(cr, uid, ids, context=context):
            result.append((employee.id,ng[employee.id]))
        return result
        