import 'package:flutter/material.dart';
import 'screens/login_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bookstore Mobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        scaffoldBackgroundColor: const Color(0xFFF7F7FB),
        cardTheme: const CardThemeData(
          elevation: 3,
          margin: EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        ),
      ),
      home: const LoginScreen(),
    );
  }
}
