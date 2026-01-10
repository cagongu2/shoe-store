# RDF Queries for Testing

Dưới đây là danh sách các truy vấn SPARQL được sử dụng trong hệ thống. Bạn có thể sử dụng các truy vấn này để kiểm tra trực tiếp trên giao diện Fuseki (http://localhost:3030).

**Lưu ý:**
- Các truy vấn bên dưới đều giả định rằng bạn đã khai báo các PREFEX sau. Hãy copy đoạn PREFIX này và dán vào đầu ô query của Fuseki.
- Thay thế các giá trị trong ngoặc nhọn `<...>` bằng giá trị thực tế khi test.

## 1. Prefixes

```sparql
PREFIX ex: <http://shoestore.com/>
PREFIX product: <http://shoestore.com/product/>
PREFIX user: <http://shoestore.com/user/>
PREFIX brand: <http://shoestore.com/brand/>
PREFIX category: <http://shoestore.com/category/>
PREFIX order: <http://shoestore.com/order/>
PREFIX blog: <http://shoestore.com/blog/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
```

---

## 2. Gợi ý sản phẩm (Product Recommendations)

### 2.1 Collaborative Filtering
*Gợi ý: "Người mua sản phẩm này cũng mua sản phẩm kia" (People also bought)*

```sparql
SELECT DISTINCT ?recommendedProduct
WHERE {
  user:<EMAIL_DA_REPLACE> ex:purchased ?purchasedProduct .
  ?otherUser ex:purchased ?purchasedProduct .
  ?otherUser ex:purchased ?recommendedProduct .
  FILTER (?recommendedProduct != ?purchasedProduct)
  FILTER NOT EXISTS { user:<EMAIL_DA_REPLACE> ex:purchased ?recommendedProduct }
}
LIMIT 4
```
**Lưu ý:** `<EMAIL_DA_REPLACE>` là email người dùng đã được thay thế ký tự đặc biệt (ví dụ: `nguyenvan_a_gmail_com` thay vì `nguyenvan.a@gmail.com`).

### 2.2 Trending / Hot / Sale
*Gợi ý: Sản phẩm nổi bật hoặc đang giảm giá*

```sparql
SELECT DISTINCT ?recommendedProduct
WHERE {
  ?recommendedProduct rdf:type ex:Product .
  ?recommendedProduct ex:hot ?hot .
  ?recommendedProduct ex:sale ?sale .
}
ORDER BY DESC(?hot) DESC(?sale)
LIMIT 4
```

### 2.3 View-Based (Similar Products)
*Gợi ý: Sản phẩm tương tự (cùng danh mục) và nổi bật*

```sparql
SELECT DISTINCT ?recommendedProduct
WHERE {
  product:<PRODUCT_ID> ex:category ?cat .
  ?recommendedProduct ex:category ?cat .
  ?recommendedProduct ex:hot ?hot .
  ?recommendedProduct ex:sale ?sale .
  FILTER (?recommendedProduct != product:<PRODUCT_ID>)
}
ORDER BY DESC(?hot) DESC(?sale)
LIMIT 4
```

### 2.4 Content-Based
*Gợi ý: Sản phẩm có cùng Thương hiệu VÀ Danh mục*

```sparql
SELECT DISTINCT ?recommendedProduct
WHERE {
  product:<PRODUCT_ID> ex:brand ?brand ;
                   ex:category ?cat .
  ?recommendedProduct ex:brand ?brand ;
                   ex:category ?cat .
  FILTER (?recommendedProduct != product:<PRODUCT_ID>)
}
LIMIT 4
```

---

## 3. Gợi ý bài viết (Blog Recommendations)

### 3.1 Related to Product
*Gợi ý: Bài viết liên quan đến thương hiệu của sản phẩm*

```sparql
SELECT DISTINCT ?blog
WHERE {
  product:<PRODUCT_ID> ex:brand ?brand .
  ?brand ex:name ?brandName .
  ?blog rdf:type ex:Blog .
  {
    ?blog ex:tag ?tag .
    FILTER(CONTAINS(LCASE(?tag), LCASE(?brandName)))
  } UNION {
    ?blog ex:title ?title .
    FILTER(CONTAINS(LCASE(?title), LCASE(?brandName)))
  }
}
LIMIT 3
```

### 3.2 Purchase Pattern
*Gợi ý: Bài viết được xem bởi người có cùng thói quen mua hàng*

```sparql
SELECT DISTINCT ?blog
WHERE {
  user:<EMAIL_DA_REPLACE> ex:purchased ?p .
  ?otherUser ex:purchased ?p .
  ?otherUser ex:viewedBlog ?blog .
  FILTER NOT EXISTS { user:<EMAIL_DA_REPLACE> ex:viewedBlog ?blog }
}
LIMIT 3
```

---

## 4. Tìm kiếm ngữ nghĩa (Semantic Search)

### 4.1 Search by Keyword
*Tìm kiếm sản phẩm theo Tên HOẶC Danh mục (bao gồm cấp cha) HOẶC Thương hiệu*

```sparql
SELECT DISTINCT ?product
WHERE {
  {
    ?product rdf:type ex:Product .
    ?product ex:name ?name .
    FILTER(CONTAINS(LCASE(?name), LCASE("<KEYWORD>")))
  } UNION {
    ?product ex:category ?cat .
    ?cat rdfs:subClassOf* ?parentCat .
    ?parentCat ex:name ?catName .
    FILTER(CONTAINS(LCASE(?catName), LCASE("<KEYWORD>")))
  } UNION {
    ?product ex:brand ?brand .
    ?brand ex:name ?brandName .
    FILTER(CONTAINS(LCASE(?brandName), LCASE("<KEYWORD>")))
  }
}
```

---

## 5. Truy vấn kiểm tra dữ liệu (Debug)

### 5.1 Liệt kê tất cả sản phẩm
```sparql
SELECT * WHERE { ?s rdf:type ex:Product } LIMIT 20
```

### 5.2 Liệt kê tất cả user
```sparql
SELECT * WHERE { ?s ?p ?o . FILTER(STRSTARTS(STR(?s), "http://shoestore.com/user/")) } LIMIT 20
```
