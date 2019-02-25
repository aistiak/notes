from django.shortcuts import render
from django.http import Http404, HttpResponseRedirect, HttpResponse
from django.http import JsonResponse
from .models import UserData , User ,TempUser ,TokenHolder
from django.views.decorators.csrf import csrf_exempt
import json
import random ,string 
import smtplib
# Create your views here.

@csrf_exempt
def login(request):
	name = request.POST.get('name')
	pas  = request.POST.get('pas')

	#return HttpResponse('ok')
	# if creds are ok give a new token
	try:
	 	o = User.objects.get(name=name)

	 	if o.pas == pas:
	 		new_token  = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(40))
	 		tkh = TokenHolder()
	 		tkh.user = o
	 		tkh.token = new_token
	 		tkh.save() 
	 		# o.token+=','+new_token
	 		# o.save()
	 		response = {"token":new_token}
	 		response = str(response).replace("\'","\"")
	 		
	 		return HttpResponse(str(response))
	 	else:
	 		return HttpResponse("credential err")	

	except Exception as e:
		return HttpResponse(str(e))


@csrf_exempt
def logout(request):
	token = request.POST.get('token')

	try:
		TokenHolder.objects.get(token=token).delete()
		return HttpResponse('ok')
        
	except Exception as e:
		return HttpResponse(str(e))

	# try:
	# 	o = User.objects.all()

	# 	for i in o:
	# 		li = i.token.split(',')
	# 		if token in li:
	# 			i.token = i.token.replace(','+token,'')
	# 			i.save()
	# 			return HttpResponse('ok')
	# 	return HttpResponse('404')		
	# except Exception as e:
	# 	return HttpResponse(str(e))

	

@csrf_exempt
def idx(request):
	
	#name = request.POST.get('name')
	#pas  = request.POST.get('pas')
	token = request.POST.get('token')

	try:

		tk = TokenHolder.objects.get(token=token)
		u  = tk.user
		data = UserData.objects.get(user=u).data
		data = data.replace("\'","\"")
		return HttpResponse(data)
		pass
	except Exception as e:
		return HttpResponse(str(e))
		


	# try:

	# 	o = User.objects.all()
	# 	name = ''
	# 	for i in o:
	# 		li = i.token.split(',')
	# 		if token in li:
	# 			name = i.name
	# 			break

	# 	if len(name) == 0 :
	# 		return HttpResponse('invalid token')		

	# 	o = User.objects.get(name=name)
	# 	# #o = UserData.objects.get(name=name)

	# 	#if o.pas == pas:
	# 	temp = UserData.objects.get(user=o).data
	# 	temp = temp.replace("\'","\""); 
	# 	return HttpResponse(temp)
	# 	#else:
	# 	#	return HttpResponse('name of password is wrong')	

	# except Exception as e:
	# 	return HttpResponse('error'+str(e))




@csrf_exempt
def addData(request):

	# name = request.POST.get('name')
	# pas  = request.POST.get('pas')
	data = request.POST.get('data')
	token = request.POST.get('token')

	#data = data.replace("\'","$sq$")
	#data = data.replace("\"","$dq$") 
	#return HttpResponse('helo')

	try:
		t = TokenHolder.objects.get(token=token)
		o = t.user
		#o = User.objects.get(name=name)
		
		
			# get the data from data base and append 
		udo = UserData.objects.get(user=o)  # udo = UserData Object 
		d = json.loads(udo.data.replace("\'", "\"")) # tihis causes a problem 
		t = json.loads(data)
		#add an id to it 
		r_id = random.randint(10000,99999)
		t['id'] = str(r_id)
		d.append(t)
		udo.data = d
		udo.save() # UserData is parent table 
		return HttpResponse(r_id)
		#return HttpResponse('done')
	except Exception as e:
		return HttpResponse('err : '+str(e))






#todo
@csrf_exempt
def delData(request):
	# name    = request.POST.get('name')
	# pas     = request.POST.get('pas')
	data_no = request.POST.get('id')
	token   = request.POST.get('token')

	# find the data with id and del it 
	try:
		t = TokenHolder.objects.get(token=token)
		u = t.user
		#u = User.objects.get(name=name)
		#if u.pas == pas:
		udo = UserData.objects.get(user=u)
		json_data = udo.data.replace("\'", "\"")
		json_data = json.loads(json_data)
		idx = 0 
		for r in json_data:
			try:

				if r['id'] == data_no:
					#del the record
					del json_data[idx] 
					break 
				idx = idx +1 	
				
			except Exception as e:
				raise
			#u = UserData.objects.all()[0]
		udo.data = str(json_data)
		udo.save()
		return HttpResponse(str(json_data)) # returning as string 		

	except Exception as e:
		return HttpResponse('err : ' + str(e))


	return HttpResponse('data not deleted ')



#todo
@csrf_exempt
def updateData(request):
	# name         = request.POST.get('name')
	# pas          = request.POST.get('pas')
	data_no      = request.POST.get('id')
	updated_data = request.POST.get('data')
	token        = request.POST.get('token')

	#updated_data = data.replace("\'","$sq$")
	#updated_data = data.replace("\"","$dq$") 



	try:
		t = TokenHolder.objects.get(token=token)
		u = t.user
	   	#u = User.objects.get(name=name)


		udo = UserData.objects.get(user=u)
		json_data = udo.data.replace("\'", "\"")
		json_data = json.loads(json_data)
		idx = 0
		flag = 0 
		for r in json_data:

			try:

				if r['id'] == data_no:
		   			del json_data[idx]
		   			flag = 1
		   			break
				
			except Exception as e:
				raise

			idx = idx + 1 

		if  flag == 1:
	   		json_data.append(json.loads(updated_data))
	   		#t = UserData.objects.get(name=name)
	   		udo.data = str(json_data) # changed
	   		udo.save()
	   		#r = UserData.objects.get(name=name).data
	   		return HttpResponse(json_data)
		else:
	   		return HttpResponse('no id found')	

	


	except Exception as e:
		return HttpResponse('err : ' + str(e) )

	#r = UserData.objects.get(name=name).data
	return HttpResponse('no change')	



# adding user needs email confermation 
# when the code is confirmed then the UserData Table will be created
@csrf_exempt 
def addUser(request):

	name  = request.POST.get('name')
	pas   = request.POST.get('pas')
	email = request.POST.get('email')


	try:
	#validate username and pass length 
		if len(name)<=3:
			return HttpResponse('username too short ')
			if len(pas)<=3 :
				return HttpResponse('password to short ')

		#check if user alreasy exist id db 

		o = User.objects.all()

		for i in o:
			if i.name == name:
				return HttpResponse('this username is taken')

		#check if mail already exists in db
		
		for i in o:
			if i.email == email:
				return HttpResponse('email is taken ')		


		# create user
		n = TempUser()
		n.name  = name
		n.pas   = pas
		n.email = email
		code = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(16))
		send_varification_mail(mail=email,code=code)
		n.code  = code
		n.save()
		#create user data 
		# ud = UserData()
		# ud.user = n
		# ud.data = '[]'
		# ud.save()

		return HttpResponse('ok')
			


		
	except Exception as e:
		return HttpResponse('err : ' + str(e) )
	
@csrf_exempt 
def varifyUser(request):
	code = request.POST.get('code')
	mail = request.POST.get('mail')
	
    #transfer from TempUser to User :)
	
	o = TempUser.objects.all()

	for i in o:
		if i.email == mail:
			if i.code == code:
    			#add to User
				u = User()
				u.name = i.name
				u.email = i.email
				u.pas = i.pas
				u.save()

				ud = UserData()
				ud.user = u
				ud.data = "[]"
				ud.save()
				return HttpResponse('ok')

	return HttpResponse('err')			



# see all user
def sau(request):	
	u = UserData.objects.all()
	li = []
	li.append('')
	for i in u:
		li.append(i.name)


	return HttpResponse(li)

# change pass 

# forgot pass


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

	# server = smtplib.SMTP('smtp.gmail.com', 587)
	# server.starttls()
	# server.login("rudroiit@gmail.com", "01121994ar")
	 
	# msg = "notes app varification code : "+code
	# server.sendmail("rudroiit@gmail.com", mail, msg)
	# server.quit()


# todo : api ends needed to be desingned 


# forgot pass (methods : register_locked_temp_user , change_pass_for_locked_user)
@csrf_exempt 
def register_locked_temp_user(request):

	try:
		
		# find the mail first
		mail = request.POST.get('mail')


		u = User.objects.get(email=mail)

		temp_user = TempUser()
		temp_user.name  = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(5))
		temp_user.pas   = ''
		temp_user.email = mail
		temp_user.code  = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(16))
		temp_user.save()

		#return HttpResponse(str(temp_user))

	except Exception as e:
		return HttpResponse(str(e))

	try:
		send_varification_mail(mail,temp_user.code)
		return HttpResponse("ok")
	except Exception as e:
		return HttpResponse(str(e))



@csrf_exempt
def change_pass_for_locked_user(request):

	try:
		#pass
		mail = request.POST.get('mail')
		code = request.POST.get('code') 
		pas  = request.POST.get('pas')

	 

		temp_user = TempUser.objects.get(email=mail,code=code)

		if temp_user.code == code: # if  varification code matches then change the pass for the eamil holding user 
			user = User.objects.get(email=mail)
			user.pas = pas
			user.save()
            # deleting the temp user after changing the password 
			temp_user.delete()

			return HttpResponse("ok")

	except Exception as e:
		return HttpResponse(str(e))



# change pass (methods : change_user_pass will // will not use token need mail and pass )
@csrf_exempt
def change_pass_home_user(request):

	mail = request.POST.get('mail')
	old_pas = request.POST.get('old_pas')
	new_pas = request.POST.get('new_pas')

	#return HttpResponse(new_pas)

	try:
		u = User.objects.get(email=mail)

		if u.pas == old_pas:
			u.pas = new_pas
			u.save()
			return HttpResponse("ok")
		else:
			return HttpResponse("old pass incorrect")	
	except Exception as e:

		return HttpResponse("wrong email")






# delete user (method  : del_user // will not use token needs user name asn pass)


	




