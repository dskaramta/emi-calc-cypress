describe('Automate API Test', () => {
    it('Validate the parameters of API', () => {
      cy.fixture('users.json').then((users) => {
        // Load users data from the fixture
        const userArr = users.data 
  
        cy.request('GET', "https://reqres.in/api/users?page=2")
          .then((response) => {
            // Assertions on the response
            expect(response.status).to.eq(200);
            const response_data = response.body.data
            expect(response_data).to.deep.eq(users.data)
            for(var i=0; i<userArr.length; i++){
                expect(response_data[i]["id"]).to.eq(userArr[i]["id"])
                expect(response_data[i]["email"]).to.eq(userArr[i]["email"])
                expect(response_data[i]["first_name"]).to.eq(userArr[i]["first_name"])
                expect(response_data[i]["last_name"]).to.eq(userArr[i]["last_name"])
            }
          });
      });
    });
  });