<script>
import Primitive from "../Mixins/Primitive";
import { primitives3d } from "@jscad/scad-api";
import uuid from '../Mixins/uuid'
import csgMixin from '../Mixins/csg'

export default {
  name: "Torus",
  mixins: [Primitive, csgMixin, uuid],
  methods: {
    generateCSG(attrs) {
      let geometry = primitives3d.torus(attrs);
      if (attrs.pos) {
        geometry = geometry.translate(attrs.pos);
      }

      if (attrs.rot) {
        var rotateCenter = attrs.pos ? attrs.pos : [0, 0, 0];

        geometry = geometry.rotate(rotateCenter, [1, 0, 0], attrs.rot[0]);

        geometry = geometry.rotate(rotateCenter, [0, 1, 0], attrs.rot[1]);

        geometry = geometry.rotate(rotateCenter, [0, 0, 1], attrs.rot[2]);
      }

      return geometry;
    }
  }
};
</script>
