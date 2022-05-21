import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:rinconcito_mexicano/models/booking.dart';
import 'package:rinconcito_mexicano/services/booking_service.dart';

part 'booking_event.dart';
part 'booking_state.dart';

class BookingBloc extends Bloc<BookingEvent, BookingState> {
  final BookingService bookingService;
  BookingBloc({required this.bookingService}) : super(const BookingState()) {
    on<FetchBookings>(_fetchBookings);
  }

  void _fetchBookings(FetchBookings event, Emitter<BookingState> emit) async {
    try {
      final bookings = await bookingService.fetchBookings();
      emit(BookingState(bookings: bookings));
    } catch (e) {
      print(e);
    }
  }
}
