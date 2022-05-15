import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rinconcito_mexicano/blocs/table/table_bloc.dart';

class TablesScreen extends StatefulWidget {
  const TablesScreen({Key? key}) : super(key: key);

  @override
  State<TablesScreen> createState() => _TablesScreenState();
}

class _TablesScreenState extends State<TablesScreen> {
  @override
  void initState() {
    super.initState();
    final tableBloc = BlocProvider.of<TableBloc>(context);
    tableBloc.add(FetchTables());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mesas')),
      body: BlocBuilder<TableBloc, TableState>(
        builder: (context, state) {
          final tables = state.tables;
          if (tables.isNotEmpty) {
            return ListView.builder(
              itemCount: tables.length,
              itemBuilder: (context, index) {
                final table = tables[index];
                final bool isAvailable =
                    table.tableStatues.last.status == 'Libre';
                return ListTile(
                  leading: isAvailable
                      ? const Icon(
                          Icons.check,
                          color: Colors.green,
                        )
                      : const Icon(
                          Icons.close,
                          color: Colors.red,
                        ),
                  title: Text('Mesa número ${(index + 1).toString()}',
                      style: const TextStyle(fontSize: 18)),
                  subtitle: Text(table.tableStatues.last.status,
                      style: const TextStyle(fontSize: 18)),
                );
              },
            );
          } else {
            return const Center(
              child: Text('No tienes mesas'),
            );
          }
        },
      ),
    );
  }
}
