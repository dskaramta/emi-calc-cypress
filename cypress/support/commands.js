// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("moveSlider", (expectedValue, jump, element)=> {
    const elem_input = "input#"+element
    const elem_slider = "div#" + element + "slider > span.ui-slider-handle"
    cy.get(elem_input).then($elem => {
        let elem_text = $elem.val()
        let value = parseFloat(elem_text.replaceAll(",", ""))
        cy.log(value)
        let arrow = ""
        let totalsteps = (expectedValue - value) / jump
        cy.log(totalsteps)
        if(totalsteps > 0){
            arrow = "{rightarrow}".repeat(totalsteps)
        } else {
            totalsteps = Math.abs(totalsteps)
            arrow = "{leftarrow}".repeat(totalsteps)
        }
        cy.get(elem_slider).click().type(arrow)
    })
})

Cypress.Commands.add("selectStartingMonth", ((month) => {
    cy.get("input#startmonthyear").click()
    cy.get("div.datepicker-months > table span.month").contains(month).click()
}))