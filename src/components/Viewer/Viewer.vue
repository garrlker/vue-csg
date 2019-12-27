<template>
  <div class="viewer" @wheel.prevent>
    <slot></slot>
  </div>
</template>

<script>
import wrapRegl from "regl";
// import wrapRegl from "multi-regl";
import reglCamera from "regl-camera";
import { csgToGeometry } from "../lib/util";
import { primitives3d } from "@jscad/scad-api";

// if(!window.regl){
//   window.regl = wrapRegl;
// }

export default {
  name: "Viewer",
  provide() {
    return {
      outputCSGtoParent: this.receiveChildCSG
    };
  },
  props: {
    backgroundColor: {
      type: Array,
      default: () => [0.66, 0.66, 0.66, 1]
    },
    theta: {
      type: Number,
      default: 0
    },
    phi: {
      type: Number,
      default: 0
    },
  },
  methods: {
    createCSGDrawCall(csg) {
      var { vertices, indices, normals } = csgToGeometry(csg);

      this.drawCSG = this.regl({
        frag: `
      precision mediump float;
      varying vec3 vnormal;
      void main () {
        gl_FragColor = vec4(abs(vnormal), 1.0);
      }`,
        vert: `
      precision mediump float;
      uniform mat4 projection, view;
      attribute vec3 position, normal;
      varying vec3 vnormal;
      void main () {
        vnormal = normal;
        gl_Position = projection * view * vec4(position, 1.0);
      }`,
        attributes: {
          position: vertices,
          normal: normals
        },
        elements: indices
      });
    },
    receiveChildCSG(childID, childGeometry) {
      console.log("Viewer CSG", childGeometry);
      if (!this.regl) {
        this.regl = wrapRegl(this.$el);
        // this.regl = window.regl(this.$el);

        // Quick hack to have the camera at a good distance from the model depending on its bounding box
        var distance = childGeometry.getBounds()[1]._y * 4;

        const camera = reglCamera(this.regl, {
          center: [0, 0, 0],
          damping: 0,
          distance: distance,
          theta: this.theta,
          phi: this.phi,
          rotationSpeed: 1.5,
          zoomSpeed: 2
        });

        this.regl.frame(() => {
          this.regl.clear({
            color: this.backgroundColor
          });
          camera(() => {
            if (this.drawCSG) this.drawCSG();
          });
        });
      }

      this.createCSGDrawCall(childGeometry);
    }
  },
  beforeDestroy() {
    this.regl.destroy();
  }
};
</script>

<style>
.viewer {
  min-height: 500px;
  min-width: 500px;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>