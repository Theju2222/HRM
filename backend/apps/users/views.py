from rest_framework import generics
from rest_framework import filters as search
from django_filters import rest_framework as filters
from rest_framework.response import Response
from .serializers import UserListSerializer, UserSerializer, AddUserSerializer, UserSignInSerializer, UserUpdateSerializer
from .models import User
from .mixins import CustomLoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend


class AdminsFilter(filters.FilterSet):
    email = filters.CharFilter(lookup_expr="icontains")
    user_name = filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = User
        fields = [
            "user_name",
            "email",
            "role",
            'employee_id'
        ]


class AddUser(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AddUserSerializer


class UserSignIn(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignInSerializer


# If the class requires the login status, call CustomLoginRequiredMixin
class UserCheckLogin(CustomLoginRequiredMixin, generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        # We can get login_user information when we use CustomLoginRequiredMixin.
        # - request.login_user
        serializer = UserSerializer([request.login_user], many=True)
        return Response(serializer.data[0])


# Sample: Add this 'CustomLoginRequiredMixin' to the login-required class.
class UserList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AdminsFilter
    
    def get(self, request, *args, **kwargs):
        self.queryset = User.objects.all().filter(status='active').order_by('-id')
        
        if request.login_user.role in ['member']:
            self.queryset = User.objects.exclude(status='deleted').order_by(
                '-id').filter(Q(name=request.login_user))
        return self.list(request, *args, **kwargs)


class UserUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView ):
    serializer_class = UserUpdateSerializer
    queryset = User.objects.all()
    lookup_field = 'id'


class UserGet(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer