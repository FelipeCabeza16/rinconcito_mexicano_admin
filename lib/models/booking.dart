import 'dart:convert';

import 'package:rinconcito_mexicano/models/client.dart';
import 'package:rinconcito_mexicano/models/product.dart';
import 'package:rinconcito_mexicano/models/table.dart';

class Booking {
    Booking({
        required this.id,
        required this.price,
        required this.products,
        required this.table,
        required this.client,
    });

    final String id;
    final int price;
    final List<ProductElement> products;
    final Table table;
    final Client client;

    factory Booking.fromJson(String str) => Booking.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory Booking.fromMap(Map<String, dynamic> json) => Booking(
        id: json["_id"],
        price: json["price"],
        products: List<ProductElement>.from(json["products"].map((x) => ProductElement.fromMap(x))),
        table: Table.fromMap(json["table"]),
        client: Client.fromMap(json["client"]),
    );

    Map<String, dynamic> toMap() => {
        "_id": id,
        "price": price,
        "products": List<dynamic>.from(products.map((x) => x.toMap())),
        "table": table.toMap(),
        "client": client.toMap(),
    };
}

class ProductElement {
    ProductElement({
        required this.product,
        required this.quantity,
        required this.id,
    });

    final Product product;
    final int quantity;
    final String id;

    factory ProductElement.fromJson(String str) => ProductElement.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory ProductElement.fromMap(Map<String, dynamic> json) => ProductElement(
        product: Product.fromMap(json["product"]),
        quantity: json["quantity"],
        id: json["_id"],
    );

    Map<String, dynamic> toMap() => {
        "product": product.toMap(),
        "quantity": quantity,
        "_id": id,
    };
}