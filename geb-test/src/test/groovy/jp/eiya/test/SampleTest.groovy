package jp.eiya.test

import spock.lang.Specification

class SampleTest extends Specification {
  def 'test sample'(){
    expect:
    text.toUpperCase() == expected

    where:
    text  || expected
    'aaa' || 'AAA'
  }
}