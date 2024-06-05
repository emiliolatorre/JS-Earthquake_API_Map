const map = L.map('map').setView([40.4389888, -3.7126144], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// VARIABLES

const markersLayer = L.layerGroup().addTo(map);
let markersData = [];

const urlTerremotos = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
const filtroMag = document.querySelector('#filtroMag');

//ICONS

const iconMyPosition = L.icon({
    iconUrl: './assets/iconroja.png',
    iconSize: [35, 35],
});

const icon7 = L.icon({
    iconUrl: 'assets/icon7.png',
    iconSize: [35, 35],
});

const icon6 = L.icon({
    iconUrl: 'assets/icon6.png',
    iconSize: [35, 35],
});

const icon5 = L.icon({
    iconUrl: 'assets/icon5.png',
    iconSize: [35, 35],
});

const icon4 = L.icon({
    iconUrl: 'assets/icon4.png',
    iconSize: [35, 35],
});

const icon3 = L.icon({
    iconUrl: 'assets/icon3.png',
    iconSize: [35, 35],
});

const icon2 = L.icon({
    iconUrl: 'assets/icon2.png',
    iconSize: [35, 35],
});

const icon1 = L.icon({
    iconUrl: 'assets/icon1.png',
    iconSize: [35, 35],
});

const icon0 = L.icon({
    iconUrl: 'assets/icon0.png',
    iconSize: [35, 35],
});

// para localizar mi posición
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);
        let datos = [position.coords.latitude.toFixed(4), position.coords.longitude.toFixed(4)];
        L.marker(datos, { icon: iconMyPosition }).addTo(map);
        console.log(datos)
    });
} else {
    console.warn("Tu navegador no soporta Geolocalización!! ");
}

// Petición HTTP para obtener los terremotos disponibles en la API
const addMarkersData = async (url) => {
    try {
        const resp = await fetch(url)
        if (resp) {
            const resultado = await resp.json();
            return resultado
        } else {
            throw 'la url no es válida'
        }

    } catch (error) {
    }
}

addMarkersData(urlTerremotos)
    .then((resp) => {
        markersData = resp.features;
        console.log(markersData)
        addMarkers(markersData)
    })
    .catch((error) => console.error(error))

// FUNCION ADDMARKERS
const addMarkers = (data) => {
    data.forEach(element => {
        const coordenadas = element.geometry.coordinates;
        const [a, b, c] = coordenadas;
        const coordenadasCheck = [b, a]

        const fecha = new Date(element.properties.time)
        const año = fecha.getFullYear();
        const mes = fecha.getMonth();
        const dia = fecha.getDate();
        const fechacompleta = `${año}/${mes}/${dia}`

        const popupText = `Titulo: ${element.properties.title}, Fecha: ${fechacompleta}, Ubicación: ${element.properties.place}, Código: ${element.properties.code}, Magnitud: ${element.properties.mag} ${element.properties.magType}`

        if (element.properties.mag >= 7) {
            const marker = L.marker(coordenadasCheck, { icon: icon7 }).bindPopup(popupText);
            markersLayer.addLayer(marker);
        } else if (element.properties.mag >= 6 && element.properties.mag < 7) {
            const marker = L.marker(coordenadasCheck, { icon: icon6 }).bindPopup(popupText);
            markersLayer.addLayer(marker);
        } else if (element.properties.mag >= 5 && element.properties.mag < 6) {
            const marker = L.marker(coordenadasCheck, { icon: icon5 }).bindPopup(popupText);
            markersLayer.addLayer(marker);
        } else if (element.properties.mag >= 4 && element.properties.mag < 5) {
            const marker = L.marker(coordenadasCheck, { icon: icon4 }).bindPopup(popupText);
            markersLayer.addLayer(marker);
        } else if (element.properties.mag >= 3 && element.properties.mag < 4) {
            const marker = L.marker(coordenadasCheck, { icon: icon3 }).bindPopup(popupText);
            markersLayer.addLayer(marker);
        } else if (element.properties.mag >= 2 && element.properties.mag < 3) {
            const marker = L.marker(coordenadasCheck, { icon: icon2 }).bindPopup(popupText);
            markersLayer.addLayer(marker);
        } else if (element.properties.mag >= 1 && element.properties.mag < 2) {
            const marker = L.marker(coordenadasCheck, { icon: icon1 }).bindPopup(popupText);
            markersLayer.addLayer(marker);
        } else if (element.properties.mag >= 0 && element.properties.mag < 1) {
            const marker = L.marker(coordenadasCheck, { icon: icon0 }).bindPopup(popupText);
            markersLayer.addLayer(marker);
        }
    })
};

// FILTRO MAGNITUD

filtroMag.addEventListener('change', (event) => {
    if (event.target.value === 'mag0') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                markersData = data.filter(element => element.properties.mag >= 0 && element.properties.mag < 1)
                console.log(markersData)
                addMarkers(markersData)
            })
            .catch((error) => console.error(error))
    } else if (event.target.value === 'mag1') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                markersData = data.filter(element => element.properties.mag >= 1 && element.properties.mag < 2)
                console.log(markersData)
                addMarkers(markersData)
            })
            .catch((error) => console.error(error))
    } else if (event.target.value === 'mag2') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                markersData = data.filter(element => element.properties.mag >= 2 && element.properties.mag < 3)
                console.log(markersData)
                addMarkers(markersData)
            })
            .catch((error) => console.error(error))
    } else if (event.target.value === 'mag3') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                markersData = data.filter(element => element.properties.mag >= 3 && element.properties.mag < 4)
                console.log(markersData)
                addMarkers(markersData)
            })
            .catch((error) => console.error(error))
    } else if (event.target.value === 'mag4') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                markersData = data.filter(element => element.properties.mag >= 4 && element.properties.mag < 5)
                console.log(markersData)
                addMarkers(markersData)
            })
            .catch((error) => console.error(error))
    } else if (event.target.value === 'mag5') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                markersData = data.filter(element => element.properties.mag >= 5 && element.properties.mag < 6)
                console.log(markersData)
                addMarkers(markersData)
            })
            .catch((error) => console.error(error))
    } else if (event.target.value === 'mag6') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                markersData = data.filter(element => element.properties.mag >= 6 && element.properties.mag < 7)
                console.log(markersData)
                addMarkers(markersData)
            })
            .catch((error) => console.error(error))
    } else if (event.target.value === 'mag7') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                markersData = data.filter(element => element.properties.mag >= 7)
                console.log(markersData)
                addMarkers(markersData)
            })
            .catch((error) => console.error(error))
    } else if (event.target.value === 'todas') {
        addMarkersData(urlTerremotos)
            .then((resp) => {
                markersLayer.clearLayers();
                const data = resp.features;
                addMarkers(data)
            })
            .catch((error) => console.error(error))
    }
});
