import './index.sass';

export default function PostCard({ post }) {
  return (
    <div className="post-card" key={post.id}>
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
        <p className="post-card__date">
          {new Date(post.publishDate).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
