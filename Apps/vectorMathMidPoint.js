var viewer = new Cesium.Viewer('cesiumContainer');

// Define a couple of points
var p1 = Cesium.Cartesian3.fromDegrees(-73.966250, 40.783430); // New York
var p2 = Cesium.Cartesian3.fromDegrees(-122.419420, 37.774930);// San Francisco

// Compute vector from p1 to p2
var p1p2 = new Cesium.Cartesian3(0.0, 0.0, 0.0);
Cesium.Cartesian3.subtract(p2, p1, p1p2);

// Compute vector to midpoint
var halfp1p2 = new Cesium.Cartesian3(0.0, 0.0, 0.0);
Cesium.Cartesian3.multiplyByScalar(p1p2, 0.5, halfp1p2);

// Compute point half way between p1 and p2
var p3 = new Cesium.Cartesian3(0.0, 0.0, 0.0);
p3 = Cesium.Cartesian3.add(p1, halfp1p2, p3);


// Force point onto surface of ellipsoid for visualization.
var midPt = Cesium.Cartographic.fromCartesian(p3);
var p3a = Cesium.Cartesian3.fromRadians(midPt.longitude, midPt.latitude, 0.0);

viewer.entities.add({
    position: p1,
    point: {
        color: Cesium.Color.DODGERBLUE,
        pixelSize: 10,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 3
       }
    });

viewer.entities.add({
    position: p2,
    point: {
        color: Cesium.Color.DODGERBLUE,
        pixelSize: 10,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 3
       }
    });

viewer.entities.add({
    position: p3a,
    point: {
        color: Cesium.Color.GOLD,
        pixelSize: 10,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 3
       }
    });

viewer.zoomTo(viewer.entities);