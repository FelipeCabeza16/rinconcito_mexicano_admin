import 'package:flutter/material.dart';
import 'package:rinconcito_mexicano/screens/bookings_screen.dart';
import 'package:rinconcito_mexicano/screens/products_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Inicio'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            RaisedButton(
              child: const Text('Ver productos'),
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => const ProductsScreen(),
                ),
              ),
            ),
            RaisedButton(
              child: const Text('Ver reservas'),
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) => const BookingsScreen(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
