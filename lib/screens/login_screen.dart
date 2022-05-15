import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rinconcito_mexicano/blocs/bloc/login_bloc.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Rinconcito'),
      ),
      body: BlocBuilder<LoginBloc, LoginState>(
        builder: (context, state) {
          return Center(
            child: Column(
              children: [
                Text('Estado del login: ${state.isLoggedIn}'),
                RaisedButton(
                  onPressed: () {
                    final loginBloc = BlocProvider.of<LoginBloc>(context);
                    loginBloc.add(const OnLoginTry(username: 'rinconcitomexicano@gmail.com', password: 'holamundo'));
                  },
                  child: Text('Iniciar'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
