import Primitive from '../Mixins/Primitive';
import { CSG } from '@jscad/csg';
// import { init, util } from 'jscad-utils';
import { primitives3d, transformations } from '@jscad/scad-api';
console.log('bla', primitives3d, transformations);

/* Other scad apis in scad-api are 
 * booleanOps
 * color
 * extrusions
 * maths
 * primitives2d
 * text
 * transformations
 */


const preparePrimitive = (fn, addExtraOps) => ({
  mixins: [Primitive],
  methods:{
    generateCSG: attrs => {
      let geometry = fn(attrs)
        if(attrs.pos)
          geometry = geometry.translate(attrs.pos);

        // if(attrs.size || attrs.scale)
        //   geometry = geometry.scale(attrs.size);

        if(attrs.rot){
          var rotateCenter = attrs.pos ? attrs.pos : [0,0,0];

          geometry = geometry.rotate(
            rotateCenter,
            [1,0,0],
            attrs.rot[0]
          );

          geometry = geometry.rotate(
            rotateCenter,
            [0,1,0],
            attrs.rot[1]
          );

          geometry = geometry.rotate(
            rotateCenter,
            [0,0,1],
            attrs.rot[2]
          );
        }

      return geometry;
    }
  }
});

// export const Cube = preparePrimitive(CSG.cube);
export const Cube = preparePrimitive(primitives3d.cube);
export const Sphere = preparePrimitive(primitives3d.sphere);
export const Cylinder = preparePrimitive(primitives3d.cylinder);
export const Torus = preparePrimitive(primitives3d.torus);
export const Polyhedron = preparePrimitive(primitives3d.polyhedron);
export const roundedCube = preparePrimitive(CSG.roundedCube);
export const roundedCylinder = preparePrimitive(CSG.roundedCylinder, true);
export const cylinderElliptic = preparePrimitive(CSG.cylinderElliptic, true);




