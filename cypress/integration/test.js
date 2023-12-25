const { describe } = require("mocha")

describe("Features and Guide Switchable on click", () => {
    it("Features and Guide Switchable on click", () => {
        cy.visit("http://localhost:3000/")
        cy.get("#features").click()
        cy.get("#guide").click()
    })
})

describe("Toll Calculator Should Work after selection source , destination and vehicle type", () => {
    it("Toll Calculator Should Work after selection source , destination and vehicle type", () => {
        cy.visit("http://localhost:3000/")
        cy.get("#GeolocationOne").type("Mumbai")
        cy.get("#GeolocationTwo").type("Chennai")
        cy.get("#vehicleType").select("Car")
        cy.get(".tollCalculatorForm").submit()
    })
})