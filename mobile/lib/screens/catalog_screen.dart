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
  List<Map<String, dynamic>> cart = [];

  bool loading = true;
  String errorMessage = '';

  @override
  void initState() {
    super.initState();
    loadAll();
  }

  Future<void> loadAll() async {
    try {
      final booksData = await ApiService.getBooks(widget.token);
      final magazinesData = await ApiService.getMagazines(widget.token);
      final laptopsData = await ApiService.getLaptops(widget.token);

      setState(() {
        books = booksData;
        magazines = magazinesData;
        laptops = laptopsData;
        loading = false;
      });
    } catch (e) {
      setState(() {
        errorMessage = e.toString();
        loading = false;
      });
    }
  }

  void addToCart(Map<String, dynamic> item) {
    setState(() {
      cart.add(item);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('${item['name']} added to cart')),
    );
  }

  void removeFromCart(int index) {
    setState(() {
      cart.removeAt(index);
    });
  }

  void clearCart() {
    setState(() {
      cart.clear();
    });
  }

  double get totalPrice {
    double total = 0;
    for (final item in cart) {
      final price = item['price'];
      if (price is num) {
        total += price.toDouble();
      }
    }
    return total;
  }

  List<Map<String, dynamic>> normalizeBooks() {
    return books.map<Map<String, dynamic>>((item) {
      return {
        'name': item['title'] ?? 'No title',
        'price': item['price'] ?? 0,
        'type': 'Book',
      };
    }).toList();
  }

  List<Map<String, dynamic>> normalizeMagazines() {
    return magazines.map<Map<String, dynamic>>((item) {
      return {
        'name': item['title'] ?? 'No title',
        'price': item['price'] ?? 0,
        'type': 'Magazine',
      };
    }).toList();
  }

  List<Map<String, dynamic>> normalizeLaptops() {
    return laptops.map<Map<String, dynamic>>((item) {
      final brand = item['brand'] ?? '';
      final model = item['model'] ?? '';
      return {
        'name': '$brand $model'.trim().isEmpty ? 'Laptop' : '$brand $model'.trim(),
        'price': item['price'] ?? 0,
        'type': 'Laptop',
      };
    }).toList();
  }

  Widget productSection(String title, List<Map<String, dynamic>> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(12, 16, 12, 8),
          child: Text(
            title,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
        ...items.map((item) {
          return Card(
            child: ListTile(
              title: Text(
                item['name'],
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              subtitle: Text('${item['type']} • Price: \$${item['price']}'),
              trailing: ElevatedButton(
                onPressed: () => addToCart(item),
                child: const Text('Add'),
              ),
            ),
          );
        }),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final allBookItems = normalizeBooks();
    final allMagazineItems = normalizeMagazines();
    final allLaptopItems = normalizeLaptops();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Bookstore Catalog'),
        actions: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: Center(
              child: Text(
                'Cart: ${cart.length}',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          )
        ],
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : errorMessage.isNotEmpty
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Text(
                      errorMessage,
                      style: const TextStyle(color: Colors.red, fontSize: 18),
                      textAlign: TextAlign.center,
                    ),
                  ),
                )
              : Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 3,
                      child: SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            productSection('Books', allBookItems),
                            productSection('Magazines', allMagazineItems),
                            productSection('Laptops', allLaptopItems),
                            const SizedBox(height: 20),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: 340,
                      color: Colors.grey.shade100,
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Cart',
                            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 12),
                          Expanded(
                            child: cart.isEmpty
                                ? const Center(
                                    child: Text(
                                      'Cart is empty',
                                      style: TextStyle(fontSize: 18),
                                    ),
                                  )
                                : ListView.builder(
                                    itemCount: cart.length,
                                    itemBuilder: (context, index) {
                                      final item = cart[index];
                                      return Card(
                                        child: ListTile(
                                          title: Text(item['name']),
                                          subtitle: Text(
                                            '${item['type']} • \$${item['price']}',
                                          ),
                                          trailing: IconButton(
                                            onPressed: () => removeFromCart(index),
                                            icon: const Icon(Icons.delete),
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'Total: \$${totalPrice.toStringAsFixed(2)}',
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 12),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: cart.isEmpty ? null : clearCart,
                              child: const Text('Clear Cart'),
                            ),
                          )
                        ],
                      ),
                    ),
                  ],
                ),
    );
  }
}
