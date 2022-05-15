part of 'login_bloc.dart';

class LoginState extends Equatable {
  final bool isLoggedIn;
  const LoginState({this.isLoggedIn = false});

  LoginState copyWith({
    bool? isLoggedIn,
  }) =>
      LoginState(isLoggedIn: isLoggedIn ?? this.isLoggedIn);
  @override
  List<Object> get props => [isLoggedIn];
}
