import { useFetch } from '../utils/hooks';
import PostCard from './PostCard';
import './App.sass';

const App = () => {
  const { isLoading, data, error } = useFetch('/api/posts');

  return isLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : error ? (
    <div>
      <h1>Error: {error.message}</h1>
    </div>
  ) : (
    <div>
      <h1>Blog Posts</h1>
      {data.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="post-list">
          {data['posts'].map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
