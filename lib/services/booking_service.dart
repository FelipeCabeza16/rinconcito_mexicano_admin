import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:rinconcito_mexicano/config/index.dart';
import 'package:rinconcito_mexicano/models/booking.dart';
import 'package:rinconcito_mexicano/services/restaurant_service.dart';

class BookingService {
  Future<List<Booking>> fetchBookings() async {
    try {
      final restaurantService = RestaurantService();
      final token = await restaurantService.token;
      final res = await http.get(
        Uri.http(URL, '/booking/me/'),
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer $token'
        },
      );
      if (res.statusCode == 200) {
        final decodedBody = Map<String, dynamic>.from(json.decode(res.body));
        final jsonBookings = decodedBody['bookings'];
        final List<Booking> mappedJSON = List<Booking>.from(jsonBookings.map((service) => Booking.fromMap(service)).toList());
        return mappedJSON;
      }else {
        throw Exception('Error al obtener las reservas');
      }
    } catch (e) {
      return Future.error(e.toString());
    }
  }
}
