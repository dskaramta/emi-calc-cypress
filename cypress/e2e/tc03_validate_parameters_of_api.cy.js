describe('Automate API Test', () => {
    it('Validate the parameters of API', () => {
      cy.fixture('users.json').then((users) => {
        // Load user data from the fixture
  
        cy.request('GET', "https://reqres.in/api/users?page=2")
          .then((response) => {
            // Assertions on the response
            expect(response.status).to.eq(200);
            expect(response.body.data).to.deep.eq(users.data)
          });
      });
    });
  });