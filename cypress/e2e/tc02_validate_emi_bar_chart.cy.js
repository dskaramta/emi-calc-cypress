import { expect } from "chai";
import { calculateEmi, getPercantage } from "../helpers/emi_helper";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
describe('Automate EMI Calculator', () => {
  it('Validate the EMI pie chart', () => {
    cy.visit('/')
    cy.get("li#personal-loan").click().should('have.class', 'active')
    // Personal Loan Amount: 10L, Interest Rate: 12%, Tenure: 5 Years
    cy.moveSlider(1000000,10000, "loanamount")
    cy.moveSlider(12, 0.25, "loaninterest")
    cy.moveSlider(5,0.25, "loanterm")

    cy.selectStartingMonth("Aug")

    cy.get("div#emibarchart").should('be.visible') 
    cy.get("div#emibarchart g.highcharts-series-group > g.highcharts-series-0").find("rect.highcharts-point").as("orange-bar")
    cy.get("@orange-bar").should("have.length", 6)
    cy.get("@orange-bar").eq(2).trigger("mouseover")
    cy.get("div#emibarchart g.highcharts-tooltip").find("text > tspan").each($elem => {
        let text = $elem.text()
        cy.log(text)
    })

  })
})