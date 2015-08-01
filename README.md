--------------------------
# HR Complaint System
--------------------------

## Manager Note Logging
- [ ] Create a functional field many2many that will automatically fetch all the mail.message regarding that manager and display
	- [x] Created a subtype
	- [ ] Added employee field in mail.message
	- [ ] Created a tree view with employee,from date,to date filter  
	- [ ] For this just enter the related model as "hr.employee"
	- [ ] Create own subtype 
	- [ ] Enter the related id as the id of the project manager 
	- [ ] In the many2many field look for the same subtype
	
	> In short all the mail.message with subtype 'complaints' related document hr.employee and related id = id of employee will give
	> the biodata of the employee (This will be our standard employee log) 