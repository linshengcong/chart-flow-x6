/**
 * Author: lixiaoyi 2212884878@qq.com
 * Date: 2023-02-28 17:27:20
 * LastEditors: lixiaoyi 2212884878@qq.com
 * LastEditTime: 2023-03-22 20:55:06
 */
const { Graph, Dom } = window.X6
import { basicPorts, customPorts } from './ports' // 连接桩配置
  
// 基础节点
export const FlowChartRect = Graph.registerNode('flow-chart-rect', {
  inherit: 'rect',
  width: 80,
  height: 42,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: '#ffffff'
    },
    fo: {
      refWidth: '100%',
      refHeight: '100%'
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    'edit-text': {
      contenteditable: 'true',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(0,0,0,0.85)'
      }
    },
    text: {
      fontSize: 12,
      fill: '#080808'
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'text'
    },
    {
      tagName: 'foreignObject',
      selector: 'fo',
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: 'body',
          selector: 'foBody',
          children: [
            {
              tagName: 'div',
              selector: 'edit-text'
            }
          ]
        }
      ]
    }
  ],
  ports: { ...basicPorts }
})

Graph.registerNode(
  'custom-rect',
  {
    inherit: 'rect',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF'
      },
      text: {
        fontSize: 12,
        fill: '#262626'
      }
    },
    ports: { ...basicPorts }
  },
  true
)

Graph.registerNode(
  'custom-polygon',
  {
    inherit: 'polygon',
    width: 60,
    height: 60,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#f7b76a',
        fill: '#fcead2',
        refPoints: '0,10 10,0 20,10 10,20'
      },
      text: {
        fontSize: 12,
        fill: '#f7b76a'
      },
      fo: {
        refWidth: '100%',
        refHeight: '100%'
      },
      foBody: {
        xmlns: Dom.ns.xhtml,
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      },
      'edit-text': {
        contenteditable: 'true',
        class: 'x6-edit-text',
        style: {
          width: '100%',
          textAlign: 'center',
          fontSize: 12,
          color: '#f7b76a'
        }
      }
    },
    markup: [
      {
        tagName: 'polygon',
        selector: 'body'
      },
      {
        tagName: 'text',
        selector: 'text'
      },
      {
        tagName: 'foreignObject',
        selector: 'fo',
        children: [
          {
            ns: Dom.ns.xhtml,
            tagName: 'body',
            selector: 'foBody',
            children: [
              {
                tagName: 'div',
                selector: 'edit-text'
              }
            ]
          }
        ]
      }
    ],
    ports: {
      ...basicPorts
    }
  },
  true
)

Graph.registerNode(
  'custom-circle',
  {
    inherit: 'circle',
    width: 45,
    height: 45,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF'
      },
      text: {
        fontSize: 12,
        fill: '#262626'
      }
    },
    ports: { ...basicPorts }
  },
  true
)

Graph.registerNode(
  'custom-image',
  {
    inherit: 'rect',
    width: 52,
    height: 52,
    markup: [
      {
        tagName: 'rect',
        selector: 'body'
      },
      {
        tagName: 'image'
      },
      {
        tagName: 'text',
        selector: 'label'
      }
    ],
    attrs: {
      body: {
        stroke: '#5F95FF',
        fill: '#5F95FF'
      },
      image: {
        width: 26,
        height: 26,
        refX: 13,
        refY: 16
      },
      label: {
        refX: 3,
        refY: 2,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 12,
        fill: '#fff'
      }
    },
    ports: { ...basicPorts }
  },
  true
)
// 组合节点
export const FlowChartImageRect = Graph.registerNode('flow-chart-image-rect', {
  inherit: 'rect',
  width: 200,
  height: 60,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)'
    },
    image: {
      'xlink:href':
         'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 16,
      height: 16,
      x: 12,
      y: 12
    },
    title: {
      text: 'Node',
      refX: 40,
      refY: 14,
      fill: 'rgba(0,0,0,0.85)',
      fontSize: 12,
      'text-anchor': 'start'
    },
    text: {
      text: 'this is content text',
      refX: 40,
      refY: 38,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start'
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'image',
      selector: 'image'
    },
    {
      tagName: 'text',
      selector: 'title'
    },
    {
      tagName: 'text',
      selector: 'text'
    }
  ],
  ports: { ...basicPorts }
})
  
export const FlowChartTitleRect = Graph.registerNode('flow-chart-title-rect', {
  inherit: 'rect',
  width: 200,
  height: 68,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)'
    },
    head: {
      refWidth: '100%',
      stroke: 'transparent',
      height: 28,
      fill: 'rgb(95,149,255)'
    },
    image: {
      'xlink:href':
         'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      height: 16,
      x: 6,
      y: 6
    },
    title: {
      text: 'Node',
      refX: 30,
      refY: 9,
      fill: '#ffffff',
      fontSize: 12,
      'text-anchor': 'start'
    },
    text: {
      text: 'this is content text',
      refX: 8,
      refY: 45,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start'
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'rect',
      selector: 'head'
    },
    {
      tagName: 'image',
      selector: 'image'
    },
    {
      tagName: 'text',
      selector: 'title'
    },
    {
      tagName: 'text',
      selector: 'text'
    }
  ],
  ports: { ...basicPorts }
})
  
export const FlowChartAnimateText = Graph.registerNode('flow-chart-animate-text', {
  inherit: 'rect',
  width: 200,
  height: 60,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)'
    },
    text1: {
      class: 'animate-text1',
      text: 'AntV X6',
      fontSize: 32
    },
    text2: {
      class: 'animate-text2',
      text: 'AntV X6',
      fontSize: 32
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'text1'
    },
    {
      tagName: 'text',
      selector: 'text2'
    }
  ]
})
  
// 自定义 系统设计图
export const FlowChartImageRectCustom = Graph.registerNode('flow-chart-image-rect-custom', {
  inherit: 'rect',
  width: 80,
  height: 80,
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'image'
    },
    {
      tagName: 'text',
      selector: 'label'
    }
  ],
  attrs: {
    body: {
      // 节点线的颜色
      stroke: 'transparent',
      // 背景填充色
      fill: 'transparent'
    },
    // 自定义图片
    image: {
      width: 60,
      height: 60,
      refX: 0,
      refY: 0
    },
    label: {
      refX: 3,
      refY: 2,
      textAnchor: 'left',
      textVerticalAnchor: 'top',
      fontSize: 12,
      fill: 'black'
    },
    'edit-text': {
      contenteditable: 'true',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(0,0,0,0.85)'
      }
    },
    text: {
      fontSize: 12,
      fill: '#080808'
    }
  },
  ports: { ...customPorts }
})
  
