import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rinconcito_mexicano/blocs/product/product_bloc.dart';

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({Key? key}) : super(key: key);

  @override
  State<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  @override
  void initState() {
    super.initState();
    final productBloc = BlocProvider.of<ProductBloc>(context);
    productBloc.add(FetchProducts());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Productos')),
      body: BlocBuilder<ProductBloc, ProductState>(
        builder: (context, state) {
          final products = state.products;
          if (products.isNotEmpty) {
            return ListView.builder(
              itemCount: products.length,
              itemBuilder: (context, index) {
                final product = products[index];
                return ListTile(
                  title: Text(product.name, style: const TextStyle(fontSize: 18)),
                  subtitle: Text(product.description, style: const TextStyle(fontSize: 18)),
                  trailing: Text(product.basePrice.toString(), style: const TextStyle(fontSize: 18)),
                );
              },
            );
          } else {
            return const Center(child: CircularProgressIndicator());
          }
          return const Center(
            child: Text('No tienes productos'),
          );
        },
      ),
    );
  }
}
