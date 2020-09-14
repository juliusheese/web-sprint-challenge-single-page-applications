describe("Testing our form", () => {
    it("fills out name", () => {
        cy.visit("http://localhost:3000/")
        cy.get('[for="name"] > input').type("Julius").should("have.value", "Julius")
    })
    it("checks toppings", () => {
        cy.get('[for="peperoni"] > input').click()
        cy.get('[for="avacado"] > input').click()
    })
    it("fills out special instructions", () => {
        cy.get('[for="specialInstructions"] > input').type("Extra Cheese").should("have.value", "Extra Cheese")
    })
    it("submits data", () => {
        cy.get('.sub').click()
    })
})