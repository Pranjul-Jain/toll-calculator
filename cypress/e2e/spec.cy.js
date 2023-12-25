describe('Switch Between Features And Guide', () => {
  it('Switch from Features to Guide', () => {
    cy.visit('http://localhost:3000/', { failOnStatusCode: false });
    cy.get("#features button").click()
    cy.get("#guide").should("be.visible")
  });

  it('Switch from Guide to Features', () => {
    cy.visit('http://localhost:3000/', { failOnStatusCode: false });
    cy.get("#features button").click()
    cy.get("#guide button").click()
    cy.get("#features").should("be.visible")
  })
});

describe("Toll Calculator", () => {
  it("Source and Destination Fields should be emptied",()=>{
    cy.visit('http://localhost:3000/', { failOnStatusCode: false });
    cy.get("#GeolocationOne").should("have.value","");
    cy.get("#GeolocationOne").should("have.value","");
  })

  it("Should not have same value for source and destination",()=>{
    cy.visit('http://localhost:3000/', { failOnStatusCode: false });

    cy.get("#GeolocationOne").type("Chandigarh");
    cy.get("#GeolocationTwo").type("Chandigarh");
    cy.get("form>button[type=submit]").click();
    cy.get(".tollInfoBox").should("not.exist");
  })

  it("Should not calculate toll for wrong source and destination",()=>{
    cy.visit('http://localhost:3000/', { failOnStatusCode: false });

    cy.get("#GeolocationOne").clear().should("have.value","");
    cy.get("#GeolocationOne").type("afdsfa");
    cy.get("#GeolocationTwo").clear();
    cy.get("#GeolocationTwo").type("sfasdfsaf");
    cy.get("form>button[type=submit]").click();
    cy.get(".tollInfoBox").should("not.exist");
  })

});
