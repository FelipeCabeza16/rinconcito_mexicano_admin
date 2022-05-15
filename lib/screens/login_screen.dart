import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rinconcito_mexicano/blocs/login/login_bloc.dart';
import 'package:rinconcito_mexicano/screens/home_screen.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Rinconcito'),
      ),
      body: BlocConsumer<LoginBloc, LoginState>(
        listener: (context, state) {
          if (state.isLoggedIn){
            Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => const HomeScreen()));
          }
        },
        builder: (context, state) {
          
          return Center(
            child: Column(
              children: [
                RaisedButton(
                  onPressed: () {
                    final loginBloc = BlocProvider.of<LoginBloc>(context);
                    loginBloc.add(const OnLoginTry(username: 'rinconcitomexicano@gmail.com', password: 'holamundo'));
                  },
                  child: const Text('Ir a inicio'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
