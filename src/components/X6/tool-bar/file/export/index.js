// 导出
const { DataUri } = window.X6

export const exportChartType = {
  'PNG': {
    method: 'toPNG',
    suffix: '.png'
  },
  'JPEG': {
    method: 'toJPEG',
    suffix: '.jpeg'
  },
  'SVG': {
    method: 'toSVG',
    suffix: '.svg'
  }
}

export const exportChart = (graph, type) => {
  graph[exportChartType[type]['method']]((dataUri) => {
    if (type === 'SVG') dataUri = DataUri.svgToDataUrl(dataUri)
    DataUri.downloadDataUri(dataUri, `chart${exportChartType[type]['suffix']}`)
  })
}
