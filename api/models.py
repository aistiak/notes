from django.db import models

# Create your models here.



class User(models.Model):
	name  = models.CharField(max_length=255,blank=False,unique=True)
	pas   = models.CharField(max_length=255,blank=False)
	email = models.EmailField(blank=False)
	#token = models.TextField()

	def __str__(self):
		return '{}'.format(self.name)	

class TempUser(models.Model):
	name  = models.CharField(max_length=255,blank=False,unique=True)
	pas   = models.CharField(max_length=255,blank=False)
	email = models.CharField(max_length=255,blank=False)
	code  = models.CharField(max_length=255)
	def __str__(self):
		return '{}'.format(self.name)



class TokenHolder(models.Model):
	token = models.TextField(blank=False)
	user  = models.ForeignKey(User,on_delete=models.CASCADE)

	def __str__(self):
		return '{}'.format(self.user)
		


class UserData(models.Model):
	user  = models.ForeignKey(User,on_delete=models.CASCADE)
	data  = models.TextField()


	def __str__(self):
		return "{}".format(self.user)


# class User(models.Model):
# 	name  = models.CharField(max_length=255,blank=False)
# 	email = models.CharField(max_length=255,blank=False,unique=True)


