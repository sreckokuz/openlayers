function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [2014736.4960642927, 5469905.9963252265],
            zoom: 6
        }),
        target: 'map'
    });

    //add first raster layer
    const osmRasterLayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        name: 'option1',
        visible: true
    });
    //add second raster layer
    const bingRasterLayer = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            key: 'AufVo8ovO8gdq8DT1_Amv8strAP_adV4wHO3bB8BjHW5Y6XF2NEG7v9no2v-OLJo',
            imagerySet: 'RoadOnDemand'
        }),
        name: 'option2',
        visible: false
    });

    const baseLayerGroup = new ol.layer.Group({
        layers: [osmRasterLayer, bingRasterLayer]
    });
    map.addLayer(baseLayerGroup);
    const rasterLayers = document.querySelectorAll('#vector > input[type=radio]')
    for (rasterLayer of rasterLayers) {
        rasterLayer.addEventListener('change', function (e) {
            const baseLayerElement = this.value
            baseLayerGroup.getLayers().forEach(function (element, index, array) {
                layerElement = element.get('name');
                console.log(layerElement)
                element.setVisible(layerElement === baseLayerElement)
            })
        })
    }

    const firstVectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://sreckokuz.github.io/hosting-/map3.geojson',
            format: new ol.format.GeoJSON()
        }),
        name: 'option3',
        visible: true,
        style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: [ 150, 70, 90, 0.5 ]
			}),
			stroke: new ol.style.Stroke({
				color: [255, 255, 50],
				width: 3
			}),
			image: new ol.style.Circle({
				fill: new ol.style.Fill({
					color: [244, 244, 100]
				}),
				stroke: new ol.style.Stroke({
					color: [22,222,255],
					width: 2
				}),
				radius: 10,
				points: 10
			})
		})
    })

    const secondVectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://sreckokuz.github.io/hosting-/map.geojson',
            format: new ol.format.GeoJSON()
        }),
        name: 'option4',
        visible: false,
        style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: [50, 70, 90, 0.6]
			}),
			stroke: new ol.style.Stroke({
				color: [150,150,150],
				width: 2.4
			}),
			image: new ol.style.RegularShape({
				fill: new ol.style.Fill({
					color: [233,133,33, 0.6]
				}),
				stroke: new ol.style.Stroke({
					color: [111, 222, 11],
					width: 1.6
				}),
				points: 5,
				radius1: 10,
				radius2: 5
			})
		})
    });

    const thirdVectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://sreckokuz.github.io/hosting-/map2.geojson',
            format: new ol.format.GeoJSON()
        }),
        name: 'option5',
        visible: false,
        style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: [40, 119,247, 0.5]
			}),
			stroke: new ol.style.Stroke({
				color: [30, 30, 30, 1],
				width: 1.2,
				lineJoin: 'bevel',
				lineDash: [3, 6]
			}),
			image: new ol.style.Icon({
				src: 'https://sreckokuz.github.io/hosting-/icons8-marker-64.png',
				size: [100, 100],
				scale: 0.5
			})
		})
    })

    const vectorGroup = new ol.layer.Group({
        layers: [firstVectorLayer, secondVectorLayer, thirdVectorLayer]
    });
    map.addLayer(vectorGroup);

    const vectorLayers = document.querySelectorAll('#raster > input[type=checkbox]')
    console.log(vectorLayers)
    for (vectorLayer of vectorLayers) {
        vectorLayer.addEventListener('change', function (e) {
            var elValue = this.value;
            var vectorLayerEl;
            vectorGroup.getLayers().forEach(function (element, index, array) {
                if (element.get('name') === elValue) {
                    vectorLayerEl = element;
                }
            })
            this.checked ? vectorLayerEl.setVisible(true) : vectorLayerEl.setVisible(false)
        })
    }

}

window.onload = init;
