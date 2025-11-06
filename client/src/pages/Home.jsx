import { useEffect, useState } from 'react';
import api from '../api/api';

function Home() {
  const [posts, setPosts] = useState([]); // initial state is array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        console.log('API response:', res.data); // debug
        // Adjust this depending on backend: res.data or res.data.posts
        // If your backend returns an array directly:
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      {Array.isArray(posts) && posts.length > 0 ? (
        <ul>
          {posts.map((p) => (
            <li key={p._id}>{p.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Home;
