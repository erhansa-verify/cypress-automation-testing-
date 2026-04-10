describe('API Tests', () => {
  it('Get a single category by ID', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/2')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name').that.is.a('string'); 
      });
  });
  it('Create a category', () => {
    const newCategory = {
    "name": 'Sandal',
    "image": "https://placeimg.com/640/480/any"
    };

    cy.request('POST', 'https://api.escuelajs.co/api/v1/categories/', newCategory)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('name', 'Sandal');
        expect(response.body).to.have.property('slug', 'sandal');
      });
  });
  it('Update a category', () => {
    const updatedCategory = {
      "name": 'Updated Category',
      "slug": 'updated-category'
    };

    cy.request('PUT', 'https://api.escuelajs.co/api/v1/categories/2', updatedCategory)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'Updated Category');
        expect(response.body).to.have.property('slug', 'updated-category');
      });
  });
  it('Delete a category', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
     .then((res) => {

    const id = res.body[0].id;
    cy.request('DELETE', `https://api.escuelajs.co/api/v1/categories/${id}`)
      .then((response) => {
        expect([200, 204]).to.include(response.status);

      });

    });
  });
  it('Get all categories', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
        response.body.forEach((category) => {
          expect(category).to.include.all.keys('id', 'name', 'slug');
        });
      });  
    }); 
    it('Get a Single User', () => {
      cy.request('GET', 'https://api.escuelajs.co/api/v1/users/1')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('name');
          expect(response.body.name).to.be.a('string');
        });
    });
    it('Create a User', () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        avatar: 'https://picsum.photos/800'
      };
      cy.request('POST', 'https://api.escuelajs.co/api/v1/users', newUser)
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('name', 'Jane Doe');
          expect(response.body).to.have.property('email', 'jane.doe@example.com');
        });
    });

});
