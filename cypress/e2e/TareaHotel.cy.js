describe('Verificar la información del hotel, la visibilidad de la imagen y la descripción del hotel', () => {
    beforeEach(() => {
      // Visita la página
      cy.visit('https://automationintesting.online/');
    });
  
    it('La información del hotel está presente en la página', () => {
      // Verifica la información de dirección y contacto del hostel esté en la página
      cy.verificarInformacionHotel();
    });
  
    it('Al menos una imagen es visible', () => {
      // Verifica que al menos una imagen sea visible
      cy.verificarImagenVisible();
    });
  
    it('Texto de la descripción del hotel es el esperado', () => {
      cy.verificarDescripcionHotel();
    });

    describe('Enviar mensaje', { testIsolation: false }, () => {
      it('Validar envío de form vacío', () => {
        cy.validarEnvioFormVacio();
      });
  
      it('Validar envío de form con data incorrecta', () => {
        cy.validarEnvioFormIncorrecto();
      });
  
      it('Validar envío de form con data correcta', () => {
        cy.validarEnvioFormCorrecto();
      });
    });

    describe('Crear booking', { testIsolation: false }, () => {
      it('Validar envío de form SIN FECHAS', () => {
        cy.intercept('POST', '/booking').as('bookingCreado')
        cy.contains('Book this room').click()
        cy.get('[placeholder=Firstname]').type('Caro')
        cy.get('[placeholder=Lastname]').type('Pardiaco')
        cy.get('.col-sm-4 > :nth-child(3) > .form-control').type('caro111111@gmail.com')
        cy.get('.col-sm-4 > :nth-child(4) > .form-control').type('12312312')
        cy.get('.col-sm-4 > .btn-outline-primary').click()
        cy.wait('@bookingCreado').then(interception => {
          expect(interception.response.statusCode).to.equal(400)
        })
      })
    });
    describe('Crear consulta', { testIsolation: false }, () => {
      it('Validar envío de consulta', () => {
        cy.intercept('POST', '/message').as('ConsultaCreada')
        cy.contains('Book this room').click()
        cy.get('[data-testid="ContactName"]').type('Caro')
        cy.get('[data-testid="ContactEmail"]').type('caro111111@gmail.com')
        cy.get('[data-testid="ContactPhone"]').type('123456789012')
        cy.get('[data-testid="ContactSubject"]').type('titulo')
        cy.get('[data-testid="ContactDescription"]').type('asdasdasdasdasdasdasd')
        cy.get('#submitContact').click()
        cy.wait('@ConsultaCreada').then(interception => {
          expect(interception.response.statusCode).to.equal(201)
        })
      })
    });
  });

