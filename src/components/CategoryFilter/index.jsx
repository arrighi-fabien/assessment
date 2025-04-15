import { useNavigate, useLocation } from 'react-router-dom';
import CategoryPill from '../CategoryPill';
import './index.sass';

export default function CategoryFilter({ posts }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const selectedCategories = params.get('category')?.split(',') || [];

  const handleCategoryClick = (category) => {
    const isSelected = selectedCategories.includes(category.name);
    const updatedCategories = isSelected
      ? selectedCategories.filter((name) => name !== category.name)
      : [...selectedCategories, category.name];

    if (updatedCategories.length > 0) {
      params.set('category', updatedCategories.join(','));
    } else {
      params.delete('category');
    }

    navigate(`?${params.toString()}`);
  };

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
    <div>
      <h2>Categories</h2>
      <div className="categories-list">
        {uniqueCategories.map((category) => (
          <CategoryPill
            key={category.id}
            category={category}
            onClick={handleCategoryClick}
            selected={selectedCategories.includes(category.name)}
          />
        ))}
      </div>
    </div>
  );
}
