/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

import I18n from '../../i18n'
import Accordion from './accordion'

let accordionHTML = false
let i18nInstance = null

beforeEach(() => {
  accordionHTML = document.createElement('div')
  accordionHTML.setAttribute('class', 'govuk-accordion')
  accordionHTML.setAttribute('id', 'accordion-example')
  accordionHTML.setAttribute('data-module', 'govuk-accordion')

  const accordionSection = document.createElement('div')
  accordionSection.setAttribute('class', 'govuk-accordion__section')

  const accordionSectionHeader = document.createElement('div')
  accordionSection.setAttribute('class', 'govuk-accordion__section-header')

  const accordionSectionHeading = document.createElement('div')
  accordionSectionHeading.setAttribute('class', 'govuk-accordion__section-heading')

  const accordionSectionButton = document.createElement('span')
  accordionSectionButton.setAttribute('id', 'accordion-example-heading-1')
  accordionSectionButton.setAttribute('class', 'govuk-accordion__section-button')
  accordionSectionButton.innerText = 'This is a heading'

  const accordionSectionContent = document.createElement('div')
  accordionSectionContent.setAttribute('id', 'accordion-example-content-1')
  accordionSectionContent.setAttribute('class', 'govuk-accordion__section-content')
  accordionSectionContent.setAttribute('aria-labelledby', 'accordion-example-heading-1')

  const accordionContent = document.createElement('p')
  accordionContent.innerText = 'This is some content'

  accordionSectionContent.appendChild(accordionContent)

  accordionSectionHeading.appendChild(accordionSectionButton)
  accordionSectionHeader.appendChild(accordionSectionHeading)

  accordionSection.appendChild(accordionSectionHeader)
  accordionSection.appendChild(accordionContent)

  accordionHTML.appendChild(accordionSection)
  document.body.appendChild(accordionHTML)
})

afterEach(() => {
  i18nInstance = null
  jest.clearAllMocks()
})

describe('i18n', () => {
  beforeEach(() => {
    const i18n = {
      translations: {
        accordion: {
          show_all_sections: 'Embiggen all sections'
        }
      }
    }

    i18nInstance = new I18n(i18n)
  })

  test('test', () => {
    const accordion = new Accordion(accordionHTML, i18nInstance)
    accordion.init()

    const showHideButton = document.querySelector('.govuk-accordion__show-all')

    if (showHideButton.getAttribute('aria-expanded')) {
      showHideButton.click()
    }

    const showHideText = showHideButton.querySelector('.govuk-accordion__show-all-text')

    expect(showHideText.innerHTML).toBe('Embiggen all sections')
  })
})

describe('not testing i18n', () => {
  test('blah', () => {
    i18nInstance = new I18n({})
    const accordion = new Accordion(accordionHTML, i18nInstance)
    accordion.init()

    const showHideButton = document.querySelector('.govuk-accordion__show-all')

    if (showHideButton.getAttribute('aria-expanded')) {
      showHideButton.click()
    }

    const showHideText = showHideButton.querySelector('.govuk-accordion__show-all-text')

    expect(showHideText.innerHTML).toBe('Show all sections')
  })
})