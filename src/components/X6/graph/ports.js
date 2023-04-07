/**
 * Author: lixiaoyi 2212884878@qq.com
 * Date: 2023-02-28 17:25:16
 * LastEditors: lixiaoyi 2212884878@qq.com
 * LastEditTime: 2023-03-22 15:23:47
 */
export const basicPorts = {
  groups: {
    top: {
      position: 'top',
      zIndex: 20,
      attrs: {
        circle: {
          dataClass: 'choice-point',
          r: 6,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    right: {
      position: 'right',
      zIndex: 20,
      attrs: {
        circle: {
          dataClass: 'choice-point',
          r: 6,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    bottom: {
      position: 'bottom',
      zIndex: 20,
      attrs: {
        circle: {
          dataClass: 'choice-point',
          r: 6,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    left: {
      position: 'left',
      zIndex: 20,
      attrs: {
        circle: {
          dataClass: 'choice-point',
          r: 6,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    }
  },
  items: [
    {
      group: 'top'
    },
    {
      group: 'right'
    },
    {
      group: 'bottom'
    },
    {
      group: 'left'
    }
  ]
}

export const customPorts = {
  groups: {
    top: {
      position: {
        name: 'absolute'
      }
    },
    right: {
      position: {
        name: 'absolute'
      }
    },
    bottom: {
      position: {
        name: 'absolute'
      }
    },
    left: {
      position: {
        name: 'absolute'
      }
    }
  },
  items: [
    {
      id: 'port1',
      group: 'top',
      // 通过 args 指定绝对位置
      args: {
        x: 25,
        y: -5
      },
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    {
      id: 'port2',
      group: 'right',
      args: {
        x: 55,
        y: 25
      },
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    {
      id: 'port3',
      group: 'bottom',
      args: {
        x: 25,
        y: 55
      },
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    {
      id: 'port4',
      group: 'left',
      args: {
        x: -5,
        y: 25
      },
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    }
  ]
}