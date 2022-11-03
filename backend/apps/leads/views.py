from asyncio import Task
from dataclasses import field
from os import name
from pyexpat import model
from rest_framework import generics
from rest_framework import filters as search
from django_filters import rest_framework as filters
from rest_framework.response import Response
from .models import Lead
from .serializers import LeadSerializer, LeadListSerializer, LeadUpdateSerializer
from apps.users.mixins import CustomLoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class LeadFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="icontains")
    email = filters.CharFilter(lookup_expr="icontains")
    phone = filters.CharFilter(lookup_expr="icontains")
    degree = filters.CharFilter(lookup_expr="icontains")
    branch = filters.CharFilter(lookup_expr="icontains")
    year_of_graduation = filters.CharFilter(lookup_expr="icontains")
    date_of_calling = filters.DateFilter()
    vocab_interview_date = filters.DateTimeFilter(lookup_expr="date__time")
    communication_date_of_calling = filters.DateFilter()
    communication_interview_date = filters.DateFilter(lookup_expr="gte")
    hr_date_of_calling = filters.DateFilter()
    hr_interview_date = filters.DateFilter(lookup_expr="gte")
    offered_date_of_joining = filters.DateFilter()
    revised_date_of_joining = filters.DateFilter()

    class Meta:
        model = Lead
        fields = [
            "current_state",
            "native_state",
            "status",
            "calling_recruiter",
            "years_agreement",
            'liquidated_damage',
            'wfo',
            'tutoring',
            'relocate',
            'vocab_interview_status',
            'vocab_score',
            'vocab_interview_result',
            'vocab_interview_date',
            'communication_calling_recruiter',
            'communication_result',
            'communication_grade',
            'communication_interview_status',
            'hr_calling_recruiter',
            'hr_interview_status',
            'hr_result',
            'offered_status',
            'follow_by',
            'joined_status',
        ]

    def multi_string_filter(self, queryset, name, value):
        lookup = "{name}__in".format(name=name)
        return queryset.filter(**{lookup: value.split(',')})

    @property
    def qs(self):
        qs = super(LeadFilter, self).qs
        lead_type = self.request.query_params.get('lead_type', None)

        if lead_type is None:
            return qs.all()

        lead_type_collection = [
            'communication',
            'vocabulary',
            'leads',
            'hr',
            'offered',
        ]

        if lead_type not in lead_type_collection:
            return qs.none()

        if lead_type == 'leads':
            return qs.filter(status="rejected")

        if lead_type == 'communication':
            return qs.filter(vocab_interview_result="qualified")

        if lead_type == 'vocabulary':
            return qs.filter(status="shortlisted")

        if lead_type == 'hr':
            return qs.filter(communication_result="qualified")

        if lead_type == 'offered':
            return qs.filter(hr_result="shortlisted")

        return qs.all()


class LeadList( generics.ListAPIView):
    queryset = Lead.objects.all().order_by('-id')
    serializer_class = LeadListSerializer
    filter_backends = [DjangoFilterBackend, search.SearchFilter]
    filterset_class = LeadFilter
    search_fields = ['name']


class LeadFind(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadListSerializer


class LeadAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class LeadUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadUpdateSerializer
