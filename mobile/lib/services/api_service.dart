import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl =
      'https://csd230-lecture-2-11-1-react-in-class-we0x.onrender.com/api';

  static Future<String> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Login failed (${response.statusCode}): ${response.body}');
    }

    final data = jsonDecode(response.body);
    final token = data['token'] ?? data['accessToken'] ?? data['jwt'];

    if (token == null || token.toString().isEmpty) {
      throw Exception('No token returned from backend');
    }

    return token.toString();
  }

  static Future<List<dynamic>> getBooks(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/books'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to load books (${response.statusCode})');
    }

    return jsonDecode(response.body);
  }

  static Future<List<dynamic>> getMagazines(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/magazines'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to load magazines (${response.statusCode})');
    }

    return jsonDecode(response.body);
  }

  static Future<List<dynamic>> getLaptops(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/laptops'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to load laptops (${response.statusCode})');
    }

    return jsonDecode(response.body);
  }
}
