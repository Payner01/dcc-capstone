# Generated by Django 4.0.3 on 2022-03-28 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0004_remove_review_dislikes_remove_review_likes_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reviewlikes',
            name='like_dislike',
        ),
        migrations.AddField(
            model_name='reviewlikes',
            name='dislikes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='reviewlikes',
            name='likes',
            field=models.IntegerField(default=0),
        ),
    ]
