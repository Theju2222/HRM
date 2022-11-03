from django.contrib import admin
from .models import Lead
# Register your models here.

admin.site.register(Lead)
class LeadModel(admin.ModelAdmin):
    fields = '__all__'
    list_display = fields
    search_fields = '__all__'
