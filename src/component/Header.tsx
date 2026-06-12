import * as React from 'react'

import * as Index from '../index'
import * as Hooks from '../hooks'

import * as Core from '@mui/material'
import * as Icons from '@mui/icons-material'

import Config from './Config'

interface HeaderProps {
  images: {
    [key: string]: string
  }
  configCollector(): {
    renderer: Index.RenderConfigItem
    text: string
  }
}

function Header(props: HeaderProps) {
  const { title, toolbar } = Hooks.useHeaderStyles()
  return (
    <Core.AppBar position='fixed'>
      <Core.Toolbar className={toolbar}>
        <Core.Typography variant='h5' className={title}>
          <span>md2bbcode</span><TitleSuffix />
        </Core.Typography>
        <CopyOutput text={() => props.configCollector()['text']} />
        <Config images={props.images} configCollector={props.configCollector} />
      </Core.Toolbar>
    </Core.AppBar>
  )
}

function TitleSuffix(props: {}) {
  const isSmall = !Core.useMediaQuery('@media (min-width: 768px)')
  const { titleSuffixSmall } = Hooks.useHeaderStyles()
  return isSmall ? (
    <div className={titleSuffixSmall}>Markdown To Discuz! Flavoured BBCode Converter</div>
  ) : (
    <span>&nbsp;-&nbsp;Markdown To Discuz! Flavoured BBCode Converter</span>
  )
}

function CopyOutput(props: { text: () => string }) {
  const [open, reset] = Hooks.useClipboard(`#copy-output`, props.text)
  const isSmall = !Core.useMediaQuery('@media (min-width: 1024px)')
  const clipboardMessage = 'BBCode output successfully copied'
  return isSmall ? (
    <div>
      <Core.IconButton color='inherit' id='copy-output'><Icons.ContentCopy /></Core.IconButton>
      <Core.Snackbar open={open} autoHideDuration={4096} message={clipboardMessage} onClose={reset} />
    </div>
  ) : (
    <div>
      <Core.Button color='inherit' id='copy-output'><Icons.ContentCopy />&nbsp;Copy Output</Core.Button>
      <Core.Snackbar open={open} autoHideDuration={4096} message={clipboardMessage} onClose={reset} />
    </div>
  )
}

export default Header
