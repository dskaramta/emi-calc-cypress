import { expect } from "chai";
import { calculateEmi, getPercantage } from "../helpers/emi_helper";

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
describe('Automate EMI Calculator', () => {
  it('Validate the EMI pie chart', () => {
    cy.visit('/')
    cy.get("li#home-loan").click().should('have.class', 'active')
    cy.get("input#loanamount").as("amount_field")
    cy.get("input#loaninterest").as("interest_field")
    cy.get("input#loanterm").as("term_field")
    // Home Loan Amount: 25L, Interest Rate: 10%, Tenure: 10 Years
    cy.get("@amount_field").clear().type("2500000")
    cy.get("@interest_field").clear().type("10")
    cy.get("@term_field").clear().type("10").blur()
    const expected_emi_25 = calculateEmi(2500000, 10, 10).toLocaleString("en-US")
    // verify emi calculations 
    cy.get("div#emiamount").find('span').should('have.text', expected_emi_25)
    // Read the numbers from both the sections of the pie chart and Pass the step if its greater than zero, else fail it.
    cy.wait(2000)
    cy.get("div#emipiechart").find('g.highcharts-data-label-color-1 > text > tspan').then($ele => {
      const interest = $ele.text()
      const int_percentage = getPercantage(interest)
      expect(int_percentage).to.be.greaterThan(0)
    })
    cy.get("div#emipiechart").find('g.highcharts-data-label-color-0 > text > tspan').then($ele => {
      const pricipal = $ele.text()
      const principal_percentage = getPercantage(pricipal)
      expect(principal_percentage).to.be.greaterThan(0)
    })

    
    // Home Loan Amount: 50L, Interest Rate: 7.5%, Tenure: 15 Years
    cy.get("@amount_field").clear().type("5000000")
    cy.get("@interest_field").clear().type("7.5")
    cy.get("@term_field").clear().type("15").blur()
    
    // verify emi calculations 
    const expected_emi_50 = calculateEmi(5000000, 7.5, 15).toLocaleString("en-US")
    cy.get("div#emiamount").find('span').should('have.text', expected_emi_50)
    
    // Read the numbers from both the sections of the pie chart and Pass the step if its greater than zero, else fail it.
    cy.wait(2000)
    cy.get("div#emipiechart").find('g.highcharts-data-label-color-1 > text > tspan').then($ele => {
      const interest = $ele.text()
      const int_percentage = getPercantage(interest)
      expect(int_percentage).to.be.greaterThan(0)
    })
    cy.get("div#emipiechart").find('g.highcharts-data-label-color-0 > text > tspan').then($ele => {
      const pricipal = $ele.text()
      const principal_percentage = getPercantage(pricipal)
      expect(principal_percentage).to.be.greaterThan(0)
    })
  })
})