# Generated by Django 4.0.3 on 2022-11-03 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='vocab_interview_time',
            field=models.TimeField(null=True, verbose_name='Interview Date'),
        ),
    ]
