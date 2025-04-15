import { useLocation } from 'react-router-dom';
import { useFetch } from '../../utils/hooks';
import PostCard from '../../components/PostCard';
import CategoryFilter from '../../components/CategoryFilter';
import './index.sass';

export default function Home() {
  const { isLoading, data, error } = useFetch('/api/posts');
  const { search } = useLocation();

  // Extract selected categories from URL
  const selectedCategories =
    new URLSearchParams(search).get('category')?.split(',') || [];

  // Filter posts by selected categories
  const filteredPosts =
    data?.posts?.filter((post) => {
      if (selectedCategories.length === 0) return true;

      const postCategoryNames = post.categories.map((c) => c.name);
      return selectedCategories.some((name) =>
        postCategoryNames.includes(name)
      );
    }) || [];

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Error: {error.message}</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Blog Posts</h1>
      {data?.posts?.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          <CategoryFilter posts={data.posts} />
          <div className="post-list">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <p>No posts match selected categories.</p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
