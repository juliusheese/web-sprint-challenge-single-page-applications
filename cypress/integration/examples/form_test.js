describe("Testing our form", () => {
    it("fills out name", () => {
        cy.visit("http://localhost:3000/")
        cy.get('[for="name"] > input').type("Julius").should("have.value", "Julius")
    })
    it("fills out email", () => {
        cy.get('[for="email"] > input').type("john@appleseed.com").should("have.value", "john@appleseed.com")
    })
    it("fills out password", () => {
        cy.get('[for="password"] > input').type("asdfoij2034").should("have.value", "asdfoij2034")
    })
    it("checks checkbox", () => {
        cy.get('[for="terms"] > input').click()
    })
    it("submits data", () => {
        cy.get(' button').click()
    })
    it("checks checkbox 2", () => {
        cy.get('[for="terms"] > input').click()
    })
    it("checks for validation", () => {
        cy.get(' button').click()
    })
    it("fills out name 2 ", () => {
        cy.get('[for="name"] > input').type("Julius").should("have.value", "Julius")
    })
    it("fills out email 2", () => {
        cy.get('[for="email"] > input').type("john@appleseed.com").should("have.value", "john@appleseed.com")
    })
    it("fills out password 2", () => {
        cy.get('[for="password"] > input').type("asdfoij2034").should("have.value", "asdfoij2034")
    })

    it("submits data 2", () => {
        cy.get(' button').click()
    })

})