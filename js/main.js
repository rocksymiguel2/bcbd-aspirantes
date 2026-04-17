document.addEventListener("DOMContentLoaded", () => {
  const datos = {
    comp1: [
      {
        nombre: "Herramientas de uso común",
        uso: "Facilitan la respuesta rápida a emergencias y maniobras básicas."
      }
    ],
    comp2: [
      {
        nombre: "Extintor PQS",
        uso: "Apagar fuegos de líquidos, eléctricos y combustibles."
      },
      {
        nombre: "Extintor CO₂",
        uso:
          "Ideal para fuegos eléctricos y líquidos inflamables, no deja residuo."
      },
      {
        nombre: "Extintor de agua",
        uso: "Para fuegos de materiales sólidos, como madera y papel."
      },
      {
        nombre: "F500 (espuma)",
        uso: "Controla fuego de líquidos inflamables con mayor eficiencia."
      },
      {
        nombre: "Eductor de espuma",
        uso: "Mezcla agua y concentrado de espuma para generar espuma extintora."
      }
    ],
    comp3: [{ nombre: "Cerrado", uso: "Cerrado." }],
    comp4: [
      {
        nombre: "Extractor de humo",
        uso: "Evacúa humo de espacios cerrados, mejora visibilidad y ventilación."
      }
    ],
    comp5: [
      {
        nombre: "Mototrozadora",
        uso: "Corte de metal o puertas en rescates vehiculares."
      },
      {
        nombre: "Tacos de escalerilla y 4x4",
        uso: "Estabilización de vehículos o estructuras durante rescates."
      },
      {
        nombre: "Cuñas",
        uso: "Soporte seguro de objetos o víctimas durante rescates."
      }
    ],
    comp6: [
      {
        nombre: "COMBITOOL",
        uso:
          "Herramienta multifunción para rescates vehiculares (corte, expansión, compresión)."
      },
      {
        nombre: "RAM",
        uso:
          "Pistón hidráulico para separar, levantar o abrir estructuras atrapadas."
      }
    ],
    comp7: [
      {
        nombre: "Herramientas de uso común (lado opuesto)",
        uso: "Facilitan la respuesta rápida a emergencias y maniobras básicas."
      }
    ],
    comp8: [
      {
        nombre: "Tramos de 2.5''",
        uso: "Permite ataque de agua en incendios y conexión rápida."
      },
      {
        nombre: "Conos medianos",
        uso: "Delimitación de zona de trabajo."
      }
    ],
    comp9: [
      {
        nombre: "Tramos de 2.5''",
        uso: "Permite ataque de agua en incendios y conexión rápida."
      },
      {
        nombre: "Conos medianos",
        uso: "Delimitación de zona de trabajo."
      }
    ],
    comp10: [
      { nombre: "Conos altos", uso: "Señalización de zona de emergencia." },
      {
        nombre: "Combustible",
        uso: "Para equipos móviles como motobombas o generadores."
      }
    ],
    comp11: [
      {
        nombre: "Motor hidráulico y mangueras hidráulicas",
        uso: "Equipo hidráulico para rescates."
      },
      {
        nombre: "Detergentes",
        uso: "Limpieza de equipos después de incidentes."
      }
    ]
  };

  const lista = document.getElementById("lista");
  const compartimientos = document.querySelectorAll("#unidadU7 rect");

  compartimientos.forEach((comp) => {
    comp.addEventListener("click", () => {
      const herramientas = datos[comp.id] || [];

      lista.innerHTML = herramientas.length
        ? herramientas
          .map(
            (h) => `<li><strong>${h.nombre}</strong>: ${h.uso}</li>`
          )
          .join("")
        : "<li><em>Sin datos disponibles.</em></li>";

      compartimientos.forEach((c) =>
        c.setAttribute("fill", "#d32f2f")
      );
      comp.setAttribute("fill", "#f57c00");
    });
  });
});
