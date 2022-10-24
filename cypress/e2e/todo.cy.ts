// https://docs.cypress.io/api/introduction/api.html

describe("Todo Test", () => {
  it("checks if root has todos h1", () => {
    cy.visit("/");
    cy.contains("h1", "Todos");
  });

  it("checks if todos are being added properly", () => {
    cy.visit("/");
    cy.get("input[type=text]").type("asdf");
    cy.get("button[type=submit]").click();

    cy.get("input[type=text]").type("another one");
    cy.get("button[type=submit]").click();

    cy.get("input[type=text]").type("third todo");
    cy.get("button[type=submit]").click();

    cy.get("li").eq(0).should("contain.text", "asdf");
    cy.get("li").eq(1).should("contain.text", "another one");
    cy.get("li").eq(2).should("contain.text", "third todo");

    cy.saveLocalStorage();
  });

  it("checks if todo completion works properly", () => {
    cy.restoreLocalStorage();

    cy.get("li").eq(0).find("input").click();
    cy.get("li").eq(2).find("input").click();

    cy.get("progress").invoke("attr", "max").should("eq", "3");
    cy.get("progress").invoke("attr", "value").should("eq", "2");

    cy.saveLocalStorage();
  });

  it("checks if todos are being stored in localStorage properly", () => {
    cy.restoreLocalStorage();

    cy.getLocalStorage("_v_todos").should("not.be.null");
    cy.getLocalStorage("_v_todos").then((val) => {
      if (val) {
        const pval = JSON.parse(val);
        assert(pval.length === 3);
      }
    });
  });

  it("checks clearing of completed todos", () => {
    cy.get(".clear").click();
    cy.get("li").eq(0).should("contain.text", "another one");
  });
});
