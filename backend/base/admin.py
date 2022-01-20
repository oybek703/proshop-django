from django.contrib import admin
from .models import *


class ReviewInline(admin.TabularInline):
    model = Review
    readonly_fields = ('name', 'rating')
    can_delete = False
    extra = 0

    def has_change_permission(self, request, obj):
        return False


class ProductAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['num_reviews']
    inlines = [ReviewInline]


admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
