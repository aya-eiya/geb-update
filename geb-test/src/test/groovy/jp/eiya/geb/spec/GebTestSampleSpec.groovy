package jp.eiya.geb.spec

import geb.Browser
import geb.spock.GebSpec
import jp.eiya.geb.page.GebTestSamplePage

class GebTestSampleSpec extends GebSpec {

    def 'a search word can be input'(){
        setup:
            to GebTestSamplePage

        when:
            $('input[type=text]')[0].value(inputWord)

        then:
            $('input[type=text]')[0].value() == expectWord

        where:
        inputWord || expectWord
        'groovy'  || 'groovy'
    }
}