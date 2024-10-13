// Test 
describe('Testy API httpbin.org', () => {
  const baseUrl = 'https://httpbin.org';

  it('GET - Test metody GET', () => {
    cy.request('GET', `${baseUrl}/get`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('url').and.include('/get');
    });
  });
    
// Test 
  it('POST - Test metody POST', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/post`,
      body: { name: 'John', age: 30 },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.deep.equal({ name: 'John', age: 30 });
    });
  });
    
// Test 
  it('PATCH - Test metody PATCH', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/patch`,
      body: { job: 'tester' },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.have.property('job', 'tester');
    });
  });
// Test 
  it('DELETE - Test metody DELETE', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/delete`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('url').and.include('/delete');
    });
  });
});


describe('Testowanie nagłówków w API httpbin.org', () => {
  const baseUrl = 'https://httpbin.org';

  // Test 
  it('GET - Wysyłanie i sprawdzanie nagłówka User-Agent', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/headers`,
      headers: {
        'User-Agent': 'CypressTestAgent/1.0'
      }
    }).then((response) => {
      
      expect(response.status).to.eq(200);
      
      
      expect(response.body.headers).to.have.property('User-Agent', 'CypressTestAgent/1.0');
    });
  });

  // Test 
  it('GET - Wysyłanie i sprawdzanie niestandardowego nagłówka X-Custom-Header', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/headers`,
      headers: {
        'X-Custom-Header': 'MyCustomValue'
      }
    }).then((response) => {
      
      expect(response.status).to.eq(200);
      
      expect(response.body.headers).to.have.property('X-Custom-Header', 'MyCustomValue');
    });
  });
});

// Test 

describe('Testowanie parametrów zapytania w API httpbin.org', () => {
  const baseUrl = 'https://httpbin.org';

  function getRandomQueryParams() {
    const randomValue = Math.random().toString(36).substring(7); 
    return {
      param1: randomValue,
      param2: Math.floor(Math.random() * 100), 
    };
  }

  it('GET - Wysyłanie parametrów zapytania, w tym losowych', () => {
    const queryParams = getRandomQueryParams();

    cy.request({
      method: 'GET',
      url: `${baseUrl}/get`,
      qs: queryParams 
    }).then((response) => {
      
      expect(response.status).to.eq(200);

      
      expect(response.body.args).to.have.property('param1', queryParams.param1);
      expect(response.body.args).to.have.property('param2', queryParams.param2.toString());  
    });
  });
});

// Test 

describe('Testowanie treści odpowiedzi w API httpbin.org', () => {
  const baseUrl = 'https://httpbin.org';

  it('GET - Sprawdzanie treści odpowiedzi', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/json`
    }).then((response) => {
      
      expect(response.status).to.eq(200);

      expect(response.headers['content-type']).to.include('application/json');

      expect(response.body).to.have.property('slideshow');
      expect(response.body.slideshow).to.have.property('title', 'Sample Slide Show');
      expect(response.body.slideshow.slides[0]).to.have.property('title', 'Wake up to WonderWidgets!');
    });
  });
});

// Test 

describe('Testowanie czasu trwania żądań w API httpbin.org', () => {
  const baseUrl = 'https://httpbin.org';

  it('GET - Sprawdzanie czasu trwania żądania GET', () => {
    const startTime = new Date().getTime(); 

    cy.request({
      method: 'GET',
      url: `${baseUrl}/get`,
    }).then((response) => {
      const endTime = new Date().getTime(); 
      const duration = endTime - startTime; 

      expect(response.status).to.eq(200);

      expect(duration).to.be.lessThan(1000); 
      cy.log(`Czas trwania żądania GET: ${duration} ms`);
    });
  });
});

// Test 

describe('Testowanie czasu trwania żądań w API httpbin.org', () => {
  const baseUrl = 'https://httpbin.org';

  it('POST - Sprawdzanie czasu trwania żądania POST', () => {
    const startTime = new Date().getTime(); 

    cy.request({
      method: 'POST',
      url: `${baseUrl}/post`,
      body: { name: 'John Doe', age: 30 },
    }).then((response) => {
      const endTime = new Date().getTime(); 
      const duration = endTime - startTime; 

      expect(response.status).to.eq(200);

      expect(duration).to.be.lessThan(1000); 
      cy.log(`Czas trwania żądania POST: ${duration} ms`);
    });
  });
});


