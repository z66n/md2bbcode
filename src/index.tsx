import * as React from 'react'
import { createRoot } from 'react-dom/client'; 

import * as Styles from '@mui/material/styles'
import { ThemeProvider as MaterialThemeProvider, createTheme } from '@mui/material/styles'
import { StylesProvider, ThemeProvider as StylesThemeProvider } from '@mui/styles'

import { marked, Renderer as MarkedRenderer } from 'marked'

import Main from './component/Main'
import Header from './component/Header'

import RendererConfig from './config/Renderer.json'
import ImageCollection from './config/ImageCollection.json'


export interface RenderConfigCollection {
  [key: string]: {
    [key: string]: string
  }
}

export interface RenderConfigItem {
  [key: string]: {
    prefix: string
    suffix: string
  }
}

export interface Renderer {
  [key: string]: (content: string, arg?: { [key: string]: unknown }) => string
}

const textObject = { text: '' }

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1E3765'
    },
    secondary: {
      main: '#1E3765'
    }
  }
})

const renderConfigItem: RenderConfigItem = {}

const renderConfigCollection: RenderConfigCollection = RendererConfig

function getRenderer() {
  const renderer: Renderer = {}
  const prefixes = renderConfigCollection.prefix
  const suffixes = renderConfigCollection.suffix
  try {
    if (localStorage.renderConfigOverride !== 'true') {
      localStorage.renderConfigOverride = 'false'
      throw new Error()
    }
    Object.assign(suffixes, JSON.parse(localStorage.renderConfig))
  } catch (e) {
    localStorage.renderConfig = JSON.stringify(suffixes)
  }
  for (const key in prefixes) {
    const prefix = prefixes[key]
    const suffix = suffixes[key]
    const func = eval(prefix + '`' + suffix + '`')
    renderConfigItem[key] = { prefix: prefix, suffix: suffix }
    if (key === 'tablecell') {
      renderer[key] = (content, flags = {}) => func(content, flags.header, flags.align)
    } else {
      renderer[key] = func
    }
  }
  return Object.assign(new MarkedRenderer(), renderer)
}

const renderer = getRenderer()

function collectConfig(preset?: string) {
  return { renderer: renderConfigItem, text: textObject.text }
}

function onTransform(markdownText: string) {
  const result = marked.parse(markdownText, {
    renderer: renderer,
    breaks: true 
  }) as string;

  return (textObject.text = result);
}

function body() {
  return (
    <StylesProvider injectFirst>
      <StylesThemeProvider theme={muiTheme}>
        <MaterialThemeProvider theme={muiTheme}>
          <Header configCollector={collectConfig} images={ImageCollection} />
          <Main transformer={onTransform} />
        </MaterialThemeProvider>
      </StylesThemeProvider>
    </StylesProvider>
  )
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(body());