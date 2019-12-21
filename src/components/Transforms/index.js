import Transforms from '../Mixins/Transform';
import { transformations } from '@jscad/scad-api';

const prepareOperation = fn => ({
  mixins: [Transforms],
  methods:{
    applyTransform: fn
  }
});

export const Contract = prepareOperation(transformations.contract);
export const Expand = prepareOperation(transformations.expand);
export const Hull = prepareOperation(transformations.hull);
export const Minkowski = prepareOperation(transformations.minkowski);
export const Mirror = prepareOperation(transformations.mirror);
export const Rotate = prepareOperation(transformations.rotate);
export const Scale = prepareOperation(transformations.scale);
export const Transform = prepareOperation(transformations.transform);
export const Translate = prepareOperation(transformations.translate);
