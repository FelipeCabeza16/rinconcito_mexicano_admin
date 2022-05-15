import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:rinconcito_mexicano/config/index.dart';
import 'package:rinconcito_mexicano/models/product.dart';
import 'package:rinconcito_mexicano/models/restaurant.dart';
import 'package:rinconcito_mexicano/services/restaurant_service.dart';

class ProductService {
  Future<List<Product>> fetchProducts() async {
    try {
      final restaurantService = RestaurantService();
      final token = await restaurantService.token;
      final res = await http.get(
        Uri.http(URL, '/product/me/'),
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer $token'
        },
      );
      if (res.statusCode == 200) {
        final decodedBody = Map<String, dynamic>.from(json.decode(res.body));
        final jsonProducts = decodedBody['products'];
        return jsonProducts.map((service) => Product.fromMap(service)).toList();
      }else {
        throw Exception('Error al obtener los productos');
      }
    } catch (e) {
      return Future.error(e.toString());
    }
  }
}
