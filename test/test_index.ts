const testContexts = require.context('./', true, /\.test\.ts$/);
testContexts.keys().forEach(testContexts);
