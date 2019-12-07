import Part from './Mixins/Part';
import { CSG } from '@jscad/csg';

const preparePrimitive = (fn, addExtraOps) => ({
  mixins: [Part],
  methods:{
    generateGeometry: attrs => {
      let geometry = fn(attrs)
      if(addExtraOps){
        if(attrs.center || attrs.position)
          geometry = geometry.translate(attrs.center);

        if(attrs.size || attrs.scale)
          geometry = geometry.scale(attrs.size);

        if(attrs.rotation){
          // TODO: Why does useing geometry.rotate(attrs.rotation) hang the browser?
          geometry = geometry.rotateX(attrs.rotation[0]);
          geometry = geometry.rotateY(attrs.rotation[1]);
          geometry = geometry.rotateZ(attrs.rotation[2]);
        }
      }

      return geometry;
    }
  }
});

export const Cube = preparePrimitive(CSG.cube);
export const Sphere = preparePrimitive(CSG.sphere);
export const Cylinder = preparePrimitive(CSG.cylinder, true);
export const Polyhedron = preparePrimitive(CSG.polyhedron);
export const roundedCube = preparePrimitive(CSG.roundedCube);
export const roundedCylinder = preparePrimitive(CSG.roundedCylinder, true);
export const cylinderElliptic = preparePrimitive(CSG.cylinderElliptic, true);




