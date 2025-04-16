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

  // Get selected categories from the URL query string
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

  // Limit number of posts shown (for "Load More")
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <main className="message fade-in">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="message fade-in">
        <h1>Error while loading posts</h1>
      </main>
    );
  }

  // Render post list with filters and load more functionality
  return (
    <>
      {data?.posts?.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          <CategoryFilter posts={data.posts} />
          <section className="post-list">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <p>No posts match selected categories.</p>
            )}
          </section>
          {visibleCount < filteredPosts.length && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </>
  );
}
