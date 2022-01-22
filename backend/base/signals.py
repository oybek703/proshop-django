from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from .models import Review


def update_user(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(update_user, sender=User)


def update_review(sender, instance, **kwargs):
    review = instance
    review.name = review.user.first_name or review.user.username or review.user.email


pre_save.connect(update_review, sender=Review)
