import { useState } from 'react';

const products = [
  { id: 1, name: 'Apple', price: 1.5 },
  { id: 2, name: 'Banana', price: 0.75 },
  { id: 3, name: 'Orange', price: 1.0 },
];

export default function ShoppingCart() {
  const [bucket, setBucket] = useState([]);

  const addToBucket = (product) => {
    setBucket((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromBucket = (id) => {
    setBucket((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Calculate the total price of the bucket
  const totalPrice = bucket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product List */}
        <div>
          <h2 className="text-2xl font-semibold">Products</h2>
          <div className="space-y-4 mt-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
              >
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => addToBucket(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bucket Section */}
        <div>
          <h2 className="text-2xl font-semibold">Bucket</h2>
          <div className="space-y-4 mt-4">
            {bucket.length > 0 ? (
              <>
                {bucket.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
                  >
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p>
                        ${item.price.toFixed(2)} x {item.quantity} = $
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromBucket(item.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => addToBucket(item)}
                        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                {/* ✅ Display the Total Price */}
                <div className="bg-white p-4 shadow rounded-lg mt-4 text-right">
                  <h3 className="text-xl font-bold">
                    Total Price: ${totalPrice.toFixed(2)}
                  </h3>
                </div>
              </>
            ) : (
              <p className="text-gray-500">No items in bucket</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
