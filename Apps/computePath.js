Cesium.BingMapsApi.defaultKey = 'A9xWakARP6oWWBI3zMGk~AJk02AMxpxkuwx5AIzjDXA~AgMJyLPHkkjbFSpCEm8XLowoPb1IS_ZhHUmpIMjOduDzgtxA2DjxR4Gy58d9TUn5';

var viewer = new Cesium.Viewer('cesiumContainer');



//Use STK World Terrain
viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    url : 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
    requestVertexNormals : true
});





//Set the random number seed for consistent results.
Cesium.Math.setRandomNumberSeed(3);


var start = Cesium.JulianDate.fromDate(new Date());
var stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());
console.log(start);
console.log(stop);


var a = [];
var b = [];
var c = [];
function computeFlightPath(lon, lat, radius, index) {
	var count = 0;
    var pos = new Cesium.SampledPositionProperty();
    for (var i = 0; i <= 270; i += 15) {
        var radians = Cesium.Math.toRadians(i);
		//console.log(radians);
        var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
        var position = Cesium.Cartesian3.fromDegrees(lon + (radius * 1.5 * Math.cos(radians)), lat + (radius * Math.sin(radians)), Cesium.Math.nextRandomNumber() * 500 + 1750);
        pos.addSample(time, position);
        console.log(time);
		if(index === 1){
			a[count] = pos.getValue(time);
		}
		if(index === 2) {
			b[count] = pos.getValue(time);
		}
		
		
		

        //Also create a point for each sample we generate.
		if(index === 1) {
			viewer.entities.add({
				position : position,
				point : {
					pixelSize : 8,
					color : Cesium.Color.TRANSPARENT,
					outlineColor : Cesium.Color.YELLOW,
					outlineWidth : 3
				}
			});
		}
		if(index === 2) {
			viewer.entities.add({
				position : position,
				point : {
					pixelSize : 8,
					color : Cesium.Color.TRANSPARENT,
					outlineColor : Cesium.Color.RED,
					outlineWidth : 3
				}
			});
		}
		count++;
    }
    return pos;
}
var locLonArr = [];
var locLatArr = [];
var locHeightArr = [];
function computeFinalFlightPath(d, a, b) {
    var count1 = 0
	
//console.log(a);
    var property = new Cesium.SampledPositionProperty();
    for (var i = 0; i < a.length; i++) {
        var radians = Cesium.Math.toRadians(i*15);
		//console.log(radians);
        var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
        var position = Cesium.Cartesian3.fromElements(((a[i].x+b[i].x)/2), ((a[i].y+b[i].y)/2), ((a[i].z+b[i].z)/2));
        property.addSample(time, position);
		
		var loc = property.getValue(time);
        var loc1 = Cesium.Cartographic.fromCartesian(loc); 
            var loclon = Cesium.Math.toDegrees(loc1.longitude);
            var loclat = Cesium.Math.toDegrees(loc1.latitude);
            var locheight = loc1.height; //height in metres
	locLonArr[count1] = loclon;
    locLatArr[count1] = loclat;
    locHeightArr[count1] = locheight - 200; //Waypoints at mid of the corridor as height is 400m
        //Also create a point for each sample we generate.
			viewer.entities.add({
				position : position,
				point : {
					pixelSize : 8,
					color : Cesium.Color.TRANSPARENT,
					outlineColor : Cesium.Color.CYAN,
					outlineWidth : 3
				}
			});
			/*viewer.entities.add({
                position: position,
                //orientation: Cesium.Quaternion.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(Math.PI, 0, 0)),
                box : {
                    dimensions : new Cesium.Cartesian3(400.0, 300.0, 500.0),
                    fill : false,
                    outline : true,
                    outlineColor : Cesium.Color.BLUE
    }

});*/
            /*var blueCorridor = viewer.entities.add({
                name : 'Blue extruded corridor with beveled corners and outline',
                corridor : {
                    positions : Cesium.Cartesian3.fromDegreesArray(locArr),
                    height : 4.0,
                    extrudedHeight : 100.0,
                    width : 100.0,
                    cornerType: Cesium.CornerType.BEVELED,
                    material : Cesium.Color.BLUE.withAlpha(0.5),
                    outline : true, // height or extrudedHeight must be set for outlines to display
                    outlineColor : Cesium.Color.WHITE
                }
            });*/
				
		count1++;
    }
    return property;
}
//Compute the position
var position = computeFlightPath(-83.60986232757568,41.653258658953995, 0.03, 1);
var position1 = computeFlightPath(-83.60986232757570,41.653258658953998, 0.033, 2);

var d = [];
for(i=0;i<a.length;i++){
	d[i] = Cesium.Cartesian3.distance(a[i], b[i]);
}
//console.log(d);
//console.log(a);
//console.log(b);
var positionFinal = computeFinalFlightPath(d,a,b);
//console.log(position);
/*var carto = [];
var lon = [];
var lat = [];*/

    /*var carto  = Cesium.Ellipsoid.WGS84.cartesianToCartographic(positionFinal);     
    var lon = Cesium.Math.toDegrees(carto.longitude); 
    var lat = Cesium.Math.toDegrees(carto.latitude); */

/*var carto  = Cesium.Ellipsoid.WGS84.cartesianToCartographic(pos);     
var lon = Cesium.Math.toDegrees(carto.longitude); 
var lat = Cesium.Math.toDegrees(carto.latitude); */


   /* var corr = [lon[0], lat[0],
    lon[1], lat[1]];*/
    //console.log(locLonArr);
    console.log(locHeightArr[0]);
    //console.log([locLonArr[0], locLatArr[0], locLonArr[1], locLatArr[1], locLonArr[2], locLatArr[2]]);



		


var entity = viewer.entities.add({

    availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
        start : start,
        stop : stop
    })]),

    //Use our computed positions
    position : position,


    //Automatically compute orientation based on position movement.
    orientation : new Cesium.VelocityOrientationProperty(position),

      
    path : {
        resolution : 1,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.1,
            color : Cesium.Color.YELLOW
        }),
        width : 10
    }
});

var entity1 = viewer.entities.add({

    
    availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
        start : start,
        stop : stop
    })]),

    //Use our computed positions
    position : position1,


    //Automatically compute orientation based on position movement.
    orientation : new Cesium.VelocityOrientationProperty(position),

     
    path : {
        resolution : 1,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.1,
            color : Cesium.Color.RED
        }),
        width : 10
    }
});

var entity2 = viewer.entities.add({

    
    availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
        start : start,
        stop : stop
    })]),

    //Use our computed positions
    position : positionFinal,


    //Automatically compute orientation based on position movement.
    orientation : new Cesium.VelocityOrientationProperty(position),

     
    path : {
        resolution : 1,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.1,
            color : Cesium.Color.CYAN
        }),
        width : 10
    }
});

/*var blueCorridor = viewer.entities.add({
    name : 'Blue extruded corridor with beveled corners and outline',
    corridor : {
        positions : Cesium.Cartesian3.fromDegreesArray([locLonArr[0], locLatArr[0], locLonArr[1], locLatArr[1], locLonArr[2], locLatArr[2]]),
        height : 500.0,
        extrudedHeight : 500.0,
        width : 500.0,
        cornerType: Cesium.CornerType.BEVELED,
        material : Cesium.Color.BLUE.withAlpha(0.5),
        outline : true, // height or extrudedHeight must be set for outlines to display
        outlineColor : Cesium.Color.WHITE
    }
});*/

var blueCorridor = viewer.entities.add({
    name : 'Blue corridor with beveled corners and outline',
    polylineVolume : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights([locLonArr[0], locLatArr[0], locHeightArr[0], 
                                                               locLonArr[1], locLatArr[1], locHeightArr[1], 
                                                               locLonArr[2], locLatArr[2], locHeightArr[2],
                                                               locLonArr[3], locLatArr[3], locHeightArr[3],
                                                               locLonArr[4], locLatArr[4], locHeightArr[4],
                                                               locLonArr[5], locLatArr[5], locHeightArr[5],
                                                               locLonArr[6], locLatArr[6], locHeightArr[6],
                                                               locLonArr[7], locLatArr[7], locHeightArr[7],
                                                               locLonArr[8], locLatArr[8], locHeightArr[8],
                                                               locLonArr[9], locLatArr[9], locHeightArr[9],
                                                               locLonArr[10], locLatArr[10], locHeightArr[10],
                                                               locLonArr[11], locLatArr[11], locHeightArr[11],
                                                               locLonArr[12], locLatArr[12], locHeightArr[12],
                                                               locLonArr[13], locLatArr[13], locHeightArr[13],
                                                               locLonArr[14], locLatArr[14], locHeightArr[14],
                                                               locLonArr[15], locLatArr[15], locHeightArr[15],
                                                               locLonArr[16], locLatArr[16], locHeightArr[16],
                                                               locLonArr[17], locLatArr[17], locHeightArr[17],
                                                               locLonArr[18], locLatArr[18], locHeightArr[18]]),
        shape :[new Cesium.Cartesian2(-200, -200),
                new Cesium.Cartesian2(200, -200),
                new Cesium.Cartesian2(200, 200),
                new Cesium.Cartesian2(-200, 200)],
        cornerType : Cesium.CornerType.BEVELED,
        material : Cesium.Color.BLUE.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});



viewer.zoomTo(viewer.entities);