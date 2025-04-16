import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/posts/:id', (schema, request) => {
      const id = request.params.id;
      console.log(id);
      const post = data.posts.find((post) => post.id === id);
      return post || new Response(404, {}, { error: 'Post not found' });
    });
  },
});
