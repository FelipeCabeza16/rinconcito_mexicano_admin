import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:rinconcito_mexicano/services/restaurant_service.dart';

part 'login_event.dart';
part 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final RestaurantService restaurantService;
  LoginBloc({required this.restaurantService}) : super(const LoginState()) {
    on<OnLoginTry>(_onLogginTry);
  }

  Future<void> _onLogginTry(OnLoginTry event, Emitter<LoginState> emit) async {
    try {
      final restaurant =
          await restaurantService.login(event.username, event.password);
      if (restaurant.name.isNotEmpty) {
        emit(const LoginState(isLoggedIn: true));
      } else {
        emit(const LoginState(isLoggedIn: false));
      }
    } catch (e) {
      print(e);
    }
  }
}
