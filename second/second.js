function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [2014736.4960642927, 5469905.9963252265],
            zoom: 8
        }),
        target: 'map'
    });

    //add basic raster layer
    const basicTileLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    map.addLayer(basicTileLayer);

    //add cities layer
    var citySource = new ol.source.Vector({
        url: 'https://sreckokuz.github.io/hosting-/rs-cities.geojson',
        format: new ol.format.GeoJSON()
    });
    //styling cityLayer
    var cityLayerStyle = function (feature) {
        var style = [new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#e6e600'
                }),
                stroke: new ol.style.Stroke({
                    color: '#995c00',
                    width: 3
                }),
                radius: 11
            }),
            text: new ol.style.Text({
                text: String(feature.get('id')),
                stroke: new ol.style.Stroke({
                    color: '#993333',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: '#e6b3b3'
                })
            })
        })];
        return style;
    }
    const cityLayer = new ol.layer.Vector({
        source: citySource,
        name: "Only layer",
        style: cityLayerStyle
    });

    map.addLayer(cityLayer);

    var selectInteraction = new ol.interaction.Select();
    var mapView = map.getView();
    var location = document.getElementById('location');
    var cityN = document.getElementById('name-city');
    var allNavElements = document.querySelector('#bar')
    //on select element
    selectInteraction.on('select', function (e) {
        //style
        e.selected[0].setStyle([
            new ol.style.Style({
                image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                        color: '#7733ff'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ccb3ff',
                        width: 4
                    }),
                    radius: 14
                }),
                text: new ol.style.Text({
                    text: String(e.selected[0].get('id')),
                    fill: new ol.style.Fill({
                        color: '#e6e600'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffb3',
                        width: 3
                    })
                })
            })
        ]);
        //animate and zoom
        mapView.animate({ zoom: 9 }, { center: e.selected[0].get('geometry').flatCoordinates })
        console.log(e.selected[0].get('geometry').flatCoordinates);
        //change content on right
        location.innerHTML = e.selected[0].values_.location;
        //change nav item active class
        var activeNavElement = document.querySelector('.active');
        activeNavElement.className = activeNavElement.className.replace('active', '');
        allNavElements.children.namedItem(e.selected[0].values_.name).className = 'active';


    });
    //add on hover interaction
    var popupElement = document.getElementById('popup');
    var overlay = new ol.Overlay({
        element: popupElement,
        positioning: 'bottom-left'
    });
    map.addOverlay(overlay);
    map.on('pointermove', function (e) {
        if (map.hasFeatureAtPixel(e.pixel) === true) {
            var onHoverFeature = map.getFeaturesAtPixel(e.pixel)
            var nameInFeature = onHoverFeature[0].get('name');
            popupElement.innerHTML = nameInFeature;
            overlay.setPosition(onHoverFeature[0].get('geometry').flatCoordinates)
            map.getViewport().style.cursor = 'pointer'
        } else {
            overlay.setPosition(undefined);
            map.getViewport().style.cursor = 'default'

        }
    })
    map.addInteraction(selectInteraction);

    var arrayOfAllNavElements = document.querySelectorAll('#bar');
    for (element of arrayOfAllNavElements) {
        element.addEventListener('click', function (e) {
            var activeNavElement = document.querySelector('.active');
            activeNavElement.className = activeNavElement.className.replace('active', '');
            e.target.className = 'active';
            var divId = e.target.id;
            var allLayerFeatures = cityLayer.getSource().getFeatures();
            console.log(divId);
            console.log(allLayerFeatures);
            for (feature of allLayerFeatures) {
                feature.setStyle(undefined)
                if (feature.get('name') === divId) {
                    feature.setStyle([
                        new ol.style.Style({
                            image: new ol.style.Circle({
                                fill: new ol.style.Fill({
                                    color: '#7733ff'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: '#ccb3ff',
                                    width: 4
                                }),
                                radius: 14
                            }),
                            text: new ol.style.Text({
                                text: String(feature.get('id')),
                                fill: new ol.style.Fill({
                                    color: '#e6e600'
                                }),
                                stroke: new ol.style.Stroke({
                                    color: '#ffffb3',
                                    width: 3
                                })
                            })
                        })
                    ]);
                    mapView.animate({ zoom: 9 }, { center: feature.get('geometry').flatCoordinates })
                    location.innerHTML = feature.get('name')

                } else if (divId == 'Home') {
                    mapView.animate({ zoom: 8 }, { center: [2014736.4960642927, 5469905.9963252265] })
                    location.innerHTML = 'Home'
                }
            }
        })
    }


}

window.onload = init;