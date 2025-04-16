import { useNavigate, useLocation } from 'react-router-dom';
import CategoryPill from '../CategoryPill';
import './index.sass';

export default function CategoryFilter({ posts }) {
  const navigate = useNavigate();
  const { search } = useLocation();

  // Extract selected categories from URL
  const params = new URLSearchParams(search);
  const selectedCategories = params.get('category')?.split(',') || [];

  const handleCategoryClick = (category) => {
    const isSelected = selectedCategories.includes(category.name);

    // Toggle category selection
    const updatedCategories = isSelected
      ? selectedCategories.filter((name) => name !== category.name)
      : [...selectedCategories, category.name];

    // Update the URL with new category selections
    if (updatedCategories.length > 0) {
      params.set('category', updatedCategories.join(','));
    } else {
      params.delete('category');
    }

    navigate(`?${params.toString()}`);
  };

  // Extract unique categories from all posts
  const uniqueCategories = posts
    .reduce((acc, post) => {
      post.categories.forEach((category) => {
        if (!acc.some((cat) => cat.name === category.name)) {
          acc.push(category);
        }
      });
      return acc;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="categories-list">
      {uniqueCategories.map((category) => (
        <CategoryPill
          key={category.id}
          category={category}
          onClick={handleCategoryClick}
          selected={selectedCategories.includes(category.name)}
        />
      ))}
    </section>
  );
}
