// Description: Test the vuex store.
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { createStore } from 'vuex'
import statusModel from '../src/assets/js/store/modules/status.js'
import coreModel from '../src/assets/js/store/modules/core.js'
import { beforeEach, describe } from 'vitest'

// test data
let center = {"x": 1, "y": 2, "z": 3}

let blockSize = {"width": 512, "height": 512}

let channelContrast = {
  "lower": 300,
  "upper": 8000
}

let channels

let store

beforeEach(()=>{
    channels = [
      {
        "position": "position0",
        "color": "1 1 1",
        "contrast": "100 1000",
        "index": 0,
        "gamma": 1,
        "visible": true,
      },
      {
        "position": "position1",
        "color": "1 0 1",
        "contrast": "100 1000",
        "index": 1,
        "gamma": 1,
        "visible": false,
      },
      {
        "position": "position2",
        "color": "1 1 0",
        "contrast": "100 1000",
        "index": 2,
        "gamma": 1,
        "visible": true,
      }
    ]
    store = createStore({
        modules:{
            status: statusModel,
            core: coreModel
        }
    })
})

// Test the status module.
test('statusModel: state & mutations', ()=>{
    expect(store.state.status.message).toBe("Status")
    expect(store.state.status.bShow).toBe(true)
    store.commit("status/showMessage", "Test message!")
    // Wait for 5 seconds
    setTimeout(()=>{
      expect(store.state.status.message).toBe("Test message!")
      expect(store.state.status.bShow).toBe(false) 
    }, 5000)
})

// Test the core module.
test('coreModel: state', ()=>{
    expect(store.state.core.language).toBe("en")
    expect(store.state.core.I18N.global.locale).toBe("en")
    expect(store.state.core.bLoaded).toBe(false)
    expect(store.state.core.levels).toBe(1)
    expect(store.state.core.currentLevel).toBe(0)
    expect(store.state.core.contrastRange).toEqual({"lower": 100, "upper": 1000})
    expect(store.state.core.center).toEqual({"x": 0, "y": 0, "z": 0})
    expect(store.state.core.blockSize).toEqual({"width": 256, "height": 256})
    expect(store.state.core.channels).toEqual([])
})

test('coreModel: mutations', ()=>{
    store.commit("core/setLanguage", "zhCn")
    expect(store.state.core.language).toBe("zhCn")

    store.commit("core/setI18N", "zhCn")
    expect(store.state.core.I18N.global.locale).toBe("zhCn")

    store.commit("core/setBLoaded", true)
    expect(store.state.core.bLoaded).toBe(true)

    store.commit("core/setResolution", {"totalResolutions": 7, "currentResolution": 3})
    expect(store.state.core.levels).toBe(7)
    expect(store.state.core.currentLevel).toBe(3)

    store.commit("core/setCurrentLevel", 5)
    expect(store.state.core.currentLevel).toBe(5)

    store.commit("core/setCenter", center)
    expect(store.state.core.center).toEqual(center)
    
    store.commit("core/setBlockSize", blockSize)
    expect(store.state.core.blockSize).toEqual(blockSize)

    store.commit("core/setChannels", channels)
    expect(store.state.core.channels).toEqual(channels)

    store.commit("core/setChannelColor", {"index": 1, "color": "0 1 0"})
    expect(store.state.core.channels[1].color).toBe("0 1 0")

    store.commit("core/setChannelVisibility", {"index": 2, "visible": false})
    expect(store.state.core.channels[2].visible).toBe(false)

    store.commit("core/setChannelContrast", channelContrast)
    for(let i=0; i<channels.length; i++){
      expect(store.state.core.channels[i].contrast).toBe("300 8000")
    }
})

test('coreModel: getters', ()=>{
    expect(store.getters['core/locale']).toBe(en)
    store.commit("core/setLanguage", "zhCn")
    expect(store.getters['core/locale']).toBe(zhCn)
})

describe('coreModel: actions', ()=>{
    afterEach(()=>{
      vi.restoreAllMocks()
    })

    // Mock the global window functions
    const showMessageMock = vi.fn((message)=>{
      return message
    })

    const cefQueryMock = vi.fn((reqObject)=>{
      if(reqObject.request){
          reqObject.onSuccess("success")
      }else{
          reqObject.onFailure(404, "Not Found")
      }
    })

    vi.stubGlobal('showMessage', showMessageMock)
    vi.stubGlobal('cefQuery', cefQueryMock)
	
    it('action: updateResolution', async ()=>{
      // bLoaded: false
      store.commit("core/setResolution", {"totalResolutions": 7, "currentResolution": 3})
      await store.dispatch("core/updateResolution", 5)
      expect(store.state.core.currentLevel).toBe(3)
      expect(cefQueryMock).toHaveBeenCalledTimes(0)
      expect(showMessageMock).toHaveBeenCalledTimes(0)

      // bLoaded: true
      store.commit("core/setBLoaded", true)
      await store.dispatch("core/updateResolution", 5)
      expect(store.state.core.currentLevel).toBe(4)
      expect(cefQueryMock).toHaveBeenCalledTimes(1)
      expect(showMessageMock).toHaveBeenCalledTimes(1)
    })

    it('action: updateBlockSize', async ()=>{
      // bLoaded: false
      await store.dispatch("core/updateBlockSize", blockSize)
      expect(store.state.core.blockSize).toEqual({"width": 256, "height": 256})
      expect(cefQueryMock).toHaveBeenCalledTimes(0)
      expect(showMessageMock).toHaveBeenCalledTimes(0)

      // bLoaded: true
      store.commit("core/setBLoaded", true)
      await store.dispatch("core/updateBlockSize", blockSize)
      expect(store.state.core.blockSize).toEqual(blockSize)
      expect(cefQueryMock).toHaveBeenCalledTimes(1)
      expect(showMessageMock).toHaveBeenCalledTimes(1)
    })

    it('action: updateCenter', async ()=>{
      // bLoaded: false
      await store.dispatch("core/updateCenter", center)
      expect(store.state.core.center).toEqual({"x": 0, "y":0, "z":0})
      expect(cefQueryMock).toHaveBeenCalledTimes(0)
      expect(showMessageMock).toHaveBeenCalledTimes(0)

      // bLoaded: true
      store.commit("core/setBLoaded", true)
      await store.dispatch("core/updateCenter", center)
      expect(store.state.core.center).toEqual(center)
      expect(cefQueryMock).toHaveBeenCalledTimes(1)
      expect(showMessageMock).toHaveBeenCalledTimes(1)
    })

    it('action: updateChannelColor', async ()=>{
      let channelColor = {
        "index": 2,
        "color": "#653577"
      }
      // bLoaded: false
      store.commit("core/setChannels", channels)
      expect(store.state.core.channels).toEqual(channels)
      await store.dispatch("core/updateChannelColor", channelColor)
      expect(store.state.core.channels[channelColor.index].color).toEqual(channels[channelColor.index].color)
      expect(cefQueryMock).toHaveBeenCalledTimes(0)
      expect(showMessageMock).toHaveBeenCalledTimes(0)

      // bLoaded: true
      store.commit("core/setBLoaded", true)
      await store.dispatch("core/updateChannelColor", channelColor)
      expect(store.state.core.channels[channelColor.index].color).toEqual((119/255)+" "+(53/255)+" "+(101/255))
      expect(cefQueryMock).toHaveBeenCalledTimes(1)
      expect(showMessageMock).toHaveBeenCalledTimes(1)
    })

    it('action: updateChannelVisibility', async ()=>{
      let channelVisibility = {
        "index": 2,
        "visible": false
      }
      // bLoaded: false
      store.commit("core/setChannels", channels)
      await store.dispatch("core/updateChannelVisibility", channelVisibility)
      expect(store.state.core.channels[channelVisibility.index].visible).toEqual(true)
      expect(cefQueryMock).toHaveBeenCalledTimes(0)
      expect(showMessageMock).toHaveBeenCalledTimes(0)

      // bLoaded: true
      store.commit("core/setBLoaded", true)
      await store.dispatch("core/updateChannelVisibility", channelVisibility)
      expect(store.state.core.channels[channelVisibility.index].visible).toEqual(false)
      expect(cefQueryMock).toHaveBeenCalledTimes(1)
      expect(showMessageMock).toHaveBeenCalledTimes(1)
    })

    it('action: updateChannelContrast', async ()=>{
      // bLoaded: false
      store.dispatch("core/updateChannelContrast", channelContrast)
      expect(store.state.core.contrastRange).toEqual({"lower": 100, "upper": 1000})
      expect(cefQueryMock).toHaveBeenCalledTimes(0)
      expect(showMessageMock).toHaveBeenCalledTimes(0)

      // bLoaded: true
      store.commit("core/setBLoaded", true)
      store.dispatch("core/updateChannelContrast", channelContrast)
      expect(store.state.core.contrastRange).toEqual(channelContrast)
      expect(cefQueryMock).toHaveBeenCalledTimes(1)
      expect(showMessageMock).toHaveBeenCalledTimes(1)
    })
})
