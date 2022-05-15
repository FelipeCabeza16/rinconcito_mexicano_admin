import 'dart:convert';

class Product {
    Product({
        required this.id,
        required this.name,
        required this.description,
        required this.basePrice,
        required this.isAvailable,
        required this.profilePhoto,
    });

    final String id;
    final String name;
    final String description;
    final int basePrice;
    final bool isAvailable;
    final String profilePhoto;

    factory Product.fromJson(String str) => Product.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory Product.fromMap(Map<String, dynamic> json) => Product(
        id: json["_id"],
        name: json["name"],
        description: json["description"],
        basePrice: json["basePrice"],
        isAvailable: json["isAvailable"],
        profilePhoto: json["profilePhoto"],
    );

    Map<String, dynamic> toMap() => {
        "_id": id,
        "name": name,
        "description": description,
        "basePrice": basePrice,
        "isAvailable": isAvailable,
        "profilePhoto": profilePhoto,
    };
}