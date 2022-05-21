part of 'booking_bloc.dart';

class BookingState extends Equatable {
  final List<Booking> bookings;
  const BookingState({bookings}) : bookings = bookings ?? const [];

  BookingState copyWith({List<Booking>? bookings}) {
    return BookingState(bookings: bookings ?? this.bookings);
  }
    
  @override
  List<Object> get props => [bookings];
}

