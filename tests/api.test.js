const request = require('supertest');
const app = require('../server');

describe('Books API', () => {

  // ======================
  // GET ALL BOOKS
  // ======================
  test('GET /api/books returns all books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });


  // ======================
  // GET BOOK BY ID
  // ======================
  test('GET /api/books/:id returns a book', async () => {
    const res = await request(app).get('/api/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('author');
  });

  test('GET /api/books/:id returns 404 if book not found', async () => {
    const res = await request(app).get('/api/books/999');
    expect(res.statusCode).toBe(404);
  });


  // ======================
  // POST NEW BOOK
  // ======================
  test('POST /api/books creates a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: 'Test Book',
        author: 'Test Author'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Book');
    expect(res.body.author).toBe('Test Author');
  });


  // ======================
  // PUT UPDATE BOOK
  // ======================
  test('PUT /api/books/:id updates an existing book', async () => {
    const res = await request(app)
      .put('/api/books/1')
      .send({
        title: 'Updated Title'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  test('PUT /api/books/:id returns 404 if book not found', async () => {
    const res = await request(app)
      .put('/api/books/999')
      .send({
        title: 'Does Not Exist'
      });

    expect(res.statusCode).toBe(404);
  });


  // ======================
  // DELETE BOOK
  // ======================
  test('DELETE /api/books/:id deletes a book', async () => {
    const res = await request(app).delete('/api/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
  });

  test('DELETE /api/books/:id returns 404 if book not found', async () => {
    const res = await request(app).delete('/api/books/999');
    expect(res.statusCode).toBe(404);
  });

});
