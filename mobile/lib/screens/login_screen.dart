import 'dart:convert';
import 'package:http/http.dart' as http;
import 'catalog_screen.dart';

void login() async {
  final response = await http.post(
    Uri.parse("https://csd230-lecture-2-11-1-react-in-class-we0x.onrender.com/api/auth/login"),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode({
      "email": emailController.text,
      "password": passwordController.text
    }),
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    final token = data["token"];

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (_) => CatalogScreen(token: token),
      ),
    );
  } else {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Invalid credentials")),
    );
  }
}