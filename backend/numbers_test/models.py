from tokenize import Number
from django.db import models
from django.forms import IntegerField
from django.contrib.auth.models import User
from account.models import Account

# Create your models here.
# for testing stuff out
class NumberModel(models.Model):
    number = models.IntegerField()
    number_of_updates = models.IntegerField(default=0)
    test_attr = models.IntegerField(default=0)

    def __str__(self):
        return str(self.number)

    def get_number(self) -> int:
        return self.number
    
    def get_number_of_updates(self) -> int:
        return self.number_of_updates
    
    def update_number(self, new_num: int) -> None:
        print('in update number within models')
        self.number = new_num
        self.number_of_updates += 1
        return None

class Comment(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="comments", related_query_name="comment")
    content = models.TextField()
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    number = models.ForeignKey(NumberModel, on_delete=models.CASCADE, related_name="numbers", related_query_name="numbers")

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title
