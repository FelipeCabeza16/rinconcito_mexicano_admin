import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:rinconcito_mexicano/config/index.dart';
import 'package:rinconcito_mexicano/models/table.dart';
import 'package:rinconcito_mexicano/services/restaurant_service.dart';

class TableService {
  Future<List<Table>> fetchTables() async {
    try {
      final restaurantService = RestaurantService();
      final token = await restaurantService.token;
      final res = await http.get(
        Uri.http(URL, '/table/me/'),
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer $token'
        },
      );
      if (res.statusCode == 200) {
        final decodedBody = Map<String, dynamic>.from(json.decode(res.body));
        final jsonTables = decodedBody['tables'];
        final List<Table> mappedJSON = List<Table>.from(jsonTables.map((table) => Table.fromMap(table)).toList());
        return mappedJSON;
      }else {
        throw Exception('Error al obtener las mesas');
      }
    } catch (e) {
      return Future.error(e.toString());
    }
  }
}
