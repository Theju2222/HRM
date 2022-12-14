from apps.users.serializers import UserOptionSerializer
from .models import Lead
from rest_framework import serializers
from django.utils import timezone


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].login_user
        return super().create(validated_data)


class LeadListSerializer(serializers.ModelSerializer):
    updated_by = UserOptionSerializer()
    created_by = UserOptionSerializer()
    class Meta:
        model = Lead
        fields = '__all__'
        depth = 1


class LeadOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'name')


class LeadUpdateSerializer(serializers.ModelSerializer):
    calling_recruiter = UserOptionSerializer()

    class Meta:
        model = Lead
        fields = '__all__'
        depth = 1

    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.context['request'].login_user
        validated_data['updated_at'] = timezone.now()
        return super().update(instance, validated_data)
