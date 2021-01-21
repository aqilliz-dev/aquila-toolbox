const plotly = require('plotly')

const generateGraphData = (data) => {
  if (data.full >= 0 && data.full < 10) {
    data.graphStepsData['[0-10%)'].push(data.tps)
  } else if (data.full >= 10 && data.full < 20) {
    data.graphStepsData['[10-20%)'].push(data.tps)
  } else if (data.full >= 20 && data.full < 30) {
    data.graphStepsData['[20-30%)'].push(data.tps)
  } else if (data.full >= 30 && data.full < 40) {
    data.graphStepsData['[30-40%)'].push(data.tps)
  } else if (data.full >= 40 && data.full < 50) {
    data.graphStepsData['[40-50%)'].push(data.tps)
  } else if (data.full >= 50 && data.full < 60) {
    data.graphStepsData['[50-60%)'].push(data.tps)
  } else if (data.full >= 60 && data.full < 70) {
    data.graphStepsData['[60-70%)'].push(data.tps)
  } else if (data.full >= 70 && data.full < 80) {
    data.graphStepsData['[70-80%)'].push(data.tps)
  } else if (data.full >= 80 && data.full < 90) {
    data.graphStepsData['[80-90%)'].push(data.tps)
  } else if (data.full >= 90 && data.full <= 100) {
    data.graphStepsData['[90-100%]'].push(data.tps)
  }
  return data.graphStepsData
}

const generateX = (data) => {
  let x = []
  Object.keys(data).forEach(key => {
    for (let i=0; i < data[key].length; i++) {
      x.push(key)
    }
  })
  console.log(x)
  return x
}

const generateY = (data) => {
  let y = []
  Object.values(data).forEach(value => {
    y = y.concat(value)
  })
  console.log(y)
  return y
}

const generateGraph = (dataTPS, benchmarkGraph) => {
  const { name, user, key } = benchmarkGraph
  const x = generateX(dataTPS)
  const y = generateY(dataTPS)

  var trace1 = {
    y: y,
    x: x,
    name: name,
    marker: {color: "#3D9970"},
    type: "box"
  };

  var data = [trace1];

  var layout = {
    yaxis: {
      title: "TPS",
      zeroline: true
    },
    boxmode: "group"
  };
  var graphOptions = {layout: layout, filename: name, fileopt: "overwrite"};

  plotly(user, key).plot(data, graphOptions, function (err, msg) {
      console.log(msg);
      console.log(err)
      process.exit(0);
  });
}

module.exports = { generateGraph, generateGraphData }