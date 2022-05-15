import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rinconcito_mexicano/screens/login_screen.dart';
import 'package:rinconcito_mexicano/services/restaurant_service.dart';

import 'blocs/bloc/login_bloc.dart';

void main() {
  runApp(
    MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => LoginBloc(restaurantService: RestaurantService())),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rinconcito Mexicano',
      debugShowCheckedModeBanner: false,
      home:  const LoginScreen(),
    );
  }
}
