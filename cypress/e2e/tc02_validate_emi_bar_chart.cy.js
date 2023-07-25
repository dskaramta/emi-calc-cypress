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
    
    cy.wait(3000)
    cy.get("div#emibarchart g.highcharts-series-group > g.highcharts-markers").find("path.highcharts-point").each(($elem, $index, $list) => {
        const count = $list.length
        if($index == 2){
            cy.log(count)
            cy.wrap($elem).scrollIntoView().trigger('mouseover')
            cy.wait(2000)
        }
    })

  })
})