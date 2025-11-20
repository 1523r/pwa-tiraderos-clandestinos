// Función para mostrar secciones
function mostrar(seccion) {
    document.querySelectorAll("main section").forEach(s => s.style.display = "none");
    document.getElementById(seccion).style.display = "block";
  }
  
  // Reportes fotográficos (simulación sin backend)
  document.getElementById("formReporte").addEventListener("submit", e => {
    e.preventDefault();
    const descripcion = document.getElementById("descripcion").value;
    const file = document.getElementById("foto").files[0];
    const reader = new FileReader();
  
    reader.onload = function(event) {
      document.getElementById("listaReportes").innerHTML += 
        `<p>${descripcion}<br><img src="${event.target.result}" width="200"></p>`;
    };
    reader.readAsDataURL(file);
  });
  
  // Geolocalización y mapa
  function initMap() {
    const centro = { lat: 25.6866, lng: -100.3161 }; // Monterrey, NL
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: centro,
    });
  
    // Ejemplo: marcador fijo
    new google.maps.Marker({
      position: { lat: 25.70, lng: -100.30 },
      map,
      title: "Tiradero clandestino reportado",
    });
  
    // Geolocalización automática
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const userPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        new google.maps.Marker({
          position: userPos,
          map,
          title: "Tu ubicación"
        });
        map.setCenter(userPos);
      });
    }
  }
  
  // Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker registrado"))
      .catch(err => console.error("Error:", err));
  }
  