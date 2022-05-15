import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:rinconcito_mexicano/models/table.dart';
import 'package:rinconcito_mexicano/services/table_service.dart';

part 'table_event.dart';
part 'table_state.dart';

class TableBloc extends Bloc<TableEvent, TableState> {
  final TableService tablesService;

  TableBloc({required this.tablesService}) : super(const TableState()) {
    on<FetchTables>(_fetchTables);
  }

  void _fetchTables(FetchTables event, Emitter<TableState> emit) async {
    try {
      final tables = await tablesService.fetchTables();
      emit(TableState(tables: tables));
    } catch (e) {
      print(e);
    }
  }
}
