var viewer = new Cesium.Viewer('cesiumContainer');
/*
var center = Cesium.Cartesian3.fromDegrees(-83.60599994659424, 41.65314642955857);
viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 5000.0));
*/

var terrainProvider = new Cesium.CesiumTerrainProvider({
    url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
    requestVertexNormals : true
});


var orangeOutlined = viewer.entities.add({
    name : 'Orange line with black outline at height and following the surface',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights([
-83.60599994659424,41.65314642955857,0,
-83.61149847507477,41.65748715975828,1100,
-83.60820472240448,41.65790799062034,1050,
-83.61224949359894,41.6606894130704,1000,
-83.61399829387665,41.65331477357836,536.35,
-83.61404120922089,41.6566174339294,452.67,
-83.60747516155243,41.65665350574102,605,
-83.60684216022491,41.66014035216091,475,
-83.61385881900787,41.66005618912598,500,
-83.60599994659424,41.65314642955857,0,
]),
        width : 5,
        material : new Cesium.PolylineOutlineMaterialProperty({
            color : Cesium.Color.ORANGE,
            outlineWidth : 2,
            outlineColor : Cesium.Color.BLACK
        })
    }
});

/*
var outlineOnly = viewer.entities.add({
    name : 'Yellow box outline',
    position: Cesium.Cartesian3.fromDegrees(-83.60599994659424,41.65314642955857,1000),
    box : {
        dimensions : new Cesium.Cartesian3(400.0, 300.0, 500.0),
        fill : false,
        outline : true,
        outlineColor : Cesium.Color.YELLOW
    }
});
*/


var cyanPath = viewer.entities.add({
    name : 'Cyan Path at height',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights([
-83.60986232757568,41.653258658953995,0,
-83.6284875869751,41.67477102498508,330,
-83.59806060791016,41.67467486050641,280,
-83.58132362365723,41.65357931329197,300,
-83.61020565032959,41.65438094215332,375,
-83.61230850219727,41.65338692088074,400,
-83.59621524810791,41.63879548894791,410,
-83.58582973480225,41.64594730695605,325,
-83.61664295196533,41.66178752084511,250,
-83.62171769142151,41.66080162932243,200,
-83.60479831695557,41.65329072445963,250,
-83.59930515289305,41.660320701151136,200,
-83.60895037651062,41.671132702102106,225,
-83.61650347709656,41.67340868147116,175,
-83.60986232757568,41.653258658953995,0
]),
        width : 5,
        material : Cesium.Color.CYAN
    }
});



viewer.zoomTo(viewer.entities);
