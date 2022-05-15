import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rinconcito_mexicano/blocs/login/login_bloc.dart';
import 'package:rinconcito_mexicano/blocs/product/product_bloc.dart';
import 'package:rinconcito_mexicano/blocs/table/table_bloc.dart';
import 'package:rinconcito_mexicano/screens/login_screen.dart';
import 'package:rinconcito_mexicano/services/product_service.dart';
import 'package:rinconcito_mexicano/services/restaurant_service.dart';
import 'package:rinconcito_mexicano/services/table_service.dart';


void main() {
  runApp(
    MultiBlocProvider(
      providers: [
        BlocProvider(create: (context) => LoginBloc(restaurantService: RestaurantService())),
        BlocProvider(create: (context) => ProductBloc(productService: ProductService())),
        BlocProvider(create: (context) => TableBloc(tablesService: TableService())),

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
