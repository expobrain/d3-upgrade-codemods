jest.autoMockOff()
const defineTest = require('jscodeshift/dist/testUtils').defineTest
defineTest(__dirname, 'd3-scale')
