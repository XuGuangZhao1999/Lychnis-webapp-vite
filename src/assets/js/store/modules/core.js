import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import i18n from '../../language/index.js'
import { hexToRgb } from '../../utils/colorFormatChange.js'

const coreModel = {
    namespaced: true,
    state() {
        return {
            username: "",
            language: "en",
            I18N: i18n,
            bLoaded: false,
            levels: 1,
            currentLevel: 0,
            contrastRange: {
                "lower": 100,
                "upper": 1000,
            },
            center: {
                "x": 0,
                "y": 0,
                "z": 0,
            },
            blockSize: {
                "width": 256,
                "height": 256,
            },
            channels: [],
            scale: 0,
        }
    },
    mutations: {
        // Set username
        setUsername(state, name) {
            state.username = name
        },
        // Set the language of the Element Plus component
        setLanguage(state, lang) {
            state.language = lang
        },
        // Set the language of the i18n
        setI18N(state, lang) {
            state.I18N.global.locale = lang
        },
        // Set whether the file is loaded
        setBLoaded(state, b) {
            state.bLoaded = b
        },
        // Set the image resolution information
        setResolution(state, res) {
            state.levels = res.totalResolutions
            state.currentLevel = res.currentResolution
        },
        // Set the current level
        setCurrentLevel(state, level) {
            state.currentLevel = level
        },
        // Set the center of the volume
        setCenter(state, center) {
            state.center.x = center.x
            state.center.y = center.y
            state.center.z = center.z
        },
        // Set the block size
        setBlockSize(state, blockSize) {
            state.blockSize.width = blockSize.width
            state.blockSize.height = blockSize.height
        },
        // Set the channels
        setChannels(state, channels){
            state.channels = channels
        },
        // Set the channel color
        setChannelColor(state, channel){
            state.channels[channel.index].color = channel.color
        },
        // Set the channel visibility
        setChannelVisibility(state, channel){
            state.channels[channel.index].visible = channel.visible
        },
        // Set the channel contrast
        setChannelContrast(state, range){
            for(let it of state.channels){
                it.contrast = range.lower + " " + range.upper
            }
            state.contrastRange.lower = range.lower
            state.contrastRange.upper = range.upper
        },
        // Set the scale
        setScale(state, scale){
            state.scale = scale
        }
    },
    actions: {
        updateUsername(context, name){
            let req = {
                "functionName": "updateUsername",
                "args": {
                    "username": name
                }
            }

            window.cefQuery({
                request: JSON.stringify(req),
                onSuccess: function(response){
                    window.showMessage("Username change: " + response)
                    context.commit('setUsername', name)
                },
                onFailure: function(error_code, error_message){
                    window.showMessage(error_code + ": " + error_message)
                }
            }
            )
        },
        updateResolution(context, resId){
            if(context.state.bLoaded == false) return
            let req = {
                "functionName": "updateResolution",
                "args": {
                    "resId": resId
                }
            }

            window.cefQuery({
                request: JSON.stringify(req),
                onSuccess: function(response){
                    window.showMessage("Resolution change: " + response)
                    context.commit('setCurrentLevel', resId - 1)
                },
                onFailure: function(error_code, error_message){
                    window.showMessage(error_code + ": " + error_message)
                }
            }
            )
        },
        updateBlockSize(context, blockSize){
            if(context.state.bLoaded == false) return
            let req = {
                "functionName": "updateBlockSize",
                "args": {
                    "blockSize": blockSize
                }
            }

            window.cefQuery({
                request: JSON.stringify(req),
                onSuccess: function(response){
                    window.showMessage("Block size change: " + response)
                    context.commit('setBlockSize', blockSize)
                },
                onFailure: function(error_code, error_message){
                    window.showMessage(error_code + ": " + error_message)
                }
            }
            )
        },
        updateCenter(context, center){
            if(context.state.bLoaded == false) return
            let req = {
                "functionName": "updateCenter",
                "args": {
                    "center": center
                }
            }

            window.cefQuery({
                request: JSON.stringify(req),
                onSuccess: function(response){
                    window.showMessage("Center change: " + response)
                    context.commit('setCenter', center)
                },
                onFailure: function(error_code, error_message){
                    window.showMessage(error_code + ": " + error_message)
                }
            }
            )
        },
        updateChannelColor(context, channel){
            if(context.state.bLoaded == false) return

            let rgb = hexToRgb(channel.color)
            let req = {
                "functionName": "updateChannelColor",
                "args": {
                    "index": channel.index,
                    "r": rgb[0],
                    "g": rgb[1],
                    "b": rgb[2],
                    "gamma": context.state.channels[channel.index].gamma
                }
            }

            window.cefQuery({
                request: JSON.stringify(req),
                onSuccess: function(response){
                    window.showMessage("Channel color change: " + response)
                    context.commit('setChannelColor', {"index": channel.index, "color": (rgb[0]/255)+" "+(rgb[1]/255)+" "+(rgb[2]/255)})
                },
                onFailure: function(error_code, error_message){
                    window.showMessage(error_code + ": " + error_message)
                }
            }
            )
        },
        updateChannelVisibility(context, channel){
            if(context.state.bLoaded == false) return
            let req = {
                "functionName": "updateChannelVisibility",
                "args": {
                    "index": channel.index,
                    "visible": channel.visible
                }
            }

            window.cefQuery({
                request: JSON.stringify(req),
                onSuccess: function(response){
                    window.showMessage("Channel visibility change: " + response)
                    context.commit('setChannelVisibility', {"index": channel.index, "visible": channel.visible})
                },
                onFailure: function(error_code, error_message){
                    window.showMessage(error_code + ": " + error_message)
                }
            }
            )
        },
        updateChannelContrast(context, range){
            if(context.state.bLoaded == false) return
            let req = {
                "functionName": "updateChannelContrast",
                "args": {
                    "lower": range.lower,
                    "upper": range.upper
                }
            }

            window.cefQuery({
                request: JSON.stringify(req),
                onSuccess: function(response){
                    window.showMessage("Channel contrast change: " + response)
                    context.commit('setChannelContrast', range)
                },
                onFailure: function(error_code, error_message){
                    window.showMessage(error_code + ": " + error_message)
                }
            }
            )
        },
    },
    getters: {
        locale(state) {
            if (state.language === "zhCn") {
                return zhCn
            } else {
                return en
            }
        }
    }
}

export default coreModel