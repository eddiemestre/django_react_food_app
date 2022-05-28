from django.contrib import admin
from .models import ReviewModel

# Register your models here.
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'date', 'review', 'private', 'date_created', 'date_modified',)
    search_fields = ('user', 'title',)
    readonly_fields = ('date_created', 'date_modified',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(ReviewModel, ReviewAdmin)
