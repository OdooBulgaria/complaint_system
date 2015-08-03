--------------------------
# HR Complaint System
--------------------------

## Functionality

> If this field is filled and the subtype of the message is 'complaint', then those messages can be filtered in the employee log menuitem in HR
> Do not delete the subtype "Complaint". 
> FIX: change the noupdate of mail_data.xml file to 0 and then upgrade the module


## Manager Note Logging
- [x] Create a functional field many2many that will automatically fetch all the mail.message regarding that manager and display
	- [x] Created a subtype
	- [x] Added an employee field in mail.message,complaint(text field)
	- [x] Created a tree view with employee,from date,to date filter  
	- [x] Create own subtype 
	- [x] Create a wizard to log a complaint
	 	
	> In short all the mail.message with subtype 'complaints' related document hr.employee and related id = id of employee will give
	> the biodata of the employee (This will be our standard employee log)
	
## Using this Module

- In order to use this module do the follwing
	- Create a mail.message
	- Enter the employee_id in mail.message
	- Choose the subtype as "Complaint"
	- Goto HR Module and then check Employee Logs menuitem
	 
- The "Employee Log" menuitem is only visible to HR Manager