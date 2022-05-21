import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rinconcito_mexicano/blocs/bloc/booking_bloc.dart';

class BookingsScreen extends StatefulWidget {
  const BookingsScreen({Key? key}) : super(key: key);

  @override
  State<BookingsScreen> createState() => BookingsScreenState();
}

class BookingsScreenState extends State<BookingsScreen> {
  @override
  void initState() {
    super.initState();
    final bookingsBloc = BlocProvider.of<BookingBloc>(context);
    bookingsBloc.add(FetchBookings());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reservaciones')),
      body: BlocBuilder<BookingBloc, BookingState>(
        builder: (context, state) {
          final bookings = state.bookings;
          if (bookings.isNotEmpty) {
            return ListView.builder(
              itemCount: bookings.length,
              itemBuilder: (context, index) {
                final booking = bookings[index];
                return ListTile(
                  title:
                      Text('Reserva a nombre de ${booking.client.firstName} ${booking.client.lastName} ', style: const TextStyle(fontSize: 18)),
                  subtitle: Text('En la mesa ${booking.table}',
                      style: const TextStyle(fontSize: 18)),
                  trailing: Text(booking.price.toString(),
                      style: const TextStyle(fontSize: 18)),
                );
              },
            );
          } else {
            return const Center(
            child: Text('No tienes reservas'),
            );
          }
        },
      ),
    );
  }
}
