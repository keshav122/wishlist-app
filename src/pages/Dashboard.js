import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchWishlist(currentUser.uid);
      } else {
        setUser(null);
        setWishlist([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchWishlist = async (uid) => {
    const wishlistRef = collection(db, `users/${uid}/wishlist`);
    const snapshot = await getDocs(wishlistRef);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setWishlist(items);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!user) return;

    const wishlistRef = collection(db, `users/${user.uid}/wishlist`);
    await addDoc(wishlistRef, {
      ...newItem,
      isGifted: false,
      giftedBy: null,
    });

    setNewItem({ name: "", description: "", imageUrl: "" });
    fetchWishlist(user.uid); // Refresh list
  };

  return (
    <div>
      <h2>Welcome {user?.email}</h2>

      <h3>Add to Wishlist</h3>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.imageUrl}
          onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <h3>Your Wishlist</h3>
      <ul>
        {wishlist.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.description}
            {item.isGifted && <span> 🎁 Gifted</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
