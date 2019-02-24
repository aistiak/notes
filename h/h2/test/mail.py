import smtplib
def send_varification_mail(mail,code):

		frm = 'rudroiit@gmail.com'
		to  = mail
		pas = 'thepasshaschanged'
		server = smtplib.SMTP('smtp.gmail.com',587)
		server.starttls()
		server.login(frm,pas)
		print('login to the server ')
		msg = 'notes varification code '+code
		server.sendmail(frm,to,msg)
		print('sending mail')
		server.quit()
		print('exiting....')



send_varification_mail('rudroiit@gmail.com','1234')		