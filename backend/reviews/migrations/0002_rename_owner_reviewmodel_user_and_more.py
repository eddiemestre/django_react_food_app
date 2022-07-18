# Generated by Django 4.0.4 on 2022-07-07 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reviewmodel',
            old_name='owner',
            new_name='user',
        ),
        migrations.AlterField(
            model_name='reviewmodel',
            name='review',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='reviewmodel',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]