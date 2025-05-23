<script context="module">
  import Icon from './icon.svelte'
  import resources from '../../../icons/meta'

  export const meta = {
    title: 'Components/Icon',
    component: Icon,
    argTypes: {
      '--leo-icon-color': {
        control: 'color',
        description: 'The color to use for the icon',
        type: 'string'
      },
      '--leo-icon-size': {
        control: 'text',
        description: 'The size of the icon (defaults to 24px if not set)',
        type: 'string'
      },
      '--leo-icon-height': {
        control: 'text',
        description:
          'For irregular icon aspect ratios, you can set the height of the icon (defaults to 24px if not set)',
        type: 'string'
      },
      '--leo-icon-width': {
        control: 'text',
        description:
          'For irregular icon aspect ratios, you can set the width of the icon (defaults to 24px if not set)',
        type: 'string'
      },
      name: {
        control: 'select',
        options: Object.values(resources.icons),
        description: 'The name of the icon to use',
        type: 'string'
      },
      color: {
        control: 'color',
        description:
          'The current text color (this is used for the icon if --leo-icon-color is not set)',
        type: 'string'
      }
    },
    args: {
      color: 'var(--leo-color-icon-default)',
      name: 'shield-alert-filled',
      '--leo-icon-size': '24px'
    }
  }
</script>

<script>
  import { Story, Template } from '@storybook/addon-svelte-csf'
  import Slot from '../../storyHelpers/Slot.svelte'
  import SlotInfo from '../../storyHelpers/SlotInfo.svelte'

  let filter = ''
  $: filteredIcons = Object.values(resources.icons).filter((i) =>
    i.toLowerCase().includes(filter.toLowerCase())
  )
</script>

<Template let:args>
  <div style={`color: ${args.color}`}>
    <Icon {...args} />
  </div>
</Template>

<Story name="Slots" let:args>
  <SlotInfo
    description="The icon has a single slot for specifying a custom icon, while retaining the Leo Icon styling"
  >
    <Slot
      name="default"
      explanation="The custom icon. Generally an SVG. If an icon name is passed in as well as slotted content, the named icon will be ignored"
    >
      <div>
        <Icon {...args}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, 400,400">
            <circle cx="200" cy="200" r="200" fill="#2cb44c" />
            <path
              d="M108.385 104.100 C 107.019 104.789,106.365 105.469,105.600 107.000 L 104.600 109.000 104.600 122.000 L 104.600 135.000 105.600 137.000 C 107.148 140.097,108.671 140.676,117.226 141.421 C 197.595 148.424,261.367 211.172,268.636 290.400 C 270.097 306.329,269.418 305.800,288.400 305.800 L 301.400 305.800 303.400 304.800 C 307.537 302.731,308.191 296.486,306.019 279.800 C 295.730 200.782,239.137 134.255,162.760 111.395 C 141.337 104.983,113.926 101.306,108.385 104.100 M110.274 172.787 C 105.028 173.802,104.238 176.591,104.505 193.137 C 104.764 209.197,105.022 209.611,115.611 210.982 C 160.231 216.759,193.492 250.335,199.381 295.545 C 200.688 305.583,202.074 306.225,221.800 305.935 C 238.552 305.688,239.424 304.577,236.816 286.800 C 227.961 226.439,179.294 179.506,118.800 172.990 C 112.931 172.358,112.540 172.349,110.274 172.787 M126.705 253.186 C 106.131 256.947,97.686 281.780,111.869 296.814 C 127.848 313.753,155.989 303.890,157.483 280.827 C 158.577 263.953,143.225 250.166,126.705 253.186 "
              stroke="none"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>
        </Icon>
      </div>
    </Slot>
  </SlotInfo>
</Story>

<Story name="Default" />

<Story name="All Icons" let:args>
  <input
    class="filter"
    type="text"
    placeholder="Filter icons"
    bind:value={filter}
  />
  <div class="all" style={`color: ${args.color};`}>
    {#each filteredIcons as icon}
      <div class="icon">
        <Icon name={icon} />
        <div class="name">
          {icon}
        </div>
      </div>
    {/each}
  </div>
</Story>

<style>
  .filter {
    padding: 10px;
    margin: 10px;
  }
  .all {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }

  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
  }
</style>
