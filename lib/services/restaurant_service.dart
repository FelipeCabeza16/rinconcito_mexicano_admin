import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:rinconcito_mexicano/config/index.dart';
import 'package:rinconcito_mexicano/models/restaurant.dart';

class RestaurantService {
  Future<Restaurant> login(String username, String password) async {
    try {
      final body = {'username': username, 'password': password};
      final res = await http.post(
        Uri.http(URL, 'restaurant/login/'),
        headers: {
          "Content-Type": "application/json",
        },
        body: json.encode(body)
      );
      final decodedBody = Map<String, dynamic>.from(json.decode(res.body));
      if (res.statusCode == 200) {
      final parsedJSON = res.body;
        return Restaurant.fromMap(decodedBody['restaurant']);
      } else {
        throw Exception('Failed to load restaurant');
      }
    } catch (e) {
      return Future.error('Credenciales incorrectas o no hay conexión');
    }
  }
}
