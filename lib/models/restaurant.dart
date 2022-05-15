// To parse this JSON data, do
//
//     final restaurant = restaurantFromMap(jsonString);

import 'dart:convert';

import 'package:rinconcito_mexicano/models/product.dart';
import 'package:rinconcito_mexicano/models/table.dart';

class Restaurant {
    Restaurant({
        required this.id,
        required this.document,
        required this.name,
        required this.description,
        required this.email,
        required this.phone,
        required this.products,
        required this.tables,
    });

    final String id;
    final String document;
    final String name;
    final String description;
    final String email;
    final String phone;
    final List<Product> products;
    final List<Table> tables;

    factory Restaurant.fromJson(String str) => Restaurant.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory Restaurant.fromMap(Map<String, dynamic> json) => Restaurant(
        id: json["_id"],
        document: json["document"],
        name: json["name"],
        description: json["description"],
        email: json["email"],
        phone: json["phone"],
        products: List<Product>.from(json["products"].map((x) => Product.fromMap(x))),
        tables: List<Table>.from(json["tables"].map((x) => Table.fromMap(x))),
    );

    Map<String, dynamic> toMap() => {
        "_id": id,
        "document": document,
        "name": name,
        "description": description,
        "email": email,
        "phone": phone,
        "products": List<dynamic>.from(products.map((x) => x.toMap())),
        "tables": List<dynamic>.from(tables.map((x) => x.toMap())),
    };
}



