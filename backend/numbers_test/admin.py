from django.contrib import admin
from .models import Number, NumberModel, Comment

class NumberAdmin(admin.ModelAdmin):
    list_display = ('number', 'number_of_updates', 'test_attr',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

class CommentAdmin(admin.ModelAdmin):
    list_display = ('pk', 'user', 'title', 'content', 'number', 'updated', 'created',)

    list_filter = ('user',)

admin.site.register(NumberModel, NumberAdmin)
admin.site.register(Comment, CommentAdmin)

