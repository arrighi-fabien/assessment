import { Link } from 'react-router-dom';
import './index.sass';

export default function PostCard({ post }) {
  return (
    <article className="post-card fade-in" key={post.id}>
      <Link to={`/post/${post.id}`}>
        <h2 className="post-card__title">{post.title}</h2>
        <div className="post-card__meta">
          <div className="post-card__author">
            <img
              className="post-card__author__avatar"
              src={post.author.avatar}
              alt={post.author.name}
            />
            <p className="post-card__author__name">{post.author.name}</p>
          </div>
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString()}
          </time>
        </div>
      </Link>
    </article>
  );
}
