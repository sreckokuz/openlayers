function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [2011378.0441340134, 5605361.965075096],
            zoom: 5
        }),
        target: 'map'
    });

    const basicTileLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    map.addLayer(basicTileLayer);

    map.on("click", function (e) {
        console.log(e.coordinate)
    });

    var lineInteraction = new ol.interaction.Draw({
        type: 'LineString'
    });
    var pointInteraction = new ol.interaction.Draw({
        type: 'Point'
    });
    var polygonInteraction = new ol.interaction.Draw({
        type: 'Polygon'
    });
    // map.addInteraction(polygonInteraction);
    // map.addInteraction(lineInteraction);
    // map.addInteraction(pointInteraction);

    var allNavigationElements = document.querySelectorAll('#bar');
    for (navigationElement of allNavigationElements) {
        navigationElement.addEventListener('click', function (e) {
            console.log(e.target.id);
            var activeElement = document.querySelector('.active');
            activeElement.className = activeElement.className.replace('active', '');
            e.target.className = 'active';
            if (e.target.id === 'addPoint') {
                map.removeInteraction(polygonInteraction);
                map.removeInteraction(lineInteraction);
                map.addInteraction(pointInteraction);
                map.getViewport().style.cursor = 'default'
            }
            if (e.target.id === 'drawLine') {
                map.removeInteraction(polygonInteraction);
                map.removeInteraction(pointInteraction);
                map.addInteraction(lineInteraction);
                map.getViewport().style.cursor = 'default'
            }
            if (e.target.id === 'drawPolygon') {
                map.removeInteraction(lineInteraction);
                map.removeInteraction(pointInteraction);
                map.addInteraction(polygonInteraction);
                map.getViewport().style.cursor = 'default'
            }
            if (e.target.id === 'pan') {
                map.removeInteraction(lineInteraction);
                map.removeInteraction(pointInteraction);
                map.removeInteraction(polygonInteraction);
                map.getViewport().style.cursor = 'pointer'
            }
        })

    }
    lineInteraction.on('drawend', function (e) {
        console.log(e.feature);
        let parser2 = new ol.format.WKT();
        let wkt = new ol.format.WKT().writeFeatures([e.feature]);
        drawenFeature = new ol.format.WKT().readFeature(wkt);

        var wktFeature = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [drawenFeature]
            })
        });
        var modify = new ol.interaction.Modify({
            source: new ol.source.Vector({
                features: [drawenFeature]
            })
        });
        map.addLayer(wktFeature)
        map.addInteraction(modify);
        setTimeout(function () {
            $('#myModal').modal('toggle');
        }, 1000);


        var geojson = new ol.format.GeoJSON().writeFeatures([e.feature])
        var geojsonEl = document.getElementById('geojson');
        var textEl = document.getElementById('sometext');
        var numberEl = document.getElementById('somenumber');
        console.log(geojson);
        console.log(geojsonEl);

        $("#submitForm").click(function () {
            //console.log("srkomannnn");
            var allData = $('#test').serialize()
            textEl.innerHTML = allData.split('&')[0].split('=')[1];
            numberEl.innerHTML = allData.split('&')[1].split('=')[1];
            console.log(allData);
            geojsonEl.innerHTML = geojson;


        });

    });

    pointInteraction.on('drawend', function (e) {
        console.log(e.feature);
        let parser2 = new ol.format.WKT();
        let wkt = new ol.format.WKT().writeFeatures([e.feature]);
        drawenFeature = new ol.format.WKT().readFeature(wkt);

        var wktFeature = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [drawenFeature]
            })
        });
        var modify = new ol.interaction.Modify({
            source: new ol.source.Vector({
                features: [drawenFeature]
            })
        });
        map.addLayer(wktFeature)
        map.addInteraction(modify);
        setTimeout(function () {
            $('#myModal').modal('toggle');
        }, 1000);


        var geojson = new ol.format.GeoJSON().writeFeatures([e.feature])
        var geojsonEl = document.getElementById('geojson');
        var textEl = document.getElementById('sometext');
        var numberEl = document.getElementById('somenumber');
        console.log(geojson);
        console.log(geojsonEl);

        $("#submitForm").click(function () {
            //console.log("srkomannnn");
            var allData = $('#test').serialize()
            textEl.innerHTML = allData.split('&')[0].split('=')[1];
            numberEl.innerHTML = allData.split('&')[1].split('=')[1];
            console.log(allData);
            geojsonEl.innerHTML = geojson;


        });

    });




    polygonInteraction.on('drawend', function (e) {
        console.log(e.feature);
        let parser2 = new ol.format.WKT();
        let wkt = new ol.format.WKT().writeFeatures([e.feature]);
        drawenFeature = new ol.format.WKT().readFeature(wkt);

        var wktFeature = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [drawenFeature]
            })
        });
        var modify = new ol.interaction.Modify({
            source: new ol.source.Vector({
                features: [drawenFeature]
            })
        });
        map.addLayer(wktFeature)
        map.addInteraction(modify);
        setTimeout(function () {
            $('#myModal').modal('toggle');
        }, 1000);


        var geojson = new ol.format.GeoJSON().writeFeatures([e.feature])
        var geojsonEl = document.getElementById('geojson');
        var textEl = document.getElementById('sometext');
        var numberEl = document.getElementById('somenumber');
        console.log(geojson);
        console.log(geojsonEl);

        $("#submitForm").click(function () {
            //console.log("srkomannnn");
            var allData = $('#test').serialize()
            textEl.innerHTML = allData.split('&')[0].split('=')[1];
            numberEl.innerHTML = allData.split('&')[1].split('=')[1];
            console.log(allData);
            geojsonEl.innerHTML = geojson;


        });

    });


}

window.onload = init;