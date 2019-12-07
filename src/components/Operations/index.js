import Operation from '../Mixins/Operation';

const prepareOperation = fn => ({
  mixins: [Operation],
  methods:{
    applyOperation: (finalPrimitive, leafPrimitive) => finalPrimitive[fn](leafPrimitive)
  }
});

export const Union = prepareOperation('union');
export const Subtract = prepareOperation('subtract');
export const Intersect = prepareOperation('intersect');
export const Hull = prepareOperation('hull');



