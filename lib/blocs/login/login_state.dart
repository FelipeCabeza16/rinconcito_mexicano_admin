part of 'login_bloc.dart';

class LoginState extends Equatable {
  final bool isLoggedIn;
  final Restaurant? restaurant;
  LoginState({this.isLoggedIn = false, this.restaurant});

  LoginState copyWith({
    bool? isLoggedIn,
    Restaurant? restaurant,
  }) =>
      LoginState(
        isLoggedIn: isLoggedIn ?? this.isLoggedIn,
        restaurant: restaurant ?? this.restaurant,
      );
  @override
  List<Object> get props => [isLoggedIn];
}
