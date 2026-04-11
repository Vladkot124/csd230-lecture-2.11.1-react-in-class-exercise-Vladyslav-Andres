import 'package:flutter/material.dart';
import '../services/api_service.dart';

class CatalogScreen extends StatefulWidget {
  final String token;

  const CatalogScreen({super.key, required this.token});

  @override
  State<CatalogScreen> createState() => _CatalogScreenState();
}

class _CatalogScreenState extends State<CatalogScreen> {
  List<dynamic> books = [];
  List<dynamic> magazines = [];
  List<dynamic> laptops = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    loadAll();
  }

  Future<void> loadAll() async {
    final loadedBooks = await ApiService.fetchBooks(widget.token);
    final loadedMagazines = await ApiService.fetchMagazines(widget.token);
    final loadedLaptops = await ApiService.fetchLaptops(widget.token);

    setState(() {
      books = loadedBooks;
      magazines = loadedMagazines;
      laptops = loadedLaptops;
      loading = false;
    });
  }

  Widget section(String title, List<dynamic> items, String Function(dynamic) labelBuilder) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        ...items.map((item) => Card(
          child: ListTile(
            title: Text(labelBuilder(item)),
            subtitle: Text('Price: \$${item['price']}'),
          ),
        )),
        const SizedBox(height: 16),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Bookstore Catalog')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            section('Books', books, (b) => b['title'] ?? 'Book'),
            section('Magazines', magazines, (m) => m['title'] ?? 'Magazine'),
            section('Laptops', laptops, (l) => '${l['brand'] ?? ''} ${l['model'] ?? ''}'.trim()),
          ],
        ),
      ),
    );
  }
}