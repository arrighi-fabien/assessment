import { useParams } from 'react-router-dom';
import { useFetch } from '../../utils/hooks';
import CategoryPill from '../../components/CategoryPill';

export default function PostDetail() {
  const { postId } = useParams();
  const { isLoading, data, error } = useFetch(`/api/posts/${postId}`);

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
        <h1>Error while loading post</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Post Detail</h1>
      {data && (
        <div>
          <div className="post-card__author">
            <img
              className="post-card__author__avatar"
              src={data.author.avatar}
              alt={data.author.name}
            />
            <p className="post-card__author__name">{data.author.name}</p>
          </div>
          <p>{new Date(data.publishDate).toLocaleDateString()}</p>
          <h2>{data.title}</h2>
          <div>
            {data.categories.map((category) => (
              <CategoryPill key={category.id} category={category} />
            ))}
          </div>
          <p>{data.summary}</p>
        </div>
      )}
    </main>
  );
}
