import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'catalog_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailController = TextEditingController(text: 'admin@admin.com');
  final passwordController = TextEditingController(text: 'admin');

  bool loading = false;
  String errorMessage = '';

  void login() async {
    setState(() {
      loading = true;
      errorMessage = '';
    });

    try {
      final token = await ApiService.login(
        emailController.text.trim(),
        passwordController.text.trim(),
      );

      if (!mounted) return;

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => CatalogScreen(token: token),
        ),
      );
    } catch (e) {
      setState(() {
        errorMessage = e.toString();
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bookstore Mobile Login'),
        centerTitle: true,
      ),
      body: Center(
        child: Container(
          width: 420,
          padding: const EdgeInsets.all(24),
          child: Card(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'Admin Login',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 20),
                  TextField(
                    controller: emailController,
                    decoration: const InputDecoration(
                      labelText: 'Email',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: passwordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: 'Password',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: loading ? null : login,
                      child: loading
                          ? const Padding(
                              padding: EdgeInsets.all(8.0),
                              child: CircularProgressIndicator(),
                            )
                          : const Text('Login'),
                    ),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Demo credentials: admin@admin.com / admin',
                    style: TextStyle(color: Colors.grey),
                  ),
                  if (errorMessage.isNotEmpty) ...[
                    const SizedBox(height: 16),
                    Text(
                      errorMessage,
                      style: const TextStyle(color: Colors.red),
                      textAlign: TextAlign.center,
                    ),
                  ]
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
