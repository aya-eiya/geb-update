package jp.eiya.geb.spec

import geb.Browser
import geb.spock.GebSpec
import jp.eiya.geb.page.GebTestSamplePage

class GebTestSampleSpec extends GebSpec {

    def 'new todo can be input'(){
        setup:
            to GebTestSamplePage

        when:
            todoInput.value(inputWord)

        then:
            todoInput.value() == expectWord

        when:
            todoAdd.click()

        then:
            lastTodoContent.text() == expectWord

        where:
        inputWord || expectWord
        'groovy'  || 'groovy'
    }
}