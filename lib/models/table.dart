import 'dart:convert';

class Table {
    Table({
        required this.id,
        required this.tableStatues,
        required this.isAvailable,
        required this.createdBy,
    });

    final String id;
    final List<TableStatus> tableStatues;
    final bool isAvailable;
    final String createdBy;

    factory Table.fromJson(String str) => Table.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory Table.fromMap(Map<String, dynamic> json) => Table(
        id: json["_id"],
        tableStatues: List<TableStatus>.from(json["tableStatues"].map((x) => TableStatus.fromMap(x))),
        isAvailable: json["isAvailable"],
        createdBy: json["createdBy"],
    );

    Map<String, dynamic> toMap() => {
        "_id": id,
        "tableStatues": List<dynamic>.from(tableStatues.map((x) => x.toMap())),
        "isAvailable": isAvailable,
        "createdBy": createdBy,
    };
}

class TableStatus {
    TableStatus({
        required this.id,
        required this.status,
        required this.description,
    });

    final String id;
    final String status;
    final String description;

    factory TableStatus.fromJson(String str) => TableStatus.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory TableStatus.fromMap(Map<String, dynamic> json) => TableStatus(
        id: json["_id"],
        status: json["status"],
        description: json["description"],
    );

    Map<String, dynamic> toMap() => {
        "_id": id,
        "status": status,
        "description": description,
    };
}


