part of 'table_bloc.dart';

class TableState extends Equatable {
  final List<Table> tables;
  const TableState({tables}) : tables = tables ?? const [];
  
  @override
  List<Object> get props => [tables];
}

