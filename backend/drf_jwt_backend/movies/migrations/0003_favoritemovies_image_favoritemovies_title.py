# Generated by Django 4.0.3 on 2022-03-23 04:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_watchlater_image_watchlater_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='favoritemovies',
            name='image',
            field=models.URLField(default=0, max_length=300),
        ),
        migrations.AddField(
            model_name='favoritemovies',
            name='title',
            field=models.CharField(default=0, max_length=100),
        ),
    ]
