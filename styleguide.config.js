module.exports = {
  title: 'vue-csg',
  components: 'src/components/**/[A-Z]*.vue',
  defaultExample: true,
  sections: [
    // {
    //   name: '3D Primitives',
    //   components: 'src/components/**/[A-Z]*.vue'
    // },
    {
      name: '3D Primitives',
      components: 'src/components/Primitives/*.vue'
    },
    {
      name: 'Operations',
      components: 'src/components/Operations/*.vue'
    },
    {
      name: 'Viewer',
      components: 'src/components/Viewer/**/*.vue'
    },
    
  ],
  // webpackConfig: {
  //   // custom config goes here
  // },
  exampleMode: 'expand',
  skipComponentsWithoutExample: true
}
