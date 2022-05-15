import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:rinconcito_mexicano/models/product.dart';
import 'package:rinconcito_mexicano/services/product_service.dart';

part 'product_event.dart';
part 'product_state.dart';

class ProductBloc extends Bloc<ProductEvent, ProductState> {
  final ProductService productService;
  ProductBloc({required this.productService}) : super(const ProductState()) {
    on<FetchProducts>(_fetchProducts);
  }

  void _fetchProducts(FetchProducts event, Emitter<ProductState> emit) async{
    try {
      final products = await productService.fetchProducts();
      emit(ProductState(products: products));
    } catch (e) {
      print(e);
    }
  }
}
