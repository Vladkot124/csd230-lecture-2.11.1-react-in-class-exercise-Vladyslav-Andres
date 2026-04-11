import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const baseUrl = "https://csd230-lecture-2-11-1-react-in-class-we0x.onrender.com/api";

  static Future<List<dynamic>> getBooks(String token) async {
    final response = await http.get(
        Uri.parse("$baseUrl/books"),
        headers: {
          "Authorization": "Bearer $token"
        },

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to load books");
    }
  }
}