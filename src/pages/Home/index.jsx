import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../utils/hooks';
import PostCard from '../../components/PostCard';
import CategoryFilter from '../../components/CategoryFilter';
import './index.sass';

export default function Home() {
  const { isLoading, data, error } = useFetch('/api/posts');
  const { search } = useLocation();
  const POSTS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

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

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

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
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p>No posts match selected categories.</p>
            )}
          </div>
          {visibleCount < filteredPosts.length && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </main>
  );
}
