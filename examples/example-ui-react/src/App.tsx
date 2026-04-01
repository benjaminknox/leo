import * as React from 'react'
import '@brave/leo/tokens/css/variables.css'
import LeoButton from '@brave/leo/react/button'
import Tabs from '@brave/leo/react/tabs'
import TabItem from '@brave/leo/react/tabItem'
import Tooltip from '@brave/leo/react/tooltip'
import Input from '@brave/leo/react/input'
import Dropdown from '@brave/leo/react/dropdown'
import ButtonMenu from '@brave/leo/react/buttonMenu'
import Toggle from '@brave/leo/react/toggle'
import Icon from '@brave/leo/react/icon'
import Link from '@brave/leo/react/link'
import Alert from '@brave/leo/react/alert'
import Checkbox from '@brave/leo/react/checkbox'
import Collapse from '@brave/leo/react/collapse'
import Dialog from '@brave/leo/react/dialog'
import Label from '@brave/leo/react/label'
import NavDots from '@brave/leo/react/navdots'
import ProgressBar from '@brave/leo/react/progressBar'
import ProgressRing from '@brave/leo/react/progressRing'
import RadioButton from '@brave/leo/react/radioButton'
import SegmentedControl from '@brave/leo/react/segmentedControl'
import SegmentedControlItem from '@brave/leo/react/segmentedControlItem'
import TextArea from '@brave/leo/react/textarea'

import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource-variable/inter/index.css'

function App() {
  // Verify that we can change props and children (slots)
  const [buttonText, setButtonText] = React.useState('I am a LEO Button')
  const [spinning, setSpinning] = React.useState(false)
  const [isThing, setIsThing] = React.useState(false)
  const [activeDot, setActiveDot] = React.useState(0)
  const [radioButtonValue, setRadioButtonValue] = React.useState("radio 1")
  const [segmentedControlValue, setSegmentedControlValue] = React.useState<string | undefined>("full")
  const [collapsableOpen, toggleCollapsable] = React.useReducer(
    (state) => !state,
    false
  )
  const [dialogOpen, toggleDialogOpen] = React.useReducer(
    (state) => !state,
    false
  )

  const handleAction = () => console.log('action')

  return (
    <>
      <Alert>Alert content</Alert>
      <Dialog isOpen={dialogOpen} onClose={toggleDialogOpen}>
        Dialog content
      </Dialog>
      <header>
        <h1>A React App</h1>
        <NavDots onChange={(dot) => setActiveDot(dot.activeDot)} activeDot={activeDot} dotCount={10} />
      </header>
      <section style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'stretch', gap: '1.5rem'}}>
        <SegmentedControl value={segmentedControlValue} onChange={(evt) => setSegmentedControlValue(evt.value)}>
          <SegmentedControlItem value="full">
            <Icon slot="icon-before" name="check-circle-outline" />
            Full
          </SegmentedControlItem>

          <SegmentedControlItem value="simple">
            <Icon slot="icon-before" name="check-circle-outline" />
            Simple
          </SegmentedControlItem>
        </SegmentedControl>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <RadioButton value="radio 1" onChange={(evt) => setRadioButtonValue(evt.value)} name="radio-component" currentValue={radioButtonValue} size="small" />
          <RadioButton value="radio 2" onChange={(evt) => setRadioButtonValue(evt.value)} name="radio-component" currentValue={radioButtonValue} size="small" />
        </div>
        <TextArea>Text Area</TextArea>
        <ProgressRing />
        <ProgressBar progress={0.5} />
        <LeoButton onClick={toggleDialogOpen}>Open Dialog</LeoButton>
        <Collapse
          title="A Collapsable"
          isOpen={collapsableOpen}
          onToggle={toggleCollapsable}
        >
          Collapsable Content
        </Collapse>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Checkbox checked /> Checkbox
        </div>
        <Label color="secondary">Label Content</Label>
        <Input value={buttonText} onInput={(e: any) => setButtonText(e.value)}>
          Edit the button text:
          {buttonText.length % 2 === 0 && (
            <Icon name="loading-spinner" slot="left-icon" />
          )}
        </Input>
        {buttonText && (
          <LeoButton
            className={spinning ? 'spin' : ''}
            kind="filled"
            size="large"
            onClick={() => {
              location.hash = ''
              setSpinning((s) => !s)
              alert('clicked!')
            }}
          >
            {buttonText}
          </LeoButton>
        )}
        <div data-theme="dark">
          <Dropdown value="foo">
            <leo-option value="foo">Foo</leo-option>
            <leo-option value="bar">Bar</leo-option>
          </Dropdown>
        </div>
        <ButtonMenu>
          <LeoButton fab kind="plain-faint" slot="anchor-content">
            <Icon name="more-horizontal" />
          </LeoButton>
          <leo-menu-item onClick={handleAction}>Llama2-13b</leo-menu-item>
          <leo-menu-item onClick={handleAction}>Llama2-7b</leo-menu-item>
          <div
            style={{
              padding: '10px 0',
              fontSize: 12,
              borderTop: '1px solid blue'
            }}
          >
            Coding
          </div>
          <leo-menu-item onClick={handleAction}>Llama2-13b</leo-menu-item>
          <leo-menu-item onClick={handleAction}>Llama2-7b</leo-menu-item>
          <div onClick={() => setIsThing(!isThing)}>
            <span>Suggested questions</span>
            <Toggle checked={isThing} />
          </div>
          <leo-menu-item
            onClick={() => setIsThing(!isThing)}
            data-is-interactive={true}
          >
            <span>Suggested questions</span>
            <Toggle checked={isThing} />
          </leo-menu-item>
        </ButtonMenu>
        <Tabs value="1">
          <TabItem value="1">Tab 1</TabItem>
          <TabItem value="2">Tab 2</TabItem>
          <TabItem value="3">Tab 3</TabItem>
        </Tabs>
        <Tooltip text="Hello World">
          <LeoButton href="#foo">Link button!</LeoButton>
        </Tooltip>
        <Link href="https://brave.com">Link as anchor tag</Link>
        <Link type="submit">Link as button</Link>
        <LeoButton href="https://brave.com">Button as anchor tag</LeoButton>
      </section>
    </>
  )
}

export default App
