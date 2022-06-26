from django.db import models
from account.models import Account

# Create your models here.
class ReviewModel(models.Model):
    title = models.CharField(max_length=120)
    date = models.DateTimeField(null=True, blank=True)
    date_modified = models.DateField(auto_now=True)
    date_created = models.DateField(auto_now_add=True)
    review = models.TextField(null=True, blank=True)
    private = models.BooleanField(default=False)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="reviews", related_query_name="review")

    def __str__(self):
        return self.title



        