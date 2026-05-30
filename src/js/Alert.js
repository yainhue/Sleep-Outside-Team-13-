export default class Alert {
  constructor() {
    this.path = "../json/alerts.json";
  }

  async getAlerts() {
    const response = await fetch(this.path);
    const data = await response.json();

    return data;
  }

  async renderAlerts() {
    const alerts = await this.getAlerts();

    // si no hay alertas, salir
    if (!alerts.length) return;

    // crear section
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    // crear cada alerta
    alerts.forEach((alert) => {
      const p = document.createElement("p");

      p.textContent = alert.message;

      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;

      alertSection.appendChild(p);
    });

    // agregar arriba del main
    const main = document.querySelector("main");

    main.prepend(alertSection);
  }
}