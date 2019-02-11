from django.conf.urls import url , include 
from . import views
from django.urls import path
from . import views
urlpatterns = {
	path('',views.idx,name='index'),
	path('login',views.login,name='login'),
	path('logout',views.logout,name='logout'),
	path('add',views.addData,name='add'),
	path('del',views.delData,name='del'),
	path('update',views.updateData,name='update'),
	path('adduser',views.addUser,name='adduser'),
	path('varifyuser',views.varifyUser,name='varifyUser'),
	path('sau',views.sau,name='sau')
}