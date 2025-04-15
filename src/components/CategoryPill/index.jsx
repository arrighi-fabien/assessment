import './index.sass';

export default function CategoryPill({ category, onClick, selected }) {
  return (
    <button
      className={`category-pill ${selected ? 'selected' : ''}`}
      onClick={() => onClick(category)}
    >
      {category.name}
    </button>
  );
}
