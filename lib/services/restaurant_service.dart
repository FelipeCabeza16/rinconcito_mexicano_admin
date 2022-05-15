import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:rinconcito_mexicano/config/index.dart';
import 'package:rinconcito_mexicano/models/restaurant.dart';
import 'package:rinconcito_mexicano/utils/token_parser.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RestaurantService {
  RestaurantService();
  String _token = '';
  Future<String?> get token async {
    if (_token.isNotEmpty) {
      return _token;
    } else {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      return prefs.getString('token');
    }
  }


  Future<bool> isValidToken(String token) async {
    if (token.isNotEmpty) {
      final decodedToken = parseJwt(token);
      final isValidToken =
          decodedToken['exp'] * 1000 > DateTime.now().millisecondsSinceEpoch;
      if (isValidToken) {
        return true;
      }
      return false;
    }
    return false;
  }

    Future<bool> _persistToken(token) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString('token', token);
  }

  Future<bool> _saveToken(String token) async {
    if (token != null) {
      await _persistToken(token);
      _token = token;
      return true;
    }

    return false;
  }

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
        await _saveToken(decodedBody['token']);
        return Restaurant.fromMap(decodedBody['restaurant']);
      } else {
        throw Exception('Failed to load restaurant');
      }
    } catch (e) {
      return Future.error('Credenciales incorrectas o no hay conexión');
    }
  }
}
