import 'dart:convert';

class Client {
    Client({
        required this.id,
        required this.document,
        required this.firstName,
        required this.lastName,
        required this.phone,
    });

    final String id;
    final String document;
    final String firstName;
    final String lastName;
    final String phone;

    factory Client.fromJson(String str) => Client.fromMap(json.decode(str));

    String toJson() => json.encode(toMap());

    factory Client.fromMap(Map<String, dynamic> json) => Client(
        id: json["_id"],
        document: json["document"],
        firstName: json["firstName"],
        lastName: json["lastName"],
        phone: json["phone"],
    );

    Map<String, dynamic> toMap() => {
        "_id": id,
        "document": document,
        "firstName": firstName,
        "lastName": lastName,
        "phone": phone,
    };
}