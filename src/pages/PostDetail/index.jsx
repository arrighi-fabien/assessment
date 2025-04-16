import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../utils/hooks';
import CategoryPill from '../../components/CategoryPill';
import './index.sass';

export default function PostDetail() {
  const { postId } = useParams();
  const { isLoading, data, error } = useFetch(`/api/posts/${postId}`);

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
        <h1>Error while loading post</h1>
      </main>
    );
  }

  return (
    data && (
      <>
        <article className="post-detail fade-in">
          <Link to="/" className="post-detail__back">
            Go back to posts
          </Link>
          <div className="post-detail__header">
            <div className="post-detail__header__meta">
              <div className="post-card__author">
                <img
                  className="post-card__author__avatar"
                  src={data.author.avatar}
                  alt={data.author.name}
                />
                <p className="post-card__author__name">{data.author.name}</p>
              </div>
              <time dateTime={data.publishDate}>
                {new Date(data.publishDate).toLocaleDateString()}
              </time>
            </div>
            <h1>{data.title}</h1>
            <div className="post-detail__header__categories">
              {data.categories.map((category) => (
                <Link key={category.id} to={`/?category=${category.name}`}>
                  <CategoryPill key={category.id} category={category} />
                </Link>
              ))}
            </div>
          </div>
          <section>
            <p>{data.summary}</p>
          </section>
        </article>
      </>
    )
  );
}
